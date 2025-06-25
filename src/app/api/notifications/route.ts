import { NextResponse } from 'next/server';
import { MOCK_NOTIFICATIONS } from '@/lib/constants';

export async function GET() {
  // Sorting is now done on the client
  return NextResponse.json(MOCK_NOTIFICATIONS);
}
