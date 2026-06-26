"use client";

import { useRef } from "react";
import { Users, Plus, Car, Tag, Trash2, RotateCcw, Shield, AlertTriangle } from "lucide-react";

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
}

export function MotoristasAdminClient({
  motoristas, dbError,
  cadastrarMotorista, adicionarCorridas, alterarStatus, removerMotorista, zerarMes
}: Props) {
  const formCadastroRef = useRef<HTMLFormElement>(null);
  const formCorridasRef = useRef<HTMLFormElement>(null);
  const formStatusRef = useRef<HTMLFormElement>(null);
  const formRemoverRef = useRef<HTMLFormElement>(null);

  const sorted = [...motoristas].sort((a, b) => b.corridasMes - a.corridasMes || a.nome.localeCompare(b.nome));

  if (dbError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl">
        <h3 className="text-rose-800 font-semibold flex items-center gap-2"><Shield className="w-5 h-5" /> Banco de Dados Offline</h3>
        <p className="text-rose-600/80 text-sm mt-1">Ligue o banco de dados para gerenciar os motoristas.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Tabela de Corridas — Bora Pra Cima! 🚀
            </h1>
            <p className="text-sm text-slate-500 mt-1">Gerencie motoristas, lance corridas diárias e controle o ranking.</p>
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

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* RANKING TABLE */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Car className="w-4 h-4 text-indigo-600" />
                Ranking por Corridas ({sorted.length} motoristas)
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {sorted.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-400">Cadastre motoristas para iniciar o ranking.</div>
              )}
              {sorted.map((m, i) => {
                const rank = i + 1;
                const isTop3 = rank <= 3;
                const trophy = rank === 1 ? "👑" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
                return (
                  <div key={m.id} className={`flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors ${rank === 1 ? "bg-amber-50/50" : ""}`}>
                    <span className={`w-10 text-center font-black ${rank === 1 ? "text-amber-500 text-lg" : rank === 2 ? "text-slate-400" : rank === 3 ? "text-orange-500" : "text-slate-300"}`}>
                      {trophy} #{rank}
                    </span>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="font-semibold text-slate-800 truncate">{m.nome}</span>
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.status === "alerta" ? "bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.5)]" : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"}`} />
                    </div>
                    <span className={`font-mono font-bold text-sm ${isTop3 ? "text-indigo-600" : "text-slate-400"}`}>
                      {isTop3 ? `${m.corridasMes} corridas` : "🔒 Confidencial"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ADMIN FORMS */}
          <div className="space-y-4">
            {/* Cadastrar */}
            <form ref={formCadastroRef} action={async (fd) => { await cadastrarMotorista(fd); formCadastroRef.current?.reset(); }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" /> Cadastrar Motorista
              </h3>
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Nome</label>
                <input name="nome" required placeholder="Ex.: Carlos Silva" maxLength={40} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Etiqueta</label>
                <select name="status" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                  <option value="ativo">🟢 Ativo</option>
                  <option value="alerta">🟠 Alerta</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-xl hover:bg-indigo-700 transition-all text-sm shadow-sm">Cadastrar</button>
            </form>

            {/* Corridas */}
            <form ref={formCorridasRef} action={async (fd) => { await adicionarCorridas(fd); formCorridasRef.current?.reset(); }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-600" /> 🏁 Corridas do Dia
              </h3>
              <select name="motoristaId" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                {sorted.map(m => <option key={m.id} value={m.id}>{m.nome} ({m.corridasMes})</option>)}
              </select>
              <input name="quantidade" type="number" min="1" step="1" required defaultValue="1" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
              <button type="submit" className="w-full bg-amber-500 text-white font-medium py-2.5 rounded-xl hover:bg-amber-600 transition-all text-sm shadow-sm">Somar Corridas</button>
            </form>

            {/* Status */}
            <form ref={formStatusRef} action={async (fd) => { await alterarStatus(fd); formStatusRef.current?.reset(); }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" /> 🏷️ Alterar Etiqueta
              </h3>
              <select name="motoristaId" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                {sorted.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
              <select name="status" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                <option value="ativo">🟢 Ativo</option>
                <option value="alerta">🟠 Alerta</option>
              </select>
              <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-all text-sm shadow-sm">Atualizar</button>
            </form>

            {/* Remover */}
            <form ref={formRemoverRef} action={async (fd) => {
              const nome = sorted.find(m => m.id === fd.get("motoristaId"))?.nome;
              if (!confirm(`Remover ${nome} do ranking?`)) return;
              await removerMotorista(fd);
            }} className="bg-white border border-rose-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-rose-800 flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> 🗑️ Remover Motorista
              </h3>
              <select name="motoristaId" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all">
                {sorted.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
              <button type="submit" className="w-full bg-rose-600 text-white font-medium py-2.5 rounded-xl hover:bg-rose-700 transition-all text-sm shadow-sm">Remover</button>
            </form>

            <p className="text-xs text-slate-400 px-2">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              Dica: apenas Top 1, 2 e 3 mostram corridas. Do 4º em diante, o valor aparece como 🔒 Confidencial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
