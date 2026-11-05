import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendQuoteEmails } from '@/lib/mail';
import { serverEnv } from '@/env/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientPhone,
      clientEmail,
      projectLocation,
      productType,
      profileGauge,
      finishGlazing,
      quantity,
      estimatedCost,
      specs,
      drawingUrl,
    } = body;

    // Validate required fields
    if (!clientPhone || !productType || !quantity) {
      return NextResponse.json(
        { error: 'Missing required estimation parameters (phone, product, quantity)' },
        { status: 400 }
      );
    }

    const quoteRecord = {
      client_name: clientName || 'Anonymous Project Lead',
      client_phone: clientPhone,
      client_email: clientEmail || null,
      project_location: projectLocation || 'Lagos, Nigeria',
      product_type: productType,
      profile_gauge: profileGauge || 'Standard Certified',
      finish_glazing: finishGlazing || 'Standard Clear',
      quantity: Number(quantity) || 1,
      estimated_cost_ngn: Number(estimatedCost) || 0,
      specs: specs || (drawingUrl ? { drawing_url: drawingUrl } : {}),
      status: 'pending_review',
      created_at: new Date().toISOString(),
    };

    // 1. Attempt to persist to Supabase Database
    let savedToDb = false;
    let dbRecordId = null;
    if (serverEnv.supabase.isConfigured) {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .insert([quoteRecord])
          .select('id')
          .single();

        if (!error && data) {
          savedToDb = true;
          dbRecordId = data.id;
        } else if (error) {
          console.warn('Supabase quote record insert deferred:', error.message);
        }
      } catch (dbErr) {
        console.warn('Supabase quote insert error:', dbErr);
      }
    }

    // 2. Trigger automated email notifications via Resend
    let emailSent = false;
    try {
      const mailResult = await sendQuoteEmails({
        clientName: clientName || 'Private Client',
        clientEmail,
        clientPhone,
        projectLocation: projectLocation || 'Lagos',
        productType,
        profileGauge: profileGauge || '1.2mm',
        finishGlazing,
        quantity: Number(quantity) || 1,
        estimatedCost: Number(estimatedCost) || 0,
      });
      emailSent = Boolean(mailResult?.success);
    } catch (mailErr) {
      console.warn('Resend mail delivery deferred:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'BOQ estimate processed successfully',
      quote: {
        ...quoteRecord,
        id: dbRecordId,
      },
      savedToDb,
      emailSent,
    });
  } catch (error: any) {
    console.error('Error processing quote:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing quote' },
      { status: 500 }
    );
  }
}
