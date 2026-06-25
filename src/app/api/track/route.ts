import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { pathname } = await request.json();
    
    if (!pathname) {
      return NextResponse.json({ error: 'Pathname is required' }, { status: 400 });
    }

    const ipAddress = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    await prisma.pageView.create({
      data: {
        pagePath: pathname,
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track page view:', error);
    // Não quebra a experiência do usuário em caso de erro no DB
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
  }
}
