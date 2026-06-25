import { prisma } from "@/lib/prisma";
import { MotoristasAdminClient } from "./MotoristasAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminMotoristasPage() {
  let motoristas: any[] = [];
  let dbError = false;

  try {
    motoristas = await prisma.motorista.findMany({
      orderBy: { pontos: "desc" },
    });
  } catch (error) {
    console.error("Erro no DB:", error);
    dbError = true;
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Motoristas</h1>
          <p className="text-sm text-slate-500 mt-1">
            Cadastre fotos e atribua pontos para o Ranking Oficial.
          </p>
        </header>

        {dbError && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl">
            <h3 className="text-rose-800 font-semibold">Banco de Dados Offline</h3>
            <p className="text-rose-600/80 text-sm mt-1">
              Você precisa rodar o banco local para listar e editar os motoristas.
            </p>
          </div>
        )}

        {!dbError && <MotoristasAdminClient motoristas={motoristas} />}
      </div>
    </div>
  );
}
