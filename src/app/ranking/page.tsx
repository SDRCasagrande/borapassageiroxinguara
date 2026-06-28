import { prisma } from "@/lib/prisma";
import { RankingClient } from "./RankingClient";

// Removido force-dynamic para usar o Cache do Next.js (atualizado via revalidatePath)

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

  // Removido o fallback visual para usar apenas os dados reais do banco

  return <RankingClient motoristas={motoristas} />;
}
