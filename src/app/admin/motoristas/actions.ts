'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPontos(motoristaId: string, pontosToAdd: number) {
  try {
    await prisma.motorista.update({
      where: { id: motoristaId },
      data: {
        pontos: {
          increment: pontosToAdd
        }
      }
    });
    
    // Revalidar a página do admin e a do ranking para refletir os novos pontos instantaneamente
    revalidatePath('/admin/motoristas');
    revalidatePath('/ranking');
    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar pontos:", error);
    throw new Error("Falha ao adicionar pontos.");
  }
}
