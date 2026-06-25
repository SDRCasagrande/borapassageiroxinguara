'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[#030712] font-sans">
      {/* Absolute Logo Top Center - Branca e Maior */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <img 
          src="/assets/Logotipo.png" 
          alt="Bora Passageiro" 
          className="h-24 md:h-36 drop-shadow-2xl object-contain brightness-0 invert" 
        />
      </div>

      {/* Left Side - Passageiro */}
      <motion.div
        initial={{ flex: 1 }}
        whileHover={{ flex: 1.2 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        onClick={() => router.push('/passageiro')}
        className="relative group cursor-pointer flex-1 h-full flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden"
      >
        {/* Background Effects - Imagem à direita e bem opaca (10%) */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 to-[#030712] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979434-d4ba0ae10ce4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-right opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 p-8">
          {/* Ícone Real - Passageiro (Foto real) */}
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-cyan-500/30 overflow-hidden mb-4 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
             <img src="https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=150&h=150&fit=crop" alt="Ícone Passageiro" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
            Sou Passageiro
          </h2>
          <p className="text-cyan-100/60 max-w-sm mx-auto text-lg md:text-xl font-medium">
            Peça sua corrida em segundos. Segurança e preço justo.
          </p>
          <div className="pt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-2 text-cyan-400 font-bold bg-cyan-950/50 px-6 py-3 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              Viajar agora <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Motorista */}
      <motion.div
        initial={{ flex: 1 }}
        whileHover={{ flex: 1.2 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        onClick={() => router.push('/motorista')}
        className="relative group cursor-pointer flex-1 h-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Effects - Imagem à direita e bem opaca (10%) */}
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-950 to-[#030712] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-right opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 p-8">
           {/* Ícone Real - Motorista (Foto real) */}
           <div className="w-24 h-24 mx-auto rounded-full border-4 border-emerald-500/30 overflow-hidden mb-4 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
             <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=150&h=150&fit=crop" alt="Ícone Motorista" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
            Quero Dirigir
          </h2>
          <p className="text-emerald-100/60 max-w-sm mx-auto text-lg md:text-xl font-medium">
            Faça seu próprio horário. Taxa fixa de apenas 10%.
          </p>
          <div className="pt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/50 px-6 py-3 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
              Começar a faturar <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
