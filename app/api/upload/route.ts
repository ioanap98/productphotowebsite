import { NextResponse } from 'next/server';
import { saveUploadedFiles, UploadError } from '@/lib/upload';

export async function POST(req: Request) {
  try {
    const result = await saveUploadedFiles(req, 'public/uploads', 'hero images');
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    console.error('Upload error', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
