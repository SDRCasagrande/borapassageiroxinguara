import { prisma } from "@/lib/prisma";
import { RankingClient } from "./RankingClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RankingPage() {
  let motoristas: any[] = [];
  try {
    motoristas = await prisma.motorista.findMany({
      orderBy: { pontos: "desc" },
      where: { ativo: true },
      include: {
        _count: {
          select: { corridas: true },
        },
      },
    });

    // Mapear para incluir o count de corridas
    motoristas = motoristas.map((m: any) => ({
      id: m.id,
      nome: m.nome,
      pontos: m.pontos,
      fotoUrl: m.fotoUrl,
      corridas: m._count?.corridas || 0,
    }));
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
  }

  // Fallback visual para demonstração (banco offline ou vazio)
  if (motoristas.length === 0) {
    motoristas = [
      { id: "1", nome: "João Silva", pontos: 1250, corridas: 142, fotoUrl: "https://i.pravatar.cc/300?u=joao" },
      { id: "2", nome: "Maria Souza", pontos: 980, corridas: 118, fotoUrl: "https://i.pravatar.cc/300?u=maria" },
      { id: "3", nome: "Carlos Beta", pontos: 850, corridas: 97, fotoUrl: "https://i.pravatar.cc/300?u=carlos" },
      { id: "4", nome: "Ana Paula", pontos: 720, corridas: 85, fotoUrl: "https://i.pravatar.cc/300?u=ana" },
      { id: "5", nome: "Marcos Lima", pontos: 650, corridas: 76, fotoUrl: "https://i.pravatar.cc/300?u=marcos" },
      { id: "6", nome: "Lucas Oliveira", pontos: 510, corridas: 62, fotoUrl: "https://i.pravatar.cc/300?u=lucas" },
      { id: "7", nome: "Roberto Santos", pontos: 490, corridas: 58, fotoUrl: "https://i.pravatar.cc/300?u=roberto" },
    ];
  }

  return <RankingClient motoristas={motoristas} />;
}
