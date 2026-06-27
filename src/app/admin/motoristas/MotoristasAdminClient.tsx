"use client";

import { useState } from "react";
import { Users, Plus, Car, Trash2, RotateCcw, Shield, Edit2, Check, X, Save } from "lucide-react";
import Link from "next/link";

interface Motorista {
  id: string;
  nome: string;
  corridasMes: number;
  status: string;
  fotoUrl: string | null;
}

interface Props {
  motoristas: Motorista[];
  dbError: boolean;
  cadastrarMotorista: (formData: FormData) => Promise<void>;
  adicionarCorridas: (formData: FormData) => Promise<void>;
  alterarStatus: (formData: FormData) => Promise<void>;
  removerMotorista: (formData: FormData) => Promise<void>;
  zerarMes: () => Promise<void>;
  atualizarMotorista: (formData: FormData) => Promise<void>;
}

export function MotoristasAdminClient({
  motoristas, dbError,
  cadastrarMotorista, adicionarCorridas, removerMotorista, zerarMes, atualizarMotorista
}: Props) {
  const sorted = [...motoristas].sort((a, b) => b.corridasMes - a.corridasMes || a.nome.localeCompare(b.nome));
  const [editingId, setEditingId] = useState<string | null>(null);

  if (dbError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl">
        <h3 className="text-rose-800 font-semibold flex items-center gap-2"><Shield className="w-5 h-5" /> Banco de Dados Offline</h3>
        <p className="text-rose-600/80 text-sm mt-1">Ligue o banco de dados para gerenciar os motoristas.</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Tabela de Motoristas — Bora Pra Cima! 🚀
            </h1>
            <p className="text-sm text-slate-500 mt-1">Gerencie os perfis, lance corridas e acompanhe o ranking.</p>
          </div>
          <button
            type="button"
            onClick={async () => {
              if (confirm("⚠️ ZERAR todas as corridas do mês? Os motoristas continuam cadastrados, mas voltam para 0 corridas.")) {
                await zerarMes();
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-sm font-medium text-rose-700 hover:bg-rose-100 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Zerar Mês
          </button>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* TOPO: Adicionar Novo Motorista */}
          <div className="p-4 bg-slate-50 border-b border-gray-200">
            <form action={cadastrarMotorista} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Nome do Motorista *</label>
                <input name="nome" required placeholder="Ex.: Carlos Silva" maxLength={40} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
              </div>
              <div className="flex-1 w-full">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">URL da Foto (Opcional)</label>
                <input name="fotoUrl" placeholder="https://..." type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
              </div>
              <div className="w-full sm:w-40">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Etiqueta</label>
                <select name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                  <option value="ativo">🟢 Ativo</option>
                  <option value="alerta">🟠 Alerta</option>
                </select>
              </div>
              <button type="submit" className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-sm h-[38px]">
                <Plus className="w-4 h-4" /> Cadastrar
              </button>
            </form>
          </div>

          {/* TABELA */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-white border-b border-gray-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-16">Rank</th>
                  <th className="px-6 py-4">Motorista</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 w-64">Lançar Corridas</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Nenhum motorista cadastrado ainda.</td>
                  </tr>
                )}
                {sorted.map((m, i) => {
                  const isEditing = editingId === m.id;
                  
                  if (isEditing) {
                    return (
                      <tr key={m.id} className="bg-indigo-50/50">
                        <td className="px-6 py-4 font-mono font-bold text-slate-400">#{i + 1}</td>
                        <td colSpan={4} className="px-6 py-4">
                          <form action={async (fd) => {
                            await atualizarMotorista(fd);
                            setEditingId(null);
                          }} className="flex flex-col sm:flex-row gap-3 items-end">
                            <input type="hidden" name="id" value={m.id} />
                            <div className="flex-1">
                              <label className="text-xs font-semibold text-slate-500 mb-1 block">Nome</label>
                              <input name="nome" defaultValue={m.nome} required className="w-full border border-indigo-200 rounded-lg px-3 py-1.5 text-sm" />
                            </div>
                            <div className="flex-1">
                              <label className="text-xs font-semibold text-slate-500 mb-1 block">URL da Foto</label>
                              <input name="fotoUrl" defaultValue={m.fotoUrl || ""} type="url" className="w-full border border-indigo-200 rounded-lg px-3 py-1.5 text-sm" />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-500 mb-1 block">Status</label>
                              <select name="status" defaultValue={m.status} className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm">
                                <option value="ativo">🟢 Ativo</option>
                                <option value="alerta">🟠 Alerta</option>
                              </select>
                            </div>
                            <div className="flex gap-2 h-[34px]">
                              <button type="button" onClick={() => setEditingId(null)} className="px-3 py-1.5 border border-slate-300 bg-white text-slate-600 rounded-lg hover:bg-slate-50 text-xs font-medium flex items-center gap-1">
                                <X className="w-3.5 h-3.5" /> Cancelar
                              </button>
                              <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs font-medium flex items-center gap-1 shadow-sm">
                                <Save className="w-3.5 h-3.5" /> Salvar
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 font-mono font-bold text-slate-400">
                        {i === 0 ? '👑 #1' : i === 1 ? '🥈 #2' : i === 2 ? '🥉 #3' : `#${i + 1}`}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/motoristas/${m.id}`} className="flex items-center gap-3 hover:opacity-80">
                          <img src={m.fotoUrl || `https://i.pravatar.cc/150?u=${m.id}`} alt={m.nome} className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                          <div className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors">{m.nome}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${m.status === 'alerta' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'alerta' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                          {m.status === 'alerta' ? 'Alerta' : 'Ativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <form 
                          className="flex items-center gap-2"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const fd = new FormData(form);
                            const qtd = parseInt(fd.get("quantidade") as string, 10);
                            
                            // Cria um form fake pra chamar a action, pq a action original espera FormData
                            const fakeFd = new FormData();
                            fakeFd.append("motoristaId", m.id);
                            fakeFd.append("quantidade", qtd.toString());
                            await adicionarCorridas(fakeFd);
                            form.reset();
                          }}
                        >
                          <div className="font-black text-lg text-slate-800 w-12">{m.corridasMes}</div>
                          <input type="number" name="quantidade" min="1" defaultValue="1" required className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm text-center focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" />
                          <button type="submit" className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors border border-amber-200">
                            <Plus className="w-3.5 h-3.5" /> Lançar
                          </button>
                        </form>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingId(m.id)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Editar Nome/Foto">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <form action={async () => {
                            if (confirm(`Remover ${m.nome} do ranking permanentemente?`)) {
                              const fd = new FormData();
                              fd.append("motoristaId", m.id);
                              await removerMotorista(fd);
                            }
                          }}>
                            <button type="submit" className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Remover Motorista">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
