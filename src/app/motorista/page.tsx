'use client';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Car, DollarSign, Clock, Shield, TrendingUp, HandCoins, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* ─── PREMIUM HEADER MOTORISTA ─────────────────────────── */
function PremiumHeaderMotorista() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f18]/80 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/assets/Logotipo.png" alt="Bora Motorista" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#ganhos" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Ganhos & Taxas</a>
          <a href="#requisitos" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Requisitos</a>
        </nav>
        <a href="/go/whatsapp" target="_blank" rel="noopener noreferrer" className="text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
          Cadastre-se Já
        </a>
      </div>
    </header>
  );
}

/* ─── HERO MOTORISTA V3 ────────────────────────────────── */
function MotoristaHeroV3() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#030712]">
      {/* Dynamic Backgrounds */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Vagas na Região do Xingu
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]"
          >
            Sua dedicação,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">seu lucro real.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-emerald-50/60 max-w-lg font-medium"
          >
            O Bora Passageiro repassa o lucro de forma justa. Nossa taxa fixa de 10% garante que o dinheiro fique no seu bolso de verdade.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a href="/go/whatsapp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              Começar Agora <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#ganhos" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all">
              Simular Ganhos
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-4 text-emerald-50/50 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Ganhos Diários
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Horário Flexível
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Fintech Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="relative z-20 w-full max-w-md mx-auto bg-gradient-to-br from-[#1a2332] to-[#0c1322] border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-emerald-500/10 before:to-transparent before:pointer-events-none">
            {/* Glossy top highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-1">Seu Saldo</p>
                <h3 className="text-5xl font-black text-white tracking-tighter">R$ 1.845<span className="text-2xl text-white/40">,50</span></h3>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Corridas Hoje</p>
                    <p className="text-sm text-white/50">24 finalizadas</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold">+ R$ 340,00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                    <HandCoins className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Bora Passageiro</p>
                    <p className="text-sm text-white/50">Taxa do App</p>
                  </div>
                </div>
                <span className="text-white/40 font-bold">- R$ 34,00</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <div className="text-sm text-white/50">Dividendo Semanal</div>
              <div className="inline-flex items-center gap-1 text-emerald-400 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                +24% vs semana anterior
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NEO-FINTECH CALCULATOR ───────────────────────────── */
function EarningsNeoCalculator() {
  const [rides, setRides] = useState(15);
  const averageTicket = 15; // R$ 15 avg per ride
  const totalGross = rides * averageTicket;
  const boraFee = totalGross * 0.10; // 10%
  const netEarningsDay = totalGross - boraFee;
  const netEarningsMonth = netEarningsDay * 25; // 25 days/month

  return (
    <section id="ganhos" className="py-24 bg-[#0a0f18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Simulador <span className="text-emerald-400">Transparente</span></h2>
          <p className="mt-4 text-lg text-emerald-50/60 max-w-2xl mx-auto">
            Sem taxas ocultas, sem letras miúdas. Calcule exatamente quanto vai para o seu bolso com a nossa taxa de 10%.
          </p>
        </div>

        <div className="bg-[#121a28] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row max-w-5xl mx-auto">
          {/* Controls */}
          <div className="p-8 md:p-12 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8">Quantas corridas por dia?</h3>
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-emerald-50/50 font-medium">Média diária</span>
                  <span className="text-4xl font-black text-emerald-400">{rides}</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="40" 
                  value={rides}
                  onChange={(e) => setRides(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/50 accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/30 font-bold">
                  <span>5 corridas</span>
                  <span>40 corridas</span>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-white/60 font-medium text-sm">Ticket Médio Estimado</p>
                  <p className="text-xs text-white/40 mt-1">Valor base de simulação em Xinguara</p>
                </div>
                <span className="text-xl font-bold text-white">R$ 15,00</span>
              </div>
            </div>
          </div>

          {/* Result Widget */}
          <div className="p-8 md:p-12 lg:w-1/2 bg-gradient-to-br from-[#162032] to-[#0c1322] flex flex-col justify-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-emerald-400 font-bold tracking-widest text-sm uppercase">Ganhos Mensais (25 dias)</p>
                <h4 className="text-6xl sm:text-7xl font-black text-white tracking-tighter">
                  R$ {netEarningsMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h4>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Faturamento Bruto Dia</span>
                  <span className="text-white font-medium">R$ {totalGross.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Taxa Bora Passeio (10%)</span>
                  <span className="text-rose-400 font-medium">- R$ {boraFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-white/5">
                  <span className="text-emerald-100/70 font-bold">Líquido no Bolso (Dia)</span>
                  <span className="text-emerald-400 font-bold text-lg">R$ {netEarningsDay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── REQUISITOS MOTORISTA V3 ────────────────────────────── */
function RequisitosMotorista() {
  const requisitos = [
    { title: "CNH Definitiva", desc: "Com observação Exerce Atividade Remunerada (EAR)", icon: <Shield className="w-6 h-6 text-emerald-400" /> },
    { title: "Idade Mínima", desc: "21 anos completos no momento do cadastro", icon: <Clock className="w-6 h-6 text-emerald-400" /> },
    { title: "Veículo Próprio", desc: "Carro com 4 portas, ar-condicionado e até 10 anos de fabricação", icon: <Car className="w-6 h-6 text-emerald-400" /> },
    { title: "Documentação", desc: "CRLV digital atualizado (Licenciamento em dia)", icon: <Shield className="w-6 h-6 text-emerald-400" /> },
  ];

  return (
    <section id="requisitos" className="py-24 bg-[#030712] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">O Que Você <span className="text-emerald-400">Precisa</span></h2>
          <p className="mt-4 text-emerald-50/60 font-medium">Pouca burocracia, muita segurança. Padrão exigido para manter nossa frota premium.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requisitos.map((req, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-b from-[#121a28] to-[#0a0f18] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                {req.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{req.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{req.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/go/whatsapp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#121a28] hover:bg-[#1a2332] text-white px-8 py-4 rounded-xl border border-white/10 transition-colors font-bold group">
            Começar Cadastro no WhatsApp 
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPORT PAGE ────────────────────────────────────────── */
export default function MotoristaPage() {
  return (
    <div className="bg-[#030712] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-50">
      <PremiumHeaderMotorista />
      
      <main>
        <MotoristaHeroV3 />
        <EarningsNeoCalculator />
        <RequisitosMotorista />
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
