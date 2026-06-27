"use client";

import { useState } from "react";
import { Users, Plus, Car, Trash2, RotateCcw, Shield, Edit2, Check, X, Save, AlertTriangle, Clock, Hash, CheckSquare } from "lucide-react";
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
  zerarMes: (nomeMes: string) => Promise<void>;
  atualizarMotorista: (formData: FormData) => Promise<void>;
}

export function MotoristasAdminClient({
  motoristas, dbError,
  cadastrarMotorista, adicionarCorridas, removerMotorista, zerarMes, atualizarMotorista
}: Props) {
  const sorted = [...motoristas].sort((a, b) => b.corridasMes - a.corridasMes || a.nome.localeCompare(b.nome));
  const [editingId, setEditingId] = useState<string | null>(null);

  // Modals State
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; motorista: Motorista | null }>({ isOpen: false, motorista: null });
  const [fechamentoModal, setFechamentoModal] = useState(false);
  const [nomeFechamento, setNomeFechamento] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lancamentoModal, setLancamentoModal] = useState<{ isOpen: boolean; motorista: Motorista | null }>({ isOpen: false, motorista: null });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  
  // Novos Modals para Ações em Lote
  const [bulkLancamentoModal, setBulkLancamentoModal] = useState(false);
  const [bulkCadastroModal, setBulkCadastroModal] = useState(false);
  const [bulkCadastroNomes, setBulkCadastroNomes] = useState("");

  const allSelected = sorted.length > 0 && selectedIds.size === sorted.length;
  const someSelected = selectedIds.size > 0;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sorted.map(m => m.id)));
    }
  };

  const handleBulkDelete = async () => {
    setIsProcessing(true);
    try {
      for (const id of selectedIds) {
        const fd = new FormData();
        fd.append("motoristaId", id);
        await removerMotorista(fd);
      }
      setSelectedIds(new Set());
      setBulkDeleteModal(false);
    } catch (e) {
      alert("Erro ao remover motoristas.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (dbError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl">
        <h3 className="text-rose-800 font-semibold flex items-center gap-2"><Shield className="w-5 h-5" /> Banco de Dados Offline</h3>
        <p className="text-rose-600/80 text-sm mt-1">Ligue o banco de dados para gerenciar os motoristas.</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!deleteModal.motorista) return;
    setIsProcessing(true);
    try {
      const fd = new FormData();
      fd.append("motoristaId", deleteModal.motorista.id);
      await removerMotorista(fd);
      setDeleteModal({ isOpen: false, motorista: null });
    } catch (e) {
      alert("Erro ao remover o motorista.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFechamento = async () => {
    if (!nomeFechamento.trim()) return;
    setIsProcessing(true);
    try {
      await zerarMes(nomeFechamento);
      setFechamentoModal(false);
      setNomeFechamento("");
      window.location.reload();
    } catch (e) {
      alert("Erro ao fechar o mês.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full pb-12 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Tabela de Motoristas — Bora Pra Cima! 🚀
            </h1>
            <p className="text-sm text-slate-500 mt-1">Gerencie os perfis, lance corridas e acompanhe o ranking.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBulkCadastroModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all shadow-sm hover:shadow"
            >
              <Users className="w-4 h-4" /> Cadastro Rápido (Lote)
            </button>
            <button
              type="button"
              onClick={() => setFechamentoModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-sm font-medium text-rose-700 hover:bg-rose-100 transition-all shadow-sm hover:shadow"
            >
              <RotateCcw className="w-4 h-4" /> Fechar Mês
            </button>
          </div>
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
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Foto (Opcional)</label>
                <input name="foto" type="file" accept="image/*" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white" />
              </div>
              <div className="w-full sm:w-40">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Etiqueta</label>
                <select name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                  <option value="ativo">🟢 Ativo</option>
                  <option value="alerta">🟠 Alerta</option>
                </select>
              </div>
              <button type="submit" className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-sm h-[38px] shadow-sm">
                <Plus className="w-4 h-4" /> Cadastrar
              </button>
            </form>
          </div>

          {/* TABELA */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-white border-b border-gray-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-3 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 w-16">Rank</th>
                  <th className="px-6 py-4">Motorista</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 w-64">Lançar Corridas</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">Nenhum motorista cadastrado ainda.</td>
                  </tr>
                )}
                {sorted.map((m, i) => {
                  const isEditing = editingId === m.id;
                  
                  if (isEditing) {
                    return (
                      <tr key={m.id} className="bg-indigo-50/50">
                        <td className="px-3 py-4" />
                        <td className="px-4 py-4 font-mono font-bold text-slate-400">#{i + 1}</td>
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
                              <label className="text-xs font-semibold text-slate-500 mb-1 block">Nova Foto</label>
                              <input name="foto" type="file" accept="image/*" className="w-full border border-indigo-200 rounded-lg px-3 py-1 text-sm bg-white" />
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
                    <tr key={m.id} className={`hover:bg-slate-50 transition-colors group ${selectedIds.has(m.id) ? 'bg-indigo-50/40' : ''}`}>
                      <td className="px-3 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(m.id)}
                          onChange={() => toggleSelect(m.id)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-4 font-mono font-bold text-slate-400">
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
                        <div className="flex items-center gap-2">
                          <div className="font-black text-lg text-slate-800 w-12 text-right mr-2">{m.corridasMes}</div>
                          <button 
                            type="button"
                            onClick={() => setLancamentoModal({ isOpen: true, motorista: m })}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors border border-amber-200 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" /> Lançar
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingId(m.id)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Editar Nome/Foto">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => setDeleteModal({ isOpen: true, motorista: m })} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Remover Motorista">
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* BULK ACTION BAR */}
      {someSelected && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl px-6 py-3 flex items-center gap-4" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold">{selectedIds.size}</span>
            <span className="text-slate-300 text-sm">selecionado{selectedIds.size > 1 ? 's' : ''}</span>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <button
            type="button"
            onClick={() => setBulkLancamentoModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Car className="w-4 h-4" /> Lançar em Lote
          </button>
          <button
            type="button"
            onClick={() => setBulkDeleteModal(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ml-auto"
          >
            <Trash2 className="w-4 h-4" /> Apagar Selecionados
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* BULK DELETE MODAL */}
      {bulkDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 text-rose-600 mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Apagar em Massa</h3>
                <p className="text-sm text-slate-500">Esta ação não pode ser desfeita.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-slate-700">Você está prestes a remover permanentemente <strong className="text-rose-600">{selectedIds.size} motorista{selectedIds.size > 1 ? 's' : ''}</strong> do sistema.</p>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-6 max-h-40 overflow-y-auto">
              <ul className="space-y-1">
                {sorted.filter(m => selectedIds.has(m.id)).map(m => (
                  <li key={m.id} className="text-sm text-rose-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full flex-shrink-0" />
                    {m.nome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setBulkDeleteModal(false)}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleBulkDelete}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isProcessing ? 'Removendo...' : `Sim, apagar ${selectedIds.size}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal.isOpen && deleteModal.motorista && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 text-rose-600 mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Remover Motorista</h3>
                <p className="text-sm text-slate-500">Esta ação não pode ser desfeita.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
              Você está prestes a remover permanentemente o motorista <strong className="text-slate-900">{deleteModal.motorista.nome}</strong>. O histórico de corridas dele continuará nos relatórios antigos, mas ele sairá do ranking atual.
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setDeleteModal({ isOpen: false, motorista: null })}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isProcessing ? 'Removendo...' : 'Sim, remover agora'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FECHAMENTO MODAL */}
      {fechamentoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 text-indigo-600 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Save className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Fechamento Mensal</h3>
                <p className="text-sm text-slate-500">Salvar histórico e zerar corridas.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-slate-600 mb-4">
                Digite um nome para identificar este relatório. O ranking atual será salvo permanentemente na página de Relatórios e as corridas de todos os motoristas voltarão para 0.
              </p>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nome do Relatório *</label>
              <input 
                type="text" 
                value={nomeFechamento}
                onChange={(e) => setNomeFechamento(e.target.value)}
                placeholder="Ex.: Junho 2026" 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => { setFechamentoModal(false); setNomeFechamento(""); }}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleFechamento}
                disabled={!nomeFechamento.trim() || isProcessing}
                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:bg-indigo-400 flex items-center gap-2"
              >
                {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {isProcessing ? 'Processando...' : 'Confirmar Fechamento'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LANCAMENTO MODAL */}
      {lancamentoModal.isOpen && lancamentoModal.motorista && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 text-amber-600 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Lançar Corridas</h3>
                <p className="text-sm text-slate-500">{lancamentoModal.motorista.nome}</p>
              </div>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsProcessing(true);
              try {
                const form = e.currentTarget;
                const fd = new FormData();
                const qtd = (form.querySelector('[name=quantidade]') as HTMLInputElement).value;
                const idExt = (form.querySelector('[name=idExterna]') as HTMLInputElement).value;
                const hora = (form.querySelector('[name=horaCorrida]') as HTMLInputElement).value;
                fd.append('motoristaId', lancamentoModal.motorista!.id);
                fd.append('quantidade', qtd);
                if (idExt) fd.append('idExterna', idExt);
                if (hora) fd.append('horaCorrida', hora);
                await adicionarCorridas(fd);
                setLancamentoModal({ isOpen: false, motorista: null });
              } catch (err) {
                alert('Erro ao lançar corridas.');
              } finally {
                setIsProcessing(false);
              }
            }}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Quantidade de Corridas *</label>
                  <input type="number" name="quantidade" min="1" defaultValue="1" required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" autoFocus />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-slate-400" /> ID da Corrida <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input type="text" name="idExterna" placeholder="Ex.: COR-20260627-001" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Hora da Corrida <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input type="datetime-local" name="horaCorrida" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setLancamentoModal({ isOpen: false, motorista: null })}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-bold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  {isProcessing ? 'Lançando...' : 'Confirmar Lançamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK LANCAMENTO MODAL */}
      {bulkLancamentoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 text-amber-600 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Lançamento em Lote</h3>
                <p className="text-sm text-slate-500">Adicionar corridas para {selectedIds.size} motoristas.</p>
              </div>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsProcessing(true);
              try {
                const form = e.currentTarget;
                const qtd = (form.querySelector('[name=quantidade]') as HTMLInputElement).value;
                const idExt = (form.querySelector('[name=idExterna]') as HTMLInputElement).value;
                const hora = (form.querySelector('[name=horaCorrida]') as HTMLInputElement).value;
                
                for (const id of selectedIds) {
                  const fd = new FormData();
                  fd.append('motoristaId', id);
                  fd.append('quantidade', qtd);
                  if (idExt) fd.append('idExterna', idExt);
                  if (hora) fd.append('horaCorrida', hora);
                  await adicionarCorridas(fd);
                }
                
                setSelectedIds(new Set());
                setBulkLancamentoModal(false);
              } catch (err) {
                alert('Erro ao lançar corridas em lote.');
              } finally {
                setIsProcessing(false);
              }
            }}>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
                <ul className="space-y-1">
                  {sorted.filter(m => selectedIds.has(m.id)).map(m => (
                    <li key={m.id} className="text-xs text-amber-800 font-medium">{m.nome}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Quantidade por Motorista *</label>
                  <input type="number" name="quantidade" min="1" defaultValue="1" required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" autoFocus />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-slate-400" /> ID da Corrida <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input type="text" name="idExterna" placeholder="Opcional" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setBulkLancamentoModal(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-bold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  {isProcessing ? 'Lançando...' : `Confirmar Lançamento`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK CADASTRO MODAL */}
      {bulkCadastroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 text-indigo-600 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Cadastro Rápido (Lote)</h3>
                <p className="text-sm text-slate-500">Cole uma lista de nomes para cadastrá-los.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-slate-600 mb-2">
                Digite ou cole os nomes dos motoristas (um por linha). Todos serão criados com status <span className="font-semibold text-emerald-600">Ativo</span> e 0 corridas.
              </p>
              <textarea 
                value={bulkCadastroNomes}
                onChange={(e) => setBulkCadastroNomes(e.target.value)}
                placeholder="Exemplo:&#10;João da Silva&#10;Maria Souza&#10;Carlos Oliveira"
                rows={6}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none bg-slate-50"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                type="button"
                onClick={() => { setBulkCadastroModal(false); setBulkCadastroNomes(""); }}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={async () => {
                  const nomes = bulkCadastroNomes.split('\n').map(n => n.trim()).filter(n => n.length > 0);
                  if (nomes.length === 0) return;
                  
                  setIsProcessing(true);
                  try {
                    for (const nome of nomes) {
                      const fd = new FormData();
                      fd.append('nome', nome);
                      fd.append('status', 'ativo');
                      await cadastrarMotorista(fd);
                    }
                    setBulkCadastroModal(false);
                    setBulkCadastroNomes("");
                  } catch (err) {
                    alert('Erro ao cadastrar motoristas.');
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                disabled={!bulkCadastroNomes.trim() || isProcessing}
                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:bg-indigo-400 flex items-center gap-2"
              >
                {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isProcessing ? 'Processando...' : 'Cadastrar Motoristas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
