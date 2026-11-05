import { createClient } from '@supabase/supabase-js';
import { clientEnv } from '@/env/client';
import { serverEnv } from '@/env/server';

// Standard client for client-side and public access (respects Row Level Security)
export const supabase = createClient(
  clientEnv.supabase.url,
  clientEnv.supabase.anonKey
);

// Administrative client for server-side operations (bypasses RLS)
export const getServiceSupabase = () => {
  const serviceKey = serverEnv.supabase.serviceRoleKey;
  if (!serviceKey || serviceKey.includes('eyJ...')) {
    return supabase;
  }
  return createClient(clientEnv.supabase.url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Supabase Storage Buckets
 */
export const STORAGE_BUCKETS = clientEnv.supabase.buckets;

/**
 * Upload a file to Supabase Storage
 */
export async function uploadToStorage({
  bucket,
  path,
  fileBuffer,
  contentType,
  upsert = false,
}: {
  bucket: string;
  path: string;
  fileBuffer: Buffer | ArrayBuffer | Uint8Array;
  contentType: string;
  upsert?: boolean;
}) {
  const client = getServiceSupabase();
  const { data, error } = await client.storage
    .from(bucket)
    .upload(path, fileBuffer, {
      contentType,
      upsert,
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Get public URL for a file in a public Supabase Storage bucket
 */
export function getStoragePublicUrl(bucket: string, path: string): string {
  const client = getServiceSupabase();
  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Create a signed temporary URL for downloading private files (e.g., CAD drawings, invoices)
 */
export async function createSignedDownloadUrl(
  bucket: string,
  path: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  const client = getServiceSupabase();
  const { data, error } = await client.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}
