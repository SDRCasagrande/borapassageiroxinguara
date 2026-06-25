'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, MapPin, Smartphone, Star } from 'lucide-react';
import Link from 'next/link';
import { ActionButtons } from '@/components/ActionButtons';

/* ─── PREMIUM HEADER ───────────────────────────────────── */
function PremiumHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/assets/Logotipo.png" alt="Bora Passageiro" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#vantagens" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Vantagens</a>
          <a href="#como-funciona" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Como Funciona</a>
          <a href="#seguranca" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Segurança</a>
        </nav>
        <a href="/go/playstore" className="text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform">
          Baixar App
        </a>
      </div>
    </header>
  );
}

/* ─── ULTRA MODERN HERO ────────────────────────────────── */
function PassageiroHeroV3() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden bg-[#030712]">
      {/* Dynamic Backgrounds */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-cyan-50 uppercase tracking-widest">
            A Revolução Mobilidade PA
          </span>
        </motion.div>

        <motion.h1 
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter leading-[0.9]"
        >
          Meio Caminho <br className="hidden sm:block" />
          <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Andado.</span>
        </motion.h1>

        <motion.p 
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-blue-100/60 max-w-2xl font-medium"
        >
          Carros no conforto do seu toque. Mais segurança, rapidez e tecnologia premium pelas ruas de Xinguara.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 w-full max-w-lg mx-auto"
        >
           <ActionButtons />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BENTO GRID FEATURES ──────────────────────────────── */
function BentoGridFeatures() {
  return (
    <section id="vantagens" className="py-24 sm:py-32 bg-[#030712] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Menos atrito. <br/><span className="text-cyan-400">Mais viagem.</span></h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-[#0c1322] to-[#0a101d] rounded-[2rem] border border-white/5 p-8 sm:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
              <Smartphone className="w-32 h-32 text-cyan-500" />
            </div>
            <div className="relative z-10 w-full md:w-2/3 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Carros em Segundos</h3>
                <p className="text-blue-100/60 text-lg leading-relaxed">
                  Sem espera longa. Nosso algoritmo otimizado em escala conecta você instantaneamente ao motorista mais próximo.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#0c1322] to-[#0a101d] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-40 transition-opacity duration-500">
              <Shield className="w-48 h-48 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Proteção Level Max</h3>
              <p className="text-blue-100/60 text-base">
                Monitoramento GPS em tempo real e verificação severa de antecedentes dos motoristas.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0c1322] rounded-[2rem] border border-white/5 p-8"
          >
            <MapPin className="w-8 h-8 text-white/40 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Cobertura Ampla</h3>
            <p className="text-white/50 text-sm">Xinguara, Conceição e Redenção 100% integradas.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#0c1322] rounded-[2rem] border border-white/5 p-8 flex flex-col sm:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">Avaliado em 4.9/5 ★</h3>
              <p className="text-white/50">Centenas de corridas elogiadas todos os dias devido ao nosso padrão rigoroso de qualidade nas vias.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─── COMO FUNCIONA V3 ─────────────────────────────────── */
function ComoFuncionaV3() {
  const steps = [
    { title: "Defina o Destino", desc: "Abra o app e digite para onde quer ir. O preço estimado aparece na hora.", icon: <MapPin className="w-8 h-8 text-cyan-400" /> },
    { title: "Peça sua Corrida", desc: "Com um toque, encontre o motorista mais próximo disponível.", icon: <Smartphone className="w-8 h-8 text-cyan-400" /> },
    { title: "Viaje com Segurança", desc: "Acompanhe o trajeto em tempo real e compartilhe com amigos.", icon: <Shield className="w-8 h-8 text-cyan-400" /> },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#0a101d] border-t border-white/5 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Fácil como <span className="text-cyan-400">respirar.</span></h2>
          <p className="mt-4 text-cyan-50/60 font-medium">3 passos simples para estar a caminho do seu destino.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#121a28] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-[120px] font-black text-white/5 leading-none -mt-4 -mr-4 select-none group-hover:text-white/10 transition-colors">
                {i + 1}
              </div>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
              <p className="text-white/50 relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPORT PAGE ───────────────────────────────────── */
export default function PassageiroPage() {
  return (
    <div className="bg-[#030712] min-h-screen selection:bg-cyan-500/30 selection:text-cyan-50">
      <PremiumHeader />
      
      <main>
        <PassageiroHeroV3 />
        <BentoGridFeatures />
        <ComoFuncionaV3 />
      </main>

      {/* Floating WhatsApp Base */}
      <a 
        href="/go/whatsapp"
        target="_blank"
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 transition-transform z-50 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
