// app/api/images/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const folderPath = path.join(process.cwd(), "public/uploads");
    const exists = await fs.stat(folderPath).then(() => true).catch(() => false);
    if (!exists) return NextResponse.json([]);
    const files = await fs.readdir(folderPath);
    return NextResponse.json(files);
  } catch (err) {
    console.error('List uploads error', err);
    return NextResponse.json([], { status: 500 });
  }
}
