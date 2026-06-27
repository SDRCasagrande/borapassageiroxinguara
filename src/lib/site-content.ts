import { prisma } from '@/lib/prisma';
import { passageiroDefaults } from '@/lib/defaults/passageiro';
import { motoristaDefaults } from '@/lib/defaults/motorista';

const defaults: Record<string, Record<string, any>> = {
  passageiro: passageiroDefaults,
  motorista: motoristaDefaults,
};

/**
 * Busca todo o conteúdo de uma página (passageiro ou motorista).
 * Mescla com defaults — se a seção existe no DB, usa o DB; senão usa o default.
 */
export async function getSiteContent(page: 'passageiro' | 'motorista'): Promise<Record<string, any>> {
  const pageDefaults = defaults[page] || {};

  try {
    const rows = await prisma.siteContent.findMany({
      where: { page },
    });

    const content: Record<string, any> = { ...pageDefaults };

    for (const row of rows) {
      // Deep merge: DB data overrides defaults, but keeps missing fields from defaults
      const sectionDefaults = pageDefaults[row.section] || {};
      content[row.section] = deepMerge(sectionDefaults, row.data as any);
    }

    return content;
  } catch (error) {
    console.error(`[CMS] Erro ao carregar conteúdo de "${page}":`, error);
    return pageDefaults;
  }
}

/**
 * Salva o conteúdo de uma seção específica (upsert).
 */
export async function saveSiteContent(page: string, section: string, data: any) {
  return prisma.siteContent.upsert({
    where: { page_section: { page, section } },
    update: { data },
    create: { page, section, data },
  });
}

/**
 * Retorna os defaults de uma página.
 */
export function getDefaults(page: 'passageiro' | 'motorista'): Record<string, any> {
  return defaults[page] || {};
}

/**
 * Lista de seções editáveis por página.
 */
export const editableSections: Record<string, { key: string; label: string; icon: string }[]> = {
  passageiro: [
    { key: 'hero', label: 'Hero / Banner Principal', icon: '🏠' },
    { key: 'stats', label: 'Estatísticas', icon: '📊' },
    { key: 'features', label: 'Vantagens (Cards)', icon: '✨' },
    { key: 'steps', label: 'Como Funciona (Passos)', icon: '👣' },
    { key: 'testimonials', label: 'Depoimentos', icon: '💬' },
    { key: 'faq', label: 'FAQ - Perguntas Frequentes', icon: '❓' },
    { key: 'cta', label: 'CTA / Download', icon: '📲' },
    { key: 'footer', label: 'Rodapé', icon: '📋' },
    { key: 'config', label: 'Configurações & Links', icon: '⚙️' },
  ],
  motorista: [
    { key: 'hero', label: 'Hero / Banner Principal', icon: '🏠' },
    { key: 'fintech', label: 'Card de Ganhos (Fintech)', icon: '💰' },
    { key: 'calculator', label: 'Simulador de Ganhos', icon: '🧮' },
    { key: 'requisitos', label: 'Requisitos', icon: '📋' },
    { key: 'testimonials', label: 'Depoimentos', icon: '💬' },
    { key: 'faq', label: 'FAQ - Perguntas Frequentes', icon: '❓' },
    { key: 'cta', label: 'CTA / Chamada Final', icon: '📲' },
    { key: 'footer', label: 'Rodapé', icon: '📋' },
    { key: 'config', label: 'Configurações & Links', icon: '⚙️' },
  ],
};

/**
 * Deep merge de dois objetos.
 * Arrays são substituídos (não concatenados).
 */
function deepMerge(target: any, source: any): any {
  if (source === null || source === undefined) return target;
  if (typeof source !== 'object' || Array.isArray(source)) return source;
  if (typeof target !== 'object' || Array.isArray(target)) return source;

  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined) {
      result[key] = deepMerge(target[key], source[key]);
    }
  }
  return result;
}
