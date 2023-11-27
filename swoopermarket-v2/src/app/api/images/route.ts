import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Post a new image into Vercel blob
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') as string;
  const request_body = request.body as ReadableStream<Uint8Array>;

  const blob = await put(filename, request_body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}

// Delete image from Vercel blob
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url') as string;
  await del(urlToDelete);
 
  return new Response();
}