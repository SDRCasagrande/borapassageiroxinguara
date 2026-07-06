'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function criarBanner(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const descricao = formData.get('descricao') as string | null;
  const link = formData.get('link') as string;
  const codigo = formData.get('codigo') as string | null;
  
  if (!titulo || !link) throw new Error('Título e Link são obrigatórios');

  await prisma.bannerPromocional.create({
    data: {
      titulo: titulo.trim(),
      descricao: descricao?.trim() || null,
      link: link.trim(),
      codigo: codigo?.trim() || null,
      ativo: true,
    }
  });

  revalidatePath('/admin/banners');
  revalidatePath('/passageiro');
  revalidatePath('/motorista');
}

export async function atualizarBanner(formData: FormData) {
  const id = formData.get('id') as string;
  const titulo = formData.get('titulo') as string;
  const descricao = formData.get('descricao') as string | null;
  const link = formData.get('link') as string;
  const codigo = formData.get('codigo') as string | null;
  
  if (!id || !titulo || !link) throw new Error('Dados inválidos');

  await prisma.bannerPromocional.update({
    where: { id },
    data: {
      titulo: titulo.trim(),
      descricao: descricao?.trim() || null,
      link: link.trim(),
      codigo: codigo?.trim() || null,
    }
  });

  revalidatePath('/admin/banners');
  revalidatePath('/passageiro');
  revalidatePath('/motorista');
}

export async function alterarStatusBanner(id: string, ativo: boolean) {
  await prisma.bannerPromocional.update({
    where: { id },
    data: { ativo }
  });

  revalidatePath('/admin/banners');
  revalidatePath('/passageiro');
  revalidatePath('/motorista');
}

export async function removerBanner(id: string) {
  await prisma.bannerPromocional.delete({
    where: { id }
  });

  revalidatePath('/admin/banners');
  revalidatePath('/passageiro');
  revalidatePath('/motorista');
}
