import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { MAX_FILE_SIZE, sanitizeFilename, ensureUniqueName } from '@/lib/upload';

export async function POST(req: Request) {
  try {
    // Basic server-side check for admin auth cookie (set by /api/login)
    const cookieHeader = req.headers.get('cookie') || '';
    const isAdmin = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('admin-auth='))?.split('=')[1] === 'true';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Parse the incoming multipart/form-data request
    const formData = await req.formData();

    // 2. Extract all files from the "files" field as an array of File objects
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // 3. Determine the target upload directory (inside your Next.js "public" folder)
    const uploadDir = path.join(process.cwd(), 'public/portfolio');

    // 4. Ensure the upload directory exists (create if missing)
    await fs.mkdir(uploadDir, { recursive: true });

    const saved: string[] = [];

    // 5. Loop over each uploaded file…
    for (const file of files) {
      if (!file || typeof file.name !== 'string') continue;

      // validate size
      const size = file.size ?? 0;
      if (size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `File too large: ${file.name}` }, { status: 413 });
      }

      // basic mime-type check
      const type = file.type || '';
      if (!type.startsWith('image/') && !/\.(jpe?g|png|gif|webp|svg)$/i.test(file.name)) {
        return NextResponse.json({ error: `Unsupported file type: ${file.name}` }, { status: 415 });
      }

      // sanitize and ensure unique filename
      const safeName = sanitizeFilename(file.name);
      const uniqueName = await ensureUniqueName(uploadDir, safeName);

      // read and write
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, uniqueName);

      await fs.writeFile(filePath, buffer);
      saved.push(uniqueName);
    }

    // 6. Return a JSON response indicating success
    return NextResponse.json({ message: 'Files uploaded successfully!', files: saved });
  } catch (err) {
    console.error('Portfolio upload error', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
