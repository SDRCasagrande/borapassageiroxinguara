'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MapPin, Car, CheckCircle2, ArrowLeft, Loader2, MessageCircle, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function CadastroMotoristaPage() {
  const [form, setForm] = useState({ nome: '', telefone: '', cidade: '', veiculo: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'error' | 'info' }>({ show: false, message: '', type: 'error' });

  const showToast = (message: string, type: 'error' | 'info' = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, telefone: formatPhone(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = form.telefone.replace(/\D/g, '');
    if (!form.nome || digits.length < 10) {
      showToast(digits.length < 10 ? 'Digite um telefone válido com DDD.' : 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/motorista-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, telefone: form.telefone.replace(/\D/g, '') }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        showToast('Erro ao enviar. Tente novamente.');
      }
    } catch {
      showToast('Falha na conexão. Verifique sua internet.');
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
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
            className="w-28 h-28 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
            >
              <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </motion.div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-black text-white"
          >
            Cadastro Enviado! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 text-lg"
          >
            Recebemos seu pré-cadastro, <span className="text-emerald-400 font-bold">{form.nome.split(' ')[0]}</span>! 
            Nossa equipe entrará em contato pelo WhatsApp para finalizar o processo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href={`https://wa.me/5594992777717?text=${encodeURIComponent(`Olá! Sou ${form.nome.split(' ')[0]}, acabei de fazer meu pré-cadastro como motorista no Bora Passageiro!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </a>
            <Link
              href="/motorista"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Voltar ao Site
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 max-w-sm w-full"
          >
            <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl backdrop-blur-xl ${
              toast.type === 'error' 
                ? 'bg-rose-900/80 border-rose-500/30 text-rose-100' 
                : 'bg-emerald-900/80 border-emerald-500/30 text-emerald-100'
            }`}>
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button onClick={() => setToast(t => ({ ...t, show: false }))} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                onChange={handlePhoneChange}
                maxLength={15}
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
