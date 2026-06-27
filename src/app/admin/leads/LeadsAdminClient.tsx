'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, MessageCircle, Trash2, CreditCard } from 'lucide-react';

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  cidade?: string;
  veiculo?: string;
  categoriaCnh?: string;
  status: string;
  createdAt: string;
}

export default function LeadsAdminClient({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [loading, setLoading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setLoading(id);
    try {
      const res = await fetch('/api/motorista-lead/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const deleteLead = async (id: string) => {
    setLoading(id);
    try {
      const res = await fetch('/api/motorista-lead/status', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
      setConfirmDelete(null);
    }
  };

  const formatPhone = (phone: string) => {
    const d = phone.replace(/\D/g, '');
    if (d.length === 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    return phone;
  };

  const statusColor = (status: string) => {
    if (status === 'APROVADO') return 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200';
    if (status === 'REJEITADO') return 'bg-rose-50 text-rose-600 ring-1 ring-rose-200';
    return 'bg-amber-50 text-amber-600 ring-1 ring-amber-200';
  };

  return (
    <>
      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Excluir pré-cadastro?</h3>
            <p className="text-sm text-slate-500 mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-slate-600 text-sm font-medium hover:bg-gray-50">
                Cancelar
              </button>
              <button onClick={() => deleteLead(confirmDelete)} className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-500">Nome</th>
                <th className="px-4 py-3 font-medium text-slate-500">Telefone</th>
                <th className="px-4 py-3 font-medium text-slate-500">CNH</th>
                <th className="px-4 py-3 font-medium text-slate-500">Cidade</th>
                <th className="px-4 py-3 font-medium text-slate-500">Veículo</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 font-medium text-slate-500">Data</th>
                <th className="px-4 py-3 font-medium text-slate-500 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                    Nenhum pré-cadastro recebido ainda.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className={`hover:bg-gray-50/50 transition-colors ${loading === lead.id ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3 font-medium text-slate-900">{lead.nome}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <a href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {formatPhone(lead.telefone)}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {lead.categoriaCnh ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 text-[10px] font-bold">
                        <CreditCard className="w-3 h-3" />
                        {lead.categoriaCnh}
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{lead.cidade || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{lead.veiculo || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {lead.status !== 'APROVADO' && (
                        <button
                          onClick={() => updateStatus(lead.id, 'APROVADO')}
                          title="Aprovar"
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {lead.status !== 'REJEITADO' && (
                        <button
                          onClick={() => updateStatus(lead.id, 'REJEITADO')}
                          title="Rejeitar"
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <a
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.nome.split(' ')[0]}! Somos da equipe Bora Passageiro. Recebemos seu pré-cadastro como motorista e gostaríamos de conversar sobre os próximos passos.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setConfirmDelete(lead.id)}
                        title="Excluir"
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
