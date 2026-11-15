// Brazilian Portuguese dictionary for futbol11.live.
// Keys mirror the English defaults used by the components; any key
// missing here falls back to English at runtime, so a gap can never
// render a blank label. No em-dash anywhere in this file.
import type { LocaleStrings } from "../dictionary";

export const pt: LocaleStrings = {
  header: {
    games: "Jogos",
    howToPlay: "Como Jogar",
    about: "Sobre",
    faq: "FAQ",
    blog: "Blog",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  footer: {
    tagline:
      "A plataforma definitiva de trivia e quebra-cabeças diários de futebol. 23 jogos exclusivos cobrindo todas as ligas, competições e épocas do esporte mais amado do mundo. Novos desafios todos os dias à meia-noite.",
    popularGames: "Jogos Populares",
    quickLinks: "Links Rápidos",
    allGames: "Todos os Jogos",
    howToPlay: "Como Jogar",
    about: "Sobre o Futbol11",
    faq: "FAQ",
    aboutLink: "Sobre",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço",
    contact: "Contato",
    blog: "Blog",
    rss: "Feed RSS",
    rights: "Futbol11. Jogos diários de trivia de futebol para fãs do mundo todo.",
    leagues: "Premier League • La Liga • Serie A • Bundesliga • Champions League • Copa do Mundo",
  },
  common: {
    home: "Início",
    play: "JOGAR",
    new: "NOVO",
    about: "Sobre",
    contact: "Contato",
    privacy: "Privacidade",
    terms: "Termos",
    blog: "Blog",
    games: "Jogos",
    difficultyEasy: "Fácil",
    difficultyMedium: "Médio",
    difficultyHard: "Difícil",
    categoryTrivia: "Trivia",
    categoryPuzzle: "Quebra-cabeça",
    categoryWord: "Palavras",
    categoryStrategy: "Estratégia",
  },
  home: {
    title: "Futbol11 - Jogos Diários de Trivia e Quebra-Cabeças de Futebol",
    intro:
      "O Futbol11 é um site gratuito de jogos diários de futebol com 23 desafios de trivia, quebra-cabeças e palavras, de adivinhar escalações e Wordle até a Grade de Futebol, com novos quebra-cabeças todos os dias à meia-noite.",
    gridTitle: "Escolha um Jogo de Futebol",
    gridDesc:
      "Escolha entre 23 desafios diários exclusivos de futebol. Novos quebra-cabeças todos os dias à meia-noite, teste seu conhecimento sobre clubes, jogadores, táticas e história do futebol.",
  },
  gameView: {
    home: "Início",
    games: "Jogos",
    todaysPuzzle: "Quebra-cabeça de hoje: {date}",
    daily: "Diário",
    about: "Sobre {name}",
    howToPlay: "Como Jogar",
    tips: "Dicas e Estratégia",
    tip1Title: "🧠 Comece pelo Amplo",
    tip1Text:
      "Comece com jogadores conhecidos e respostas óbvias. Guarde os palpites arriscados para depois, quando tiver mais contexto.",
    tip2Title: "📅 Jogue Todos os Dias",
    tip2Text:
      "A consistência é fundamental. Jogar todos os dias amplia sua base de conhecimento de futebol e ajuda a reconhecer padrões entre os jogos.",
    tip3Title: "🌍 Pense Global",
    tip3Text:
      "Não foque só nas 5 principais ligas. O futebol sul-americano, africano e asiático aparece com frequência nos nossos desafios.",
    tip4Title: "📖 Aprenda com os Erros",
    tip4Text:
      "Cada resposta errada ensina algo novo. Revise as respostas corretas após cada jogo para ampliar seu conhecimento.",
    gameNotFound: "Jogo Não Encontrado",
    backToAllGames: "Voltar para todos os jogos",
    comingSoon: "Em Breve",
    comingSoonDesc: "Este desafio está sendo criado.",
  },
  seo: {
    heading: "A Plataforma Definitiva de Trivia e Quebra-Cabeças de Futebol",
    whyTitle: "Por que Jogar Futbol11?",
    whyP1:
      "O Futbol11 é a casa dos jogos diários gratuitos de futebol. Todos os dias à meia-noite, 23 jogos de trivia e quebra-cabeças de futebol são atualizados com novos desafios, então você joga o mesmo quebra-cabeça que fãs do mundo todo. Seja você um torcedor de longa data que lembra cada escalação de Copa do Mundo desde 1966, ou um fã mais novo ansioso para aprender sobre a história do futebol, nossos jogos diários de futebol têm algo para todos.",
    whyP2:
      "Nossos jogos cobrem todo o conhecimento de futebol, das atuais equipes da Premier League, La Liga e Serie A às escalações históricas internacionais, de trivia de transferências a quebra-cabeças táticos. Cada jogo é criado com cuidado para ser divertido e educativo, e cada quebra-cabeça leva só alguns minutos.",
    whyP3:
      "Diferente de aplicativos genéricos de trivia esportiva, o Futbol11 é feito por fãs de futebol, para fãs de futebol. Focamos só no esporte mais amado do mundo, o que significa perguntas mais profundas, desafios mais detalhados e quebra-cabeças que recompensam o conhecimento real de futebol. Nosso formato diário faz você voltar sempre, e sua sequência cresce a cada dia que você joga.",
    erasTitle: "Conhecimento de Futebol em Todas as Épocas",
    erasP1:
      "Nossos jogos abrangem toda a história do futebol profissional. A edição de Copa do Mundo cobre partidas do Uruguai 1930 ao Catar 2022. Os jogos de Lendas apresentam jogadores de todas as épocas, do drible gracioso de Sir Stanley Matthews ao tiki-taka magistral de Xavi Hernández.",
    erasP2:
      "Cobrimos todas as grandes ligas e competições: Premier League inglesa, La Liga espanhola, Serie A italiana, Bundesliga alemã, Ligue 1 francesa, UEFA Champions League, Copa Libertadores e todos os grandes torneios internacionais. Nossos bancos de dados incluem mais de 10.000 jogadores, 500 clubes e milhares de escalações históricas.",
    erasP3:
      "A rotação diária garante variedade, você pode enfrentar a escalação do Brasil de 1970 em um dia e uma partida da Champions League de 2023 no outro. Essa amplitude de conteúdo significa que sempre há algo novo para aprender, fazendo do Futbol11 não só um jogo, mas uma educação em história do futebol.",
    howTitle: "Como Jogar Jogos Diários de Futebol",
    howStep1Title: "Escolha um jogo",
    howStep1Desc:
      "Escolha qualquer um dos 23 jogos na página inicial. Comece com Wordle ou Maior ou Menor se você é novo, ou vá direto para a Grade de Futebol.",
    howStep2Title: "Jogue o quebra-cabeça de hoje",
    howStep2Desc:
      "Cada jogo tem um quebra-cabeça por dia. Leia as dicas, faça seus palpites e use as ajudas quando estiver travado. Não precisa de conta.",
    howStep3Title: "Confira sua pontuação",
    howStep3Desc:
      "Sua pontuação diária acompanha vitórias e derrotas em todos os jogos. Sua sequência conta cada dia consecutivo que você joga.",
    howStep4Title: "Volte amanhã",
    howStep4Desc:
      "Novos quebra-cabeças chegam à meia-noite. Compare seu resultado com amigos, suba no ranking e mantenha sua sequência viva.",
    everyFanTitle: "Jogos de Futebol para Todo Tipo de Fã",
    everyFanP1:
      "Fãs de jogos de palavras podem jogar o Wordle do Futbol11, onde você descobre um jogador misterioso em 6 tentativas, ou o Octadle, onde você resolve oito palavras de futebol de cinco letras ao mesmo tempo. Fãs de quebra-cabeças podem preencher a Grade de Futebol, organizar 16 itens no Connections ou encontrar o intruso no Impostor.",
    everyFanP2:
      "Fãs de trivia têm a maior escolha. Adivinhe escalações históricas no jogo principal Futbol11, monte os melhores XIs de todos os tempos no Legends, ou teste sua memória da Euro 2024, da Copa América e de cada Copa do Mundo de 1930 a 2022. Maior ou Menor transforma totais de gols na carreira em um jogo rápido de sequência, e Adivinhe o Jogador esconde um jogador atrás de dicas de texto e uma bandeira.",
    everyFanP3:
      "Também cobrimos outros esportes no mesmo formato diário. O Formudle pede para você adivinhar um piloto de Fórmula 1 a partir de nacionalidade, equipe, estreia, títulos e primeira vitória. O WrestlePlay faz o mesmo com lutadores, comparando promoção, estreia, altura e títulos mundiais.",
    leaguesTitle: "Ligas, Torneios e Épocas Cobertos",
    leaguesP1:
      "Todas as grandes ligas estão em jogo: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, MLS e Liga MX. As noites europeias são cobertas pela Champions League e Europa League, e o futebol sul-americano pela Copa Libertadores e Copa América.",
    leaguesP2:
      "O futebol internacional atravessa todo o site. Os jogos de Copa do Mundo cobrem cada torneio do Uruguai 1930 ao Catar 2022, e a edição da Euro 2024 cobre cada partida do torneio na Alemanha. A edição América acompanha a Copa América, partidas da CONCACAF e clássicos da Libertadores.",
    leaguesP3:
      "Essa variedade importa no jogo. Uma pergunta pode vir de qualquer época, liga ou competição, então o fã que acompanha mais de uma liga tem vantagem. O blog traz guias passo a passo dos jogos mais populares, começando com Wordle e a Grade de Futebol, para que novos jogadores aprendam as regras rápido e vençam mais cedo.",
    categoriesTitle: "Categorias de Jogos Explicadas",
    cat1Title: "Jogos de Trivia",
    cat1Desc:
      "Teste seu conhecimento de fatos de futebol. De estatísticas de jogadores a histórias de clubes, esses jogos recompensam a mente enciclopédica do futebol.",
    cat2Title: "Jogos de Quebra-Cabeça",
    cat2Desc:
      "Lógica encontra futebol. Grade, Connections e Impostor exigem raciocínio dedutivo junto com conhecimento de futebol.",
    cat3Title: "Jogos de Palavras",
    cat3Desc:
      "Jogabilidade estilo Wordle com um toque de futebol. Adivinhe nomes de jogadores letra por letra com feedback por cores.",
    cat4Title: "Jogos de Estratégia",
    cat4Desc:
      "Jogos de conexão e construção de cadeias que desafiam você a pensar vários passos à frente usando o conhecimento de carreiras no futebol.",
    stadiumTitle: "🏟️ Estádio do Conhecimento",
    stadiumText:
      "Você sabia que mais de 200 países são membros da FIFA, fazendo do futebol o esporte mais jogado no mundo? Nossos jogos refletem essa diversidade, com jogadores e equipes de todos os continentes. Dos estádios lotados da América do Sul à sofisticação tática do futebol europeu, o Futbol11 celebra o alcance mundial do esporte mais amado do mundo.",
    trackTitle: "📊 Acompanhe Seu Progresso",
    trackText:
      "Sua pontuação diária acompanha respostas certas e erradas em todos os jogos. Sua sequência conta cada dia consecutivo que você joga, e o ranking classifica os melhores jogadores por vitórias e melhor sequência, usando rótulos anônimos de jogador, nunca nomes ou e-mails. A reinicialização diária mantém tudo justo, todos recebem os mesmos desafios ao mesmo tempo.",
    learnTitle: "🎓 Aprenda Enquanto Joga",
    learnText:
      "Cada resposta errada é uma oportunidade de aprendizado. Quando você erra um jogador em uma escalação, descobre alguém novo. Quando não consegue completar uma conexão, aprende um fato inesperado. O Futbol11 já ajudou milhares de fãs a aprofundar seu entendimento da história do futebol, das táticas e da rica tapeçaria da evolução do esporte.",
    updated: "Conteúdo atualizado pela última vez: 9 de novembro de 2026. Novos jogos e guias são adicionados regularmente.",
  },
  faq: {
    title: "Perguntas Frequentes",
    intro: "Tudo o que você precisa saber sobre os jogos de trivia de futebol do Futbol11.",
    q1: "O que é o Futbol11?",
    a1: "O Futbol11 é sua casa para jogos diários de futebol. Teste seu conhecimento sobre clubes, jogadores e momentos icônicos do futebol em jogos como Grade, Bingo, Wordle e Connections, com novos desafios todos os dias. Com 23 jogos exclusivos cobrindo tudo, da história da Copa do Mundo à ação atual das ligas, sempre há uma nova forma de testar seu QI de futebol.",
    q2: "Quando os jogos diários são reiniciados?",
    a2: "Os jogos são reiniciados todos os dias à meia-noite UTC, permitindo que você jogue um novo conjunto de desafios a cada 24 horas. Sua pontuação diária é reiniciada ao mesmo tempo, então cada dia é uma nova oportunidade de alcançar um recorde perfeito.",
    q3: "Existe uma dificuldade maior?",
    a3: "Sim! Em alguns jogos, você pode escolher entre diferentes níveis de dificuldade. Jogue sem cronômetro para uma experiência relaxada, ou desafie-se com um limite de 90 ou 60 segundos. Alguns jogos também têm dificuldade progressiva, ficando mais difíceis conforme você avança nas rodadas.",
    q4: "Novos jogos serão adicionados?",
    a4: "Com certeza! Adicionamos regularmente novos modos de jogo com base no feedback da comunidade e em eventos de futebol que surgem. Adições passadas incluem edições específicas de torneios para a Euro 2024 e a Copa América, além de Octadle, Formudle e WrestlePlay em novembro de 2026. Confira a página inicial e o blog para saber primeiro sobre novos lançamentos.",
    q5: "Preciso de uma conta para jogar?",
    a5: "Não é preciso conta para jogar nenhum dos nossos jogos. Basta visitar o site e começar a jogar imediatamente. Sua pontuação diária é registrada localmente no seu navegador. Isso facilita entrar para um jogo rápido no trajeto, no almoço ou antes de dormir.",
    q6: "Quais ligas e competições são cobertas?",
    a6: "O Futbol11 cobre todas as grandes ligas, incluindo Premier League, La Liga, Serie A, Bundesliga e Ligue 1. Também apresentamos Champions League, Europa League, Copa Libertadores, Copa do Mundo, Campeonato Europeu, Copa América e muitos outros torneios. Nosso banco de dados vai da década de 1930 até os dias atuais.",
    q7: "Posso jogar no celular?",
    a7: "Sim! Todos os jogos do Futbol11 são totalmente otimizados para dispositivos móveis. Seja no smartphone ou no tablet, a experiência é suave e responsiva. Não precisa baixar aplicativo, basta visitar o site no navegador do celular e começar a jogar.",
    q8: "Como a pontuação diária é calculada?",
    a8: "Sua pontuação diária acompanha suas respostas certas (marca verde) e erradas (X vermelho) em todos os jogos daquele dia. A pontuação é reiniciada à meia-noite UTC. Tente maximizar as respostas certas e minimizar os erros para o melhor registro diário.",
    q9: "Os jogos são educativos?",
    a9: "Com certeza! Muitos jogadores nos disseram que aprenderam mais sobre história do futebol com o Futbol11 do que com qualquer outra fonte. Cada jogo revela fatos interessantes sobre jogadores, clubes e torneios. Até os palpites errados ensinam algo novo, tornando cada sessão divertida e informativa.",
    q10: "Como posso sugerir um novo jogo ou recurso?",
    a10: "Adoramos ouvir nossa comunidade! Envie sua sugestão pela página de Contato. Muitas das nossas melhores ideias de jogos vieram do feedback dos jogadores. Seja um novo modo de jogo, uma competição específica ou uma melhoria de qualidade de vida, estamos de ouvidos abertos.",
  },
  howTo: {
    title: "Como Jogar Futbol11",
    intro:
      "Começar é fácil. Não precisa de conta, basta escolher um jogo e jogar. Cada jogo é reiniciado diariamente com novos desafios.",
    step: "PASSO",
    step1Title: "Escolha um Jogo",
    step1Desc:
      "Escolha entre 23 jogos exclusivos de futebol, trivia, quebra-cabeças, jogos de palavras e desafios de estratégia.",
    step2Title: "Jogue Todos os Dias",
    step2Desc:
      "Novos desafios chegam todos os dias à meia-noite. Construa sua sequência e acompanhe sua pontuação diária em todos os jogos.",
    step3Title: "Teste Seu Conhecimento",
    step3Desc:
      "Da Premier League à Copa do Mundo, de 1930 até hoje. Todas as épocas, ligas e competições são cobertas.",
    step4Title: "Compartilhe e Compita",
    step4Desc: "Compare pontuações com amigos e a comunidade global. Quem realmente sabe mais de futebol?",
  },
  otherSites: {
    title: "Outros Jogos de Esporte",
    octadle: "Jogo de quebra-cabeça com várias palavras",
    formudle: "Quebra-cabeça diário de Fórmula 1",
    wrestleplay: "Jogos de trivia de luta livre",
    basketball5: "Jogos diários de basquete",
    new: "NOVO",
  },
  related: {
    title: "Mais Jogos de Futebol",
  },
  cookie: {
    ariaLabel: "Consentimento de cookies",
    text: "Usamos cookies para manter seu progresso diário e exibir anúncios. Terceiros, incluindo o Google, podem usar cookies para personalizar anúncios.",
    learnMore: "Saiba mais",
    reject: "Recusar",
    accept: "Aceitar",
  },
  dailyScore: {
    title: "Pontuação Diária",
    streak: "sequência de {count} dias",
  },
  leaderboard: {
    title: "Melhores Jogadores",
    intro: "Mais vitórias em todos os jogos do Futbol11. Anônimo, sem contas, é só jogar.",
    loading: "Carregando ranking...",
    unavailable: "Ranking indisponível offline. Seus resultados continuam salvos neste dispositivo.",
    empty: "Ainda não há vitórias no placar. Termine um jogo para assumir o primeiro lugar.",
    player: "Jogador {name}",
    wins: "{count} vitórias",
    bestStreak: "Melhor sequência {count}",
  },
  share: {
    defaultLabel: "Compartilhar resultado",
    copied: "Copiado!",
    copiedTitle: "Resultado copiado",
    copiedDesc: "Cole em qualquer lugar para compartilhar sua pontuação.",
    failedTitle: "Falha ao copiar",
    failedDesc: "Seu navegador bloqueou o acesso à área de transferência.",
  },
  games: {
    "futbol11-goltexto.title": "Futbol Goltexto de Hoje",
    "futbol11-goltexto.description":
      "Jogue o quebra-cabeça Goltexto de hoje: adivinhe a escalação completa a partir de dicas de texto. Uma nova escalação histórica todos os dias.",
    "futbol11-goltexto.long":
      "O quebra-cabeça Goltexto de hoje desafia sua memória de escalações icônicas do futebol. Você recebe uma formação e deve preencher os nomes dos 11 titulares de uma partida famosa, usando dicas de texto como guia. De finais de Copa do Mundo a clássicos da Champions League, cada dia traz um novo quebra-cabeça tático. Este jogo testa seu conhecimento de formações de equipe, posições de jogadores e história do futebol ao longo de décadas do esporte mais amado do mundo. Volte amanhã para uma nova escalação.",
    "futbol11-goltexto.how.0": "Você verá um esquema tático (ex.: 4-3-3)",
    "futbol11-goltexto.how.1": "Preencha os nomes dos jogadores de cada posição",
    "futbol11-goltexto.how.2": "Use dicas se travar, cada dica revela uma letra",
    "futbol11-goltexto.how.3": "Complete a escalação antes que o tempo acabe",
    "futbol11-legacy.title": "Futbol11 Legacy",
    "futbol11-legacy.description":
      "Teste seu conhecimento sobre jogadores lendários e suas trajetórias nos principais clubes europeus.",
    "futbol11-legacy.long":
      "O Legacy leva você a uma jornada pela história do futebol. Cada desafio apresenta pistas sobre a carreira de um jogador lendário, os clubes pelos quais jogou, os troféus que conquistou e os recordes que quebrou. De Pelé a Messi, de Maradona a Ronaldo, o Legacy cobre os maiores jogadores que já pisaram em campo. Perfeito para fãs que vivem e respiram história do futebol.",
    "futbol11-legacy.how.0": "Leia as pistas da carreira apresentadas uma a uma",
    "futbol11-legacy.how.1": "Adivinhe o jogador lendário",
    "futbol11-legacy.how.2": "Menos pistas usadas, maior a pontuação",
    "futbol11-legacy.how.3": "Os desafios diários apresentam jogadores de épocas diferentes",
    "futbol11-impostor.title": "Futbol11 Impostor",
    "futbol11-impostor.description":
      "Encontre o impostor! Um jogador não pertence ao grupo, você consegue descobrir quem é?",
    "futbol11-impostor.long":
      "O Impostor é um jogo de dedução de futebol onde você deve identificar qual jogador não pertence a um grupo. Quatro jogadores compartilham uma característica comum: mesma nacionalidade, mesmo histórico de clubes, mesma conquista, mas um é o intruso. Conhecimento afiado de futebol e pensamento lateral são essenciais. O jogo fica progressivamente mais difícil, com conexões mais obscuras e fatos menos conhecidos.",
    "futbol11-impostor.how.0": "Você verá um grupo de jogadores de futebol",
    "futbol11-impostor.how.1": "Encontre o que não compartilha a característica comum",
    "futbol11-impostor.how.2": "A conexão pode ser nacionalidade, clube, prêmio ou estatística",
    "futbol11-impostor.how.3": "Resolva o máximo de rodadas possível",
    "futbol-grid.title": "Jogo de Grade de Futebol",
    "futbol-grid.description":
      "Jogue o jogo de grade de futebol: preencha os 9 quadrados nomeando um jogador para cada clube e país. Uma nova grade todos os dias.",
    "futbol-grid.long":
      "O jogo de grade de futebol é um quebra-cabeça diário que testa o quanto você conhece jogadores, clubes e países. Você recebe uma grade 3 por 3 onde cada linha é um clube e cada coluna é um país, e sua tarefa é nomear um jogador que se encaixe nos dois fatos ao mesmo tempo. Pense em um jogador que atuou pelo Barcelona e vem do Brasil, ou alguém que jogou pelo Manchester United e vem da França. Você tem 9 palpites para 9 quadrados, e uma pontuação de raridade recompensa respostas corretas obscuras. Um novo jogo de grade de futebol aparece todos os dias à meia-noite, e todos jogam a mesma grade.",
    "futbol-grid.how.0": "Cada célula tem um critério de linha e um critério de coluna",
    "futbol-grid.how.1": "Nomeie um jogador que satisfaça os dois critérios",
    "futbol-grid.how.2": "Você tem 9 palpites para preencher as 9 células",
    "futbol-grid.how.3": "A pontuação de raridade recompensa respostas corretas obscuras",
    "futbol11-pyramid.title": "Jogo de Quiz de Futebol",
    "futbol11-pyramid.description":
      "Jogue o jogo de quiz de futebol: responda perguntas diárias de trivia do fácil ao especialista e suba na pirâmide. Novas perguntas todos os dias.",
    "futbol11-pyramid.long":
      "O jogo de quiz de futebol é um desafio de trivia em níveis que começa fácil e fica mais difícil a cada passo. A base da pirâmide traz perguntas diretas de futebol, enquanto o topo exige conhecimento de especialista. Cada resposta certa eleva sua pirâmide. Você consegue chegar ao topo? O jogo cobre tudo, das estatísticas atuais da Premier League a fatos históricos da Copa do Mundo, e um novo jogo de quiz de futebol aparece todos os dias, então funciona tanto para fãs casuais quanto para estudiosos do futebol.",
    "futbol11-pyramid.how.0": "Comece pela base com perguntas mais fáceis",
    "futbol11-pyramid.how.1": "Cada nível fica progressivamente mais difícil",
    "futbol11-pyramid.how.2": "Responda corretamente para subir mais alto",
    "futbol11-pyramid.how.3": "Chegue ao topo para completar a pirâmide",
    "futbol11-connections.title": "Jogo de Connections de Futebol",
    "futbol11-connections.description":
      "Jogue o jogo de connections de futebol: organize 16 itens de futebol em 4 grupos de 4. Um novo quebra-cabeça todos os dias.",
    "futbol11-connections.long":
      "O jogo de connections de futebol apresenta 16 itens de futebol: jogadores, clubes, estádios ou termos. Sua missão é organizá-los em quatro grupos de quatro, cada um com uma conexão oculta. As conexões podem ser sutis: jogadores que fizeram hat-trick em finais de Copa do Mundo, estádios com teto retrátil ou clubes cujos nomes contêm cores. Você tem 4 erros antes que o jogo termine. Um novo jogo de connections de futebol aparece todos os dias, e ele recompensa tanto o conhecimento amplo de futebol quanto o pensamento criativo.",
    "futbol11-connections.how.0": "Você vê 16 itens relacionados ao futebol",
    "futbol11-connections.how.1": "Agrupe-os em 4 categorias de 4",
    "futbol11-connections.how.2": "Cada grupo compartilha uma conexão oculta",
    "futbol11-connections.how.3": "Você tem 4 erros antes do fim do jogo",
    "futbol11-clubs.title": "Futbol11 Clubes",
    "futbol11-clubs.description":
      "Identifique clubes de futebol a partir de pistas visuais, fragmentos de escudos e cores de uniformes.",
    "futbol11-clubs.long":
      "O Clubes testa seu conhecimento visual de futebol. Você pode ver uma seção ampliada de um escudo de clube, uma combinação de cores de uniforme ou a silhueta de um estádio. Das listras icônicas da Juventus ao vermelho do Liverpool, do escudo do Real Madrid ao canhão do Arsenal. O quanto você realmente conhece a identidade visual dos maiores clubes do futebol? O jogo apresenta clubes de ligas do mundo todo, não só das 5 principais ligas europeias.",
    "futbol11-clubs.how.0": "Pistas visuais sobre um clube de futebol aparecem",
    "futbol11-clubs.how.1": "Adivinhe o clube a partir da informação visual",
    "futbol11-clubs.how.2": "As pistas revelam progressivamente mais detalhes",
    "futbol11-clubs.how.3": "Ganhe pontos por palpites corretos mais rápidos",
    "futbol11-link.title": "Futbol11 Link",
    "futbol11-link.description":
      "Conecte jogadores através de clubes compartilhados, formando uma cadeia de carreiras ligadas.",
    "futbol11-link.long":
      "O Link é um quebra-cabeça de cadeia de futebol onde você deve conectar dois jogadores através de históricos de clubes compartilhados. O Jogador A jogou com o Jogador B no Clube X, e o Jogador B jogou com o Jogador C no Clube Y, continue construindo a cadeia até chegar ao jogador alvo. São seis graus de separação, estilo futebol. Este jogo recompensa o conhecimento de históricos de transferências, composições de elencos e a rede interconectada de carreiras profissionais de futebol em várias ligas e décadas.",
    "futbol11-link.how.0": "Você recebe um jogador inicial e um jogador final",
    "futbol11-link.how.1": "Conecte-os através de colegas de clubes compartilhados",
    "futbol11-link.how.2": "Cada conexão deve ser uma conexão real de colegas de equipe",
    "futbol11-link.how.3": "Complete a cadeia com o menor número de conexões possível",
    "futbol11-bingo.title": "Jogo de Bingo de Futebol",
    "futbol11-bingo.description":
      "Jogue bingo de futebol: associe jogadores aos critérios da sua cartela de bingo e complete uma linha. Uma nova cartela todos os dias.",
    "futbol11-bingo.long":
      "O jogo de bingo de futebol combina o bingo clássico com trivia de futebol. Sua cartela de bingo traz critérios de futebol como marcou 20 ou mais gols em uma temporada, jogou na Serie A e na La Liga, ou venceu a Bola de Ouro. Conforme os jogadores são revelados, você marca os critérios que eles cumprem. Complete uma linha, uma coluna ou a cartela inteira para vencer. Um novo jogo de bingo de futebol aparece todos os dias, então cada cartela é um novo teste do seu conhecimento sobre estatísticas e conquistas de jogadores.",
    "futbol11-bingo.how.0": "Você recebe uma cartela de bingo com critérios de futebol",
    "futbol11-bingo.how.1": "Os jogadores são revelados um a um",
    "futbol11-bingo.how.2": "Marque os critérios que correspondem ao jogador revelado",
    "futbol11-bingo.how.3": "Complete uma linha ou a cartela inteira para vencer",
    "futbol-top10.title": "Futbol11 Top10",
    "futbol-top10.description":
      "Você consegue nomear todos os jogadores no top 10 de rankings e recordes famosos do futebol?",
    "futbol-top10.long":
      "O Top10 desafia você a nomear os jogadores das listas e rankings mais famosos do futebol. Dos maiores artilheiros de todos os tempos na história da Champions League aos jogadores com mais jogos por seleções, das maiores taxas de transferência já pagas às mais indicações à Bola de Ouro. Você consegue lembrar todos os 10? O jogo cobre uma ampla gama de categorias estatísticas do futebol de clubes e internacional, atualizada com os recordes mais recentes e conquistas.",
    "futbol-top10.how.0": "Uma categoria/ranking de futebol é apresentada",
    "futbol-top10.how.1": "Nomeie o máximo de jogadores do top 10 que conseguir",
    "futbol-top10.how.2": "A ordem não importa",
    "futbol-top10.how.3": "O limite de tempo aumenta a pressão para lembrar",
    "futbol11-wordle.title": "Futbol11 Wordle",
    "futbol11-wordle.description":
      "O clássico jogo de palavras encontra o futebol. Adivinhe o nome do jogador em 6 tentativas!",
    "futbol11-wordle.long":
      "O Wordle do Futbol11 traz o fenômeno viral de adivinhação de palavras para o mundo do futebol. Em vez de adivinhar qualquer palavra, você adivinha o sobrenome de um jogador. Letras verdes estão corretas e na posição certa, letras amarelas estão no nome mas na posição errada, e letras cinzas não estão no nome. Com milhares de jogadores profissionais do passado e do presente, cada dia traz um novo desafio. Um quebra-cabeça diário rápido e perfeito para fãs de futebol.",
    "futbol11-wordle.how.0": "Adivinhe o sobrenome de um jogador",
    "futbol11-wordle.how.1": "Verde = letra correta, posição correta",
    "futbol11-wordle.how.2": "Amarelo = letra correta, posição errada",
    "futbol11-wordle.how.3": "Cinza = letra não está no nome",
    "futbol11-wordle.how.4": "Você tem 6 tentativas",
    "futbol11-bingo-legends.title": "Futbol11 Bingo Retrô",
    "futbol11-bingo-legends.description":
      "Bingo retrô com jogadores lendários dos anos 70, 80 e 90.",
    "futbol11-bingo-legends.long":
      "O Bingo Retrô é uma viagem nostálgica pelas eras de ouro do futebol. Esta edição especial do Bingo do Futbol11 foca exclusivamente em jogadores lendários das décadas de 1970 a 1990. Lembra das cobranças de falta de Platini? Do papel de líbero de Beckenbauer? Da finalização clínica de Romário? Este jogo celebra os ícones que moldaram o futebol moderno, sendo perfeito para fãs mais velhos e entusiastas da história que apreciam as lendas do jogo.",
    "futbol11-bingo-legends.how.0": "Mesmas regras do Bingo normal",
    "futbol11-bingo-legends.how.1": "Todos os jogadores são dos anos 70, 80 e 90",
    "futbol11-bingo-legends.how.2": "Os critérios focam em conquistas retrô",
    "futbol11-bingo-legends.how.3": "Teste seu conhecimento sobre lendas do futebol",
    "futbol11.title": "Futbol11",
    "futbol11.description":
      "O original! Adivinhe a escalação internacional de uma seleção nacional de futebol.",
    "futbol11.long":
      "O jogo principal que começou tudo. O Futbol11 apresenta a formação de uma seleção nacional de uma partida específica, uma eliminatória de Copa do Mundo, um campeonato continental ou um amistoso. Seu trabalho é nomear os 11 titulares. De potências como Brasil e Alemanha a azarões que fizeram campanhas profundas em torneios, este jogo celebra o futebol internacional em toda a sua glória. Atualizado diariamente com partidas que abrangem décadas de competição internacional.",
    "futbol11.how.0": "A formação de uma seleção nacional é mostrada",
    "futbol11.how.1": "Identifique os 11 jogadores titulares",
    "futbol11.how.2": "Use a data da partida e o adversário como pistas de contexto",
    "futbol11.how.3": "Dicas disponíveis se você travar",
    "guess-the-footballer.title": "Adivinhe o Jogador",
    "guess-the-footballer.description":
      "Dicas de texto, uma bandeira e uma carta de iniciais desfocada, você consegue identificar o jogador em 6 palpites?",
    "guess-the-footballer.long":
      "Adivinhe o Jogador é um desafio diário de identificação baseado em dicas de texto. Cada rodada esconde um jogador profissional atrás de uma carta desfocada mostrando apenas suas iniciais e uma bandeira de nacionalidade. Cada palpite errado revela uma nova dica sobre o jogador, sua posição, clubes, troféus ou destaques da carreira, e a carta fica um pouco mais clara. Adivinhe corretamente em 6 tentativas para vencer. O jogo apresenta jogadores de todas as grandes ligas e inclui estrelas atuais, talentos em ascensão e lendas aposentadas.",
    "guess-the-footballer.how.0": "Leia a primeira dica de texto e confira a bandeira",
    "guess-the-footballer.how.1": "Digite o nome completo do jogador para palpitar",
    "guess-the-footballer.how.2": "Cada palpite errado revela uma nova dica e clareia um pouco a carta",
    "guess-the-footballer.how.3": "Adivinhe corretamente em 6 tentativas para vencer",
    "futbol11-legends.title": "Futbol11 Lendas",
    "futbol11-legends.description":
      "Nomeie o XI lendário! Identifique escalações de todos os tempos dos grandes do futebol.",
    "futbol11-legends.long":
      "O Lendas é o teste definitivo de conhecimento da história do futebol. Cada desafio apresenta um XI de todos os tempos de um clube, liga ou época específica. Você consegue nomear o maior XI de todos os tempos do Liverpool? E os melhores jogadores sul-americanos do século 21? Ou o XI definitivo da Champions League? Este jogo celebra os melhores jogadores da história do futebol e desafia você a lembrar as lendas que definiram gerações do esporte.",
    "futbol11-legends.how.0": "Uma categoria de XI de todos os tempos é apresentada",
    "futbol11-legends.how.1": "Nomeie os jogadores da escalação lendária",
    "futbol11-legends.how.2": "Posições e formação são mostradas",
    "futbol11-legends.how.3": "Complete o XI inteiro para vencer",
    "futbol11-america.title": "Futbol11 América",
    "futbol11-america.description":
      "Trivia de futebol sul e norte-americano, Copa América, MLS, Liga MX e mais.",
    "futbol11-america.long":
      "O Futbol11 América celebra o esporte mais amado do mundo nas Américas. Da paixão do futebol argentino à qualidade crescente da MLS, das rivalidades históricas do futebol brasileiro ao fervor da Liga MX mexicana, este jogo cobre tudo. Os desafios diários apresentam escalações da Copa América, partidas da CONCACAF, clássicos da Copa Libertadores e momentos icônicos da história do futebol americano. Imperdível para fãs de futebol além da Europa.",
    "futbol11-america.how.0": "Os desafios focam no futebol americano",
    "futbol11-america.how.1": "Adivinhe escalações da Copa América, Libertadores, etc.",
    "futbol11-america.how.2": "Cobre América do Norte, Central e do Sul",
    "futbol11-america.how.3": "Mesma mecânica do jogo principal Futbol11",
    "futbol11-euro2024.title": "Futbol11 Euro 2024",
    "futbol11-euro2024.description":
      "Reviva a Euro 2024! Adivinhe as escalações de cada partida do torneio.",
    "futbol11-euro2024.long":
      "Reviva a emoção da UEFA Euro 2024 realizada na Alemanha. Esta edição especial cobre cada partida do torneio, das fases de grupos à grande final. Lembre as formações táticas, os titulares surpresa e as formações que moldaram o torneio. Sejam as atuações dominantes dos favoritos ou as aulas táticas dos azarões, este jogo permite testar sua memória do maior evento do futebol europeu.",
    "futbol11-euro2024.how.0": "Selecione uma partida da Euro 2024",
    "futbol11-euro2024.how.1": "Adivinhe o XI titular de qualquer equipe",
    "futbol11-euro2024.how.2": "Precisão histórica é necessária",
    "futbol11-euro2024.how.3": "Cobre todas as partidas do torneio",
    "futbol11-copaamerica.title": "F11 Copa América",
    "futbol11-copaamerica.description":
      "Edição da Copa América, adivinhe escalações do principal torneio das Américas.",
    "futbol11-copaamerica.long":
      "A edição da Copa América traz o torneio internacional de futebol mais antigo para sua tela. Das primeiras edições vencidas pelo Uruguai aos triunfos recentes da Argentina, do domínio do Brasil à geração de ouro do Chile, este jogo cobre a história da Copa América em profundidade. Cada desafio diário apresenta uma escalação de uma partida da Copa América, testando seu conhecimento do futebol sul-americano em sua melhor forma.",
    "futbol11-copaamerica.how.0": "Partidas da Copa América são apresentadas diariamente",
    "futbol11-copaamerica.how.1": "Adivinhe o XI titular completo",
    "futbol11-copaamerica.how.2": "Cobre várias edições do torneio",
    "futbol11-copaamerica.how.3": "Aprenda sobre a história do futebol sul-americano",
    "futbol11-worldcup.title": "Futbol11 Copa do Mundo",
    "futbol11-worldcup.description":
      "Escalações de Copa do Mundo de 1930 a 2022, o desafio definitivo do futebol internacional.",
    "futbol11-worldcup.long":
      "A edição da Copa do Mundo é a joia da coroa do Futbol11. Cobrindo cada Copa do Mundo da FIFA do Uruguai 1930 ao Catar 2022, este jogo desafia você a lembrar os XIs titulares das maiores partidas da história do futebol. Lembra quem começou a final de 2006? O elenco do Brasil de 1970? A escalação da anfitriã de 1998? Com quase um século de história da Copa do Mundo, este é o teste definitivo para qualquer aficionado por futebol que se considera um verdadeiro estudioso do jogo.",
    "futbol11-worldcup.how.0": "Selecione uma partida de Copa do Mundo de qualquer ano",
    "futbol11-worldcup.how.1": "Nomeie o XI titular",
    "futbol11-worldcup.how.2": "Cobre todas as Copas do Mundo de 1930 a 2022",
    "futbol11-worldcup.how.3": "O desafio definitivo da história do futebol",
    "futbol11-higher-lower.title": "Futbol11 Maior ou Menor",
    "futbol11-higher-lower.description":
      "Maior ou menor? Adivinhe qual jogador marcou mais gols na carreira e construa sua sequência.",
    "futbol11-higher-lower.long":
      "Maior ou Menor é um jogo rápido e viciante de adivinhação de futebol. Você vê dois jogadores lado a lado, um com seu total de gols na carreira revelado, o outro oculto. Seu trabalho é simples: decidir se o jogador misterioso marcou mais ou menos gols na carreira. Acerte e a cadeia continua, sua sequência sobe e o próximo jogador entra. Erre e a sequência termina. De Cristiano Ronaldo e Lionel Messi a artilheiros históricos como Pelé, Puskás e Gerd Müller, este jogo testa o quanto você realmente conhece os maiores goleadores do futebol de todas as épocas.",
    "futbol11-higher-lower.how.0": "Compare os dois jogadores mostrados",
    "futbol11-higher-lower.how.1": "Decida se o jogador oculto marcou mais ou menos gols na carreira",
    "futbol11-higher-lower.how.2": "Cada palpite certo estende sua sequência",
    "futbol11-higher-lower.how.3": "Um palpite errado termina a sequência, persiga sua melhor marca",
    "octadle.title": "Octadle",
    "octadle.description":
      "Oito palavras de futebol de uma vez. Resolva as 8 palavras em 13 palpites com dicas de cores estilo Wordle.",
    "octadle.long":
      "O Octadle é o desafio definitivo de palavras para fãs de futebol. Em vez de uma palavra, você resolve oito palavras de futebol de cinco letras ao mesmo tempo. Cada palpite digitado é avaliado nos oito quadros, então cada tentativa dá oito conjuntos de dicas de uma vez. Verde significa que a letra está correta e no lugar certo, amarelo significa que a letra está na palavra mas no lugar errado, e cinza significa que a letra não está naquela palavra. Com 13 palpites para decifrar as oito palavras, você precisa de palavras iniciais inteligentes e boa percepção de padrões. Um novo conjunto de oito palavras chega todos os dias.",
    "octadle.how.0": "Digite uma palavra de 5 letras, ela é avaliada nos 8 quadros de uma vez",
    "octadle.how.1": "Verde = letra correta, posição correta",
    "octadle.how.2": "Amarelo = letra correta, posição errada",
    "octadle.how.3": "Cinza = letra não está naquela palavra",
    "octadle.how.4": "Resolva as 8 palavras em 13 palpites",
    "formudle.title": "Formudle",
    "formudle.description":
      "Adivinhe o piloto de Fórmula 1. Cada palpite compara nacionalidade, equipe, estreia, títulos e primeira vitória.",
    "formudle.long":
      "O Formudle é o jogo diário de adivinhação de pilotos de Fórmula 1. Um piloto misterioso está escondido, e você tem 8 palpites para nomeá-lo. Cada palpite é comparado com a resposta: células verdes significam correspondência exata em nacionalidade ou equipe, e setas no ano de estreia, títulos de campeonato e ano da primeira vitória indicam se a resposta é maior ou menor. O grupo cobre o grid atual e lendas de todos os tempos, de Max Verstappen e Lewis Hamilton a Ayrton Senna e Michael Schumacher. Um novo piloto chega todos os dias.",
    "formudle.how.0": "Digite o nome de um piloto de Fórmula 1 a partir das sugestões",
    "formudle.how.1": "Células verdes significam correspondência exata em nação ou equipe",
    "formudle.how.2": "Setas mostram se a resposta é maior ou menor em estreia, títulos e primeira vitória",
    "formudle.how.3": "Use as dicas para restringir as opções",
    "formudle.how.4": "Adivinhe o piloto em 8 tentativas",
    "wrestleplay.title": "WrestlePlay",
    "wrestleplay.description":
      "Adivinhe o lutador. Cada palpite compara nacionalidade, promoção, estreia, altura e títulos mundiais.",
    "wrestleplay.long":
      "O WrestlePlay é o jogo diário de adivinhação de lutadores. Um lutador misterioso está escondido, e você tem 8 palpites para nomeá-lo. Cada palpite é comparado com a resposta: células verdes significam correspondência exata em nacionalidade ou promoção, e setas no ano de estreia, altura anunciada e reinados de títulos mundiais indicam se a resposta é maior ou menor. O grupo cobre estrelas da WWE e AEW e lendas de todos os tempos, de John Cena e Roman Reigns a The Undertaker e Ric Flair. Um novo lutador chega todos os dias.",
    "wrestleplay.how.0": "Digite o nome de um lutador a partir das sugestões",
    "wrestleplay.how.1": "Células verdes significam correspondência exata em nação ou promoção",
    "wrestleplay.how.2": "Setas mostram se a resposta é maior ou menor em estreia, altura e títulos mundiais",
    "wrestleplay.how.3": "Use as dicas para restringir as opções",
    "wrestleplay.how.4": "Adivinhe o lutador em 8 tentativas",
  },
  meta: {
    gameTitle: "{title} - Jogue Grátis Diariamente | Futbol11",
    gameNotFoundTitle: "Jogo Não Encontrado",
    articleNotFoundTitle: "Artigo Não Encontrado",
  },
  about: {
    metaTitle: "Sobre o Futbol11 - Jogos Diários de Futebol e Quebra-Cabeças",
    metaDesc:
      "Conheça o Futbol11, a casa de 23 jogos gratuitos diários de trivia de futebol, quebra-cabeças e desafios de palavras cobrindo todas as ligas, competições e épocas.",
    title: "Sobre o Futbol11",
    intro: "O Futbol11 é uma plataforma gratuita de jogos diários de futebol criada por fãs de futebol, para fãs de futebol.",
    h1: "O que é o Futbol11?",
    p1: "O Futbol11 é uma coleção de 23 jogos diários exclusivos de futebol cobrindo trivia, quebra-cabeças, jogos de palavras e desafios de estratégia. De adivinhar escalações históricas a resolver o Wordle de futebol, preencher a Grade de Futebol ou encontrar o impostor em um grupo de jogadores, há um novo desafio esperando todos os dias à meia-noite. Nossos jogos abrangem toda a história do esporte, da Copa do Mundo de 1930 à mais recente ação da Premier League, La Liga e Champions League.",
    h2: "O que você pode jogar",
    p2: "A coleção tem 18 jogos de trivia, 3 jogos de quebra-cabeça, 2 jogos de palavras e 1 jogo de estratégia. Fãs de trivia podem adivinhar escalações de todas as Copas do Mundo desde 1930, nomear os melhores XIs de todos os tempos ou testar sua memória da Euro 2024 e da Copa América. Fãs de quebra-cabeças têm a Grade de Futebol, Connections e Impostor. Fãs de jogos de palavras têm o Wordle do Futbol11 e o Octadle, nosso desafio de oito palavras de uma vez.",
    p3: "Três jogos são novidade. Octadle, Formudle e WrestlePlay chegaram ao site em novembro de 2026. O Formudle é um jogo diário de adivinhação de pilotos de Fórmula 1, e o WrestlePlay é a mesma ideia para lutadores. Os três jogam da mesma forma que os jogos de futebol: um novo quebra-cabeça todos os dias, grátis para jogar, sem precisar de conta.",
    h3: "Nossa missão",
    p4: "Acreditamos que o conhecimento de futebol deve ser divertido de testar e gratificante de desenvolver. Cada jogo no Futbol11 foi criado para ser divertido e educativo: até um palpite errado ensina algo novo sobre um jogador, clube, torneio ou momento da história do futebol. Não há contas para criar nem nada para baixar, basta abrir o site e jogar.",
    h4: "Como funciona",
    p5: "Cada jogo é atualizado diariamente para que todos no mundo enfrentem o mesmo desafio ao mesmo tempo. Sua pontuação diária e seu progresso são armazenados localmente no seu navegador, então você pode continuar de onde parou sem nunca entregar informações pessoais. Jogos concluídos também contam para sua sequência e para o ranking, usando apenas um ID de dispositivo aleatório, nunca seu nome ou e-mail. Leia nossa {privacy} para os detalhes completos.",
    p6: "Novo em um jogo? O {blog} tem guias passo a passo que explicam as regras e compartilham dicas, começando com o Wordle do Futbol11 e a Grade de Futebol. Mais guias são adicionados regularmente.",
    h5: "Comece a jogar",
    p7: "Entre em jogos populares como {grid}, {wordle}, {connections} ou {higherLower}, ou navegue pela lista completa na {home}.",
    p8: "Perguntas, comentários ou ideias de jogos? Adoraríamos ouvir você, acesse nossa {contact}.",
    homePage: "página inicial",
    contactPage: "página de Contato",
    updated: "Página atualizada pela última vez: 9 de novembro de 2026.",
  },
  contact: {
    metaTitle: "Fale Conosco - Futbol11",
    metaDesc:
      "Entre em contato com a equipe do Futbol11. Envie comentários, reporte um problema ou sugira um novo jogo diário de futebol.",
    title: "Fale Conosco",
    intro:
      "Adoraríamos ouvir você, seja um comentário, um relatório de erro, uma correção em uma de nossas respostas de trivia ou uma ideia para um jogo totalmente novo.",
    hEmail: "E-mail",
    pEmail:
      "A melhor forma de nos contatar é por e-mail. Lemos todas as mensagens e buscamos responder em poucos dias úteis. O e-mail é nosso único canal de contato, então use o endereço abaixo para todas as dúvidas, incluindo comentários, correções e ideias de jogos.",
    hBefore: "Antes de escrever",
    pBefore:
      "Muitas perguntas já estão respondidas no site. A {faq} cobre reinicializações diárias, jogos no celular, níveis de dificuldade e a pontuação diária. O {blog} explica como jogar Wordle e a Grade de Futebol passo a passo. Se sua resposta não estiver lá, escreva para nós e ajudaremos.",
    faqLink: "seção de FAQ na página inicial",
    hInclude: "O que incluir",
    li1: "Se estiver reportando um erro, diga qual jogo, o que aconteceu e qual dispositivo e navegador você usou.",
    li2: "Se estiver sugerindo uma correção, inclua o jogo e a data em que jogou, além da resposta que você acha errada e o porquê.",
    li3: "Se estiver propondo um novo jogo, descreva como seria jogado em uma ou duas frases, e qual esporte ou competição ele cobre.",
    li4: "Se sua sequência ou pontuação diária parecer errada, diga quais jogos você jogou e em quais datas.",
    hWrong: "Reporte uma resposta errada",
    pWrong:
      "Nossas respostas de trivia vêm de registros de futebol, mas erros podem passar. Se você encontrar um, envie o nome do jogo, a data e a resposta correta com uma fonte, se tiver. Verificamos cada relatório e corrigimos erros confirmados, para que os jogadores do dia seguinte recebam a resposta certa.",
    hElse: "Procurando outra coisa?",
    pElse: "Leia mais {about}, revise nossa {privacy} e nossos {terms}, ou volte para os {games}.",
    aboutLink: "sobre o Futbol11",
    gamesLink: "jogos",
    updated: "Página atualizada pela última vez: 9 de novembro de 2026.",
  },
  privacy: {
    metaTitle: "Política de Privacidade - Futbol11",
    metaDesc:
      "Como o Futbol11 lida com dados, cookies e publicidade de terceiros, incluindo o uso de cookies do Google AdSense, e como você pode desativar anúncios personalizados.",
    title: "Política de Privacidade",
    intro: "Última atualização: 9 de novembro de 2026",
    pIntro:
      "Esta Política de Privacidade explica como o Futbol11 (\"nós\" ou \"nosso\") coleta, usa e protege informações quando você visita {site} (o \"Site\"). Ao usar o Site, você concorda com as práticas descritas aqui.",
    hCollect: "Informações que coletamos",
    pCollect1:
      "O Futbol11 não exige que você crie uma conta, e não pedimos informações pessoais como seu nome, endereço de e-mail ou dados de pagamento para jogar nossos jogos. Seu progresso no jogo, pontuação diária e preferências são armazenados localmente no seu navegador usando armazenamento local. Os resultados dos jogos também podem ser enviados ao nosso servidor conforme descrito na seção \"Resultados de jogos, sequências e ranking\" abaixo, usando apenas um ID de dispositivo aleatório e nunca seu nome ou e-mail.",
    pCollect2:
      "Como a maioria dos sites, nosso provedor de hospedagem e serviços de terceiros podem receber automaticamente informações técnicas padrão, como seu endereço IP, tipo de navegador, tipo de dispositivo e as páginas que você visita. Essas informações são usadas de forma agregada para manter o Site seguro e entender como ele é usado.",
    hResults: "Resultados de jogos, sequências e ranking",
    pResults1:
      "Quando você termina um jogo, seu navegador pode enviar o resultado ao nosso servidor: o nome do jogo, se você venceu e sua pontuação. Ele é enviado com um ID de dispositivo aleatório que seu navegador cria, não com seu nome, endereço de e-mail ou qualquer conta. Usamos esses resultados apenas para gerenciar sua sequência, que conta os dias consecutivos que você jogou, e o ranking, que classifica os melhores jogadores por vitórias e melhor sequência.",
    pResults2:
      "O ranking mostra rótulos anônimos tirados do ID do dispositivo, como \"Jogador 7F3A1C9E\", nunca seu nome. Se o servidor não puder ser alcançado, os resultados aguardam no seu navegador e são enviados depois. Limpar o armazenamento do navegador remove seu progresso local e redefine o ID do dispositivo, o que inicia uma nova sequência e entrada no ranking.",
    hCookies: "Cookies e armazenamento local",
    pCookies:
      "Cookies são pequenos arquivos de texto colocados no seu dispositivo. Usamos armazenamento local para lembrar seu progresso no jogo. Parceiros terceiros, incluindo provedores de publicidade e análise, também podem definir cookies conforme descrito abaixo. Você pode controlar ou excluir cookies nas configurações do navegador; desativá-los não impedirá você de jogar, mas algumas preferências podem não ser lembradas entre visitas.",
    hAds: "Publicidade e Google AdSense",
    pAds:
      "Usamos empresas de publicidade terceirizadas, incluindo o Google AdSense, para exibir anúncios quando você visita o Site. Esses parceiros ajudam a manter o Futbol11 gratuito para jogar.",
    li1: "Fornecedores terceiros, incluindo o Google, usam cookies para exibir anúncios com base em suas visitas anteriores a este e outros sites.",
    li2: "O uso de cookies de publicidade pelo Google permite que ele e seus parceiros exibam anúncios para você com base em sua visita ao nosso Site e/ou outros sites na Internet.",
    li3: "Você pode desativar a publicidade personalizada visitando {adsSettings}.",
    adsSettings: "Configurações de Anúncios do Google",
    li4: "Você também pode desativar o uso de cookies de um fornecedor terceiro para publicidade personalizada visitando {aboutAds}.",
    aboutAds: "www.aboutads.info",
    li5: "Para mais informações sobre como o Google usa dados quando você usa os sites ou aplicativos de nossos parceiros, veja {googlePrivacy}.",
    googlePrivacy: "Privacidade e Termos do Google",
    hAnalytics: "Análise",
    pAnalytics:
      "Podemos usar ferramentas de análise que respeitam a privacidade para entender o uso agregado e anonimizado do Site (por exemplo, quais jogos são mais populares). Essas ferramentas não identificam você pessoalmente.",
    hChildren: "Privacidade de crianças",
    pChildren:
      "O Futbol11 é destinado ao público geral e não é direcionado a crianças menores de 13 anos. Não coletamos intencionalmente informações pessoais de crianças. Se você acredita que uma criança forneceu informações pessoais, entre em contato conosco para que possamos removê-las.",
    hChoices: "Suas escolhas",
    pChoices:
      "Na primeira visita, um banner de cookies permite aceitar ou recusar cookies não essenciais (de publicidade e análise). Até você aceitar, eles ficam desativados por padrão através do Modo de Consentimento do Google. Você pode mudar sua decisão a qualquer momento limpando o armazenamento do navegador deste Site, o que faz o banner aparecer novamente. Você também pode gerenciar cookies nas configurações do navegador, desativar anúncios personalizados usando os links acima e limpar seus dados de jogo armazenados localmente da mesma forma.",
    hThird: "Links de terceiros",
    pThird:
      "O Site pode conter links para outros sites. Não somos responsáveis pelas práticas de privacidade desses sites e recomendamos que você leia suas políticas de privacidade.",
    hChanges: "Alterações nesta política",
    pChanges:
      "Podemos atualizar esta Política de Privacidade de tempos em tempos. Quaisquer alterações serão publicadas nesta página com uma data de \"Última atualização\" atualizada.",
    hContact: "Fale conosco",
    pContact:
      "Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em {email} ou através da nossa {contact}.",
    contactPage: "página de Contato",
  },
  terms: {
    metaTitle: "Termos de Serviço - Futbol11",
    metaDesc:
      "Os termos e condições para usar os jogos diários gratuitos de futebol do Futbol11, incluindo propriedade intelectual, avisos e limitações de responsabilidade.",
    title: "Termos de Serviço",
    crumb: "Termos",
    intro: "Última atualização: 9 de novembro de 2026",
    pIntro:
      "Bem-vindo ao Futbol11. Ao acessar ou usar este site (o \"Site\"), você concorda em cumprir estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, por favor não use o Site.",
    hUse: "Uso do Site",
    pUse:
      "O Futbol11 concede a você uma licença pessoal, não exclusiva e intransferível para acessar e jogar nossos jogos para seu próprio entretenimento não comercial. Você concorda em não usar o Site de forma indevida, interferir em seu funcionamento normal, tentar obter acesso não autorizado a qualquer parte dele ou usar sistemas automatizados para coletar dados ou sobrecarregar nossos serviços.",
    hFair: "Jogo justo",
    pFair:
      "Jogue honestamente. Não use bots, scripts ou outros sistemas automatizados para jogar, enviar resultados falsos ou manipular a sequência e o ranking. Podemos remover resultados que pareçam automatizados ou desonestos, e podemos bloquear o acesso por abuso repetido.",
    hResults: "Resultados de jogos e rankings",
    pResults:
      "Quando você termina um jogo, seu resultado pode ser registrado com um ID de dispositivo aleatório para que sua sequência e posição no ranking possam ser acompanhadas. Nenhum nome, endereço de e-mail ou conta está envolvido, e o ranking mostra apenas rótulos anônimos de jogador. Veja nossa {privacy} para saber como esses dados são tratados.",
    hIp: "Propriedade intelectual",
    pIp:
      "O Site, seus jogos, design, textos, gráficos e logotipos são propriedade do Futbol11 ou de seus licenciadores e são protegidos por leis de propriedade intelectual. Nomes de clubes, nomes de competições e nomes de jogadores são referenciados para fins informativos e editoriais; todas as marcas relacionadas permanecem propriedade de seus respectivos donos, e o Futbol11 não é afiliado a eles nem endossado por eles.",
    hDisclaimer: "Aviso legal",
    pDisclaimer:
      "O Site e todo o conteúdo são fornecidos \"como estão\" e \"conforme disponíveis\", sem garantias de qualquer tipo, expressas ou implícitas. Embora nos esforcemos pela precisão em nossos fatos e trivia de futebol, não garantimos que todo o conteúdo seja completo, atual ou livre de erros. Se você encontrar uma resposta errada, por favor nos avise através da {contact} para que possamos verificar e corrigir.",
    hLiability: "Limitação de responsabilidade",
    pLiability:
      "Na máxima extensão permitida por lei, o Futbol11 não será responsável por quaisquer danos indiretos, incidentais ou consequenciais decorrentes do seu uso ou da impossibilidade de usar o Site.",
    hThird: "Links de terceiros e publicidade",
    pThird:
      "O Site pode exibir publicidade e conter links para sites de terceiros. Não somos responsáveis pelo conteúdo, produtos ou práticas de terceiros. Suas interações com anunciantes ou sites vinculados são exclusivamente entre você e esse terceiro. Veja nossa {privacy} para saber como os cookies de publicidade são usados.",
    hChanges: "Alterações nestes termos",
    pChanges:
      "Podemos revisar estes Termos de Serviço a qualquer momento. O uso contínuo do Site após a publicação das alterações constitui sua aceitação dos termos atualizados.",
    hContact: "Fale conosco",
    pContact: "Perguntas sobre estes termos? Envie um e-mail para {email} ou visite nossa {contact}.",
    contactPage: "página de Contato",
  },
  blog: {
    metaTitle: "Blog Futbol11 - Guias e Dicas de Jogos de Futebol",
    metaDesc:
      "Guias e dicas para os jogos do Futbol11: como jogar Wordle, vencer a Grade de Futebol e mais. Quebra-cabeças diários gratuitos de futebol explicados.",
    title: "Blog Futbol11",
    intro:
      "Guias e dicas para nossos jogos diários de futebol. Aprenda as regras, adquira táticas vencedoras e aproveite mais cada quebra-cabeça.",
    readGuide: "Ler o guia",
    faqHeading: "Perguntas Frequentes",
    conclusionHeading: "Conclusão",
    backToGuides: "Voltar para todos os guias",
    published: "Publicado em {date}",
    blogCrumb: "Blog",
    home: "Início",
  },
};
