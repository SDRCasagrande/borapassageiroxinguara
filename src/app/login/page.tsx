'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';


export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember') === 'on';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      });

      const result = await response.json();

      if (result.success) {
        // Hard redirect para o middleware revalidar o cookie
        if (window.location.hostname.startsWith('admin.')) {
          window.location.href = '/';
        } else {
          window.location.href = '/admin';
        }
      } else {
        setError(result.error || 'Erro ao realizar login');
        setLoading(false);
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <img src="/assets/Logotipo.png" alt="Bora Passageiro" className="h-28 w-auto brightness-0 invert drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]" />
            </motion.div>
            <p className="text-slate-400 text-sm">Acesse o painel administrativo</p>
          </div>

          <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center"
              >
                <p className="text-rose-400 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="admin@borapassageiro..."
                  className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="h-4 w-4 rounded border-slate-800 bg-slate-950/50 text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-slate-900"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-slate-300 cursor-pointer">
                Lembrar-me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={() => {
                const form = document.getElementById('login-form') as HTMLFormElement;
                if (form) {
                  if (form.checkValidity()) {
                    form.requestSubmit();
                  } else {
                    form.reportValidity();
                  }
                }
              }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl py-4 mt-6 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
            <p className="text-xs text-slate-500">
              Área restrita Bora Passageiro Xinguara
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
