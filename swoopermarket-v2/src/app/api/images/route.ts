import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') as string;
  const request_body = JSON.stringify(request.body)

  const blob = await put(filename, request_body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}