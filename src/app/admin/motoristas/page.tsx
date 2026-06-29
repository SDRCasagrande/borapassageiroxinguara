export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { MotoristasAdminClient } from "./MotoristasAdminClient";
import { cadastrarMotorista, cadastrarMotoristasEmLote, adicionarCorridas, alterarStatus, removerMotorista, zerarMes, atualizarMotorista } from "./actions";

export default async function AdminMotoristasPage() {
  let motoristas: any[] = [];
  let dbError = false;

  try {
    motoristas = await prisma.motorista.findMany({
      orderBy: { corridasMes: "desc" },
    });
  } catch (error) {
    console.error("Erro no DB:", error);
    dbError = true;
  }

  return (
    <MotoristasAdminClient
      motoristas={motoristas}
      dbError={dbError}
      cadastrarMotorista={cadastrarMotorista}
      cadastrarMotoristasEmLote={cadastrarMotoristasEmLote}
      adicionarCorridas={adicionarCorridas}
      alterarStatus={alterarStatus}
      removerMotorista={removerMotorista}
      zerarMes={zerarMes}
      atualizarMotorista={atualizarMotorista}
    />
  );
}
