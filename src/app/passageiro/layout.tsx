import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bora Passageiro — Peça sua corrida em Xinguara',
  description: 'Solicite corridas rápidas e seguras em Xinguara e região do Xingu. Motoristas verificados, preço justo e app disponível para Android e iOS.',
  openGraph: {
    title: 'Bora Passageiro — Peça sua corrida em Xinguara',
    description: 'Solicite corridas rápidas e seguras em Xinguara e região do Xingu.',
    images: ['/assets/Logotipo.png'],
  },
};

export default function PassageiroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
