'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Car } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#030712] font-sans">
      
      {/* Logo Top Center */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <img 
          src="/assets/Logotipo.png" 
          alt="Bora Passageiro" 
          className="h-20 md:h-32 drop-shadow-2xl object-contain brightness-0 invert" 
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -200],
              x: [0, Math.random() * 60 - 30]
            }}
            transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 5, repeat: Infinity }}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{ left: `${Math.random() * 100}%`, top: `${60 + Math.random() * 40}%` }}
          />
        ))}
      </div>

      {/* Split content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Passageiro */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ flex: 1.15 }}
          onClick={() => router.push('/passageiro')}
          className="relative group cursor-pointer flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden min-h-[50vh] md:min-h-screen"
          style={{ transition: 'flex 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/80 to-[#030712] opacity-95" />
          <div className="absolute inset-0 bg-[url('/assets/app-screen.png')] bg-cover bg-center opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700" />
          <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Glow ring */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-64 h-64 rounded-full border border-cyan-500/20 pointer-events-none"
          />

          <div className="relative z-10 text-center space-y-6 p-8 pt-20 md:pt-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-shadow"
            >
              <Smartphone className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
              Sou Passageiro
            </h2>
            <p className="text-cyan-100/50 max-w-sm mx-auto text-lg font-medium">
              Peça sua corrida em segundos. Segurança e preço justo em Xinguara.
            </p>
            <div className="pt-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="inline-flex items-center gap-2 text-cyan-400 font-bold bg-cyan-950/60 px-6 py-3 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-sm">
                Viajar agora <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Motorista */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ flex: 1.15 }}
          onClick={() => router.push('/motorista')}
          className="relative group cursor-pointer flex-1 flex flex-col items-center justify-center overflow-hidden min-h-[50vh] md:min-h-screen"
          style={{ transition: 'flex 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-950/80 to-[#030712] opacity-95" />
          <div className="absolute inset-0 bg-[url('/assets/driver-profile.png')] bg-cover bg-center opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700" />
          <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute w-64 h-64 rounded-full border border-emerald-500/20 pointer-events-none"
          />

          <div className="relative z-10 text-center space-y-6 p-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-shadow"
            >
              <Car className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
              Quero Dirigir
            </h2>
            <p className="text-emerald-100/50 max-w-sm mx-auto text-lg font-medium">
              Ganhe 90% da corrida. Taxa fixa de apenas 10%.
            </p>
            <div className="pt-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="inline-flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/60 px-6 py-3 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-sm">
                Começar a faturar <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-6 pb-4"
      >
        <Link href="/ranking" className="text-xs text-white/20 hover:text-amber-400 transition-colors font-medium">
          🏆 Ranking
        </Link>
        <span className="text-white/10">•</span>
        <span className="text-xs text-white/15">Bora Passageiro © {new Date().getFullYear()}</span>
        <span className="text-white/10">•</span>
        <Link href="/admin" className="text-xs text-white/20 hover:text-white/40 transition-colors font-medium">
          Admin
        </Link>
      </motion.div>
    </div>
  );
}
