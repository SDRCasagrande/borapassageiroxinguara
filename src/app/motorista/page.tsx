// @ts-nocheck
'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Car,
  DollarSign,
  Clock,
  Shield,
  TrendingUp,
  HandCoins,
  ArrowRight,
  FileText,
  Star,
  CheckCircle2,
  ChevronRight,
  Zap,
  Users,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════════════
   1. PREMIUM HEADER MOTORISTA
   ═══════════════════════════════════════════════════════════ */
function PremiumHeaderMotorista() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f18]/80 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/assets/Logotipo.png"
            alt="Bora Passageiro"
            className="h-10 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#ganhos"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 after:transition-all hover:after:w-full"
          >
            Ganhos
          </a>
          <a
            href="#requisitos"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 after:transition-all hover:after:w-full"
          >
            Requisitos
          </a>
        </nav>

        {/* CTA */}
        <Link
          href="/motorista/cadastro"
          className="text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full hover:scale-105 hover:shadow-emerald-500/40 transition-all duration-300 shadow-lg shadow-emerald-500/20"
        >
          Cadastre-se Já
        </Link>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. HERO SECTION — Headline + Phone Mockup Float
   ═══════════════════════════════════════════════════════════ */
function MotoristaHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);
  const y3 = useTransform(scrollY, [0, 800], [0, 80]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#030712]"
    >
      {/* ── Parallax Emerald Blobs ── */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[15%] w-[55vw] h-[55vw] bg-emerald-600/8 rounded-full blur-[180px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[5%] right-[10%] w-[45vw] h-[45vw] bg-teal-500/8 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[60%] left-[60%] w-[25vw] h-[25vw] bg-emerald-400/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
      />

      {/* ── Grid Pattern ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* ── Radial top edge glow ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* ── LEFT: Copy ── */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Vagas Abertas na Região do Xingu
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.05]"
          >
            Sua dedicação,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">
              seu lucro real.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-emerald-50/60 max-w-lg font-medium leading-relaxed"
          >
            O Bora Passageiro cobra apenas{' '}
            <span className="text-emerald-400 font-bold">10% de taxa fixa</span>.
            Nada de surpresas. Quanto mais você roda, mais lucro de verdade fica
            no seu bolso.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Link
              href="/motorista/cadastro"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] group"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#ganhos"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300"
            >
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Simular Ganhos
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-2 text-emerald-50/50 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Ganhos Diários
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Horário Flexível
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Cadastro Rápido
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Floating Phone Mockup ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 60 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Glow behind phone */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px]" />
          </div>

          {/* Floating Phone */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
            className="relative z-10"
          >
            <img
              src="/assets/phone-mockups.png"
              alt="App Bora Passageiro - Tela do Motorista"
              className="w-full max-w-md mx-auto drop-shadow-[0_30px_60px_rgba(16,185,129,0.15)]"
            />
          </motion.div>

          {/* Floating badge: earnings */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-16 -right-4 z-20"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="bg-[#1a2332]/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl px-5 py-3 shadow-2xl"
            >
              <p className="text-[11px] text-emerald-400/70 font-bold uppercase tracking-widest">Ganhos Hoje</p>
              <p className="text-xl font-black text-white">R$ 340,00</p>
            </motion.div>
          </motion.div>

          {/* Floating badge: taxa */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-24 -left-4 z-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="bg-[#1a2332]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-2xl"
            >
              <p className="text-[11px] text-white/50 font-bold uppercase tracking-widest">Taxa Bora</p>
              <p className="text-xl font-black text-emerald-400">Apenas 10%</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. FINTECH BALANCE CARD
   ═══════════════════════════════════════════════════════════ */
function FintechBalanceCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Controle Total dos Seus{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Ganhos
            </span>
          </h2>
          <p className="mt-4 text-lg text-emerald-50/60 max-w-2xl mx-auto">
            Acompanhe em tempo real cada corrida, taxa e saldo. Tudo transparente, direto no app.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 50 }}
          className="max-w-xl mx-auto [perspective:1200px]"
        >
          <div className="relative bg-gradient-to-br from-[#1a2332] to-[#0c1322] border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl overflow-hidden">
            {/* Top glossy highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

            {/* Balance Header */}
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div>
                <p className="text-emerald-400 font-bold text-xs tracking-[0.2em] uppercase mb-2">
                  Seu Saldo
                </p>
                <h3 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                  R$ 1.845
                  <span className="text-2xl text-white/40">,50</span>
                </h3>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/20 rounded-2xl flex items-center justify-center"
              >
                <DollarSign className="w-7 h-7 text-emerald-400" />
              </motion.div>
            </div>

            {/* Stat Rows */}
            <div className="space-y-3 relative z-10">
              {/* Corridas Hoje */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/15 text-blue-400 rounded-xl flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Corridas Hoje</p>
                    <p className="text-xs text-white/40">24 finalizadas</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-lg">+ R$ 340,00</span>
              </motion.div>

              {/* Taxa Bora */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/15 text-emerald-400 rounded-xl flex items-center justify-center">
                    <HandCoins className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Taxa Bora</p>
                    <p className="text-xs text-white/40">Apenas 10% do faturamento</p>
                  </div>
                </div>
                <span className="text-white/40 font-bold text-lg">- R$ 34,00</span>
              </motion.div>

              {/* Líquido */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex justify-between items-center p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/15"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-emerald-100 font-semibold text-sm">Líquido no Bolso</p>
                    <p className="text-xs text-emerald-400/60">Seu dinheiro de verdade</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-black text-xl">R$ 306,00</span>
              </motion.div>
            </div>

            {/* Bottom stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10"
            >
              <div className="text-sm text-white/40 font-medium">Desempenho Semanal</div>
              <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                +24% vs semana anterior
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. EARNINGS CALCULATOR (Interactive)
   ═══════════════════════════════════════════════════════════ */
function EarningsCalculator() {
  const [rides, setRides] = useState(15);
  const averageTicket = 15;
  const totalGross = rides * averageTicket;
  const boraFee = totalGross * 0.1;
  const netDay = totalGross - boraFee;
  const netMonth = netDay * 25;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ganhos" className="py-24 bg-[#0a0f18] relative overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <DollarSign className="w-3.5 h-3.5" />
            Simulador de Ganhos
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Simulador{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Transparente
            </span>
          </h2>
          <p className="mt-4 text-lg text-emerald-50/60 max-w-2xl mx-auto">
            Sem taxas ocultas, sem letras miúdas. Calcule exatamente quanto vai
            para o seu bolso com a nossa taxa fixa de 10%.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#121a28] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row max-w-5xl mx-auto"
        >
          {/* ── Left: Controls ── */}
          <div className="p-8 md:p-12 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-white/5">
            <h3 className="text-2xl font-bold text-white mb-2">
              Quantas corridas por dia?
            </h3>
            <p className="text-sm text-white/40 mb-10">Ajuste o slider para simular seus ganhos</p>

            <div className="space-y-12">
              {/* Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-emerald-50/50 font-medium">Média diária</span>
                  <motion.span
                    key={rides}
                    initial={{ scale: 1.3, color: '#34d399' }}
                    animate={{ scale: 1, color: '#34d399' }}
                    className="text-5xl font-black text-emerald-400 tabular-nums"
                  >
                    {rides}
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={rides}
                  onChange={(e) => setRides(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/50 accent-emerald-500 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                />
                <div className="flex justify-between text-xs text-white/30 font-bold">
                  <span>5 corridas</span>
                  <span>40 corridas</span>
                </div>
              </div>

              {/* Ticket médio info */}
              <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 font-medium text-sm">
                      Ticket Médio Estimado
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      Valor base de simulação em Xinguara
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-white">R$ 15,00</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Results ── */}
          <div className="p-8 md:p-12 lg:w-1/2 bg-gradient-to-br from-[#162032] to-[#0c1322] flex flex-col justify-center relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Monthly big number */}
              <div className="space-y-2">
                <p className="text-emerald-400 font-bold tracking-[0.2em] text-xs uppercase">
                  Ganhos Mensais (25 dias)
                </p>
                <motion.h4
                  key={netMonth}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter tabular-nums"
                >
                  R${' '}
                  {netMonth.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </motion.h4>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Faturamento Bruto / Dia</span>
                  <span className="text-white font-medium tabular-nums">
                    R${' '}
                    {totalGross.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Taxa Bora (10%)</span>
                  <span className="text-rose-400 font-medium tabular-nums">
                    - R${' '}
                    {boraFee.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-white/5">
                  <span className="text-emerald-100/70 font-bold">
                    Líquido no Bolso / Dia
                  </span>
                  <span className="text-emerald-400 font-bold text-lg tabular-nums">
                    R${' '}
                    {netDay.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {/* Visual bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/30">
                  <span>Seu lucro vs taxa</span>
                  <span>90% é seu</span>
                </div>
                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '90%' } : {}}
                    transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. REQUISITOS SECTION
   ═══════════════════════════════════════════════════════════ */
function RequisitosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const requisitos = [
    {
      title: 'CNH Definitiva',
      desc: 'Com observação Exerce Atividade Remunerada (EAR) obrigatória.',
      icon: <FileText className="w-6 h-6" />,
      gradient: 'from-emerald-500/20 to-emerald-600/5',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Idade 21+',
      desc: '21 anos completos no momento do cadastro para segurança de todos.',
      icon: <Shield className="w-6 h-6" />,
      gradient: 'from-teal-500/20 to-teal-600/5',
      iconColor: 'text-teal-400',
    },
    {
      title: 'Veículo 4 Portas',
      desc: 'Carro com 4 portas, ar-condicionado e até 10 anos de fabricação.',
      icon: <Car className="w-6 h-6" />,
      gradient: 'from-cyan-500/20 to-cyan-600/5',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'CRLV Digital',
      desc: 'Licenciamento em dia. Documento digital atualizado obrigatório.',
      icon: <CheckCircle2 className="w-6 h-6" />,
      gradient: 'from-emerald-500/20 to-emerald-600/5',
      iconColor: 'text-emerald-400',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.6, type: 'spring' as const, stiffness: 60 },
    }),
  };

  return (
    <section id="requisitos" className="py-24 bg-[#030712] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pré-Requisitos
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            O Que Você{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Precisa
            </span>
          </h2>
          <p className="mt-4 text-emerald-50/60 font-medium max-w-lg mx-auto">
            Pouca burocracia, muita segurança. Padrão exigido para manter nossa frota premium.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requisitos.map((req, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative bg-gradient-to-b from-[#121a28] to-[#0a0f18] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${req.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Top line */}
              <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-emerald-500/0 group-hover:via-emerald-500/40 to-transparent transition-all duration-500" />

              <div className="relative z-10">
                <div className={`w-14 h-14 bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${req.iconColor}`}>
                  {req.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">
                  {req.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                  {req.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. DEPOIMENTOS / CTA SECTION
   ═══════════════════════════════════════════════════════════ */
function TestimonialCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden">
      {/* Big glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Testimonial Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-gradient-to-br from-[#1a2332] to-[#0c1322] border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl overflow-hidden">
              {/* Top glow line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

              {/* Quote mark */}
              <div className="text-6xl text-emerald-500/20 font-serif leading-none mb-4">&ldquo;</div>

              <p className="text-white/80 text-lg sm:text-xl leading-relaxed font-medium mb-8">
                Eu rodava em outro app e ficava com menos de 70% do faturamento. No Bora, fico com{' '}
                <span className="text-emerald-400 font-bold">90% de tudo</span>. Minha renda
                aumentou sem precisar trabalhar mais horas. É o app que realmente valoriza o
                motorista.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/30 flex-shrink-0">
                  <img
                    src="/assets/driver-profile.png"
                    alt="Motorista parceiro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold">Carlos Augusto</p>
                  <p className="text-emerald-400/70 text-sm font-medium">
                    Motorista Parceiro • Xinguara-PA
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1 mt-6 pt-6 border-t border-white/5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-emerald-400 text-emerald-400"
                  />
                ))}
                <span className="text-white/40 text-sm ml-2 font-medium">5.0 Avaliação no App</span>
              </div>
            </div>

            {/* Stats row below testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {[
                { value: '90%', label: 'Fica com você' },
                { value: '10%', label: 'Taxa fixa Bora' },
                { value: '0', label: 'Taxas escondidas' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center bg-[#121a28] border border-white/5 rounded-2xl py-4 px-3"
                >
                  <p className="text-2xl font-black text-emerald-400">{stat.value}</p>
                  <p className="text-xs text-white/40 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: CTA Block ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Pronto para{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                  ganhar mais?
                </span>
              </h2>
              <p className="mt-5 text-lg text-emerald-50/60 leading-relaxed">
                Faça seu pré-cadastro agora e comece a rodar com a plataforma que mais
                valoriza o motorista no Xingu. Processo 100% digital e rápido.
              </p>
            </div>

            {/* Benefits mini list */}
            <div className="space-y-4">
              {[
                'Cadastro rápido e 100% online',
                'Receba pagamentos toda semana',
                'Suporte humano via WhatsApp',
                'Sem surpresas — taxa única de 10%',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-emerald-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-white/70 font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/motorista/cadastro"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:shadow-[0_0_60px_rgba(16,185,129,0.35)] group"
              >
                Preencher Pré-Cadastro
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="/go/whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#121a28] hover:bg-[#1a2332] text-white px-8 py-4 rounded-xl border border-white/10 hover:border-emerald-500/20 transition-all duration-300 font-bold group"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                Falar no WhatsApp
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/Logotipo.png"
              alt="Bora Passageiro"
              className="h-8 w-auto brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-white/40 hover:text-white transition-colors font-medium"
            >
              Início
            </Link>
            <Link
              href="/ranking"
              className="text-white/40 hover:text-white transition-colors font-medium"
            >
              Ranking
            </Link>
            <a
              href="#ganhos"
              className="text-white/40 hover:text-white transition-colors font-medium"
            >
              Ganhos
            </a>
            <a
              href="#requisitos"
              className="text-white/40 hover:text-white transition-colors font-medium"
            >
              Requisitos
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-white/30 text-sm font-medium">
            © {new Date().getFullYear()} Bora Passageiro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. FLOATING WHATSAPP BUTTON
   ═══════════════════════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <motion.a
      href="/go/whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center group"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />

      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-current relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function MotoristaPage() {
  return (
    <div className="bg-[#030712] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-50 antialiased">
      <PremiumHeaderMotorista />

      <main>
        {/* 2. Hero */}
        <MotoristaHero />
        {/* 3. Fintech Balance Card */}
        <FintechBalanceCard />
        {/* 4. Earnings Calculator */}
        <EarningsCalculator />
        {/* 5. Requisitos */}
        <RequisitosSection />
        {/* 6. Depoimentos / CTA */}
        <TestimonialCTA />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
