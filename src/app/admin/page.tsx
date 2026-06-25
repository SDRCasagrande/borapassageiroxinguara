export const dynamic = 'force-dynamic';
import { PrismaClient } from '@prisma/client';
import { Shield, MousePointerClick, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

export default async function AdminPage() {
  // Inicialização automática dos links caso não existam
  const defaultLinks = [
    { slug: 'playstore', destino: 'https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&pcampaignid=web_share' },
    { slug: 'appstore', destino: 'https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558' },
    { slug: 'whatsapp', destino: 'https://wa.me/5594992777717?text=Oi%20Bora%20Passageiro' },
  ];

  for (const link of defaultLinks) {
    await prisma.trackingLink.upsert({
      where: { slug: link.slug },
      update: {}, // Não faz nada se já existe
      create: { slug: link.slug, destino: link.destino },
    });
  }

  // Busca estatísticas
  const trackingLinks = await prisma.trackingLink.findMany({
    include: {
      _count: {
        select: { cliques: true }
      }
    },
    orderBy: {
      cliques: {
        _count: 'desc'
      }
    }
  });

  const totalClicks = trackingLinks.reduce((acc, link) => acc + link._count.cliques, 0);

  return (
    <div className="min-h-screen bg-[#030712] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Painel Admin</h1>
              <p className="text-white/50">Visão Geral de Acessos e Cliques</p>
            </div>
          </div>
          <Link href="/" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all">
            Voltar ao Site
          </Link>
        </header>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0c1322] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <MousePointerClick className="w-24 h-24 text-cyan-500" />
            </div>
            <h3 className="text-white/60 font-medium mb-2 relative z-10">Total de Cliques nos Links</h3>
            <p className="text-6xl font-black text-white relative z-10">{totalClicks}</p>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-[#0c1322] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-cyan-400" /> 
              Rastreamento de Downloads
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-white/40 text-sm uppercase tracking-wider">
                    <th className="pb-4 font-medium">Link de Origem (Botão do Site)</th>
                    <th className="pb-4 font-medium">Destino Real (App Store/Play Store)</th>
                    <th className="pb-4 font-medium text-right">Cliques Registrados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {trackingLinks.map((link) => (
                    <tr key={link.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <span className="font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-lg">
                          /go/{link.slug}
                        </span>
                      </td>
                      <td className="py-4 text-white/60 text-sm max-w-xs truncate">
                        {link.destino}
                      </td>
                      <td className="py-4 text-right">
                        <span className="inline-flex items-center justify-center bg-white/5 font-bold text-xl px-4 py-1.5 rounded-xl border border-white/5 group-hover:border-white/20 transition-colors">
                          {link._count.cliques}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
