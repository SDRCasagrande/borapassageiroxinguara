export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PassageiroClient from "./PassageiroClient";
import { getSiteContent } from "@/lib/site-content";

export default async function PassageiroPage() {
  const banners = await prisma.bannerPromocional.findMany({
    where: { ativo: true },
    orderBy: { createdAt: "desc" },
  });

  const content = await getSiteContent("passageiro");

  return <PassageiroClient banners={banners} content={content} />;
}
