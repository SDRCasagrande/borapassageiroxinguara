'use client';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp } from 'lucide-react';

const testimonials = [
  {
    name: "Ricardo Mendes",
    time: "Motorista há 8 meses",
    content: "Trabalhei 4 anos em outros apps grandes. No Bora, a taxa justa faz meu faturamento final no fim do mês ser 40% maior. Além disso, conheço a equipe e o suporte é local.",
    earnings: "Faturamento médio: R$ 6.200/mês"
  },
  {
    name: "Juliana Silva",
    time: "Motorista há 1 ano",
    content: "O que me conquistou foi a transparência. O cliente paga X, eu sei exatamente o que sobra pra mim (e é a maior parte). O volume de chamadas em Xinguara é absurdo de bom.",
    earnings: "Faturamento médio: R$ 5.800/mês"
  },
  {
    name: "Fernando Costa",
    time: "Motorista há 5 meses",
    content: "Fiz o cadastro e em menos de 24h já estava rodando. O aplicativo é leve, não trava o celular, e os passageiros são muito mais educados.",
    earnings: "Faturamento médio: R$ 4.900/mês"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            A escolha dos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">profissionais.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Veja o que dizem os motoristas que trocaram as taxas abusivas pela parceria justa do Bora Passageiro.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 relative group hover:border-emerald-500/50 transition-colors flex flex-col"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-300 mb-8 leading-relaxed flex-1">
                "{t.content}"
              </p>
              
              <div className="mb-6 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold text-sm">{t.earnings}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{t.name.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-sm text-slate-400">{t.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
