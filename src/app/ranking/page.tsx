'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mockup Data
const initialDrivers = [
  { id: '1', name: 'Rodrigo Silva', rides: 145, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'João Santos', rides: 132, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Marcos Paulo', rides: 120, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Ana Costa', rides: 98, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Carlos Lima', rides: 85, avatar: 'https://i.pravatar.cc/150?u=5' },
];

export default function RankingPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [alertMsg, setAlertMsg] = useState('');

  // Simulating real-time updates for the presentation
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers((prev) => {
        const newDrivers = [...prev];
        // Simulate João (index 1) getting a ride and passing Rodrigo (index 0) if he overtakes
        const joao = newDrivers.find(d => d.id === '2');
        if (joao) {
          joao.rides += 5; // Fast progression for demo
          newDrivers.sort((a, b) => b.rides - a.rides);
          
          if (newDrivers[0].id === '2' && prev[0].id !== '2') {
            setAlertMsg('🚀 João Santos acabou de assumir a liderança!');
            setTimeout(() => setAlertMsg(''), 4000);
          }
        }
        return newDrivers;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-md mx-auto p-6 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-10 pt-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-neutral-900/50 rounded-2xl mb-4 border border-neutral-800 backdrop-blur-md"
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
            Brasileirão dos Motoristas
          </h1>
          <p className="text-neutral-400 text-sm">
            Top 3 ganham <strong className="text-emerald-400">Taxa Reduzida (5%)</strong>
          </p>
          
          {/* Timer */}
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/20">
            <Flame className="w-4 h-4" />
            Faltam 3 dias para fechar a quinzena!
          </div>
        </header>

        {/* Live Alert */}
        <AnimatePresence>
          {alertMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm font-medium text-center shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md"
            >
              {alertMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ranking List */}
        <div className="space-y-4">
          <AnimatePresence>
            {drivers.map((driver, index) => {
              const isTop3 = index < 3;
              let medalColor = "text-neutral-500";
              if (index === 0) medalColor = "text-yellow-400";
              else if (index === 1) medalColor = "text-neutral-300";
              else if (index === 2) medalColor = "text-amber-600";

              return (
                <motion.div
                  key={driver.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md border transition-colors ${
                    isTop3 
                      ? 'bg-neutral-900/60 border-neutral-800/80 shadow-lg' 
                      : 'bg-neutral-900/30 border-transparent opacity-80'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center w-8">
                    {isTop3 ? (
                      <Medal className={`w-7 h-7 ${medalColor}`} />
                    ) : (
                      <span className="text-neutral-500 font-bold">{index + 1}º</span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <img src={driver.avatar} alt={driver.name} className="w-12 h-12 rounded-full border-2 border-neutral-800 object-cover" />
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                        <Star className="w-3 h-3 text-yellow-900" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-semibold ${isTop3 ? 'text-white' : 'text-neutral-300'}`}>
                      {driver.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                      {driver.rides}
                    </div>
                    <div className="text-xs text-neutral-500 font-medium">corridas</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
