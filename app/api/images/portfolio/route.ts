// app/api/images/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const folderPath = path.join(process.cwd(), "public/portfolio");

    const exists = await fs.stat(folderPath).then(() => true).catch(() => false);
    if (!exists) return NextResponse.json([]);

    const files = await fs.readdir(folderPath);

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'];

    const imageFiles = files
      .filter((file) => {
        if (file.startsWith('.')) return false; // remove .DS_Store
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })); // ✅ alphabetical

    return NextResponse.json(imageFiles);

  } catch (err) {
    console.error('List portfolio images error', err);
    return NextResponse.json([], { status: 500 });
  }
}