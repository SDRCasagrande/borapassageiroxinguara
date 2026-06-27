import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seja Motorista Bora Passageiro — Ganhe dinheiro dirigindo em Xinguara',
  description: 'Cadastre-se como motorista parceiro do Bora Passageiro. Taxa de apenas 10%, ganhos reais e liberdade para trabalhar quando quiser na região do Xingu.',
  openGraph: {
    title: 'Seja Motorista Bora Passageiro — Ganhe dinheiro dirigindo',
    description: 'Taxa de apenas 10%, ganhos reais e liberdade para trabalhar quando quiser.',
    images: ['/assets/Logotipo.png'],
  },
};

export default function MotoristaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
