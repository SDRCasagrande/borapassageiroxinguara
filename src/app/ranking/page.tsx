import { prisma } from "@/lib/prisma";
import { RankingClient } from "./RankingClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RankingPage() {
  let motoristas: any[] = [];
  try {
    motoristas = await prisma.motorista.findMany({
      orderBy: { corridasMes: "desc" },
      where: { ativo: true },
    });

    motoristas = motoristas.map((m: any) => ({
      id: m.id,
      nome: m.nome,
      corridasMes: m.corridasMes,
      pontos: m.pontos,
      fotoUrl: m.fotoUrl,
      status: m.status,
    }));
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
  }

  // Fallback visual para demonstração
  if (motoristas.length === 0) {
    motoristas = [
      { id: "1", nome: "André Oliveira", corridasMes: 28, pontos: 0, fotoUrl: "https://i.pravatar.cc/300?u=andre", status: "ativo" },
      { id: "2", nome: "Beatriz Nunes", corridasMes: 24, pontos: 0, fotoUrl: "https://i.pravatar.cc/300?u=beatriz", status: "ativo" },
      { id: "3", nome: "Carlos Lima", corridasMes: 21, pontos: 0, fotoUrl: "https://i.pravatar.cc/300?u=carloss", status: "alerta" },
      { id: "4", nome: "Diego Santos", corridasMes: 19, pontos: 0, fotoUrl: "https://i.pravatar.cc/300?u=diego", status: "ativo" },
      { id: "5", nome: "Fernanda Souza", corridasMes: 17, pontos: 0, fotoUrl: "https://i.pravatar.cc/300?u=fernanda", status: "alerta" },
    ];
  }

  return <RankingClient motoristas={motoristas} />;
}
