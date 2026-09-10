import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    { error: 'Gone', message: 'Bundles were retired from Queer Pathways.' },
    { status: 410, headers: { 'X-Robots-Tag': 'noindex' } }
  );
}
