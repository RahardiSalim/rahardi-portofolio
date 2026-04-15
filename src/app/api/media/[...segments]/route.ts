import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PORTFOLIO_ROOT = process.cwd();

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.JPG': 'image/jpeg',
  '.JPEG': 'image/jpeg',
  '.png': 'image/png',
  '.PNG': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ipynb': 'application/json',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { segments: string[] } }
) {
  // Decode URL-encoded segments
  const decodedSegments = params.segments.map(s => decodeURIComponent(s));
  const filePath = path.join(PORTFOLIO_ROOT, ...decodedSegments);

  // Security: prevent path traversal outside portfolio root
  const normalizedPath = path.normalize(filePath);
  if (!normalizedPath.startsWith(PORTFOLIO_ROOT)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(normalizedPath)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const stat = fs.statSync(normalizedPath);
  if (!stat.isFile()) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const ext = path.extname(normalizedPath);
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  const content = fs.readFileSync(normalizedPath);

  return new NextResponse(content, {
    headers: {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600',
      'Content-Length': stat.size.toString(),
    },
  });
}
