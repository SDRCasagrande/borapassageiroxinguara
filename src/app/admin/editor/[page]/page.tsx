import Link from 'next/link';
import { notFound } from 'next/navigation';
import { editableSections } from '@/lib/site-content';
import { ArrowLeft, Edit3, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function EditorPageSections({ params }: { params: { page: string } }) {
  const pageKey = params.page as 'passageiro' | 'motorista';
  const sections = editableSections[pageKey];

  if (!sections) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <Link href="/admin/editor" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Editor
        </Link>
      </div>
      
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 capitalize">
          <Edit3 className="w-6 h-6 text-indigo-600" />
          Editando Site: {pageKey}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Escolha a seção que deseja personalizar. Os dados já estão vindo do banco.
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {sections.map((sec) => (
            <li key={sec.key}>
              <Link
                href={`/admin/editor/${pageKey}/${sec.key}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{sec.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{sec.label}</h3>
                    <p className="text-xs text-slate-500">Chave no banco: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">{sec.key}</code></p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
