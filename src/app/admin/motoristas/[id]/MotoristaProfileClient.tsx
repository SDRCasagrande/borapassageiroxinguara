'use client';

import { ArrowLeft, Car, Calendar, Activity, CheckCircle2, User, Phone, MapPin, Hash, Save, RotateCcw, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Corrida {
  id: string;
  data: Date;
}

interface Motorista {
  id: string;
  nome: string;
  telefone: string | null;
  veiculo: string | null;
  cnh: string | null;
  cidade: string | null;
  corridasMes: number;
  status: string;
  fotoUrl: string | null;
  corridas?: Corrida[];
}

export function MotoristaProfileClient({ 
  motorista, 
  adicionarCorridas,
  atualizarMotorista
}: { 
  motorista: Motorista;
  adicionarCorridas: (motoristaId: string, quantidade: number) => Promise<void>;
  atualizarMotorista: (formData: FormData) => Promise<void>;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lancamentoQtd, setLancamentoQtd] = useState(1);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-8">
        <Link href="/admin/motoristas" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar para Motoristas
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={motorista.fotoUrl || `https://i.pravatar.cc/150?u=${motorista.id}`} 
              alt={motorista.nome} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{motorista.nome}</h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${motorista.status === 'alerta' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${motorista.status === 'alerta' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                  {motorista.status === 'alerta' ? 'Em Alerta' : 'Ativo'}
                </span>
                <span className="text-slate-500 text-sm font-mono">
                  ID: {motorista.id.split('-')[0]}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between w-64">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Corridas no Mês</p>
              <h2 className="text-4xl font-black text-slate-900">{motorista.corridasMes}</h2>
            </div>
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Car className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[1fr_350px] gap-6">
        
        {/* Esquerda: Editar Dados e Histórico */}
        <div className="space-y-6">
          
          {/* Formulário de Edição */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" /> Dados do Motorista
              </h3>
            </div>
            <form 
              action={async (fd) => {
                setIsProcessing(true);
                try {
                  fd.append('id', motorista.id);
                  await atualizarMotorista(fd);
                  alert('Dados atualizados com sucesso!');
                } catch (e) {
                  alert('Erro ao atualizar motorista.');
                } finally {
                  setIsProcessing(false);
                }
              }}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Nome Completo *</label>
                  <input name="nome" defaultValue={motorista.nome} required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><Phone className="w-3.5 h-3.5"/> Telefone</label>
                  <input name="telefone" defaultValue={motorista.telefone || ''} placeholder="(99) 99999-9999" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                  <select name="status" defaultValue={motorista.status} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white">
                    <option value="ativo">🟢 Ativo</option>
                    <option value="alerta">🟠 Em Alerta</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><Hash className="w-3.5 h-3.5"/> CNH (Carteira)</label>
                  <input name="cnh" defaultValue={motorista.cnh || ''} placeholder="Nº de Registro" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><Car className="w-3.5 h-3.5"/> Veículo</label>
                  <input name="veiculo" defaultValue={motorista.veiculo || ''} placeholder="Modelo / Placa" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Cidade base</label>
                  <input name="cidade" defaultValue={motorista.cidade || ''} placeholder="Sua cidade" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">Nova Foto de Perfil</label>
                  <input name="foto" type="file" accept="image/*" className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white" />
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-sm transition-all text-sm flex items-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isProcessing ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>

          {/* Histórico de Corridas Recentes */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" /> Histórico Recente (Top 50)
              </h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {motorista.corridas?.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm">Nenhuma corrida registrada neste mês.</div>
              )}
              {motorista.corridas?.map((corrida, i) => (
                <div key={corrida.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Lote #{motorista.corridas!.length - i}</p>
                      <p className="text-xs text-slate-400 font-mono text-ellipsis overflow-hidden w-32 whitespace-nowrap">ID: {corrida.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 font-medium">
                      {new Date(corrida.data).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(corrida.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Direita: Formulário de Adicionar Corridas */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-fit sticky top-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-amber-50/30">
            <h3 className="font-semibold text-amber-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" /> Lançar Corridas
            </h3>
          </div>
          <form 
            action={async (fd) => {
              setIsProcessing(true);
              try {
                // We use the same server action pattern but for profile context, it's safer to use a full formData to allow `idExterna` and `horaCorrida` correctly if we had them. But since we use the profile-specific action, let's call `adicionarCorridas`.
                const qtde = parseInt(fd.get('quantidade') as string, 10);
                await adicionarCorridas(motorista.id, qtde);
                setLancamentoQtd(1);
                alert(`${qtde} corridas adicionadas com sucesso!`);
              } catch (e) {
                alert('Erro ao adicionar corridas.');
              } finally {
                setIsProcessing(false);
              }
            }}
            className="p-6 space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Quantidade de Corridas</label>
              <input 
                name="quantidade" 
                type="number" 
                min="1" 
                value={lancamentoQtd}
                onChange={(e) => setLancamentoQtd(Number(e.target.value) || 1)}
                required 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-bold"
              />
            </div>
            
            {lancamentoQtd === 1 ? (
              <div className="space-y-4">
                {/* Visual indicator for single launch, but currently the profile action only takes (id, qtde). If we want to support external ID in profile, we should use the main action, but we are using `adicionarCorridasProfile` here which just takes id and qtde. Let's keep it simple. */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500">
                  <p>A corrida será registrada com o horário de agora.</p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl text-xs">
                <strong>Lançamento em Lote:</strong> As {lancamentoQtd} corridas serão registradas com a data e hora atuais.
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-sm transition-all text-sm flex items-center justify-center gap-2"
            >
              {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isProcessing ? 'Adicionando...' : 'Adicionar Corridas'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
