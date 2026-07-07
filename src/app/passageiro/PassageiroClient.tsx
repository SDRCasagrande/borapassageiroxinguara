// @ts-nocheck
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Shield,
  Clock,
  MapPin,
  DollarSign,
  Smartphone,
  Navigation,
  ChevronRight,
  Star,
  Globe,
  Users,
  MessageCircle,
  Menu,
  X,
  Gift,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ActionButtons } from '@/components/ActionButtons';
import { DownloadModalProvider, DownloadButton, PLAY_STORE_URL, APP_STORE_URL } from '@/components/DownloadModal';
import { useRef, useState } from 'react';

/* ─── ANIMATION VARIANTS ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── PREMIUM HEADER ──────────────────────────────────── */
function PremiumHeader({ data }: { data?: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: '#vantagens', label: 'Vantagens' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#download', label: 'Download' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/[0.06] text-white transition-all duration-500">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <a href={data?.siteUrl || "https://borapassageiroxinguara.com.br"} className="flex items-center gap-2 group">
          <img
            src="/assets/Logotipo.png"
            alt="Bora Passageiro"
            className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <DownloadButton
          className="hidden md:inline-block text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
        >
          Baixar App
        </DownloadButton>

        {/* Hamburger Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white/80 hover:text-white transition-colors" aria-label="Menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5"
        >
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white/70 hover:text-white py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <DownloadButton
              className="text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full text-center mt-2 w-full"
            >
              Baixar App
            </DownloadButton>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

/* ─── HERO SECTION ────────────────────────────────────── */
function HeroSection({ data }: { data?: any }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#030712]"
    >
      {/* ── Parallax Background Blobs ── */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-600/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-700/20 rounded-full blur-[130px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[50%] left-[60%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
      />

      {/* ── Grid Pattern Overlay ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 sm:py-24">
        {/* ── Left: Text Content ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cyan-50 uppercase tracking-widest">
              {data?.badge || 'Mobilidade Premium'}
            </span>
          </motion.div>

          <motion.h1
            style={{ opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tighter leading-[0.9]"
          >
            {data?.title || 'Sua corrida está'}{' '}
            <br className="hidden sm:block" />
            <span className="bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500">
              {data?.titleGradient || 'a um toque.'}
            </span>
          </motion.h1>

          <motion.p
            style={{ opacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl text-blue-100/50 max-w-xl font-medium leading-relaxed"
          >
            {data?.subtitle || 'A nova era da mobilidade urbana. Peça seu carro com rapidez e segurança.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-full max-w-md"
          >
            <ActionButtons />
          </motion.div>
        </div>

        {/* ── Right: Phone Mockup with Float Animation ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow behind phone */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] bg-cyan-500/20 rounded-full blur-[80px]" />
          </div>

          <motion.img
            src="/assets/phone-mockups.png"
            alt="Bora Passageiro App"
            className="relative z-10 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-auto drop-shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
}

/* ─── STATS COUNTER ───────────────────────────────────── */
function StatsCounter({ data }: { data?: any }) {
  const stats = data?.items || [
    { value: '500+', label: 'Corridas / dia', suffix: '' },
    { value: '28+', label: 'Motoristas ativos', suffix: '' },
    { value: '4.9', label: 'Avaliação média', suffix: '★' },
    { value: '10min', label: 'Tempo médio', suffix: '' },
  ];

  return (
    <section className="relative py-20 sm:py-24 bg-[#030712] overflow-hidden">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative text-center p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-3xl sm:text-4xl text-yellow-400 ml-1">
                    {stat.suffix}
                  </span>
                )}
                <p className="mt-3 text-sm sm:text-base text-white/40 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BENTO GRID FEATURES ─────────────────────────────── */
function BentoGridFeatures({ data }: { data?: any }) {
  const features = data?.items || [
    {
      icon: Clock,
      title: 'Carros em Segundos',
      description: 'Sem espera longa. Nosso algoritmo conecta você instantaneamente ao motorista mais próximo disponível.',
      color: 'cyan',
      colSpan: 'md:col-span-2',
      large: true,
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Monitoramento GPS em tempo real, verificação de antecedentes e compartilhamento de viagem ao vivo.',
      color: 'blue',
      colSpan: '',
      large: false,
    },
    {
      icon: DollarSign,
      title: 'Preço Justo',
      description: 'Tarifas transparentes calculadas antes da corrida. Sem surpresas, sem taxas ocultas.',
      color: 'emerald',
      colSpan: '',
      large: false,
    },
    {
      icon: MapPin,
      title: 'Cobertura Ampla',
      description: 'Xinguara, Conceição e Redenção 100% integradas. Mobilidade sem fronteiras na sua região.',
      color: 'violet',
      colSpan: 'md:col-span-2',
      large: true,
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
    cyan: {
      bg: 'from-cyan-500/10 to-cyan-600/5',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15',
      border: 'hover:border-cyan-500/20',
    },
    blue: {
      bg: 'from-blue-500/10 to-blue-600/5',
      text: 'text-blue-400',
      iconBg: 'bg-blue-500/15',
      border: 'hover:border-blue-500/20',
    },
    emerald: {
      bg: 'from-emerald-500/10 to-emerald-600/5',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
      border: 'hover:border-emerald-500/20',
    },
    violet: {
      bg: 'from-violet-500/10 to-violet-600/5',
      text: 'text-violet-400',
      iconBg: 'bg-violet-500/15',
      border: 'hover:border-violet-500/20',
    },
  };

  return (
    <section id="vantagens" className="py-24 sm:py-32 bg-[#030712] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">
            {data?.sectionLabel || 'Vantagens'}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {data?.heading || 'Menos atrito.'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {data?.headingGradient || 'Mais viagem.'}
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feat: any, i: number) => {
            // Se vier do DB não vai ter o componente de ícone, vai ter o nome. Como não temos um mapeamento forte aqui, mantemos compatibilidade se icon for string
            const Icon = typeof feat.icon === 'string' ? MapPin : (feat.icon || MapPin); 
            const colorName = feat.color || ['cyan', 'blue', 'emerald', 'violet'][i % 4];
            const colors = colorMap[colorName] || colorMap['cyan'];
            return (
              <motion.div
                key={feat.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`${feat.colSpan} relative bg-gradient-to-br from-[#0c1322] to-[#080e1a] rounded-[2rem] border border-white/[0.06] ${colors.border} ${feat.large ? 'p-8 sm:p-12' : 'p-8'} overflow-hidden group transition-colors duration-500`}
              >
                {/* Background icon watermark */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  <Icon className={`${feat.large ? 'w-48 h-48' : 'w-40 h-40'} ${colors.text}`} />
                </div>

                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl ${colors.iconBg} ${colors.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3
                    className={`${feat.large ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-bold text-white mb-3`}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-blue-100/50 text-base sm:text-lg leading-relaxed max-w-lg">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── COMO FUNCIONA ───────────────────────────────────── */
function ComoFunciona({ data }: { data?: any }) {
  const steps = data?.items || [
    {
      number: '01',
      title: 'Abra o App',
      description: 'Baixe o Bora Passageiro, crie sua conta em segundos e defina seu destino no mapa interativo.',
      icon: Smartphone,
    },
    {
      number: '02',
      title: 'Peça sua Corrida',
      description: 'Com um toque, veja o preço estimado e conecte-se ao motorista mais próximo disponível.',
      icon: Navigation,
    },
    {
      number: '03',
      title: 'Chegue ao Destino',
      description: 'Acompanhe o trajeto em tempo real, compartilhe com amigos e avalie sua experiência.',
      icon: MapPin,
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-24 sm:py-32 bg-[#060c18] border-t border-white/[0.04] relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">
            {data?.sectionLabel || 'Como funciona'}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {data?.heading || 'Fácil como respirar.'}
          </h2>
          <p className="mt-5 text-white/40 font-medium text-lg max-w-md mx-auto">
            {data?.subtitle || '3 passos simples para estar a caminho do seu destino.'}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step: any, i: number) => {
            const Icon = typeof step.icon === 'string' ? MapPin : (step.icon || MapPin);
            return (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-gradient-to-br from-[#0c1424] to-[#080e1a] rounded-[2rem] p-8 sm:p-10 border border-white/[0.06] hover:border-cyan-500/15 overflow-hidden group transition-colors duration-500"
              >
                {/* Big Step Number in Background */}
                <div className="absolute top-0 right-0 text-[140px] sm:text-[180px] font-black text-white/[0.02] leading-none -mt-8 -mr-4 select-none group-hover:text-white/[0.06] transition-colors duration-700 pointer-events-none">
                  {step.number}
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />

                <div className="relative z-10">
                  {/* Step number badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                    <span className="text-xs font-bold text-cyan-400 tracking-wider">
                      PASSO {step.number}
                    </span>
                  </div>

                  <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';

/* ─── DOWNLOAD CTA ────────────────────────────────────── */
function DownloadCTA({ data }: { data?: any }) {
  return (
    <section
      id="download"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#060c18] via-[#0a1628] to-[#030712] relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[60%] h-[60%] bg-gradient-to-br from-cyan-500/20 to-blue-600/15 rounded-full blur-[80px]" />
            </div>

            <motion.img
              src="/assets/app-screen.png"
              alt="Bora Passageiro App Screenshot"
              className="relative z-10 w-[260px] sm:w-[300px] md:w-[340px] h-auto rounded-[2.5rem] drop-shadow-[0_30px_80px_rgba(6,182,212,0.2)]"
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />

            {/* Decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-white/[0.03] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full pointer-events-none" />
          </motion.div>

          {/* Right: CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
              {data?.sectionLabel || 'Disponível agora'}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {data?.heading || 'Baixe agora'}{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {data?.headingGradient || 'e comece a viajar.'}
              </span>
            </h2>

            <p className="text-white/40 text-lg max-w-lg leading-relaxed">
              {data?.subtitle || 'Disponível para Android e iOS. Baixe gratuitamente e tenha a melhor experiência de mobilidade de Xinguara na palma da sua mão.'}
            </p>

            {/* Store Badges */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="block"
              >
                <img
                  src="/assets/btn-google-play.png"
                  alt="Baixar no Google Play"
                  className="h-16 sm:h-[72px] w-auto object-contain drop-shadow-xl"
                />
              </motion.a>

              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="block"
              >
                <img
                  src="/assets/btn-app-store.png"
                  alt="Baixar na App Store"
                  className="h-16 sm:h-[72px] w-auto object-contain drop-shadow-xl"
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────── */
function Footer({ data, config }: { data?: any; config?: any }) {
  return (
    <footer className="bg-[#020408] border-t border-white/[0.04] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/assets/Logotipo.png"
              alt="Bora Passageiro"
              className="h-10 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              {data?.description || 'A plataforma de mobilidade urbana que conecta passageiros e motoristas em Xinguara e região.'}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#vantagens', label: 'Vantagens' },
                { href: '#como-funciona', label: 'Como Funciona' },
                { href: '#download', label: 'Download' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/35 text-sm hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Plataforma
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/motorista', label: 'Seja Motorista' },
                { href: '/ranking', label: 'Ranking' },
                { href: PLAY_STORE_URL, label: 'Google Play' },
                { href: APP_STORE_URL, label: 'App Store' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/35 text-sm hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Social
            </h4>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: Globe,
                  href: data?.instagramUrl || 'https://www.instagram.com/bora.passageiroxinguara/',
                  label: 'Instagram',
                  hoverColor: 'hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30',
                },
                {
                  icon: MessageCircle,
                  href: data?.whatsappNumber ? `https://wa.me/${data.whatsappNumber}` : 'https://wa.me/5594992777717',
                  label: 'WhatsApp',
                  hoverColor:
                    'hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30',
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 transition-all duration-300 ${social.hoverColor}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            Bora Passageiro © {new Date().getFullYear()}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://motorista.borapassageiroxinguara.com.br"
              className="text-white/20 text-sm hover:text-cyan-400 transition-colors duration-300"
            >
              Motorista
            </a>
            <a
              href="https://ranking.borapassageiroxinguara.com.br"
              className="text-white/20 text-sm hover:text-cyan-400 transition-colors duration-300"
            >
              Ranking
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── FLOATING WHATSAPP BUTTON ────────────────────────── */
function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/5594992777717"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale pelo WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-shadow duration-300 flex items-center justify-center"
    >
      {/* Ping animation */}
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20 pointer-events-none" />

      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </motion.a>
  );
}

function PromoBanner({ banners }: { banners: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!banners || banners.length === 0) return null;

  const handleCopy = (codigo: string, id: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-24 pb-4 px-4 sm:px-6 max-w-7xl mx-auto relative z-40">
      <div className="flex flex-col gap-4">
        {banners.map((banner, idx) => (
          <motion.div 
            key={banner.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-cyan-500/10 flex flex-col md:flex-row items-center gap-4 md:gap-6 backdrop-blur-xl"
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                <Gift className="w-5 h-5 text-cyan-400" />
                {banner.titulo}
              </h3>
              {banner.descricao && (
                <p className="text-sm text-cyan-50/70 mt-1">{banner.descricao}</p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {banner.codigo && (
                <div className="flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-xl p-1.5 w-full sm:w-auto">
                  <span className="text-cyan-400 font-mono font-bold px-3 py-1 text-sm tracking-wider">
                    {banner.codigo}
                  </span>
                  <button
                    onClick={() => handleCopy(banner.codigo, banner.id)}
                    className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-cyan-400 transition-colors shrink-0"
                    title="Copiar Código"
                  >
                    {copiedId === banner.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
              
              <a 
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-colors text-center shadow-lg shadow-cyan-500/20 text-sm whitespace-nowrap"
              >
                Acessar Promoção
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── EXPORT PAGE ─────────────────────────────────────── */
export default function PassageiroClient({ banners = [], content = {} }: { banners?: any[]; content?: any }) {
  return (
    <DownloadModalProvider>
    <div className="bg-[#030712] min-h-screen selection:bg-cyan-500/30 selection:text-cyan-50 overflow-x-hidden">
      <PremiumHeader data={content.config} />
      <PromoBanner banners={banners} />

      <main>
        <HeroSection data={content.hero} />
        <StatsCounter data={content.stats} />
        <BentoGridFeatures data={content.features} />
        <ComoFunciona data={content.steps} />
        <Testimonials data={content.testimonials} />
        <FAQ data={content.faq} />
        <DownloadCTA data={content.cta} />
      </main>

      <Footer data={content.footer} config={content.config} />
      <FloatingWhatsApp />
    </div>
    </DownloadModalProvider>
  );
}
