'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Mariana Souza",
    role: "Estudante",
    content: "Melhor opção em Xinguara! Os carros chegam rápido, são limpos e o preço é bem mais justo que nos outros apps. Uso todo dia pra ir pra faculdade.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo",
    role: "Empresário",
    content: "O que mais me impressionou foi a segurança. Posso compartilhar minha rota com minha esposa e os motoristas são super educados e profissionais.",
    rating: 5,
  },
  {
    name: "Ana Clara",
    role: "Professora",
    content: "Antes eu ficava horas esperando no ponto. Agora com o Bora, chego rápido na escola e o aplicativo é super fácil de usar, até minha mãe já baixou!",
    rating: 5,
  }
];

export function Testimonials({ data }: { data?: any }) {
  const items = data?.items || testimonials;

  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            {data?.heading ? (
              <span dangerouslySetInnerHTML={{ __html: data.heading.replace('recomenda.', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">recomenda.</span>') }} />
            ) : (
              <>Quem usa, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">recomenda.</span></>
            )}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            {data?.subtitle || 'Junte-se a milhares de passageiros que já transformaram a forma como se movem por Xinguara e região.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 relative group hover:border-indigo-500/50 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-300 mb-8 leading-relaxed">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{t.name.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
