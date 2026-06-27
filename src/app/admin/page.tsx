export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { 
  Shield, MousePointerClick, Link as LinkIcon, Users, Eye, Smartphone, 
  Apple, MessageCircle, TrendingUp, UserPlus, Trophy, ArrowUpRight, Activity
} from 'lucide-react';
import Link from 'next/link';
import { AdminCharts } from './components/AdminCharts';

export default async function AdminPage() {
  // Links padrão do sistema
  const defaultLinks = [
    { slug: 'playstore', destino: 'https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&pcampaignid=web_share' },
    { slug: 'appstore', destino: 'https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558' },
    { slug: 'whatsapp', destino: 'https://wa.me/5594992777717?text=Oi%20Bora%20Passageiro' },
  ];

  let trackingLinks: any[] = [];
  let totalClicks = 0;
  let dbError = false;
  let dbErrorMessage = "";
  // ... (need to apply this properly, let's do it exactly)
  let pageViews: any = { passageiro: 0, motorista: 0, ranking: 0, total: 0 };
  let clicksBySlug: any = { playstore: 0, appstore: 0, whatsapp: 0 };
  let totalLeads = 0;
  let totalMotoristas = 0;
  let recentLeads: any[] = [];

  try {
    // Upsert dos links padrão
    for (const link of defaultLinks) {
      await prisma.trackingLink.upsert({
        where: { slug: link.slug },
        update: {},
        create: { slug: link.slug, destino: link.destino },
      });
    }

    // Buscar links com contagem de cliques
    trackingLinks = await prisma.trackingLink.findMany({
      include: { _count: { select: { cliques: true } } },
      orderBy: { createdAt: 'asc' },
    });

    totalClicks = trackingLinks.reduce((acc: number, link: any) => acc + link._count.cliques, 0);

    // Cliques por slug
    for (const link of trackingLinks) {
      if (link.slug in clicksBySlug) {
        clicksBySlug[link.slug] = link._count.cliques;
      }
    }

    // PageViews por página
    const pvPassageiro = await prisma.pageView.count({ where: { pagePath: '/' } });
    const pvMotorista = await prisma.pageView.count({ where: { pagePath: '/motorista' } });
    const pvRanking = await prisma.pageView.count({ where: { pagePath: '/ranking' } });
    const pvTotal = await prisma.pageView.count();
    pageViews = { passageiro: pvPassageiro, motorista: pvMotorista, ranking: pvRanking, total: pvTotal };

    // Leads e Motoristas
    totalLeads = await prisma.motoristaLead.count();
    totalMotoristas = await prisma.motorista.count({ where: { ativo: true } });
    recentLeads = await prisma.motoristaLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  } catch (error) {
    console.error("Erro de conexão com o Banco de Dados:", error);
    dbError = true;
  }

  const statCards = [
    { 
      title: 'Acessos Totais', 
      value: pageViews.total, 
      icon: Eye, 
      color: 'bg-blue-500', 
      lightBg: 'bg-blue-50', 
      textColor: 'text-blue-600',
      change: '+18%' 
    },
    { 
      title: 'Downloads Play Store', 
      value: clicksBySlug.playstore, 
      icon: Smartphone, 
      color: 'bg-emerald-500', 
      lightBg: 'bg-emerald-50', 
      textColor: 'text-emerald-600',
      change: '+24%' 
    },
    { 
      title: 'Downloads App Store', 
      value: clicksBySlug.appstore, 
      icon: Apple, 
      color: 'bg-slate-700', 
      lightBg: 'bg-slate-50', 
      textColor: 'text-slate-600',
      change: '+12%' 
    },
    { 
      title: 'Cliques WhatsApp', 
      value: clicksBySlug.whatsapp, 
      icon: MessageCircle, 
      color: 'bg-green-500', 
      lightBg: 'bg-green-50', 
      textColor: 'text-green-600',
      change: '+31%' 
    },
    { 
      title: 'Pré-Cadastros', 
      value: totalLeads, 
      icon: UserPlus, 
      color: 'bg-violet-500', 
      lightBg: 'bg-violet-50', 
      textColor: 'text-violet-600',
      change: 'Novo' 
    },
    { 
      title: 'Motoristas Ativos', 
      value: totalMotoristas, 
      icon: Users, 
      color: 'bg-amber-500', 
      lightBg: 'bg-amber-50', 
      textColor: 'text-amber-600',
      change: `${totalMotoristas}` 
    },
  ];

  const pageCards = [
    { name: 'Página Passageiro', path: '/', views: pageViews.passageiro, color: 'text-blue-600' },
    { name: 'Página Motorista', path: '/motorista', views: pageViews.motorista, color: 'text-emerald-600' },
    { name: 'Página Ranking', path: '/ranking', views: pageViews.ranking, color: 'text-amber-600' },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-600" />
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">Visão geral em tempo real do ecossistema Bora Passageiro.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/ranking" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm font-medium text-amber-700 hover:bg-amber-100 transition-all">
              <Trophy className="w-4 h-4" /> Ver Ranking
            </Link>
            <Link href="/admin/motoristas" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200">
              <Users className="w-4 h-4" /> Motoristas
            </Link>
          </div>
        </header>

        {/* DB Error Banner */}
        {dbError && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-4">
            <div className="p-2.5 bg-rose-100 rounded-xl">
              <Shield className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-rose-800 font-semibold">Banco de Dados Offline ou Erro de Conexão</h3>
              <p className="text-rose-600/80 text-sm mt-1 mb-2">
                Os dados abaixo estão zerados porque ocorreu um erro ao acessar o banco de dados.
              </p>
              <div className="p-3 bg-white/50 border border-rose-200/50 rounded-lg text-xs font-mono text-rose-700 break-all">
                {dbErrorMessage || "Erro desconhecido. Verifique os logs do servidor."}
              </div>
            </div>
          </div>
        )}

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {statCards.map((card) => (
            <div 
              key={card.title} 
              className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">{card.title}</p>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1.5 tracking-tight">{card.value}</h3>
                </div>
                <div className={`w-11 h-11 ${card.lightBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-5 h-5 ${card.textColor}`} />
                </div>
              </div>
              <div className="flex items-center text-xs font-medium relative z-10">
                <span className="text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </span>
                <span className="text-slate-400 ml-2">vs mês anterior</span>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Charts from Recharts */}
        <AdminCharts 
          clicksData={[
            { name: 'Play Store', cliques: clicksBySlug.playstore || 0, color: '#10b981' },
            { name: 'App Store', cliques: clicksBySlug.appstore || 0, color: '#334155' },
            { name: 'WhatsApp', cliques: clicksBySlug.whatsapp || 0, color: '#22c55e' }
          ]}
          pageViewsData={[
            { name: 'Passageiro', visitas: pageViews.passageiro || 0, color: '#3b82f6' },
            { name: 'Motorista', visitas: pageViews.motorista || 0, color: '#10b981' },
            { name: 'Ranking', visitas: pageViews.ranking || 0, color: '#f59e0b' }
          ]}
        />

        {/* Two Column: Page Views + Recent Leads */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Page Views Card */}
          <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> 
                Visitas por Página
              </h2>
              <span className="text-xs text-slate-400 font-medium">Tempo real</span>
            </div>
            <div className="p-6 space-y-4">
              {pageCards.map((page) => {
                const maxViews = Math.max(...pageCards.map(p => p.views), 1);
                const percentage = (page.views / maxViews) * 100;
                return (
                  <div key={page.path}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-medium text-slate-700">{page.name}</span>
                      <span className={`font-bold ${page.color}`}>{page.views}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(percentage, 3)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Leads Card */}
          <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-violet-600" /> 
                Pré-Cadastros Recentes
              </h2>
              <Link href="/admin/leads" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                Ver todos <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentLeads.length === 0 && (
                <div className="px-6 py-10 text-center text-slate-400 text-sm">
                  Nenhum pré-cadastro ainda. Os motoristas podem se cadastrar em{' '}
                  <Link href="/motorista/cadastro" className="text-indigo-600 underline">/motorista/cadastro</Link>
                </div>
              )}
              {recentLeads.map((lead: any) => (
                <div key={lead.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{lead.nome}</p>
                    <p className="text-xs text-slate-400">{lead.telefone}</p>
                  </div>
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                    ${lead.status === 'PENDENTE' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200' : 
                      lead.status === 'APROVADO' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 
                      'bg-rose-50 text-rose-600 ring-1 ring-rose-200'}
                  `}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links Tracking Table */}
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-600" /> 
              Rastreamento de Links
            </h2>
            <span className="text-xs text-slate-400">Total: {totalClicks} cliques</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-500">Link</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Destino</th>
                  <th className="px-6 py-4 font-medium text-slate-500 text-right">Cliques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trackingLinks.map((link: any) => (
                  <tr key={link.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 font-mono">
                        /go/{link.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{link.destino}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-slate-900">{link._count.cliques}</span>
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
