'use server';

import { saveSiteContent } from '@/lib/site-content';
import { revalidatePath } from 'next/cache';

export async function saveSiteContentAction(page: string, section: string, data: any) {
  try {
    const res = await saveSiteContent(page, section, data);
    if (!res) throw new Error('Falha ao salvar no banco');
    
    // Invalida a cache do site público
    revalidatePath(`/${page === 'passageiro' ? '' : 'motorista'}`);
    revalidatePath(`/admin/editor/${page}/${section}`);
    
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
