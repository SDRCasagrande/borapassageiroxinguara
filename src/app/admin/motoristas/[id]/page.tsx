import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MotoristaProfileClient } from "./MotoristaProfileClient";
import { adicionarCorridasProfile } from "../actions";

export const dynamic = "force-dynamic";

export default async function MotoristaProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const motorista = await prisma.motorista.findUnique({
    where: { id: params.id },
    include: {
      corridas: {
        orderBy: { data: 'desc' },
        take: 50
      }
    }
  });

  if (!motorista) {
    notFound();
  }

  return (
    <MotoristaProfileClient 
      motorista={motorista} 
      adicionarCorridas={adicionarCorridasProfile}
    />
  );
}
