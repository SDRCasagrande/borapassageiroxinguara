"use client";

import { useState } from "react";
import { Trophy, Calendar, Medal, Crown, ChevronDown, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MotoristaSnapshot {
  id: string;
  nome: string;
  fotoUrl: string | null;
  status: string;
  corridasMes: number;
}

interface Fechamento {
  id: string;
  nome: string;
  dados: MotoristaSnapshot[];
  createdAt: string;
}

interface Props {
  fechamentos: Fechamento[];
  mesAtual: MotoristaSnapshot[];
}

export function RelatoriosClient({ fechamentos, mesAtual }: Props) {
  const [selectedId, setSelectedId] = useState<string>("atual");

  const opcoes = [
    { id: "atual", nome: `📊 Mês Atual (Em Andamento)` },
    ...fechamentos.map(f => ({
      id: f.id,
      nome: `📁 ${f.nome} — ${new Date(f.createdAt).toLocaleDateString("pt-BR")}`,
    })),
  ];

  const dadosExibidos: MotoristaSnapshot[] =
    selectedId === "atual"
      ? [...mesAtual].sort((a, b) => b.corridasMes - a.corridasMes || a.nome.localeCompare(b.nome))
      : (() => {
          const f = fechamentos.find(f => f.id === selectedId);
          return f ? [...f.dados].sort((a: any, b: any) => b.corridasMes - a.corridasMes || a.nome.localeCompare(b.nome)) : [];
        })();

  const fechamentoSelecionado = fechamentos.find(f => f.id === selectedId);

  return (
    <div className="w-full pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <Link href="/motoristas" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para Motoristas
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Relatórios Mensais
          </h1>
          <p className="text-sm text-slate-500 mt-1">Consulte o ranking de qualquer mês. Os dados são preservados permanentemente.</p>
        </header>

        {/* Filter */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Calendar className="w-4 h-4 text-indigo-500" />
              Filtrar por Período:
            </div>
            <div className="relative flex-1 max-w-md">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none pr-10 font-medium"
              >
                {opcoes.map(o => (
                  <option key={o.id} value={o.id}>{o.nome}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {fechamentos.length === 0 && (
              <p className="text-xs text-slate-400">Nenhum mês foi fechado ainda. Use o botão "Fechar Mês" na tela de Motoristas.</p>
            )}
          </div>
        </div>

        {/* Info bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-500">
            {selectedId === "atual" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Mês em andamento
              </span>
            ) : fechamentoSelecionado ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 font-medium">
                📁 {fechamentoSelecionado.nome} — Fechado em {new Date(fechamentoSelecionado.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            ) : null}
          </div>
          <div className="text-sm text-slate-400 font-medium">
            {dadosExibidos.length} motorista{dadosExibidos.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Ranking Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 w-20">Posição</th>
                <th className="px-6 py-4">Motorista</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Corridas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dadosExibidos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Nenhum dado encontrado para este período.</td>
                </tr>
              )}
              {dadosExibidos.map((m, i) => {
                const isPodio = i < 3;
                const medalha = i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
                const bgClass = i === 0 ? "bg-amber-50/50" : i === 1 ? "bg-slate-50/50" : i === 2 ? "bg-orange-50/30" : "";

                return (
                  <tr key={m.id || i} className={`${bgClass} hover:bg-slate-50 transition-colors`}>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${isPodio ? "text-lg" : "text-sm text-slate-400"}`}>
                        {medalha} #{i + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.fotoUrl || `https://i.pravatar.cc/150?u=${m.id || m.nome}`}
                          alt={m.nome}
                          className={`w-10 h-10 rounded-full object-cover border-2 flex-shrink-0 ${i === 0 ? "border-amber-400 ring-2 ring-amber-200" : i === 1 ? "border-slate-400" : i === 2 ? "border-orange-400" : "border-gray-200"}`}
                        />
                        <span className={`font-semibold ${isPodio ? "text-slate-900" : "text-slate-700"}`}>{m.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${m.status === 'alerta' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'alerta' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                        {m.status === 'alerta' ? 'Alerta' : 'Ativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${isPodio ? "text-xl text-slate-900" : "text-base text-slate-600"}`}>
                        {m.corridasMes}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">corridas</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
