import { getSiteContent } from '@/lib/site-content';
import { CadastroForm } from './CadastroForm';

export default async function CadastroMotoristaPage() {
  // Busca o conteúdo configurado no CMS para o site do motorista
  const content = await getSiteContent('motorista');
  
  // Pega as cidades disponíveis ou uma lista vazia como fallback
  const cidadesDisponiveis = content.config?.cidadesDisponiveis || [];

  return <CadastroForm cidadesDisponiveis={cidadesDisponiveis} />;
}
