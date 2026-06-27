export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { UserPlus, CheckCircle2, XCircle, Clock, MessageCircle, CreditCard } from 'lucide-react';
import LeadsAdminClient from './LeadsAdminClient';

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
        <header className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-violet-600" />
            Pré-Cadastros de Motoristas
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Motoristas que se cadastraram pelo formulário do site.
          </p>
        </header>

        {dbError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl">
            <h3 className="text-rose-800 font-semibold text-sm">Banco de Dados Offline</h3>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{pendentes}</p>
                <p className="text-[10px] text-slate-500 font-medium">Pendentes</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{aprovados}</p>
                <p className="text-[10px] text-slate-500 font-medium">Aprovados</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-rose-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{rejeitados}</p>
                <p className="text-[10px] text-slate-500 font-medium">Rejeitados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <LeadsAdminClient leads={JSON.parse(JSON.stringify(leads))} />
      </div>
    </div>
  );
}
