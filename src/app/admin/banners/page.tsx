export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { BannersClient } from "./BannersClient";
import { criarBanner, atualizarBanner, alterarStatusBanner, removerBanner } from "./actions";

export default async function AdminBannersPage() {
  let banners: any[] = [];
  let dbError = false;

  try {
    banners = await prisma.bannerPromocional.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro no DB:", error);
    dbError = true;
  }

  return (
    <BannersClient
      banners={banners}
      dbError={dbError}
      criarBanner={criarBanner}
      atualizarBanner={atualizarBanner}
      alterarStatusBanner={alterarStatusBanner}
      removerBanner={removerBanner}
    />
  );
}
