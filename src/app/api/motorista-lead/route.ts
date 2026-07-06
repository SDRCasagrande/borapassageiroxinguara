import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, telefone, cidade, veiculo, categoriaCnh } = body;

    if (!nome || !telefone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    const lead = await prisma.motoristaLead.create({
      data: {
        nome,
        telefone,
        cidade: cidade || null,
        veiculo: veiculo || null,
        categoriaCnh: categoriaCnh || null,
        status: 'PENDENTE',
      },
    });

    // 1. Notificação via Telegram (se configurado)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    
    if (telegramBotToken && telegramChatId) {
      try {
        const text = `🚨 *Novo Pré-Cadastro (Bora Passageiro)*\n\n*Nome:* ${nome}\n*WhatsApp:* ${telefone}\n*Cidade:* ${cidade || 'Não informada'}\n*Veículo:* ${veiculo || 'Não informado'}\n*CNH:* ${categoriaCnh || 'Não informada'}`;
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: telegramChatId, text, parse_mode: 'Markdown' })
        });
      } catch (err) {
        console.error('Erro ao notificar no Telegram:', err);
      }
    }

    // 2. Notificação via Webhook (se configurado, ex: n8n, Zapier)
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: lead.id, nome, telefone, cidade, veiculo, categoriaCnh, source: 'bora_passageiro' })
        });
      } catch (err) {
        console.error('Erro ao notificar via Webhook:', err);
      }
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error('Erro ao criar lead de motorista:', error);
    return NextResponse.json(
      { error: 'Erro interno ao salvar cadastro' },
      { status: 500 }
    );
  }
}
