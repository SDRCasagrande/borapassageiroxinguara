'use client';

import { useState } from 'react';
import { Gift, Plus, Search, Trash2, Edit2, RotateCcw, Save, X, ExternalLink, Link2, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface Banner {
  id: string;
  titulo: string;
  descricao: string | null;
  link: string;
  codigo: string | null;
  ativo: boolean;
  createdAt: Date;
}

interface Props {
  banners: Banner[];
  dbError: boolean;
  criarBanner: (formData: FormData) => Promise<void>;
  atualizarBanner: (formData: FormData) => Promise<void>;
  alterarStatusBanner: (id: string, ativo: boolean) => Promise<void>;
  removerBanner: (id: string) => Promise<void>;
}

export function BannersClient({ banners, dbError, criarBanner, atualizarBanner, alterarStatusBanner, removerBanner }: Props) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredBanners = banners.filter(b => 
    b.titulo.toLowerCase().includes(search.toLowerCase()) || 
    b.codigo?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {dbError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-6">
          <p className="font-bold">Erro de conexão</p>
          <p className="text-sm">Não foi possível carregar os banners do banco de dados.</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Gift className="w-8 h-8 text-indigo-500" /> Promoções & Banners
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gerencie os banners e cupons que aparecem no site para os clientes.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBanner(null);
            setModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm transition-all text-sm flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
        >
          <Plus className="w-4 h-4" /> Nova Promoção
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título ou código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Banners List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanners.map(banner => (
          <div key={banner.id} className={`bg-white rounded-2xl border ${banner.ativo ? 'border-emerald-500/30 shadow-md shadow-emerald-500/5' : 'border-gray-200 shadow-sm opacity-60'} overflow-hidden flex flex-col transition-all`}>
            {/* Card Header */}
            <div className={`px-5 py-4 border-b ${banner.ativo ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 border-gray-100'} flex items-start justify-between gap-4`}>
              <div>
                <h3 className="font-bold text-slate-800 leading-tight">{banner.titulo}</h3>
                {banner.codigo && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white border border-gray-200 shadow-sm text-xs font-mono font-bold text-indigo-600">
                    <Gift className="w-3 h-3 text-indigo-400" />
                    {banner.codigo}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={async () => {
                    if (confirm(`Deseja ${banner.ativo ? 'desativar' : 'ativar'} esta promoção?`)) {
                      await alterarStatusBanner(banner.id, !banner.ativo);
                    }
                  }}
                  className={`text-xs font-bold px-2 py-1 rounded transition-colors ${banner.ativo ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {banner.ativo ? 'Ativo' : 'Inativo'}
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                {banner.descricao || <span className="italic opacity-50">Sem descrição...</span>}
              </p>
              
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center justify-between gap-2 mb-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Link de Destino</p>
                  <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline truncate block">
                    {banner.link}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(banner.link, banner.id)}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-slate-500 shrink-0"
                  title="Copiar Link"
                >
                  {copiedId === banner.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setEditingBanner(banner);
                    setModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={async () => {
                    if (confirm('Tem certeza que deseja EXCLUIR este banner permanentemente?')) {
                      await removerBanner(banner.id);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredBanners.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Nenhuma promoção encontrada.
          </div>
        )}
      </div>

      {/* Modal Criar/Editar */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Gift className="w-5 h-5 text-indigo-500" />
                {editingBanner ? 'Editar Promoção' : 'Nova Promoção'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form action={async (fd) => {
              setIsProcessing(true);
              try {
                if (editingBanner) {
                  fd.append('id', editingBanner.id);
                  await atualizarBanner(fd);
                } else {
                  await criarBanner(fd);
                }
                setModalOpen(false);
              } catch (err) {
                alert('Erro ao salvar promoção.');
              } finally {
                setIsProcessing(false);
              }
            }}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Título da Promoção *</label>
                  <input 
                    type="text" 
                    name="titulo" 
                    required 
                    defaultValue={editingBanner?.titulo}
                    placeholder="Ex: Ganhe R$ 5,00 na 1ª Corrida" 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição</label>
                  <textarea 
                    name="descricao" 
                    rows={3}
                    defaultValue={editingBanner?.descricao || ''}
                    placeholder="Ex: Baixe o app agora e cadastre-se para ganhar R$ 5,00 em bônus!" 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-indigo-500" /> Código de Indicação (Opcional)
                  </label>
                  <input 
                    type="text" 
                    name="codigo" 
                    defaultValue={editingBanner?.codigo || ''}
                    placeholder="Ex: CCSSM376920" 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none uppercase" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5 text-slate-500" /> Link de Destino (Botão) *
                  </label>
                  <input 
                    type="url" 
                    name="link" 
                    required 
                    defaultValue={editingBanner?.link}
                    placeholder="https://paineladmin3.azurewebsites.net/..." 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
                <button 
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isProcessing ? 'Salvando...' : 'Salvar Promoção'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
