/**
 * Conteúdo padrão do site Motorista.
 * Usado como fallback quando o banco de dados não tem conteúdo cadastrado.
 */
export const motoristaDefaults: Record<string, any> = {
  hero: {
    badge: 'Vagas Abertas na Região do Xingu',
    title: 'Sua dedicação,',
    titleGradient: 'seu lucro real.',
    subtitle: 'No Bora Passageiro você tem planos com taxas justas e fica com até 90% do valor da corrida! Nossa taxa padrão é de 25% e você pode melhorar seus lucros.',
    taxRate: '10%',
    ctaText: 'Começar Agora',
    secondaryCtaText: 'Simular Ganhos',
    phoneImage: '/assets/phone-mockups.png',
    miniStats: [
      { label: 'Ganhos Diários' },
      { label: 'Horário Flexível' },
      { label: 'Cadastro Rápido' },
    ],
    floatingBadges: [
      { label: 'Ganhos Hoje', value: 'R$ 340,00' },
      { label: 'Fica com você', value: 'Até 90%' },
    ],
  },
  fintech: {
    title: 'Controle Total dos Seus',
    titleGradient: 'Ganhos',
    subtitle: 'Acompanhe em tempo real cada corrida, taxa e saldo. Tudo transparente, direto no app.',
    balanceLabel: 'Seu Saldo',
    balanceValue: 'R$ 1.845,50',
    rows: [
      { label: 'Corridas Hoje', subLabel: '24 finalizadas', value: '+ R$ 340,00', color: 'emerald' },
      { label: 'Taxa Bora', subLabel: 'Taxa padrão de 25% do faturamento', value: '- R$ 85,00', color: 'rose' },
      { label: 'Líquido no Bolso', subLabel: 'Seu dinheiro de verdade', value: 'R$ 255,00', color: 'emerald' },
    ],
    bottomLabel: 'Desempenho Semanal',
    bottomValue: '+24% vs semana anterior',
  },
  calculator: {
    badge: 'Simulador de Ganhos',
    title: 'Simulador',
    titleGradient: 'Transparente',
    subtitle: 'Sem taxas ocultas, sem letras miúdas. Simule os ganhos com base na nossa taxa padrão de 25%.',
    averageTicket: 15,
    feePercent: 25,
    workingDays: 25,
    sliderMin: 5,
    sliderMax: 40,
    defaultRides: 15,
  },
  requisitos: {
    badge: 'Pré-Requisitos',
    title: 'O Que Você',
    titleGradient: 'Precisa',
    subtitle: 'Pouca burocracia, muita segurança. Padrão exigido para manter nossa frota premium.',
    items: [
      { title: 'CNH Definitiva', description: 'Com observação Exerce Atividade Remunerada (EAR) obrigatória.' },
      { title: 'Idade 21+', description: '21 anos completos no momento do cadastro para segurança de todos.' },
      { title: 'Veículo 4 Portas', description: 'Carro com 4 portas, ar-condicionado e até 10 anos de fabricação.' },
      { title: 'CRLV Digital', description: 'Licenciamento em dia. Documento digital atualizado obrigatório.' },
    ],
  },
  testimonials: {
    heading: 'A escolha dos',
    headingGradient: 'profissionais.',
    subtitle: 'Veja o que dizem os motoristas que trocaram as taxas abusivas pela parceria justa do Bora Passageiro.',
    items: [
      { name: 'Ricardo Mendes', time: 'Motorista há 8 meses', content: 'Trabalhei 4 anos em outros apps grandes. No Bora, a taxa justa faz meu faturamento final no fim do mês ser 40% maior. Além disso, conheço a equipe e o suporte é local.', earnings: 'Faturamento médio: R$ 6.200/mês' },
      { name: 'Juliana Silva', time: 'Motorista há 1 ano', content: 'O que me conquistou foi a transparência. O cliente paga X, eu sei exatamente o que sobra pra mim (e é a maior parte). O volume de chamadas em Xinguara é absurdo de bom.', earnings: 'Faturamento médio: R$ 5.800/mês' },
      { name: 'Fernando Costa', time: 'Motorista há 5 meses', content: 'Fiz o cadastro e em menos de 24h já estava rodando. O aplicativo é leve, não trava o celular, e os passageiros são muito mais educados.', earnings: 'Faturamento médio: R$ 4.900/mês' },
    ],
  },
  faq: {
    heading: 'Dúvidas',
    headingGradient: 'Frequentes',
    subtitle: 'Tudo que você precisa saber para começar a lucrar hoje mesmo.',
    items: [
      { question: 'Como funciona a taxa do Bora Passageiro?', answer: 'Trabalhamos com taxas justas e transparentes. A taxa padrão é de 25% para a empresa e 75% fica com você. Não temos taxas ocultas e oferecemos planos melhores conforme seu desempenho.' },
      { question: 'Quais são os requisitos para dirigir?', answer: 'Você precisa ter CNH definitiva com observação EAR (Exerce Atividade Remunerada), um carro de ano 2014 ou superior com 4 portas e ar-condicionado, e documento do carro (CRLV) em dia.' },
      { question: 'Como recebo o pagamento das corridas?', answer: 'Corridas pagas em dinheiro ou PIX direto com você, o valor fica 100% na sua mão na hora (a taxa será descontada do seu saldo no app). Corridas no cartão no app caem na sua conta bancária semanalmente.' },
      { question: 'Em quanto tempo meu cadastro é aprovado?', answer: 'Enviando todos os documentos certinhos pelo aplicativo, nossa equipe local de Xinguara analisa e aprova seu cadastro em menos de 24 horas úteis.' },
      { question: 'Posso trabalhar no meu próprio horário?', answer: 'Sim! Você é seu próprio chefe. Ligue o aplicativo quando quiser trabalhar e desligue quando for descansar. Não exigimos jornada mínima.' },
    ],
  },
  cta: {
    quote: 'Eu rodava em outro app e pagava taxas abusivas que consumiam meu faturamento. No Bora, tenho a parceria mais justa do mercado. Minha renda aumentou sem precisar trabalhar mais horas. É o app que realmente valoriza o motorista.',
    quoteName: 'Carlos Augusto',
    quoteSubtitle: 'Motorista Parceiro • Xinguara-PA',
    quoteRating: '5.0 Avaliação no App',
    quoteImage: '/assets/driver-profile.png',
    stats: [
      { value: 'Até 90%', label: 'Fica com você' },
      { value: 'A partir de 10%', label: 'Taxa Bora' },
      { value: '0', label: 'Taxas escondidas' },
    ],
    heading: 'Pronto para',
    headingGradient: 'ganhar mais?',
    subtitle: 'Faça seu pré-cadastro agora e comece a rodar com a plataforma que mais valoriza o motorista no Xingu. Processo 100% digital e rápido.',
    benefits: [
      'Cadastro rápido e 100% online',
      'Receba pagamentos toda semana',
      'Suporte humano via WhatsApp',
      'Sem surpresas — taxas a partir de 10%',
    ],
    ctaButton: 'Preencher Pré-Cadastro',
    whatsappButton: 'Falar no WhatsApp',
  },
  footer: {
    whatsappNumber: '5594992777717',
  },
  config: {
    whatsappNumber: '5594992777717',
    siteUrl: 'https://borapassageiroxinguara.com.br',
    cadastroUrl: '/motorista/cadastro',
    cidadesDisponiveis: ['Xinguara - PA', 'Redenção - PA', 'Conceição do Araguaia - PA'],
  },
};
