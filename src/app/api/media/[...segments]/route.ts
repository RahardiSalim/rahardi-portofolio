import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import {
  getContentMediaMimeType,
  resolveContentMediaRequest,
} from '@/lib/media';

export async function GET(
  _request: NextRequest,
  { params }: { params: { segments: string[] } }
) {
  const resolved = resolveContentMediaRequest(params.segments);

  if (!resolved.ok) {
    return new NextResponse(resolved.message, { status: resolved.status });
  }

  if (!fs.existsSync(resolved.filePath)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const stat = fs.statSync(resolved.filePath);
  if (!stat.isFile()) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const content = fs.readFileSync(resolved.filePath);

  return new NextResponse(content, {
    headers: {
      'Content-Type': getContentMediaMimeType(resolved.filePath),
      'Cache-Control': 'public, max-age=3600',
      'Content-Length': stat.size.toString(),
    },
  });
}
