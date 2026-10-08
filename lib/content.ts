// Toda a copy foi mantida igual à home atual de fretadao.com.br.
// Enquanto só a home estiver no novo projeto, os links internos apontam para o site atual.
export const SITE = "https://www.fretadao.com.br";
const u = (path: string) => `${SITE}${path}`;

export const links = {
  contato: u("/contato/"),
  contatoEquipe: u("/contato-com-a-equipe/"),
  guia: u(
    "/wp-content/uploads/2026/06/O-Guia-Definitivo-para-Contratacao-de-Fretamento-Corporativo-FRETADAO-V2.pdf",
  ),
  email: "mailto:comercial@fretadao.com.br",
  emailLabel: "comercial@fretadao.com.br",
  portalRH: "https://demo.fretadao.com/b2b/entrar",
};

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href?: string;
  /** imagem de destaque do mega menu (desktop) */
  image?: { src: string; alt: string };
  groups?: { title: string; items: NavChild[] }[];
};

export const segmentos: NavChild[] = [
  { label: "Logística", href: u("/logistica/") },
  { label: "Indústria", href: u("/industria/") },
  { label: "Farma", href: u("/farma/") },
  { label: "Alimentos e bebidas", href: u("/alimentos-e-bebidas/") },
  { label: "Compartilhado", href: u("/compartilhado/") },
  { label: "Escritórios", href: u("/escritorios/") },
];

export const servicos: NavChild[] = [
  { label: "Fretamento corporativo", href: u("/para-empresas/fretamento-corporativo/") },
  { label: "Transporte Individual", href: u("/para-empresas/transporte-individual/") },
  { label: "Gestão de Vale-transporte (VT)", href: u("/para-empresas/vale-transporte/") },
  { label: "Gestão de mobilidade", href: u("/para-empresas/gestao-de-mobilidade/") },
  { label: "Gestão para transportadores", href: u("/para-empresas/gestao-para-transportadores/") },
  { label: "Roteirização", href: u("/para-empresas/roteirizacao/") },
  { label: "Sustentabilidade e Carbono Zero", href: u("/para-empresas/sustentabilidade-e-carbono-zero/") },
  { label: "Diagnóstico de mobilidade", href: u("/para-empresas/diagnostico-de-mobilidade/") },
];

export const nav: NavItem[] = [
  { label: "Quem Somos", href: u("/quem-somos/") },
  {
    label: "Para empresas",
    href: u("/para-empresas/"),
    image: { src: "/images/menu-para-empresas.webp", alt: "Prédio corporativo espelhado visto de baixo" },
    groups: [
      { title: "Quem atendemos", items: segmentos },
      { title: "Nossos serviços", items: servicos },
    ],
  },
  { label: "Tecnologia", href: u("/tecnologia/") },
  {
    label: "Fique por dentro",
    image: { src: "/images/menu-fique-por-dentro.webp", alt: "Executivo do Fretadão palestrando em evento" },
    groups: [
      {
        title: "Fique por dentro",
        items: [
          { label: "Todas as publicações", href: u("/todas-as-publicacoes/") },
          { label: "Posts", href: u("/blog/") },
          { label: "Cases", href: u("/cases/") },
          { label: "Materiais Ricos", href: u("/materiais-ricos/") },
          { label: "Videos", href: u("/videos/") },
          { label: "Imprensa", href: u("/imprensa/") },
        ],
      },
    ],
  },
  { label: "Contato", href: links.contato },
];

// Hero em carrossel: slides do banner atual. Linhas quebradas para a animação de entrada.
export const hero = {
  experiencia: {
    tab: "Mobilidade corporativa",
    cta: "Conheça nossas soluções",
    lines: [
      { text: "Experiência que", accent: false },
      { text: "transforma a", accent: false },
      { text: "mobilidade", accent: true },
      { text: "corporativa", accent: true },
    ],
  },
  guia: {
    tab: "Guia definitivo",
    lines: [
      { text: "Guia definitivo para a", accent: false },
      { text: "contratação de", accent: false },
      { text: "fretamento corporativo", accent: true },
    ],
    // no celular as linhas acima não cabem: quebra própria para não sobrar palavra solta
    linesMobile: [
      { text: "Guia definitivo", accent: false },
      { text: "para a contratação", accent: false },
      { text: "de fretamento", accent: true },
      { text: "corporativo", accent: true },
    ],
    text: "As informações essenciais para uma contratação mais estratégica.",
    cta: "Acesse aqui",
  },
};

export const tudo: {
  title: string;
  items: { label: string; href: string; img: string; photo?: { src: string; alt: string } }[];
} = {
  title: "Tudo o que você precisa para a mobilidade corporativa da sua empresa",
  items: [
    {
      label: "Fretamento Corporativo",
      href: u("/para-empresas/fretamento-corporativo/"),
      img: "Ônibus fretado em rota corporativa",
      photo: { src: "/images/fretamento-corporativo.webp", alt: "Executivo trabalhando no notebook a bordo do fretado" },
    },
    {
      label: "Fretamento Compartilhado",
      href: u("/compartilhado/"),
      img: "Colaboradores embarcando no fretado",
      photo: { src: "/images/fretamento-compartilhado.webp", alt: "Colaboradores embarcando em um ônibus do Fretadão" },
    },
    {
      label: "Vale-Transporte",
      href: u("/para-empresas/vale-transporte/"),
      img: "Gestão de VT no app / cartão",
      photo: { src: "/images/vale-transporte.webp", alt: "Cartão de vale-transporte Fretadão sobre o banco do ônibus" },
    },
    {
      label: "Transporte Individual",
      href: u("/para-empresas/transporte-individual/"),
      img: "Carro executivo / corrida individual",
      photo: { src: "/images/transporte-individual.webp", alt: "Executiva falando ao celular no banco de trás de um carro" },
    },
    {
      label: "Gestão de Mobilidade",
      href: u("/para-empresas/gestao-de-mobilidade/"),
      img: "Painel de gestão de mobilidade",
      photo: { src: "/images/gestao-de-mobilidade.webp", alt: "Notebook com o painel de gestão de mobilidade do Fretadão" },
    },
  ],
};

export const manifesto = {
  title: "Transformamos uma operação fragmentada em uma solução integrada e estratégica,",
  text: "que reduz ineficiências, eleva os padrões de qualidade e cria jornadas mais fluidas para todos os envolvidos, gerando valor real às pessoas, organizações e cidades.",
  cta: "Entre em contato",
};

export const porque: {
  title: string;
  items: { q: string; a: string; img: string; photo?: { src: string; alt: string } }[];
} = {
  title: "Por que somos a melhor opção?",
  items: [
    {
      q: "Seus processos de transporte são manuais, analógicos e fragmentados?",
      a: "O Fretadão entrega uma experiência de fretamento completa, com cuidado e tecnologia. Gerencie tudo de forma digital, tenha rotas otimizadas e garanta o bem-estar da equipe com uma solução moderna que elimina a burocracia e aumenta a eficiência operacional.",
      img: "Gestão digital do fretamento",
      photo: { src: "/images/porque-processos.webp", alt: "Mãos segurando uma pilha de papéis" },
    },
    {
      q: "O atraso na chegada da sua equipe gera pagamento constante de horas extras e prejuízo?",
      a: "Reduza o tempo de deslocamento da equipe com rotas otimizadas e acompanhamento em tempo real. O Fretadão garante que seus funcionários cheguem ao trabalho na hora certa, a qualquer hora, eliminando horas extras indevidas causadas por atrasos. Aumente a sua pontualidade conosco!",
      img: "Equipe chegando no horário",
      photo: { src: "/images/porque-atrasos.webp", alt: "Mulher olhando o relógio, preocupada com o horário" },
    },
    {
      q: "Sua empresa sofre com a falta de planejamento estratégico e visibilidade sobre os custos reais de transporte?",
      a: "Obtenha um ROI melhor que os serviços tradicionais! Desde a otimização do tamanho dos veículos até a gestão de operadores e relatórios detalhados, o Fretadão oferece a solução completa para o seu transporte, com planejamento estratégico e foco em eficiência de custos.",
      img: "Relatórios e custos de transporte",
      photo: { src: "/images/porque-custos.webp", alt: "Pessoa calculando custos com calculadora e notas" },
    },
  ],
};

export type Segmento = {
  key: string;
  label: string;
  icon: string;
  href: string;
  title: string;
  text: string;
  items: string[];
  img: string;
  photo?: { src: string; alt: string };
};

export const solucao: { title: string; segmentos: Segmento[] } = {
  title: "Veja a solução ideal para o seu negócio",
  segmentos: [
    {
      key: "logistica",
      label: "Logística",
      icon: "/icons/logistica.svg",
      href: u("/logistica/"),
      title: "Seu centro de distribuição não pode parar. Nem o transporte da sua equipe.",
      text: "O Fretadão é o parceiro tecnológico ideal para operações logísticas que exigem máxima eficiência e flexibilidade. Transforme seu fretamento em uma vantagem competitiva:",
      items: [
        "Operação 24/7 acessível",
        "Redução de rotatividade",
        "Atração de talentos",
        "Rotas otimizadas por IA",
        "Adaptação a turnos complexos",
        "Otimização inteligente de custos",
      ],
      img: "Centro de distribuição / operação logística",
      photo: { src: "/images/segmento-logistica.webp", alt: "Corredor de centro de distribuição com prateleiras de paletes" },
    },
    {
      key: "industria",
      label: "Indústria",
      icon: "/icons/industria.svg",
      href: u("/industria/"),
      title: "Produtividade e Segurança em Primeiro Lugar",
      text: "Na Indústria, a pontualidade e a atração de talentos são essenciais. O Fretadão oferece uma solução de transporte que supera barreiras e otimiza sua operação:",
      items: [
        "Operação 24/7 acessível",
        "Acessibilidade otimizada",
        "Horários flexíveis",
        "Aumento de retenção e recrutamento",
        "Rotas estratégicas de recrutamento",
        "Otimização Operacional",
      ],
      img: "Planta industrial / troca de turno",
      photo: { src: "/images/segmento-industria.webp", alt: "Planta industrial com silos metálicos" },
    },
    {
      key: "farma",
      label: "Farma",
      icon: "/icons/farma.svg",
      href: u("/farma/"),
      title: "Garantia de Segurança e Qualidade na Indústria Farmacêutica",
      text: "Em um setor que exige rigor e precisão, a qualidade do transporte de seus colaboradores não pode ser um risco. O Fretadão oferece uma solução de mobilidade que prioriza a segurança e o bem-estar:",
      items: [
        "Operação 24/7 acessível",
        "Serviço direto e discreto",
        "Adaptação a Turnos Críticos",
        "Garantia de Conformidade (Compliance)",
        "Atração de mão de obra especializada",
        "Rotas com foco em qualidade de vida",
      ],
      img: "Laboratório farmacêutico",
      photo: { src: "/images/segmento-farma.webp", alt: "Linha de produção de frascos de medicamentos" },
    },
    {
      key: "alimentos",
      label: "Alimentos e bebidas",
      icon: "/icons/alimentos.svg",
      href: u("/alimentos-e-bebidas/"),
      title: "Do campo à gôndola: O transporte que garante sua produção ininterrupta",
      text: "No setor de Alimentos e Bebidas, a produtividade depende de pontualidade e capacidade de recrutamento. O Fretadão oferece a mobilidade que garante o sucesso das suas operações:",
      items: [
        "Operação 24/7 acessível",
        "Foco em produção contínua",
        "Expansão do banco de talentos",
        "Rotas estratégicas",
        "Redução de absenteísmo",
        "Horários adaptáveis",
        "Conforto e foco",
      ],
      img: "Linha de produção de alimentos e bebidas",
      photo: { src: "/images/segmento-alimentos.webp", alt: "Técnico com tablet ao lado de tanques de produção de bebidas" },
    },
    {
      key: "compartilhado",
      label: "Compartilhado",
      icon: "/icons/compartilhado.svg",
      href: u("/compartilhado/"),
      title: "Compartilhamento inteligente: Reduza custos sem perder a qualidade exclusiva",
      text: "O modelo de fretamento compartilhado do Fretadão foi desenvolvido para gerar economia máxima, mantendo a excelência do serviço exclusivo e eliminando riscos jurídicos.",
      items: [
        "Redução de custo",
        "Gestão de Tecnologia",
        "Qualidade no deslocamento",
        "Otimizadas para Inteligência e Eficiência",
        "Segurança jurídica (responsabilidade civil)",
      ],
      img: "Passageiros de empresas diferentes no mesmo fretado",
      photo: { src: "/images/segmento-compartilhado.webp", alt: "Colaboradores embarcando em um ônibus do Fretadão" },
    },
    {
      key: "escritorios",
      label: "Escritórios",
      icon: "/icons/escritorios.svg",
      href: u("/escritorios/"),
      title: "Satisfação, retenção e retorno ao escritório",
      text: "Oferecer o Fretadão para seus colaboradores transforma o deslocamento em um benefício premium. Aumente a satisfação, motive o retorno ao escritório e garanta a retenção dos seus talentos:",
      items: [
        "Aumento da retenção e satisfação",
        "Solução para o retorno ao escritório",
        "Tecnologia e confiabilidade",
        "Alívio da pressão no estacionamento",
        "Sustentabilidade (ESG)",
        "Qualidade no deslocamento",
      ],
      img: "Escritório corporativo / chegada da equipe",
      photo: { src: "/images/segmento-escritorios.webp", alt: "Escritório corporativo iluminado com estações de trabalho" },
    },
  ],
};

export const depoimentos: {
  title: string;
  items: {
    segmento: string;
    texto: string;
    autor: string;
    img: string;
    /** pos: enquadramento (object-position) no card estreito */
    photo?: { src: string; alt: string; pos?: string };
  }[];
} = {
  title: "Depoimentos",
  items: [
    {
      segmento: "Indústria",
      texto:
        "Em relação à área de Compras e Suprimentos, gostaria de expressar que estabelecemos uma excelente parceria comercial. Temos um bom atendimento e um fretado de qualidade para nossos colaboradores de Recife. Em resumo, só temos elogios a fazer e desejamos estender essa relação às demais unidades.",
      autor: "Bombril",
      img: "Operação Bombril / Recife",
      photo: { src: "/images/depoimento-bombril.webp", alt: "Fachada da Bombril", pos: "70% 40%" },
    },
    {
      segmento: "Logística",
      texto:
        "O fornecedor disponibiliza veículos de ótima qualidade, com manutenção adequada e em conformidade com o serviço contratado. Os itinerários desenvolvidos são eficientes e bem estruturados, atendendo plenamente às necessidades operacionais.",
      autor: "VLI",
      img: "Operação VLI",
      photo: { src: "/images/depoimento-vli.webp", alt: "Locomotiva da VLI em ferrovia", pos: "30% 50%" },
    },
    {
      segmento: "Logística",
      texto:
        "O Fretadão trouxe agilidade e tecnologia para a minha operação, resultando em avanços significativos. Observo uma sólida governança de dados e gestão visual em todas as frentes atendidas. A solução demonstra entender as necessidades específicas de cada processo; apesar de termos diversas tipologias, a aplicação foi adaptada aos nossos modelos de negócio, atendendo a cenários de 5 a 14 turnos diários.",
      autor: "Mercado Livre",
      img: "Operação Mercado Livre",
      photo: { src: "/images/depoimento-mercadolivre.webp", alt: "Centro de distribuição do Mercado Livre", pos: "20% 50%" },
    },
  ],
};

export const clientes = {
  title: "Quem já transforma com a gente",
  logos: [
    "ambev",
    "bombril",
    "dhl",
    "dux",
    "heineken",
    "ironmountain",
    "johndeere",
    "idlogistics",
    "loreal",
    "mercadolivre",
    "modular",
    "pepsico",
    "raiadrogasil",
    "vedacit",
    "vestas",
    "vli",
  ],
};

export const lideres = {
  title: "Somos líderes em mobilidade corporativa no Brasil",
  stats: [
    { prefix: "+ ", value: 2200, label: "Linhas", text: "em operação diária, conectando pessoas e empresas em todo o país" },
    { prefix: "+ ", value: 90, label: "Parceiros", text: "homologados, garantindo padrão de qualidade nos serviços" },
    { prefix: "+ ", value: 60000, label: "Passageiros", text: "transportados diariamente com conforto, qualidade e segurança" },
    { prefix: "+ ", value: 300, label: "Contratos", text: "com grandes empresas que confiam no Fretadão para gerir e otimizar sua mobilidade corporativa" },
    { prefix: "+ ", value: 2000, label: "Motoristas", text: "profissionais capacitados, assegurando eficiência e capilaridade na operação" },
    { prefix: "", value: 21, label: "Estados", text: "em atuação, com capacidade operacional para atender diferentes portes e segmentos" },
  ],
};

export const contratar = {
  title: "Como contratar?",
  subtitle: "É simples! Comece sua transformação em mobilidade inteligente:",
  text: "Pronto para transformar o transporte corporativo da sua empresa em um ativo estratégico de retenção e economia? Para que o Fretadão possa entregar a você a melhor proposta, precisamos da inteligência dos seus dados.",
  steps: [
    {
      title: "Diagnóstico e alinhamento estratégico",
      text: "Antes de traçar rotas, definimos o sucesso. Identifique o KPI prioritário da mudança: redução de custos, retenção de talentos (Employer Branding), expansão de equipe ou digitalização de processos. Ter clareza nos objetivos garante um projeto focado no que realmente importa para o seu negócio.",
      img: "Reunião de diagnóstico com o cliente",
    },
    {
      title: "Inteligência de dados e engenharia operacional",
      text: "Uma base sólida garante produtividade, assertividade e conformidade. Para que nossa proposta (uma nova malha desenhada do zero) supere os SLAs atuais, analisamos o censo atualizado dos colaboradores: endereços, CEPs, horários e turnos. Disponibilizamos um template padrão para facilitar essa coleta. Esses dados alimentam nossa roteirização inteligente, garantindo o dimensionamento exato da frota e eliminando desperdícios com veículos subutilizados.",
      img: "Mapa de roteirização inteligente",
    },
    {
      title: "Arquitetura da solução multimodal",
      text: "Gestão unificada em um modelo One-Stop Shop. Defina o escopo dos serviços integrados: Gestão Full Service ou híbrida de Fretamento Corporativo, Vale-Transporte e Transporte Individual. Tenha controle total e visão multimodal em uma única plataforma, simplificando a operação e aumentando a transparência.",
      img: "Plataforma multimodal / dashboard",
    },
    {
      title: "Por que seguir esse fluxo?",
      text: "A integração dessas etapas permite que o Fretadão entregue até 30% de economia real, substituindo processos manuais por uma automação inteligente, segura e centrada em dados.",
      img: "Economia e automação",
    },
  ],
};

export const cta = {
  title: "Quer ter uma solução completa de mobilidade na sua empresa?",
  subtitle: "Solicite o contato dos nossos consultores!",
  button: "Clique aqui",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/fretadao/" },
  { label: "Facebook", href: "https://www.facebook.com/fretadao" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fretadao-com-br/" },
  { label: "YouTube", href: "https://www.youtube.com/c/Fretad%C3%A3o" },
] as const;

export const footer = {
  transparencia: [
    { label: "Política de privacidade", href: u("/politica-de-privacidade/") },
    { label: "Igualdade salarial", href: u("/declaracao-de-igualdade-salarial/") },
    { label: "Política de gestão integrada", href: u("/politica-de-gestao-integrada/") },
    { label: "Termos de uso", href: u("/termos-de-uso/") },
    { label: "Solicite seus dados", href: "https://fretadao.zendesk.com/hc/pt-br/requests/new?ticket_form_id=45423417783443" },
  ],
  servicos: [
    { label: "Fretamento corporativo", href: u("/para-empresas/fretamento-corporativo/") },
    { label: "Transporte Individual", href: u("/para-empresas/transporte-individual/") },
    { label: "Gestão de Vale-transporte (VT)", href: u("/para-empresas/vale-transporte/") },
    { label: "Roteirização", href: u("/para-empresas/roteirizacao/") },
    { label: "Sustentabilidade e Carbono Zero", href: u("/para-empresas/sustentabilidade-e-carbono-zero/") },
    { label: "Diagnóstico de mobilidade", href: u("/para-empresas/diagnostico-de-mobilidade/") },
    { label: "Gestão de mobilidade Corporativa (somente gestão)", href: u("/para-empresas/gestao-de-mobilidade/") },
  ],
  ajuda: [
    { label: "Central de denúncia", href: "https://docs.google.com/forms/d/e/1FAIpQLSdnfr9DMNiB6tu2Lkke_Rjz7zaU1OhYBKlCFzkXRxAARm_70A/viewform" },
    { label: "Comunidade do passageiro", href: "https://fretadao.zendesk.com/hc/pt-br" },
  ],
  destaques: [
    { label: "Trabalhe conosco", href: "https://fretadao.inhire.app/vagas" },
    { label: "Parceiros", href: u("/parceiros/") },
    { label: "ESG", href: u("/esg/") },
    { label: "Portal de gestão para o RH", href: links.portalRH },
  ],
  apps: {
    passageiros: {
      appStore: "https://itunes.apple.com/br/app/fretadao-localiza-fretado/id958725031",
      googlePlay: "https://play.google.com/store/apps/details?id=com.fretadao.passageiro",
    },
    motoristas: {
      appStore: "https://apps.apple.com/br/app/fretad%C3%A3o-motorista/id6465289631",
      googlePlay: "https://play.google.com/store/apps/details?id=com.fretadao.apps.driverapp&hl=pt_BR",
    },
  },
};
