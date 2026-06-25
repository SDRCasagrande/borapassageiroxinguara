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

  let trackingLinks: any[] = [];
  let totalClicks = 0;
  let dbError = false;

  try {
    for (const link of defaultLinks) {
      await prisma.trackingLink.upsert({
        where: { slug: link.slug },
        update: {},
        create: { slug: link.slug, destino: link.destino },
      });
    }

    // Busca estatísticas
    trackingLinks = await prisma.trackingLink.findMany({
      include: { _count: { select: { cliques: true } } },
      orderBy: { cliques: { _count: 'desc' } }
    });

    totalClicks = trackingLinks.reduce((acc, link) => acc + link._count.cliques, 0);
  } catch (error) {
    console.error("Erro de conexão com o Banco de Dados:", error);
    dbError = true;
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard de Rastreamento</h1>
            <p className="text-sm text-slate-500 mt-1">Visão geral dos downloads e acessos do aplicativo.</p>
          </div>
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
            Voltar ao Site
          </Link>
        </header>

        {/* Banner de Erro de Banco de Dados */}
        {dbError && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-4">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Shield className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-rose-800 font-semibold">Banco de Dados Offline</h3>
              <p className="text-rose-600/80 text-sm mt-1">
                A tela carregou, mas não pudemos buscar os links pois o seu banco de dados local não está rodando. 
                Ligue o servidor do banco (ex: <code>npx prisma dev</code>) e atualize a página.
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-sm font-medium text-slate-500">Total de Cliques</p>
                <h3 className="text-4xl font-bold text-slate-900 mt-2">{totalClicks}</h3>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-600 font-medium flex items-center">
                +12% 
              </span>
              <span className="text-slate-400 ml-2">desde o último mês</span>
            </div>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-600" /> 
              Rastreamento de Links
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-500">Link de Origem</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Destino Real</th>
                  <th className="px-6 py-4 font-medium text-slate-500 text-right">Cliques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trackingLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        /go/{link.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                      {link.destino}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      {link._count.cliques}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
