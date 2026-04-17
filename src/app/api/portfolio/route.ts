import { NextResponse } from 'next/server';
import { loadPortfolioData } from '@/lib/data';

export async function GET() {
  try {
    const data = await loadPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to load portfolio data' },
      { status: 500 }
    );
  }
}
