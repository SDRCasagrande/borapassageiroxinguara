export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { Link2, ExternalLink, BarChart3, Copy } from 'lucide-react';

export default async function AdminTrackingPage() {
  let trackingLinks: any[] = [];
  let dbError = false;

  try {
    trackingLinks = await prisma.trackingLink.findMany({
      include: { _count: { select: { cliques: true } } },
      orderBy: { createdAt: 'asc' },
    });
  } catch (error) {
    console.error("Erro no DB:", error);
    dbError = true;
  }

  const totalClicks = trackingLinks.reduce((acc: number, l: any) => acc + l._count.cliques, 0);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Link2 className="w-6 h-6 text-indigo-600" />
            Rastreamento de Links
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Links rastreáveis com contagem de cliques em tempo real. Use os slugs abaixo nas campanhas.
          </p>
        </header>

        {dbError && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl">
            <h3 className="text-rose-800 font-semibold">Banco de Dados Offline</h3>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{totalClicks}</p>
                <p className="text-xs text-slate-500 font-medium">Cliques Totais</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{trackingLinks.length}</p>
                <p className="text-xs text-slate-500 font-medium">Links Ativos</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{trackingLinks.length > 0 ? Math.round(totalClicks / trackingLinks.length) : 0}</p>
                <p className="text-xs text-slate-500 font-medium">Média/Link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-slate-700">Todos os Links</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-500">Slug</th>
                  <th className="px-6 py-4 font-medium text-slate-500">URL de Uso</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Destino</th>
                  <th className="px-6 py-4 font-medium text-slate-500 text-right">Cliques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trackingLinks.map((link: any) => (
                  <tr key={link.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 font-mono">
                        {link.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-slate-600 bg-gray-100 px-2 py-1 rounded-md font-mono">/go/{link.slug}</code>
                        <button title="Copiar" className="text-slate-400 hover:text-indigo-600 transition-colors">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate text-xs">{link.destino}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-slate-900 text-base">{link._count.cliques}</span>
                    </td>
                  </tr>
                ))}
                {trackingLinks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Nenhum link cadastrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-indigo-800 mb-2">Como usar?</h3>
          <p className="text-xs text-indigo-600/70">
            Use os links <code className="bg-indigo-100 px-1 rounded">/go/playstore</code>, <code className="bg-indigo-100 px-1 rounded">/go/appstore</code> e <code className="bg-indigo-100 px-1 rounded">/go/whatsapp</code> nas campanhas. 
            Cada clique é registrado automaticamente no banco de dados e aparece no dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
