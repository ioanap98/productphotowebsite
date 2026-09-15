// app/api/images/route.ts
import { NextResponse } from "next/server";
import { listImageFiles } from "@/lib/image-files";

export async function GET() {
  try {
    const files = await listImageFiles("public/uploads");
    return NextResponse.json(files);
  } catch (err) {
    console.error('List uploads error', err);
    return NextResponse.json([], { status: 500 });
  }
}
