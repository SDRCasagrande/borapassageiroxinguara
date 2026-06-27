'use client';

import { ArrowLeft, Car, Calendar, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface Corrida {
  id: string;
  data: Date;
}

interface Motorista {
  id: string;
  nome: string;
  corridasMes: number;
  status: string;
  fotoUrl: string | null;
  corridas?: Corrida[];
}

export function MotoristaProfileClient({ 
  motorista, 
  adicionarCorridas 
}: { 
  motorista: Motorista;
  adicionarCorridas: (motoristaId: string, quantidade: number) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <Link href="/motoristas" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar para Motoristas
        </Link>
        <div className="flex items-center gap-4">
          <img 
            src={motorista.fotoUrl || `https://i.pravatar.cc/150?u=${motorista.id}`} 
            alt={motorista.nome} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{motorista.nome}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${motorista.status === 'alerta' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${motorista.status === 'alerta' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                {motorista.status === 'alerta' ? 'Em Alerta' : 'Ativo'}
              </span>
              <span className="text-slate-500 text-sm">
                ID: {motorista.id.split('-')[0]}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          {/* Card de Resumo */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Corridas no Mês</p>
              <h2 className="text-4xl font-black text-slate-900">{motorista.corridasMes}</h2>
            </div>
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Car className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          {/* Histórico de Corridas Recentes */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500" /> Histórico de Lançamentos
              </h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {motorista.corridas?.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm">Nenhuma corrida registrada neste mês.</div>
              )}
              {motorista.corridas?.map((corrida, i) => (
                <div key={corrida.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Lote #{motorista.corridas!.length - i}</p>
                      <p className="text-xs text-slate-400">Corrida Registrada</p>
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

        {/* Formulário de Adicionar Corridas */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit sticky top-6">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-emerald-500" /> Lançar Corridas
          </h3>
          <form 
            ref={formRef}
            action={async (fd) => {
              const qtde = parseInt(fd.get('quantidade') as string, 10);
              await adicionarCorridas(motorista.id, qtde);
              formRef.current?.reset();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Quantidade de Corridas</label>
              <input 
                name="quantidade" 
                type="number" 
                min="1" 
                defaultValue="1" 
                required 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl shadow-sm transition-all text-sm"
            >
              Adicionar Corridas
            </button>
            <p className="text-xs text-center text-slate-400">
              Esta ação gravará o histórico com a data e hora exata.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
