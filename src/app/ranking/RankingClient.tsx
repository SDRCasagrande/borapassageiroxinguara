'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Crown, Flame, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Motorista {
  id: string;
  nome: string;
  pontos: number;
  corridas: number;
  fotoUrl: string | null;
}

/* ─── CONFETTI PARTICLE ─────────────────────────────────── */
function ConfettiParticle({ delay, left }: { delay: number; left: string }) {
  const colors = ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#FF69B4', '#7B68EE'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 4;
  const duration = Math.random() * 3 + 3;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ 
        y: '100vh', 
        opacity: [1, 1, 0],
        rotate: rotation + 720,
        x: [0, Math.random() * 100 - 50, Math.random() * 60 - 30],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        left,
        top: 0,
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        borderRadius: 1,
        zIndex: 50,
      }}
    />
  );
}

/* ─── SPARKLE ───────────────────────────────────────────── */
function Sparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
      }}
      className="absolute text-amber-300 pointer-events-none"
      style={{ left: x, top: y }}
    >
      <Star className="w-3 h-3 fill-current" />
    </motion.div>
  );
}

/* ─── PODIUM BLOCK ──────────────────────────────────────── */
function PodiumBlock({ 
  motorista, 
  rank, 
  height, 
  delay 
}: { 
  motorista: Motorista; 
  rank: number; 
  height: string; 
  delay: number;
}) {
  const gradients: Record<number, string> = {
    1: 'from-amber-400 via-yellow-500 to-amber-600',
    2: 'from-slate-300 via-gray-400 to-slate-500',
    3: 'from-orange-500 via-amber-700 to-orange-800',
  };

  const glowColors: Record<number, string> = {
    1: 'shadow-[0_0_60px_rgba(251,191,36,0.4)]',
    2: 'shadow-[0_0_40px_rgba(148,163,184,0.3)]',
    3: 'shadow-[0_0_40px_rgba(234,88,12,0.3)]',
  };

  const photoSizes: Record<number, string> = {
    1: 'w-28 h-28 sm:w-32 sm:h-32',
    2: 'w-20 h-20 sm:w-24 sm:h-24',
    3: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring', stiffness: 80 }}
      className="flex flex-col items-center relative"
    >
      {/* Crown for #1 */}
      {rank === 1 && (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.5, type: 'spring' }}
          className="mb-2 relative"
        >
          <Crown className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] fill-amber-400/30" />
        </motion.div>
      )}

      {/* Medal for 2nd/3rd */}
      {rank !== 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.5, type: 'spring' }}
          className="mb-2"
        >
          <Medal className={`w-8 h-8 ${rank === 2 ? 'text-slate-300' : 'text-orange-500'}`} />
        </motion.div>
      )}

      {/* Photo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.3, type: 'spring' }}
        className={`
          ${photoSizes[rank]} rounded-full p-1 
          bg-gradient-to-br ${gradients[rank]}
          ${glowColors[rank]}
          relative z-10
        `}
      >
        <img 
          src={motorista.fotoUrl || `https://i.pravatar.cc/300?u=${motorista.id}`}
          alt={motorista.nome}
          className="w-full h-full object-cover rounded-full border-4 border-[#0a0e1a]"
        />
        {/* Glow ring animation for #1 */}
        {rank === 1 && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-amber-400/60 border-r-amber-400/30 pointer-events-none"
          />
        )}
      </motion.div>

      {/* Name */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6 }}
        className={`mt-3 font-bold text-center truncate max-w-[120px] ${rank === 1 ? 'text-amber-400 text-lg sm:text-xl' : 'text-white text-sm sm:text-base'}`}
      >
        {motorista.nome.split(' ')[0]}
      </motion.p>

      {/* Points badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.7, type: 'spring' }}
        className="flex items-center gap-1 mt-1"
      >
        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
        <span className="text-amber-400/80 font-mono text-sm font-bold">{motorista.pontos}</span>
      </motion.div>

      {/* The Podium Pillar */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ delay: delay + 0.1, duration: 0.8, type: 'spring', stiffness: 60 }}
        className={`
          w-24 sm:w-32 md:w-36 mt-3 rounded-t-2xl overflow-hidden relative
          bg-gradient-to-t ${gradients[rank]}
        `}
      >
        {/* Inner shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20" />
        
        {/* Rank Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-7xl font-black text-black/15 select-none">{rank}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN RANKING CLIENT ───────────────────────────────── */
export function RankingClient({ motoristas }: { motoristas: Motorista[] }) {
  const top3 = motoristas.slice(0, 3);
  const others = motoristas.slice(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Ensure we have at least 3 motoristas for the podium
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return (
    <div className="min-h-screen bg-[#060a15] text-white overflow-hidden relative font-sans selection:bg-amber-500/30">
      
      {/* ── BACKGROUND BANNER SLOT ─────────────────────────── */}
      {/* Troque a URL abaixo pela imagem de fundo do seu banner */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/assets/ranking-bg.jpg')" }}
      />
      {/* Stadium glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-[#060a15]/80 to-[#060a15]" />
      {/* Radial spotlight on podium */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* ── CONFETTI ───────────────────────────────────────── */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiParticle 
              key={i} 
              delay={Math.random() * 5} 
              left={`${Math.random() * 100}%`} 
            />
          ))}
        </div>
      )}

      {/* ── SPARKLES ───────────────────────────────────────── */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 15 }).map((_, i) => (
            <Sparkle
              key={i}
              delay={Math.random() * 3}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 80}%`}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* ── HEADER ─────────────────────────────────────── */}
        <header className="text-center mb-8 relative">
          <Link href="/" className="absolute left-0 top-1 text-white/40 hover:text-white flex items-center gap-1 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            className="inline-flex items-center justify-center mb-4"
          >
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] fill-amber-400/20" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl font-black"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-lg">
              Hall da Fama
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-300/80 text-sm font-medium">Ranking atualizado diariamente. Reavalie!</span>
          </motion.div>
        </header>

        {/* ── SCOREBOARD TABLE ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-b from-[#1a1f3a] to-[#0d1025] border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-600/30 border-b border-amber-500/30">
              <div className="grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] items-center px-4 sm:px-6 py-3">
                <span className="text-amber-400/60 text-xs font-bold uppercase tracking-wider">#</span>
                <span className="text-amber-400/80 text-xs font-bold uppercase tracking-wider">Motorista</span>
                <span className="text-amber-400/80 text-xs font-bold uppercase tracking-wider text-center">Corridas</span>
                <span className="text-amber-400/80 text-xs font-bold uppercase tracking-wider text-center">Pontos</span>
              </div>
            </div>
            
            {/* Table Rows - Top 3 */}
            {top3.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                className={`
                  grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] items-center px-4 sm:px-6 py-3
                  border-b border-white/5 hover:bg-white/[0.03] transition-colors
                  ${i === 0 ? 'bg-amber-500/5' : ''}
                `}
              >
                <span className={`font-black text-lg ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-slate-300' : 'text-orange-500'}`}>
                  {i + 1}
                </span>
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    src={m.fotoUrl || `https://i.pravatar.cc/150?u=${m.id}`}
                    alt={m.nome}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/10 flex-shrink-0"
                  />
                  <span className="font-bold text-white truncate text-sm sm:text-base">{m.nome}</span>
                </div>
                <span className="text-center text-white/60 font-mono font-medium">{m.corridas}</span>
                <span className="text-center text-amber-400 font-mono font-bold">{m.pontos}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── THE PODIUM ───────────────────────────────────── */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 mb-16 min-h-[400px] sm:min-h-[450px]">
          {/* 2nd Place (Left) */}
          {second && (
            <PodiumBlock motorista={second} rank={2} height="160px" delay={0.6} />
          )}

          {/* 1st Place (Center) */}
          {first && (
            <PodiumBlock motorista={first} rank={1} height="220px" delay={0.3} />
          )}

          {/* 3rd Place (Right) */}
          {third && (
            <PodiumBlock motorista={third} rank={3} height="130px" delay={0.9} />
          )}
        </div>

        {/* ── REST OF LEADERBOARD (4th+) ───────────────────── */}
        {others.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-b from-[#1a1f3a]/80 to-[#0d1025]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Medal className="w-5 h-5 text-indigo-400" />
                  Classificação Geral
                </h2>
              </div>

              <div className="divide-y divide-white/5">
                {others.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7 + i * 0.1 }}
                    className="grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] items-center px-4 sm:px-6 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-white/30 font-mono font-bold">#{i + 4}</span>
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={m.fotoUrl || `https://i.pravatar.cc/150?u=${m.id}`}
                        alt={m.nome}
                        className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
                      />
                      <span className="font-medium text-white truncate text-sm">{m.nome}</span>
                    </div>
                    <span className="text-center text-white/40 font-mono text-sm">{m.corridas}</span>
                    <span className="text-center text-amber-400/70 font-mono font-bold text-sm">{m.pontos}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FOOTER ───────────────────────────────────────── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-12 pb-8"
        >
          <img src="/assets/Logotipo.png" alt="Bora Passageiro" className="h-10 mx-auto opacity-30 brightness-0 invert mb-4" />
          <p className="text-white/20 text-sm">Bora Passageiro &copy; {new Date().getFullYear()}</p>
        </motion.footer>
      </div>
    </div>
  );
}
