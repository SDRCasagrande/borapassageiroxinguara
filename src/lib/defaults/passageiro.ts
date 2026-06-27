/**
 * Conteúdo padrão do site Passageiro.
 * Usado como fallback quando o banco de dados não tem conteúdo cadastrado.
 */
export const passageiroDefaults: Record<string, any> = {
  hero: {
    badge: 'Mobilidade Premium em Xinguara',
    title: 'Sua corrida está',
    titleGradient: 'a um toque.',
    subtitle: 'A nova era da mobilidade urbana em Xinguara. Peça seu carro com rapidez, segurança e tecnologia de ponta — direto do seu celular.',
    phoneImage: '/assets/phone-mockups.png',
  },
  stats: {
    items: [
      { value: '500+', label: 'Corridas / dia', suffix: '' },
      { value: '28+', label: 'Motoristas ativos', suffix: '' },
      { value: '4.9', label: 'Avaliação média', suffix: '★' },
      { value: '10min', label: 'Tempo médio', suffix: '' },
    ],
  },
  features: {
    sectionLabel: 'Vantagens',
    heading: 'Menos atrito.',
    headingGradient: 'Mais viagem.',
    items: [
      { title: 'Carros em Segundos', description: 'Sem espera longa. Nosso algoritmo conecta você instantaneamente ao motorista mais próximo disponível.' },
      { title: 'Segurança Total', description: 'Monitoramento GPS em tempo real, verificação de antecedentes e compartilhamento de viagem ao vivo.' },
      { title: 'Preço Justo', description: 'Tarifas transparentes calculadas antes da corrida. Sem surpresas, sem taxas ocultas.' },
      { title: 'Cobertura Ampla', description: 'Xinguara, Conceição e Redenção 100% integradas. Mobilidade sem fronteiras na sua região.' },
    ],
  },
  steps: {
    sectionLabel: 'Como funciona',
    heading: 'Fácil como respirar.',
    subtitle: '3 passos simples para estar a caminho do seu destino.',
    items: [
      { number: '01', title: 'Abra o App', description: 'Baixe o Bora Passageiro, crie sua conta em segundos e defina seu destino no mapa interativo.' },
      { number: '02', title: 'Peça sua Corrida', description: 'Com um toque, veja o preço estimado e conecte-se ao motorista mais próximo disponível.' },
      { number: '03', title: 'Chegue ao Destino', description: 'Acompanhe o trajeto em tempo real, compartilhe com amigos e avalie sua experiência.' },
    ],
  },
  testimonials: {
    heading: 'Quem usa, recomenda.',
    subtitle: 'Junte-se a milhares de passageiros que já transformaram a forma como se movem por Xinguara e região.',
    items: [
      { name: 'Mariana Souza', role: 'Estudante', content: 'Melhor opção em Xinguara! Os carros chegam rápido, são limpos e o preço é bem mais justo que nos outros apps. Uso todo dia pra ir pra faculdade.', rating: 5 },
      { name: 'Carlos Eduardo', role: 'Empresário', content: 'O que mais me impressionou foi a segurança. Posso compartilhar minha rota com minha esposa e os motoristas são super educados e profissionais.', rating: 5 },
      { name: 'Ana Clara', role: 'Professora', content: 'Antes eu ficava horas esperando no ponto. Agora com o Bora, chego rápido na escola e o aplicativo é super fácil de usar, até minha mãe já baixou!', rating: 5 },
    ],
  },
  faq: {
    heading: 'Dúvidas Frequentes',
    subtitle: 'Tudo que você precisa saber antes de fazer sua primeira viagem.',
    items: [
      { question: 'Como peço um carro no Bora Passageiro?', answer: 'É muito simples! Basta baixar o aplicativo, fazer um rápido cadastro e digitar seu destino. O aplicativo vai mostrar o valor da corrida antes mesmo de você confirmar. Depois é só aguardar o motorista.' },
      { question: 'Quais são as formas de pagamento aceitas?', answer: 'Aceitamos diversas formas de pagamento para sua comodidade: PIX direto no app, Cartão de Crédito cadastrado, Máquina de Cartão (com o motorista) e Dinheiro.' },
      { question: 'É seguro viajar com o Bora?', answer: 'A segurança é nossa prioridade nº 1. Todos os nossos motoristas passam por uma rigorosa checagem de antecedentes. Além disso, você pode compartilhar sua rota em tempo real com amigos e familiares.' },
      { question: 'Posso agendar uma corrida para outro horário?', answer: 'Sim! Nosso aplicativo possui a funcionalidade de agendamento. Você pode marcar uma corrida para o aeroporto, rodoviária ou compromissos importantes com antecedência.' },
      { question: 'O serviço funciona 24 horas?', answer: 'Com certeza! Temos motoristas parceiros rodando 24 horas por dia, 7 dias por semana em Xinguara para garantir que você nunca fique na mão.' },
    ],
  },
  cta: {
    sectionLabel: 'Disponível agora',
    heading: 'Baixe agora',
    headingGradient: 'e comece a viajar.',
    subtitle: 'Disponível para Android e iOS. Baixe gratuitamente e tenha a melhor experiência de mobilidade de Xinguara na palma da sua mão.',
  },
  footer: {
    description: 'A plataforma de mobilidade urbana que conecta passageiros e motoristas em Xinguara e região.',
    whatsappNumber: '5594992777717',
    instagramUrl: 'https://www.instagram.com/bora.passageiroxinguara/',
  },
  config: {
    playStoreUrl: 'https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&pcampaignid=web_share',
    appStoreUrl: 'https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558',
    siteUrl: 'https://borapassageiroxinguara.com.br',
  },
};
