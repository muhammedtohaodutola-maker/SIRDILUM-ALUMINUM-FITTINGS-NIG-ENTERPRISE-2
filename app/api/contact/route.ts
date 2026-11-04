import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, ENTERPRISE_ADMIN_EMAIL, RESEND_FROM_EMAIL } from '@/lib/resend';

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

    // Save to Supabase if configured
    let savedToDb = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      try {
        const { error } = await supabase.from('contacts').insert([contactRecord]);
        if (!error) savedToDb = true;
      } catch (dbErr) {
        console.warn('Supabase contact insert deferred:', dbErr);
      }
    }

    // Send email via Resend if configured
    let emailSent = false;
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')) {
      try {
        await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: ENTERPRISE_ADMIN_EMAIL,
          subject: `New Workshop Inquiry from ${name} (${phone})`,
          html: `
            <h2>New Inquiry - SIRDILUM Web Portal</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${projectType || 'General'}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background:#f1f5f9;padding:12px;border-left:4px solid #15803d;">${message}</blockquote>
          `,
        });
        emailSent = true;
      } catch (mailErr) {
        console.warn('Resend contact email deferred:', mailErr);
      }
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
