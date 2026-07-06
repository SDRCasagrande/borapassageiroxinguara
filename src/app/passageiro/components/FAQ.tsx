'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Como peço um carro no Bora Passageiro?",
    answer: "É muito simples! Basta baixar o aplicativo, fazer um rápido cadastro e digitar seu destino. O aplicativo vai mostrar o valor da corrida antes mesmo de você confirmar. Depois é só aguardar o motorista."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos diversas formas de pagamento para sua comodidade: PIX direto no app, Cartão de Crédito cadastrado, Máquina de Cartão (com o motorista) e Dinheiro."
  },
  {
    question: "É seguro viajar com o Bora?",
    answer: "A segurança é nossa prioridade nº 1. Todos os nossos motoristas passam por uma rigorosa checagem de antecedentes. Além disso, você pode compartilhar sua rota em tempo real com amigos e familiares."
  },
  {
    question: "Posso agendar uma corrida para outro horário?",
    answer: "Sim! Nosso aplicativo possui a funcionalidade de agendamento. Você pode marcar uma corrida para o aeroporto, rodoviária ou compromissos importantes com antecedência."
  },
  {
    question: "O serviço funciona 24 horas?",
    answer: "Com certeza! Temos motoristas parceiros rodando 24 horas por dia, 7 dias por semana em Xinguara para garantir que você nunca fique na mão."
  }
];

export function FAQ({ data }: { data?: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = data?.items || faqs;

  return (
    <section className="py-24 bg-[#020610] relative z-10 border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            {data?.heading ? (
              <span dangerouslySetInnerHTML={{ __html: data.heading.replace('Frequentes', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Frequentes</span>') }} />
            ) : (
              <>Dúvidas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Frequentes</span></>
            )}
          </motion.h2>
          <p className="text-slate-400 text-lg">{data?.subtitle || 'Tudo que você precisa saber antes de fazer sua primeira viagem.'}</p>
        </div>

        <div className="space-y-4">
          {items.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-0 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
