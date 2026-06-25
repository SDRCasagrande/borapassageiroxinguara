import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // 1. Busca o link de destino no banco
    const link = await prisma.trackingLink.findUnique({
      where: { slug },
    });

    if (!link) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Registra o clique
    // Extraímos informações do request para análise de tráfego
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Apenas tenta registrar o clique, mas não trava o redirecionamento se falhar
    prisma.click.create({
      data: {
        trackingLinkId: link.id,
        ipAddress: ip,
        userAgent: userAgent,
      }
    }).catch(console.error);

    // 3. Redireciona o usuário imediatamente para a App Store / Play Store / WhatsApp
    return NextResponse.redirect(link.destino);

  } catch (error) {
    console.error('Erro no tracking de link:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
