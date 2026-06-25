'use client';

import { useState } from 'react';
import { Star, User, Image as ImageIcon } from 'lucide-react';
import { addPontos } from './actions';

interface Motorista {
  id: string;
  nome: string;
  telefone: string | null;
  fotoUrl: string | null;
  pontos: number;
}

export function MotoristasAdminClient({ motoristas }: { motoristas: Motorista[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAddPoints = async (id: string, points: number) => {
    setLoadingId(id);
    try {
      await addPontos(id, points);
      window.location.reload(); // Atualiza a página para refletir os novos pontos
    } catch (error) {
      alert("Erro ao adicionar pontos.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" /> 
          Motoristas Cadastrados ({motoristas.length})
        </h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Cadastrar Motorista
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-500">Motorista</th>
              <th className="px-6 py-4 font-medium text-slate-500">Foto (URL)</th>
              <th className="px-6 py-4 font-medium text-slate-500">Pontuação</th>
              <th className="px-6 py-4 font-medium text-slate-500 text-right">Ações (Gamificação)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {motoristas.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  Nenhum motorista cadastrado ainda.
                </td>
              </tr>
            )}
            {motoristas.map((motorista) => (
              <tr key={motorista.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img 
                    src={motorista.fotoUrl || "https://i.pravatar.cc/150?u=fallback"} 
                    alt={motorista.nome}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-slate-900">{motorista.nome}</p>
                    <p className="text-xs text-slate-500">{motorista.telefone || 'Sem telefone'}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ImageIcon className="w-4 h-4" />
                    <span className="w-32 truncate block" title={motorista.fotoUrl || ''}>
                      {motorista.fotoUrl ? "URL Cadastrada" : "Sem foto"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    <Star className="w-4 h-4 text-amber-500" />
                    {motorista.pontos}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleAddPoints(motorista.id, 10)}
                      disabled={loadingId === motorista.id}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium rounded-md transition-colors"
                    >
                      +10 pts
                    </button>
                    <button 
                      onClick={() => handleAddPoints(motorista.id, 50)}
                      disabled={loadingId === motorista.id}
                      className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 font-medium rounded-md transition-colors shadow-sm"
                    >
                      +50 pts
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
