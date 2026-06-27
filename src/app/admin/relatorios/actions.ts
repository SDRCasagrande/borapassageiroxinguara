'use server';

import { prisma } from "@/lib/prisma";

export async function listarFechamentos() {
  try {
    const fechamentos = await prisma.fechamentoMes.findMany({
      orderBy: { createdAt: "desc" },
    });
    return fechamentos.map(f => ({
      id: f.id,
      nome: f.nome,
      dados: f.dados as any[],
      createdAt: f.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

export async function getMesAtual() {
  try {
    const motoristas = await prisma.motorista.findMany({
      orderBy: { corridasMes: "desc" },
      select: {
        id: true,
        nome: true,
        fotoUrl: true,
        status: true,
        corridasMes: true,
      }
    });
    return motoristas;
  } catch {
    return [];
  }
}
