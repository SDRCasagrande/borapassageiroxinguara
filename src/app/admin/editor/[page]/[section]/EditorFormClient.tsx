'use client';

import { useState } from 'react';
import { saveSiteContentAction } from '../actions';
import { Save, Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function EditorFormClient({ page, section, initialData }: { page: string; section: string; initialData: any }) {
  const [data, setData] = useState<any>(initialData || {});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (path: string[], value: any) => {
    setData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleArrayAdd = (path: string[], templateItem: any) => {
    setData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      current.push(templateItem);
      return next;
    });
  };

  const handleArrayRemove = (path: string[], index: number) => {
    setData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      current.splice(index, 1);
      return next;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await saveSiteContentAction(page, section, data);
    setLoading(false);
    if (res.success) {
      alert('Salvo com sucesso!');
      router.refresh();
    } else {
      alert('Erro ao salvar: ' + res.error);
    }
  };

  const renderField = (value: any, path: string[], keyLabel: string) => {
    if (value === null || value === undefined) return null;

    if (Array.isArray(value)) {
      const templateItem = value.length > 0 ? JSON.parse(JSON.stringify(value[0])) : {};
      if (typeof templateItem === 'object') {
        Object.keys(templateItem).forEach(k => {
          if (typeof templateItem[k] === 'string') templateItem[k] = '';
          else if (typeof templateItem[k] === 'number') templateItem[k] = 0;
          else if (typeof templateItem[k] === 'boolean') templateItem[k] = false;
        });
      }

      return (
        <div key={path.join('.')} className="mt-6 mb-8 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-800 capitalize">{keyLabel} (Lista)</h3>
            <button
              onClick={() => handleArrayAdd(path, templateItem)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Item
            </button>
          </div>
          <div className="space-y-4">
            {value.map((item, idx) => (
              <div key={idx} className="relative bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleArrayRemove(path, idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors bg-white p-1 rounded-md hover:bg-rose-50"
                    title="Remover Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="pr-8 space-y-4">
                  {typeof item === 'object' ? (
                    Object.keys(item).map(k => renderField(item[k], [...path, idx.toString(), k], k))
                  ) : (
                    renderField(item, [...path, idx.toString()], `Item ${idx + 1}`)
                  )}
                </div>
              </div>
            ))}
            {value.length === 0 && <p className="text-sm text-slate-400 italic">Lista vazia.</p>}
          </div>
        </div>
      );
    }

    if (typeof value === 'object') {
      return (
        <div key={path.join('.')} className="space-y-4 mt-2">
          <h4 className="text-sm font-bold text-slate-700 capitalize border-b pb-1">{keyLabel}</h4>
          <div className="pl-4 border-l-2 border-slate-100 space-y-4">
            {Object.keys(value).map(k => renderField(value[k], [...path, k], k))}
          </div>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={path.join('.')} className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(path, e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <label className="text-sm font-semibold text-slate-700 capitalize cursor-pointer" onClick={() => handleChange(path, !value)}>
            {keyLabel}
          </label>
        </div>
      );
    }

    const isLongText = typeof value === 'string' && value.length > 50;

    return (
      <div key={path.join('.')} className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{keyLabel}</label>
        {isLongText ? (
          <textarea
            value={value}
            onChange={(e) => handleChange(path, e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-900 resize-y"
          />
        ) : (
          <input
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e) => handleChange(path, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-900"
          />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href={`/admin/editor/${page}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar às Seções
          </Link>
          <h1 className="text-2xl font-black text-slate-900 capitalize flex items-center gap-3">
            Editar: {section}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Site: {page}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        {Object.keys(data).map(key => renderField(data[key], [key], key))}
      </div>
    </div>
  );
}
