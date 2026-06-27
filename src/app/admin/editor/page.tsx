import Link from 'next/link';
import { LayoutTemplate, Car, Users, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function EditorDashboard() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6 text-indigo-600" />
          Editor do Site (CMS)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Selecione qual site você deseja editar. As alterações feitas aqui serão publicadas imediatamente.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/editor/passageiro" className="group block">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Site do Passageiro</h2>
            <p className="text-sm text-slate-500 mb-6">
              Edite textos, vantagens, passos e informações do site principal voltado para captar passageiros.
            </p>
            <div className="flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-2 transition-transform">
              Editar Site Passageiro <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </Link>

        <Link href="/admin/editor/motorista" className="group block">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:emerald-300 transition-all hover:border-emerald-300">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Car className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Site do Motorista</h2>
            <p className="text-sm text-slate-500 mb-6">
              Edite configurações (como Cidades Disponíveis), textos, requisitos e simulador de ganhos.
            </p>
            <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-2 transition-transform">
              Editar Site Motorista <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
