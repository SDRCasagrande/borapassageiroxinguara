import { getSiteContent } from '@/lib/site-content';
import { EditorFormClient } from './EditorFormClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditorFormPage({ params }: { params: { page: string; section: string } }) {
  const page = params.page as 'passageiro' | 'motorista';
  const section = params.section;

  // Busca todo o conteúdo da página, que já vem mergeado com defaults
  const fullContent = await getSiteContent(page);
  
  // Extrai a seção específica
  const sectionData = fullContent[section];

  if (!sectionData) {
    return notFound();
  }

  return <EditorFormClient page={page} section={section} initialData={sectionData} />;
}
