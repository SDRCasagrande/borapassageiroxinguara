export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { UserPlus, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default async function AdminLeadsPage() {
  let leads: any[] = [];
  let dbError = false;

  try {
    leads = await prisma.motoristaLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Erro no DB:", error);
    dbError = true;
  }

  const pendentes = leads.filter((l: any) => l.status === 'PENDENTE').length;
  const aprovados = leads.filter((l: any) => l.status === 'APROVADO').length;
  const rejeitados = leads.filter((l: any) => l.status === 'REJEITADO').length;

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-violet-600" />
            Pré-Cadastros de Motoristas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Motoristas que se cadastraram pelo formulário do site.
          </p>
        </header>

        {dbError && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl">
            <h3 className="text-rose-800 font-semibold">Banco de Dados Offline</h3>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{pendentes}</p>
                <p className="text-xs text-slate-500 font-medium">Pendentes</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{aprovados}</p>
                <p className="text-xs text-slate-500 font-medium">Aprovados</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{rejeitados}</p>
                <p className="text-xs text-slate-500 font-medium">Rejeitados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-500">Nome</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Telefone</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Cidade</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Veículo</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Nenhum pré-cadastro recebido ainda.
                    </td>
                  </tr>
                )}
                {leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{lead.nome}</td>
                    <td className="px-6 py-4 text-slate-600">{lead.telefone}</td>
                    <td className="px-6 py-4 text-slate-500">{lead.cidade || '—'}</td>
                    <td className="px-6 py-4 text-slate-500">{lead.veiculo || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                        ${lead.status === 'PENDENTE' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200' : 
                          lead.status === 'APROVADO' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 
                          'bg-rose-50 text-rose-600 ring-1 ring-rose-200'}
                      `}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
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
