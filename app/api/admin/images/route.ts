import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type ImageBucket = 'web' | 'mobile' | 'portfolio';

const FOLDER_MAP: Record<ImageBucket, string> = {
  web: 'public/uploads/web',
  mobile: 'public/uploads/mobile',
  portfolio: 'public/portfolio',
};

function isImageBucket(value: unknown): value is ImageBucket {
  return value === 'web' || value === 'mobile' || value === 'portfolio';
}

export async function DELETE(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const isAdmin =
      cookieHeader
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('admin-auth='))
        ?.split('=')[1] === 'true';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await req.json().catch(() => null)) as {
      bucket?: unknown;
      filename?: unknown;
    } | null;

    if (!body || !isImageBucket(body.bucket) || typeof body.filename !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const filename = path.basename(body.filename.trim());
    if (!filename || filename === '.' || filename === '..') {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const baseDir = path.resolve(process.cwd(), FOLDER_MAP[body.bucket]);
    const targetPath = path.resolve(baseDir, filename);

    if (!targetPath.startsWith(baseDir + path.sep)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    await fs.unlink(targetPath);

    return NextResponse.json({ success: true, filename });
  } catch (err) {
    const errorCode = (err as NodeJS.ErrnoException).code;
    if (errorCode === 'ENOENT') {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    console.error('Delete image error', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
