'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Crown, Flame, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Motorista {
  id: string;
  nome: string;
  corridasMes: number;
  fotoUrl: string | null;
  status: string;
}

/* ─── CONFETTI ──────────────────────────────────────────── */
function ConfettiParticle({ delay, left }: { delay: number; left: string }) {
  const colors = ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#FF69B4', '#7B68EE'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 4;
  const duration = Math.random() * 3 + 3;

  return (
    <motion.div
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: '100vh', opacity: [1, 1, 0], rotate: 720, x: [0, Math.random() * 80 - 40] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      style={{ position: 'absolute', left, top: 0, width: size, height: size * 0.6, backgroundColor: color, borderRadius: 1, zIndex: 50 }}
    />
  );
}

/* ─── SPARKLE ───────────────────────────────────────────── */
function Sparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
      className="absolute text-amber-300 pointer-events-none"
      style={{ left: x, top: y }}
    >
      <Star className="w-3 h-3 fill-current" />
    </motion.div>
  );
}

/* ─── PODIUM BLOCK ──────────────────────────────────────── */
function PodiumBlock({ motorista, rank, height, delay }: { motorista: Motorista; rank: number; height: string; delay: number }) {
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
      {rank === 1 && (
        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: delay + 0.5, type: 'spring' }} className="mb-2">
          <Crown className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] fill-amber-400/30" />
        </motion.div>
      )}
      {rank !== 1 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.5, type: 'spring' }} className="mb-2">
          <Medal className={`w-8 h-8 ${rank === 2 ? 'text-slate-300' : 'text-orange-500'}`} />
        </motion.div>
      )}

      {/* Photo */}
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.3, type: 'spring' }}
        className={`${photoSizes[rank]} rounded-full p-1 bg-gradient-to-br ${gradients[rank]} ${glowColors[rank]} relative z-10`}
      >
        <img src={motorista.fotoUrl || `https://i.pravatar.cc/300?u=${motorista.id}`} alt={motorista.nome} className="w-full h-full object-cover rounded-full border-4 border-[#0a0e1a]" />
        {rank === 1 && (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-amber-400/60 border-r-amber-400/30 pointer-events-none" />
        )}
        {/* Status dot */}
        <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#0a0e1a] ${motorista.status === 'alerta' ? 'bg-orange-400' : 'bg-emerald-400'}`} />
      </motion.div>

      {/* Name + Corridas */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.6 }}
        className={`mt-3 font-bold text-center truncate max-w-[120px] ${rank === 1 ? 'text-amber-400 text-lg sm:text-xl' : 'text-white text-sm sm:text-base'}`}
      >
        {motorista.nome.split(' ')[0]}
      </motion.p>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.7, type: 'spring' }}
        className="flex items-center gap-1 mt-1"
      >
        <span className="text-amber-400/80 font-mono text-sm font-bold">{motorista.corridasMes} corridas</span>
      </motion.div>

      {/* Pillar */}
      <motion.div
        initial={{ height: 0 }} animate={{ height }} transition={{ delay: delay + 0.1, duration: 0.8, type: 'spring', stiffness: 60 }}
        className={`w-24 sm:w-32 md:w-36 mt-3 rounded-t-2xl overflow-hidden relative bg-gradient-to-t ${gradients[rank]}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-7xl font-black text-black/15 select-none">{rank}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */
export function RankingClient({ motoristas }: { motoristas: Motorista[] }) {
  const top3 = motoristas.slice(0, 3);
  const others = motoristas.slice(3);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => { setMounted(true); }, []);

  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return (
    <div className="min-h-screen bg-[#060a15] text-white overflow-hidden relative font-sans selection:bg-amber-500/30">
      {/* Background Banner */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/assets/ranking-bg.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-[#060a15]/80 to-[#060a15]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Confetti */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiParticle key={i} delay={Math.random() * 5} left={`${Math.random() * 100}%`} />
          ))}
        </div>
      )}
      {/* Sparkles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 15 }).map((_, i) => (
            <Sparkle key={i} delay={Math.random() * 3} x={`${Math.random() * 100}%`} y={`${Math.random() * 80}%`} />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12 relative">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }} className="inline-flex items-center justify-center mb-4">
            <img src="/assets/Logotipo.png" alt="Bora Passageiro" className="h-24 sm:h-32 brightness-0 invert drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] object-contain" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl sm:text-5xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">Hall da Fama</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-3 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-300/80 text-sm font-medium">Ranking atualizado diariamente. Reavalie!</span>
          </motion.div>
        </header>

        {/* Podium */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 mb-16 min-h-[400px] sm:min-h-[450px]">
          {second && <PodiumBlock motorista={second} rank={2} height="160px" delay={0.6} />}
          {first && <PodiumBlock motorista={first} rank={1} height="220px" delay={0.3} />}
          {third && <PodiumBlock motorista={third} rank={3} height="130px" delay={0.9} />}
        </div>

        {/* Leaderboard 4th+ (corridas ocultas) */}
        {others.length > 0 && (() => {
          const pageSize = 10;
          const totalPages = Math.ceil(others.length / pageSize);
          const startIndex = (currentPage - 1) * pageSize;
          const currentOthers = others.slice(startIndex, startIndex + pageSize);

          return (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: currentPage === 1 ? 0.8 : 0 }} className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-b from-[#1a1f3a]/80 to-[#0d1025]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Medal className="w-5 h-5 text-indigo-400" /> Classificação Geral
                  </h2>
                </div>
                <div className="divide-y divide-white/5">
                  {currentOthers.map((m, i) => {
                    const globalRank = startIndex + i + 4;
                    return (
                      <motion.div key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (currentPage === 1 ? 0.9 : 0) + i * 0.05 }}
                        className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="w-10 text-white/30 font-mono font-bold">#{globalRank}</span>
                        <img src={m.fotoUrl || `https://i.pravatar.cc/150?u=${m.id}`} alt={m.nome} className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0" />
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="font-medium text-white truncate">{m.nome}</span>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${m.status === 'alerta' ? 'bg-orange-400' : 'bg-emerald-400'}`} />
                        </div>
                        <span className="flex items-center gap-1 text-white/30 text-sm font-medium">
                          <Lock className="w-3.5 h-3.5" /> Confidencial
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Anterior
                    </button>
                    <span className="text-sm font-medium text-white/40">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* Footer */}
        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-center mt-12 pb-8">
          <img src="/assets/Logotipo.png" alt="Bora Passageiro" className="h-14 mx-auto opacity-40 brightness-0 invert mb-4" />
          <p className="text-white/20 text-sm">Bora Passageiro &copy; {new Date().getFullYear()}</p>
        </motion.footer>
      </div>
    </div>
  );
}
