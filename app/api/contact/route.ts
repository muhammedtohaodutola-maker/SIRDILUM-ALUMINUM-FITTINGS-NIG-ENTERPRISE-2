import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendContactEmail } from '@/lib/mail';
import { serverEnv } from '@/env/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectType, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone number, and project message are required.' },
        { status: 400 }
      );
    }

    const contactRecord = {
      name,
      phone,
      email: email || null,
      project_type: projectType || 'General Inquiries',
      message,
      created_at: new Date().toISOString(),
    };

    // 1. Save to Supabase Database
    let savedToDb = false;
    if (serverEnv.supabase.isConfigured) {
      try {
        const { error } = await supabase.from('contacts').insert([contactRecord]);
        if (!error) savedToDb = true;
      } catch (dbErr) {
        console.warn('Supabase contact insert deferred:', dbErr);
      }
    }

    // 2. Send email via Resend
    let emailSent = false;
    try {
      await sendContactEmail({
        name,
        phone,
        email,
        projectType: projectType || 'General Inquiries',
        message,
      });
      emailSent = true;
    } catch (mailErr) {
      console.warn('Resend contact email deferred:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received by our Ikorodu workshop team.',
      savedToDb,
      emailSent,
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error handling contact submission' },
      { status: 500 }
    );
  }
}
