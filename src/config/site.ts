/**
 * Conteúdo editável do site — o que não vem do DunasTour (passeios, preços, fotos e contato vêm
 * da API; ver lib/dunastour). Troque à vontade sem mexer nos componentes.
 */
export const site = {
  name: "Mister K Lençóis",
  tagline: "Seu guia nos Lençóis",
  city: "Barreirinhas · MA · Brasil",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Usados se a API não devolver telefone/Instagram da agência. */
  fallbackWhatsapp: "+55 (98) 97029-6918",
  fallbackInstagram: "lencoiscomkorea",
  tiktok: "lencoiscomkorea",

  /**
   * Vídeo de fundo do hero (opcional). Coloque um .mp4 leve (até ~8 MB, sem áudio) em
   * /public/videos e aponte aqui, ex.: "/videos/hero.mp4". Vazio = slideshow com as fotos dos passeios.
   */
  heroVideo: "",

  /**
   * Animação da logo mostrada na home, logo abaixo do hero (fundo branco, sem áudio).
   * Vazio = some a seção.
   */
  logoVideo: "/logo-animacao.mp4",

  /**
   * Compra pelo site (carrinho, checkout e termo de risco via DunasTour). Desligado = cada passeio
   * mostra só "Verificar disponibilidade", que abre o WhatsApp com o nome do passeio. true pra religar.
   */
  onlineBooking: false,

  /**
   * Carrinho ("Meu roteiro") sem o checkout: o cliente junta vários passeios com data e pessoas e,
   * ao finalizar, o roteiro inteiro vai pro WhatsApp da agência. Ignorado se onlineBooking estiver ligado.
   */
  cart: true,

  /**
   * Reels do Instagram mostrados na seção "No Instagram". Cole a URL do reel/post
   * (ex.: "https://www.instagram.com/reel/C9xYz123AbC/"). Vazio = a seção mostra a grade de fotos com
   * link pro perfil.
   */
  instagramReels: [] as string[],

  /**
   * Vídeos próprios em formato vertical (estilo stories) — arquivos em /public/videos.
   * Vídeos cadastrados na agência no DunasTour (mapa de roteiros) entram automaticamente também.
   */
  videos: [] as { src: string; poster?: string; title: string }[],

  /** Faixa animada de destinos abaixo do hero. */
  destinations: [
    "Lagoa Bonita",
    "Lagoa Azul",
    "Rio Preguiças",
    "Vassouras",
    "Mandacaru",
    "Caburé",
    "Atins",
    "Santo Amaro",
    "Duas Lagoas",
    "Pôr do sol nas dunas",
  ],

  /** Serviços — os mesmos do perfil da agência. */
  services: [
    { icon: "mountain", title: "Passeios", text: "Os circuitos clássicos e os caminhos mais especiais dos Lençóis Maranhenses." },
    { icon: "car", title: "Transfer & 4x4", text: "Traslados de São Luís, Atins e Santo Amaro em veículos 4x4 confortáveis." },
    { icon: "route", title: "Roteiros sob medida", text: "Monte a viagem do seu jeito: quantos dias, quais lagoas e no seu ritmo." },
    { icon: "sparkles", title: "Experiências", text: "Noite de estrelas, piquenique nas dunas e pôr do sol inesquecível." },
    { icon: "drone", title: "Drone & fotos", text: "Imagens aéreas e fotos profissionais pra guardar cada momento." },
    { icon: "trekking", title: "Trekking & quadriciclo", text: "Aventura de verdade atravessando as dunas a pé ou de quadri." },
  ],

  faqs: [
    {
      question: "Como funciona a reserva?",
      answer:
        "Escolha o passeio, a data e quantas pessoas vão e adicione ao seu roteiro (o carrinho no topo da página). Dá pra juntar vários passeios numa reserva só. Ao finalizar, a conversa abre no WhatsApp com o roteiro já escrito — a Mister K confirma as vagas e combina o pagamento com você por lá.",
    },
    {
      question: "Qual a melhor época para visitar os Lençóis?",
      answer:
        "As lagoas ficam mais cheias entre junho e setembro, depois da temporada de chuvas. De outubro a dezembro ainda é possível banho em várias lagoas — o gráfico de nível das lagoas aqui no site mostra mês a mês.",
    },
    {
      question: "Vocês buscam no hotel?",
      answer:
        "Sim! Na reserva você informa o endereço da sua pousada ou hotel em Barreirinhas e o embarque é feito lá, no veículo 4x4.",
    },
    {
      question: "Criança paga?",
      answer:
        "Crianças de colo (menores de 2 anos) não pagam nos passeios comuns — é só informar na reserva. Passeios de aventura, como quadriciclo, não levam criança de colo.",
    },
    {
      question: "Preciso levar o quê?",
      answer:
        "Protetor solar, óculos de sol, chapéu ou boné, roupa de banho, água e uma sacola pra proteger o celular da areia. Cada passeio mostra mais detalhes.",
    },
    {
      question: "Dá pra montar um roteiro personalizado?",
      answer:
        "Claro. Fale com a gente no WhatsApp contando quantos dias você tem e o que quer viver — montamos o roteiro ideal pra você.",
    },
  ],
};

export type SiteConfig = typeof site;
