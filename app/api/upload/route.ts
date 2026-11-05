import { NextResponse } from 'next/server';
import { uploadToStorage, getStoragePublicUrl, STORAGE_BUCKETS } from '@/lib/supabase';
import { serverEnv } from '@/env/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucketType = (formData.get('bucketType') as string) || 'drawings';
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided in the request' },
        { status: 400 }
      );
    }

    // Determine target bucket
    let targetBucket = STORAGE_BUCKETS.drawings;
    if (bucketType === 'photos') targetBucket = STORAGE_BUCKETS.photos;
    if (bucketType === 'invoices') targetBucket = STORAGE_BUCKETS.invoices;

    // Check if Supabase is configured
    if (!serverEnv.supabase.isConfigured) {
      return NextResponse.json({
        success: false,
        mock: true,
        message: 'Supabase storage keys not yet configured. Simulated upload successful.',
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          simulatedUrl: `/assets/images/${file.name}`,
        },
      });
    }

    // Convert file to ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique timestamped path
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${folder}/${Date.now()}_${sanitizedName}`;

    // Upload to Supabase Storage
    await uploadToStorage({
      bucket: targetBucket,
      path: storagePath,
      fileBuffer: buffer,
      contentType: file.type || 'application/octet-stream',
    });

    const fileUrl = getStoragePublicUrl(targetBucket, storagePath);

    return NextResponse.json({
      success: true,
      message: 'File successfully uploaded to Supabase Storage',
      bucket: targetBucket,
      path: storagePath,
      url: fileUrl,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Supabase storage upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload file to storage' },
      { status: 500 }
    );
  }
}
