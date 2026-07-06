export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PassageiroClient from "./PassageiroClient";

export default async function PassageiroPage() {
  const banners = await prisma.bannerPromocional.findMany({
    where: { ativo: true },
    orderBy: { createdAt: "desc" },
  });

  return <PassageiroClient banners={banners} />;
}
