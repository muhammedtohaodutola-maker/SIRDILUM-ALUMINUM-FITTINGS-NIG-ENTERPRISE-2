import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, ENTERPRISE_ADMIN_EMAIL, RESEND_FROM_EMAIL } from '@/lib/resend';

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
      specs: specs || {},
      status: 'pending_review',
      created_at: new Date().toISOString(),
    };

    // Attempt to persist to Supabase if configured
    let savedToDb = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      try {
        const { error } = await supabase.from('quotes').insert([quoteRecord]);
        if (!error) savedToDb = true;
      } catch (dbErr) {
        console.warn('Supabase quote record insert deferred:', dbErr);
      }
    }

    // Attempt to send email alert via Resend if configured
    let emailSent = false;
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')) {
      try {
        await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: ENTERPRISE_ADMIN_EMAIL,
          subject: `New BOQ Estimate from ${clientName || clientPhone} [₦${Number(estimatedCost).toLocaleString()}]`,
          html: `
            <h2>SIRDILUM ALUMINUM - BOQ Quote Request</h2>
            <p><strong>Client:</strong> ${clientName || 'N/A'} (${clientPhone})</p>
            <p><strong>Email:</strong> ${clientEmail || 'N/A'}</p>
            <p><strong>Project Location:</strong> ${projectLocation || 'Lagos'}</p>
            <p><strong>Product Type:</strong> ${productType}</p>
            <p><strong>Profile Gauge:</strong> ${profileGauge}</p>
            <p><strong>Finish & Glazing:</strong> ${finishGlazing}</p>
            <p><strong>Quantity / Scope:</strong> ${quantity}</p>
            <h3>Estimated Total: ₦${Number(estimatedCost).toLocaleString()}</h3>
            <p><em>CAC Registered: CRBN 716623</em></p>
          `,
        });
        emailSent = true;
      } catch (mailErr) {
        console.warn('Resend email delivery deferred:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'BOQ estimate processed successfully',
      quote: quoteRecord,
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
