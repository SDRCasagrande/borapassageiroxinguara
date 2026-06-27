'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a taxa do Bora Passageiro?",
    answer: "Trabalhamos com a melhor taxa do mercado: 90% do valor da corrida fica com você. Nós ficamos com apenas 10% para manutenção do app e marketing. Sem taxas ocultas, sem surpresas."
  },
  {
    question: "Quais são os requisitos para dirigir?",
    answer: "Você precisa ter CNH definitiva com observação EAR (Exerce Atividade Remunerada), um carro de ano 2014 ou superior com 4 portas e ar-condicionado, e documento do carro (CRLV) em dia."
  },
  {
    question: "Como recebo o pagamento das corridas?",
    answer: "Corridas pagas em dinheiro ou PIX direto com você, o valor fica 100% na sua mão na hora (a taxa de 10% será descontada do seu saldo no app). Corridas no cartão no app caem na sua conta bancária semanalmente."
  },
  {
    question: "Em quanto tempo meu cadastro é aprovado?",
    answer: "Enviando todos os documentos certinhos pelo aplicativo, nossa equipe local de Xinguara analisa e aprova seu cadastro em menos de 24 horas úteis."
  },
  {
    question: "Posso trabalhar no meu próprio horário?",
    answer: "Sim! Você é seu próprio chefe. Ligue o aplicativo quando quiser trabalhar e desligue quando for descansar. Não exigimos jornada mínima."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            Dúvidas <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Frequentes</span>
          </motion.h2>
          <p className="text-slate-400 text-lg">Tudo que você precisa saber para começar a lucrar hoje mesmo.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'bg-slate-900/80 border-emerald-500/30' : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
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
