'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Car, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CadastroMotoristaPage() {
  const [form, setForm] = useState({ nome: '', telefone: '', cidade: '', veiculo: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.telefone) return;

    setLoading(true);
    try {
      const res = await fetch('/api/motorista-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch {
      alert('Falha na conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="text-center space-y-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </motion.div>
          <h1 className="text-3xl font-black text-white">Cadastro Enviado!</h1>
          <p className="text-white/60 text-lg">
            Recebemos seu pré-cadastro, <span className="text-emerald-400 font-bold">{form.nome.split(' ')[0]}</span>! 
            Nossa equipe entrará em contato pelo WhatsApp para finalizar o processo.
          </p>
          <Link
            href="/motorista"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Voltar ao Site
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <Link href="/motorista" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Quero ser <span className="text-emerald-400">Motorista</span>
          </h1>
          <p className="text-white/50 mt-3">
            Preencha seus dados abaixo. Entraremos em contato pelo WhatsApp para dar sequência.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div className="group">
            <label className="text-sm font-medium text-white/70 mb-2 block">Nome Completo *</label>
            <div className="flex items-center gap-3 bg-[#0a101d] border border-white/10 rounded-xl px-4 py-3.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <User className="w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Ex: João da Silva"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
                className="bg-transparent outline-none w-full text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="group">
            <label className="text-sm font-medium text-white/70 mb-2 block">WhatsApp / Telefone *</label>
            <div className="flex items-center gap-3 bg-[#0a101d] border border-white/10 rounded-xl px-4 py-3.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <Phone className="w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="tel"
                placeholder="(94) 99999-0000"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                required
                className="bg-transparent outline-none w-full text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Cidade */}
          <div className="group">
            <label className="text-sm font-medium text-white/70 mb-2 block">Cidade</label>
            <div className="flex items-center gap-3 bg-[#0a101d] border border-white/10 rounded-xl px-4 py-3.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <MapPin className="w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Ex: Xinguara - PA"
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                className="bg-transparent outline-none w-full text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Veículo */}
          <div className="group">
            <label className="text-sm font-medium text-white/70 mb-2 block">Modelo do Veículo</label>
            <div className="flex items-center gap-3 bg-[#0a101d] border border-white/10 rounded-xl px-4 py-3.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <Car className="w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Ex: Fiat Argo 2022"
                value={form.veiculo}
                onChange={(e) => setForm({ ...form, veiculo: e.target.value })}
                className="bg-transparent outline-none w-full text-white placeholder:text-white/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 mt-8"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Pré-Cadastro'
            )}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          Ao enviar, você concorda em ser contatado pela equipe do Bora Passageiro.
        </p>
      </motion.div>
    </div>
  );
}
