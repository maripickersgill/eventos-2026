import { useState, useMemo } from "react";

// ── TEAM ─────────────────────────────────────────────────────────────────────
const TEAM = [
  { nome: "Anna",     cargo: "Marketing",  cidade: "Campinas",        estado: "São Paulo",        regiao: "Sudeste" },
  { nome: "Andrews",  cargo: "Growth",     cidade: "Manaus",          estado: "Amazonas",         regiao: "Norte" },
  { nome: "Luiza",    cargo: "?",          cidade: "—",               estado: "—",                regiao: "—" },
  { nome: "Camile",   cargo: "?",          cidade: "Gravataí",        estado: "Rio Grande do Sul",regiao: "Sul" },
  { nome: "Julia",    cargo: "?",          cidade: "Belo Horizonte",  estado: "Minas Gerais",     regiao: "Sudeste" },
  { nome: "Victória", cargo: "?",          cidade: "São Paulo",       estado: "São Paulo",        regiao: "Sudeste" },
  { nome: "Rayssa",   cargo: "?",          cidade: "—",               estado: "—",                regiao: "—" },
  { nome: "Mariana",  cargo: "Marketing Manager", cidade: "Amsterdam", estado: "Países Baixos",  regiao: "Internacional" },
  { nome: "Igor",     cargo: "?",          cidade: "São Paulo",       estado: "São Paulo",        regiao: "Sudeste" },
];

// ── EVENTS ────────────────────────────────────────────────────────────────────
const EVENTS = [
  // BR
  { id:1,  mes:"Março",     mesN:3,  evento:"CMO Summit",               local:"Expo Center Norte (SP)",           estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun", escopo:"Brasil",        valorMin:987,  valorDisp:"R$ 987",               site:"https://cmosummit.com.br/",                 desc:"Imersão com os maiores profissionais de marketing em um só lugar." },
  { id:2,  mes:"Março",     mesN:3,  evento:"South Summit Brazil",       local:"Cais Mauá (Porto Alegre)",         estado:"Rio Grande do Sul",  regiao:"Sul",               cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:null, valorDisp:"A divulgar",           site:"https://www.southsummit.io/pt",             desc:"Ponto de conexões entre investidores, empresas e startups." },
  { id:3,  mes:"Março",     mesN:3,  evento:"Tijuca Geek Festival",      local:"Rio de Janeiro",                   estado:"Rio de Janeiro",     regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://tijucageekfestival.com.br/",         desc:"Anime, manga, cosplay, K-Pop, RPG, card games e cultura japonesa." },
  { id:4,  mes:"Março",     mesN:3,  evento:"Geek Day",                  local:"Londrina (PR)",                    estado:"Paraná",             regiao:"Sul",               cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://www.instagram.com/geekdayeventos/", desc:"Evento de cultura gamer, cosplay, kpop, anime." },
  { id:5,  mes:"Março",     mesN:3,  evento:"Video Game Hall",           local:"Rio de Janeiro",                   estado:"Rio de Janeiro",     regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://www.instagram.com/videogamehall/",  desc:"Maior celebração gamer do Rio." },
  { id:6,  mes:"Abril",     mesN:4,  evento:"VTEX Day",                  local:"São Paulo Expo (SP)",              estado:"São Paulo",         regiao:"Sudeste",           cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:2000, valorDisp:"R$ 2.000",             site:"https://vtexday.vtex.com/",                 desc:"O maior evento de digital commerce do mundo." },
  { id:7,  mes:"Abril",     mesN:4,  evento:"BiS SiGMA South America",   local:"São Paulo (SP)",                   estado:"São Paulo",         regiao:"Sudeste",           cat:"iGaming & Betting",       marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://sigma.world/pt-br/summits/south-america/", desc:"Ponto estratégico do ecossistema de iGaming, apostas e afiliados." },
  { id:8,  mes:"Maio",      mesN:5,  evento:"Gramado Summit",            local:"Gramado Serra Park (RS)",          estado:"Rio Grande do Sul",  regiao:"Sul",               cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:1890, valorDisp:"R$ 1.890",             site:"https://www.gramadosummit.com/",            desc:"Palestrantes de topo sobre empreendedorismo, inovação e marketing." },
  { id:9,  mes:"Maio",      mesN:5,  evento:"MMA Impact",                local:"São Paulo (SP)",                   estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:999,  valorDisp:"R$ 999 – R$ 3.699",   site:"https://mmaglobal.com/impactbrasil2026",    desc:"Criatividade, tecnologia e comportamento moldando marcas e negócios." },
  { id:10, mes:"Maio",      mesN:5,  evento:"Proxxima Meio&Mensagem",    local:"WTC (SP)",                         estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:1950, valorDisp:"R$ 1.950",             site:"https://evento.proxxima.com.br/",           desc:"Líderes de marcas, agências e adtechs discutindo o futuro do marketing." },
  { id:11, mes:"Maio",      mesN:5,  evento:"RIO2C",                     local:"Cidade das Artes, RJ",             estado:"Rio de Janeiro",     regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:1300, valorDisp:"R$ 1.300 – R$ 3.700", site:"https://www.rio2c.com/",                    desc:"Maior encontro de criatividade e economia criativa da América Latina." },
  { id:12, mes:"Maio",      mesN:5,  evento:"Conexão Social Media",      local:"São Paulo Expo (SP)",              estado:"São Paulo",         regiao:"Sudeste",           cat:"Social & Influência",     marca:"Spun",escopo:"Brasil",        valorMin:947,  valorDisp:"R$ 947",               site:"https://www.conexaosocialmedia.com/",       desc:"Um dos maiores eventos brasileiros focados em redes sociais." },
  { id:13, mes:"Maio",      mesN:5,  evento:"Afiliados Brazil",          local:"Frei Caneca (SP)",                 estado:"São Paulo",         regiao:"Sudeste",           cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://afiliadosbrasil.com.br/",           desc:"Maior evento de afiliados do mundo." },
  { id:14, mes:"Maio",      mesN:5,  evento:"GamesCon Latam",            local:"São Paulo (SP)",                   estado:"São Paulo",         regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://latam.gamescom.global/",            desc:"Uma das maiores feiras de games da América Latina." },
  { id:15, mes:"Maio",      mesN:5,  evento:"Brasilia Game Festival",    local:"Brasília",                         estado:"Brasília",           regiao:"Centro-Oeste",      cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://brasiliagamefestival.com.br/",      desc:"Festival gamer com competições, stands e cultura pop." },
  { id:16, mes:"Junho",     mesN:6,  evento:"Digimarcon Brazil",         local:"Intercontinental SP",              estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://digimarconbrazil.com.br/",          desc:"Premier Digital Marketing, Media and Advertising Conference do Brasil." },
  { id:17, mes:"Junho",     mesN:6,  evento:"Varejo TechDay",            local:"Centro de Inovação ACATE (SC)",    estado:"Santa Catarina",     regiao:"Sul",               cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:439,  valorDisp:"R$ 439",               site:"https://www.acate.com.br/",                 desc:"Maior evento de tecnologia para o varejo do sul do Brasil." },
  { id:18, mes:"Junho",     mesN:6,  evento:"Influent Summit",           local:"Expo Center Norte (SP)",           estado:"São Paulo",         regiao:"Sudeste",           cat:"Social & Influência",     marca:"Spun",escopo:"Brasil",        valorMin:1497, valorDisp:"R$ 1.497",             site:"https://www.influentsummit.com.br/",        desc:"Marcas, plataformas, creators e líderes do mercado de influência." },
  { id:19, mes:"Junho",     mesN:6,  evento:"Web Summit Rio",            local:"Rio de Janeiro",                   estado:"Rio de Janeiro",     regiao:"Sudeste",           cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:595,  valorDisp:"R$ 595 – R$ 7.495",   site:"https://rio.websummit.com/pt-br/",          desc:"Versão brasileira do maior evento de tecnologia e inovação da Europa." },
  { id:20, mes:"Junho",     mesN:6,  evento:"GAT Brazil",                local:"Distrito Anhembi (SP)",            estado:"São Paulo",         regiao:"Sudeste",           cat:"iGaming & Betting",       marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://www.gatevents.net/",                desc:"Líderes de jogos online, apostas esportivas e eSports." },
  { id:21, mes:"Julho",     mesN:7,  evento:"O novo mercado",            local:"Vibra (SP)",                       estado:"São Paulo",         regiao:"Sudeste",           cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:2197, valorDisp:"R$ 2.197",             site:"https://onovomercado.com/",                 desc:"4.000 pessoas reunidas para crescer no mercado digital." },
  { id:22, mes:"Julho",     mesN:7,  evento:"Expo Empreendedor",         local:"Expo Center Norte (SP)",           estado:"São Paulo",         regiao:"Sudeste",           cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:1597, valorDisp:"R$ 1.597",             site:"https://expoempreendedor.com.br/",          desc:"O evento de negócios que mais cresce no Brasil. Conexões presenciais de alto valor." },
  { id:23, mes:"Julho",     mesN:7,  evento:"E-commerce Brasil Forum",   local:"Distrito Anhembi (SP)",            estado:"São Paulo",         regiao:"Sudeste",           cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:2397, valorDisp:"R$ 2.397",             site:"https://eventos.ecommercebrasil.com.br/forum", desc:"3 dias de conteúdo de altíssima qualidade e networking estratégico." },
  { id:24, mes:"Julho",     mesN:7,  evento:"Anime Friends",             local:"São Paulo (SP)",                   estado:"São Paulo",         regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://animefriends.com.br/",              desc:"Um dos maiores eventos de cultura pop, anime e games do Brasil." },
  { id:25, mes:"Agosto",    mesN:8,  evento:"Rio Innovation Week",       local:"Pier Mauá (RJ)",                   estado:"Rio de Janeiro",     regiao:"Sudeste",           cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://rioinnovationweek.com.br/",         desc:"Maior conferência global de negócios, creator economy e inovação." },
  { id:26, mes:"Agosto",    mesN:8,  evento:"Brand100",                  local:"Costão do Santinho (SC)",          estado:"Santa Catarina",     regiao:"Sul",               cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://brand100events.com/brasil/",        desc:"Veículos, agências e anunciantes discutindo propostas exclusivas." },
  { id:27, mes:"Agosto",    mesN:8,  evento:"Varejo Experience",         local:"Foz do Iguaçu (PR)",               estado:"Paraná",             regiao:"Sul",               cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:1999, valorDisp:"R$ 1.999",             site:"https://varejoexperience.com.br/",          desc:"Maiores nomes e marcas do Brasil com networking de alto nível." },
  { id:28, mes:"Agosto",    mesN:8,  evento:"Startup Summit",            local:"Centrosul (SC)",                   estado:"Santa Catarina",     regiao:"Sul",               cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:1499, valorDisp:"R$ 1.499",             site:"https://www.startupsummit.com.br/",         desc:"200 palestrantes, 10.000 pessoas. Startups, investidores e empreendedores." },
  { id:29, mes:"Agosto",    mesN:8,  evento:"Brazil Promotion",          local:"Distrito Anhembi (SP)",            estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://www.brazilpromotion.com.br/",       desc:"22ª edição. Principal feira de marketing e negócios corporativos do Brasil." },
  { id:30, mes:"Agosto",    mesN:8,  evento:"Conarh",                    local:"São Paulo Expo (SP)",              estado:"São Paulo",         regiao:"Sudeste",           cat:"RH & Gestão",             marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://conarh.org.br/",                    desc:"Maior evento de RH e gestão de pessoas do mundo." },
  { id:31, mes:"Agosto",    mesN:8,  evento:"G&M Events Brazil",         local:"São Paulo (SP)",                   estado:"São Paulo",         regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://g-mnews.com/en/gm-events-brazil-2026/", desc:"Ponto de encontro essencial para a indústria de jogos no Brasil." },
  { id:32, mes:"Setembro",  mesN:9,  evento:"Conarec",                   local:"Transamérica Expo Center (SP)",    estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:3180, valorDisp:"R$ 3.180",             site:"https://conarec.com.br/",                   desc:"Maior evento dedicado à experiência do cliente no mundo." },
  { id:33, mes:"Setembro",  mesN:9,  evento:"Latam Retail Show",         local:"Expo Center Norte (SP)",           estado:"São Paulo",         regiao:"Sudeste",           cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:3400, valorDisp:"R$ 3.400",             site:"https://latamretailshow.com.br",            desc:"O mais relevante evento de varejo & consumo da América Latina." },
  { id:34, mes:"Setembro",  mesN:9,  evento:"HJ Conference",             local:"Concórdia (SC)",                   estado:"Santa Catarina",     regiao:"Sul",               cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:2699, valorDisp:"R$ 2.699",             site:"https://hjconference.com.br/",              desc:"Conferência de conteúdo e conexões que transforma o empreendedor brasileiro." },
  { id:35, mes:"Setembro",  mesN:9,  evento:"YOUpix Summit",             local:"Transamérica Expo Center (SP)",    estado:"São Paulo",         regiao:"Sudeste",           cat:"Social & Influência",     marca:"Spun",escopo:"Brasil",        valorMin:593,  valorDisp:"R$ 593",               site:"https://www.youpix.com.br/",                desc:"Principal evento de creator economy da América Latina." },
  { id:36, mes:"Setembro",  mesN:9,  evento:"D2C Summit",                local:"Distrito Anhembi (SP)",            estado:"São Paulo",         regiao:"Sudeste",           cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:899,  valorDisp:"R$ 899",               site:"https://d2csummit.com.br/",                 desc:"Relação direta com o cliente, sem intermediários. Marca com diferenciação." },
  { id:37, mes:"Setembro",  mesN:9,  evento:"Digitalks Expo",            local:"A divulgar",                       estado:"A definir",          regiao:"A definir",         cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://digitalks.com.br/expo",             desc:"Trilhas de FinTech, AI & Robotics, Venture Capital e Smart Cities." },
  { id:38, mes:"Setembro",  mesN:9,  evento:"Mercado Livre Experience",  local:"Transamérica Expo Center (SP)",    estado:"São Paulo",         regiao:"Sudeste",           cat:"E-commerce & Varejo",     marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://mercadolivreexperience.com.br/",    desc:"Fortalecimento do ecossistema de vendas online do Mercado Livre." },
  { id:39, mes:"Outubro",   mesN:10, evento:"Universo TOTVS",            local:"Expo Center Norte (SP)",           estado:"São Paulo",         regiao:"Sudeste",           cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:1600, valorDisp:"R$ 1.600",             site:"https://eventos.totvs.com/",                desc:"Maior evento anual da TOTVS. Gestão empresarial, tecnologia e inovação." },
  { id:40, mes:"Outubro",   mesN:10, evento:"Brasil Games Show (BGS)",   local:"Distrito Anhembi (SP)",            estado:"São Paulo",         regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://www.brasilgameshow.com.br/",        desc:"Maior feira de games da América Latina e uma das maiores do mundo." },
  { id:41, mes:"Novembro",  mesN:11, evento:"SEO Summit",                local:"São Paulo (SP)",                   estado:"São Paulo",         regiao:"Sudeste",           cat:"SEO & Conteúdo",          marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"https://www.seosummit.com.br/",             desc:"O maior evento de SEO, Conteúdo e Marketing Orgânico do Brasil." },
  { id:42, mes:"Dezembro",  mesN:12, evento:"Product Camp",              local:"Frei Caneca (SP)",                 estado:"São Paulo",         regiao:"Sudeste",           cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"",                                          desc:"Evento de produto e inovação." },
  { id:43, mes:"Dezembro",  mesN:12, evento:"CCXP",                      local:"São Paulo Expo (SP)",              estado:"São Paulo",         regiao:"Sudeste",           cat:"Games & Cultura Pop",     marca:"Ezor",escopo:"Brasil",        valorMin:null, valorDisp:"A divulgar",           site:"",                                          desc:"Maior festival de cultura pop do mundo. Quadrinhos, games, filmes e séries." },
  { id:44, mes:"A definir", mesN:99, evento:"Growth Experience",         local:"Chapecó (SC)",                     estado:"Santa Catarina",     regiao:"Sul",               cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:1197, valorDisp:"R$ 1.197",             site:"",                                          desc:"Crescimento e estratégia de negócios." },
  { id:45, mes:"A definir", mesN:99, evento:"MXMA Maximidia",            local:"Hotel Unique (SP)",                estado:"São Paulo",         regiao:"Sudeste",           cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:3570, valorDisp:"R$ 3.570",             site:"",                                          desc:"Meio & Mensagem. Alto nível de marketing e comunicação." },
  { id:46, mes:"A definir", mesN:99, evento:"Analytics Summit",          local:"Vila Olímpia (SP)",                estado:"São Paulo",         regiao:"Sudeste",           cat:"Tech & Inovação",         marca:"Spun",escopo:"Brasil",        valorMin:1694, valorDisp:"R$ 1.694",             site:"",                                          desc:"Dados, analytics e inteligência de negócios." },
  { id:47, mes:"A definir", mesN:99, evento:"CRM Zummit",                local:"Florianópolis (SC)",               estado:"Santa Catarina",     regiao:"Sul",               cat:"Marketing & Comunicação", marca:"Spun",escopo:"Brasil",        valorMin:585,  valorDisp:"R$ 585",               site:"",                                          desc:"CRM, fidelização e relacionamento com o cliente." },
  { id:48, mes:"A definir", mesN:99, evento:"Growth Conference Brasil",  local:"A divulgar",                       estado:"A definir",          regiao:"A definir",         cat:"Negócios & Empreendedorismo",marca:"Spun",escopo:"Brasil",       valorMin:849,  valorDisp:"R$ 849",               site:"",                                          desc:"Estratégias de crescimento acelerado." },
  // Internacional
  { id:49, mes:"Março",     mesN:3,  evento:"SXSW",                      local:"Austin, TX — EUA",                 estado:"EUA",                regiao:"América do Norte",  cat:"Marketing & Comunicação", marca:"—",   escopo:"Internacional", valorMin:1800, valorDisp:"$ 1.800+",            site:"https://www.sxsw.com",                      desc:"O cruzamento global entre tecnologia, cultura e marketing." },
  { id:50, mes:"Março",     mesN:3,  evento:"Adobe Summit",              local:"Las Vegas, NV — EUA",              estado:"EUA",                regiao:"América do Norte",  cat:"Tech & Inovação",         marca:"—",   escopo:"Internacional", valorMin:1500, valorDisp:"$ 1.500+",            site:"https://summit.adobe.com",                  desc:"IA, personalização e experiência digital em escala." },
  { id:51, mes:"Abril",     mesN:4,  evento:"Possible Conference",       local:"Miami Beach, FL — EUA",            estado:"EUA",                regiao:"América do Norte",  cat:"Marketing & Comunicação", marca:"—",   escopo:"Internacional", valorMin:2500, valorDisp:"$ 2.500+",            site:"https://possibleevent.com",                 desc:"5.000+ executivos de marketing. Foco em marca e negócios." },
  { id:52, mes:"Abril",     mesN:4,  evento:"IAB NewFronts",             local:"Nova York — EUA",                  estado:"EUA",                regiao:"América do Norte",  cat:"Social & Influência",     marca:"—",   escopo:"Internacional", valorMin:0,    valorDisp:"Gratuito",            site:"https://www.iab.com/events/newfronts",       desc:"Maior marketplace digital de conteúdo do mundo." },
  { id:53, mes:"Maio",      mesN:5,  evento:"OMR Festival",              local:"Hamburgo — Alemanha",               estado:"Alemanha",           regiao:"Europa",            cat:"Marketing & Comunicação", marca:"—",   escopo:"Internacional", valorMin:270,  valorDisp:"€ 249+",              site:"https://omr.com",                           desc:"Part festival, part conference. 67.000 visitantes, Tom Brady, Scott Galloway." },
  { id:54, mes:"Maio",      mesN:5,  evento:"DMWF Global",               local:"Londres — Reino Unido",            estado:"Reino Unido",        regiao:"Europa",            cat:"Social & Influência",     marca:"—",   escopo:"Internacional", valorMin:510,  valorDisp:"£ 449+",              site:"https://digitalmarketingworldforum.com",    desc:"Estratégia de conteúdo, social media e crescimento de marca global." },
  { id:55, mes:"Junho",     mesN:6,  evento:"Cannes Lions",              local:"Cannes — França",                  estado:"França",             regiao:"Europa",            cat:"Marketing & Comunicação", marca:"—",   escopo:"Internacional", valorMin:3300, valorDisp:"€ 3.000+",            site:"https://www.canneslions.com",               desc:"73ª edição. O festival mais prestigioso de criatividade do mundo. 15.000 delegados." },
  { id:56, mes:"Junho",     mesN:6,  evento:"MAD//Fest",                 local:"Londres — Reino Unido",            estado:"Reino Unido",        regiao:"Europa",            cat:"Marketing & Comunicação", marca:"—",   escopo:"Internacional", valorMin:0,    valorDisp:"Convidados",          site:"https://www.madfestlondon.com",             desc:'"Disneyland das marcas". 15.000+ convidados. 10 palcos, experiências imersivas.' },
  { id:57, mes:"Junho",     mesN:6,  evento:"Gartner Marketing Symposium",local:"Nova York — EUA",                 estado:"EUA",                regiao:"América do Norte",  cat:"Tech & Inovação",         marca:"—",   escopo:"Internacional", valorMin:4200, valorDisp:"€ 3.850+",            site:"https://www.gartner.com/en/conferences",    desc:"Referência para CMOs. Pesquisa aplicada, futuro do cliente e escalabilidade." },
  { id:58, mes:"Setembro",  mesN:9,  evento:"DMEXCO",                    local:"Colônia — Alemanha",               estado:"Alemanha",           regiao:"Europa",            cat:"Tech & Inovação",         marca:"—",   escopo:"Internacional", valorMin:110,  valorDisp:"€ 99+",               site:"https://dmexco.com",                        desc:"Principal evento europeu de marketing digital e tech." },
  { id:59, mes:"Setembro",  mesN:9,  evento:"Content Marketing World",   local:"Boston, MA — EUA",                 estado:"EUA",                regiao:"América do Norte",  cat:"SEO & Conteúdo",          marca:"—",   escopo:"Internacional", valorMin:1200, valorDisp:"$ 1.200+",            site:"https://www.contentmarketingworld.com",     desc:"A conferência que criou o content marketing. IA + conteúdo e ROI." },
  { id:60, mes:"Outubro",   mesN:10, evento:"Advertising Week NY",       local:"Nova York — EUA",                  estado:"EUA",                regiao:"América do Norte",  cat:"Marketing & Comunicação", marca:"—",   escopo:"Internacional", valorMin:550,  valorDisp:"$ 500+",              site:"https://advertisingweek.com",               desc:"16.000 participantes. Tudo que move publicidade e comunicação." },
  { id:61, mes:"Outubro",   mesN:10, evento:"Social Media Mktg World",   local:"San Diego — EUA",                  estado:"EUA",                regiao:"América do Norte",  cat:"Social & Influência",     marca:"—",   escopo:"Internacional", valorMin:1400, valorDisp:"$ 1.400+",            site:"https://www.socialmediaexaminer.com",       desc:"100% pitch-free. 3.000 participantes de 50 países. 18 meses de gravações." },
  { id:62, mes:"Novembro",  mesN:11, evento:"Web Summit",                local:"Lisboa — Portugal",                estado:"Portugal",           regiao:"Europa",            cat:"Tech & Inovação",         marca:"—",   escopo:"Internacional", valorMin:545,  valorDisp:"€ 495+",              site:"https://websummit.com",                     desc:"Um dos maiores eventos de tecnologia da Europa. Startups e líderes globais." },
];

// ── COLORS ────────────────────────────────────────────────────────────────────
const CAT_META = {
  "Marketing & Comunicação":      { color: "#3A6BF5", bg: "#E8EFFF", emoji: "📣" },
  "Games & Cultura Pop":          { color: "#E05C2A", bg: "#FEF0EA", emoji: "🎮" },
  "SEO & Conteúdo":               { color: "#0B8043", bg: "#E3F5EC", emoji: "✍️" },
  "Social & Influência":          { color: "#D93025", bg: "#FCE8E6", emoji: "📱" },
  "E-commerce & Varejo":          { color: "#F9A825", bg: "#FFF8E1", emoji: "🛒" },
  "Tech & Inovação":              { color: "#7B2FBE", bg: "#F3EAF9", emoji: "⚡" },
  "Negócios & Empreendedorismo":  { color: "#00838F", bg: "#E0F7FA", emoji: "💼" },
  "RH & Gestão":                  { color: "#558B2F", bg: "#F1F8E9", emoji: "👥" },
  "iGaming & Betting":            { color: "#4527A0", bg: "#EDE7F6", emoji: "🎲" },
};
const MARCA_META = {
  "Spun": { color: "#3A6BF5", bg: "#DCE8FF" },
  "Ezor": { color: "#E05C2A", bg: "#FDEEE7" },
  "—":    { color: "#888",    bg: "#F0F0F0" },
};
const REGIAO_COLORS = {
  "Sudeste":          "#3A6BF5",
  "Sul":              "#0B8043",
  "Centro-Oeste":     "#F9A825",
  "Norte":            "#E05C2A",
  "Nordeste":         "#D93025",
  "América do Norte": "#7B2FBE",
  "Europa":           "#00838F",
  "Ásia-Pacífico":    "#558B2F",
  "Internacional":    "#888",
  "A definir":        "#aaa",
  "—":                "#aaa",
};

const MES_ORDER = ["Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro","A definir"];

// ── BADGE ─────────────────────────────────────────────────────────────────────
function Badge({ text, color, bg, size = "sm" }) {
  const pad = size === "sm" ? "2px 7px" : "3px 10px";
  const fs  = size === "sm" ? 10 : 11;
  return (
    <span style={{
      display:"inline-block", padding:pad, borderRadius:20,
      background:bg||"#eee", color:color||"#333",
      fontSize:fs, fontWeight:700, letterSpacing:"0.03em", whiteSpace:"nowrap"
    }}>{text}</span>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [escopo, setEscopo]         = useState("Todos");
  const [categoria, setCategoria]   = useState("Todas");
  const [regiao, setRegiao]         = useState("Todas");
  const [marca, setMarca]           = useState("Todas");
  const [mes, setMes]               = useState("Todos");
  const [budgetPP, setBudgetPP]     = useState("");   // por pessoa
  const [qtdPessoas, setQtdPessoas] = useState(1);
  const [pessoasSel, setPessoasSel] = useState([]);
  const [busca, setBusca]           = useState("");
  const [view, setView]             = useState("cards"); // cards | lista | time
  const [detalhes, setDetalhes]     = useState(null);

  // Derived lists for filters
  const categorias  = useMemo(() => ["Todas", ...new Set(EVENTS.map(e => e.cat))], []);
  const regioes     = useMemo(() => ["Todas", ...new Set(EVENTS.map(e => e.regiao))], []);
  const marcas      = useMemo(() => ["Todas", "Spun", "Ezor", "Internacional"], []);

  // Filtered
  const filtered = useMemo(() => {
    const budget = budgetPP ? parseFloat(budgetPP) * qtdPessoas : null;
    const buscaL = busca.toLowerCase();
    return EVENTS.filter(ev => {
      if (escopo !== "Todos" && ev.escopo !== escopo) return false;
      if (categoria !== "Todas" && ev.cat !== categoria) return false;
      if (regiao !== "Todas" && ev.regiao !== regiao) return false;
      if (mes !== "Todos" && ev.mes !== mes) return false;
      if (marca === "Internacional" && ev.escopo !== "Internacional") return false;
      if (marca !== "Todas" && marca !== "Internacional" && ev.marca !== marca) return false;
      if (budget && ev.valorMin && ev.valorMin * qtdPessoas > budget) return false;
      if (buscaL && !ev.evento.toLowerCase().includes(buscaL) && !ev.desc.toLowerCase().includes(buscaL)) return false;
      return true;
    }).sort((a,b) => a.mesN - b.mesN || a.evento.localeCompare(b.evento));
  }, [escopo, categoria, regiao, mes, marca, budgetPP, qtdPessoas, busca]);

  // Pessoas nearby — eventos cujo estado bate com o estado do membro
  function pessoasProximas(ev) {
    return TEAM.filter(p => {
      if (ev.escopo === "Internacional" && p.regiao === "Internacional") return true;
      if (ev.escopo === "Brasil" && p.estado === ev.estado) return true;
      return false;
    });
  }

  // Toggle person selection
  function togglePessoa(nome) {
    setPessoasSel(prev => prev.includes(nome) ? prev.filter(n => n !== nome) : [...prev, nome]);
  }

  // Stats
  const comValor  = filtered.filter(e => e.valorMin !== null);
  const semValor  = filtered.filter(e => e.valorMin === null);
  const valorMed  = comValor.length ? Math.round(comValor.reduce((s,e) => s + e.valorMin, 0) / comValor.length) : 0;

  const S = {
    root: {
      fontFamily:"'DM Sans', system-ui, sans-serif",
      background:"#0C0C0E", minHeight:"100vh", color:"#e8e8e8"
    },
    header: {
      background:"linear-gradient(135deg, #100F0F 0%, #141420 100%)",
      borderBottom:"1px solid #222",
      padding:"20px 28px 16px",
    },
    logo: { display:"flex", alignItems:"center", gap:10, marginBottom:4 },
    logoText: { fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" },
    logoSub: { fontSize:11, color:"#57DF7F", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase" },
    statsBar: {
      display:"flex", gap:20, flexWrap:"wrap", marginTop:12,
    },
    stat: {
      background:"rgba(255,255,255,0.04)", border:"1px solid #222",
      borderRadius:10, padding:"8px 16px", display:"flex", flexDirection:"column", gap:2
    },
    statNum: { fontSize:22, fontWeight:800, color:"#57DF7F" },
    statLbl: { fontSize:10, color:"#888", textTransform:"uppercase", letterSpacing:"0.1em" },

    filterBar: {
      background:"#111115", borderBottom:"1px solid #1e1e1e",
      padding:"14px 28px", display:"flex", flexWrap:"wrap", gap:10, alignItems:"center"
    },
    input: {
      background:"#1a1a20", border:"1px solid #2e2e38", borderRadius:8,
      color:"#e8e8e8", padding:"7px 12px", fontSize:12, outline:"none",
      fontFamily:"inherit"
    },
    select: {
      background:"#1a1a20", border:"1px solid #2e2e38", borderRadius:8,
      color:"#e8e8e8", padding:"7px 10px", fontSize:12, outline:"none",
      fontFamily:"inherit", cursor:"pointer"
    },
    label: { fontSize:10, color:"#666", textTransform:"uppercase", letterSpacing:"0.1em" },
    filterGroup: { display:"flex", flexDirection:"column", gap:3 },

    viewBtn: (active) => ({
      background: active ? "#57DF7F22" : "transparent",
      border: active ? "1px solid #57DF7F" : "1px solid #2e2e38",
      color: active ? "#57DF7F" : "#888",
      borderRadius:7, padding:"6px 12px", fontSize:11, cursor:"pointer",
      fontWeight:600
    }),

    grid: {
      display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",
      gap:14, padding:"20px 28px"
    },
    card: {
      background:"#14141a", border:"1px solid #222", borderRadius:14,
      padding:"16px", cursor:"pointer", transition:"all 0.18s",
      position:"relative", overflow:"hidden"
    },
    cardHover: {
      background:"#1a1a24", border:"1px solid #333",
      transform:"translateY(-2px)", boxShadow:"0 8px 32px rgba(0,0,0,0.4)"
    },

    listRow: {
      display:"grid",
      gridTemplateColumns:"120px 1fr 100px 100px 130px 130px",
      gap:8, alignItems:"center",
      padding:"10px 16px", borderBottom:"1px solid #1a1a1a",
      cursor:"pointer", transition:"background 0.1s"
    },

    teamView: { padding:"20px 28px" },
    memberCard: {
      background:"#14141a", border:"1px solid #222", borderRadius:12, padding:"16px",
      marginBottom:12
    },

    modal: {
      position:"fixed", inset:0, background:"rgba(0,0,0,0.85)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:1000, padding:20
    },
    modalBox: {
      background:"#15151e", border:"1px solid #2a2a3a", borderRadius:18,
      maxWidth:620, width:"100%", maxHeight:"88vh", overflowY:"auto",
      padding:28
    },
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={S.root}>
      {/* HEADER */}
      <div style={S.header}>
        <div style={S.logo}>
          <div style={{
            width:34, height:34, borderRadius:8,
            background:"linear-gradient(135deg,#57DF7F,#3A6BF5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16, fontWeight:900
          }}>S</div>
          <div>
            <div style={S.logoText}>Eventos 2026</div>
            <div style={S.logoSub}>Spun Mídia · Ezor · Internacional</div>
          </div>
        </div>
        <div style={S.statsBar}>
          <div style={S.stat}>
            <span style={S.statNum}>{filtered.length}</span>
            <span style={S.statLbl}>eventos filtrados</span>
          </div>
          <div style={S.stat}>
            <span style={S.statNum}>{EVENTS.length}</span>
            <span style={S.statLbl}>total mapeado</span>
          </div>
          <div style={S.stat}>
            <span style={S.statNum}>{semValor.length}</span>
            <span style={S.statLbl}>valor a confirmar</span>
          </div>
          <div style={S.stat}>
            <span style={{...S.statNum, color:"#57DF7F"}}>
              {valorMed ? `R$ ${valorMed.toLocaleString('pt-BR')}` : "—"}
            </span>
            <span style={S.statLbl}>ticket médio</span>
          </div>
          {budgetPP && qtdPessoas > 0 && (
            <div style={{...S.stat, borderColor:"#57DF7F44"}}>
              <span style={{...S.statNum, fontSize:15, color:"#57DF7F"}}>
                R$ {(parseFloat(budgetPP || 0) * qtdPessoas).toLocaleString('pt-BR')}
              </span>
              <span style={S.statLbl}>budget total ({qtdPessoas} pessoa{qtdPessoas>1?"s":""})</span>
            </div>
          )}
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={S.filterBar}>
        <div style={S.filterGroup}>
          <span style={S.label}>Buscar</span>
          <input style={{...S.input, width:180}} placeholder="Nome ou descrição..."
            value={busca} onChange={e => setBusca(e.target.value)} />
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Escopo</span>
          <select style={S.select} value={escopo} onChange={e => setEscopo(e.target.value)}>
            {["Todos","Brasil","Internacional"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Categoria</span>
          <select style={S.select} value={categoria} onChange={e => setCategoria(e.target.value)}>
            {categorias.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Região</span>
          <select style={S.select} value={regiao} onChange={e => setRegiao(e.target.value)}>
            {regioes.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Marca</span>
          <select style={S.select} value={marca} onChange={e => setMarca(e.target.value)}>
            {marcas.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Mês</span>
          <select style={S.select} value={mes} onChange={e => setMes(e.target.value)}>
            {["Todos", ...MES_ORDER].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Budget / pessoa (R$)</span>
          <input style={{...S.input, width:130}} type="number" placeholder="ex: 2000"
            value={budgetPP} onChange={e => setBudgetPP(e.target.value)} />
        </div>
        <div style={S.filterGroup}>
          <span style={S.label}>Nº de pessoas</span>
          <input style={{...S.input, width:80}} type="number" min={1} max={9}
            value={qtdPessoas} onChange={e => setQtdPessoas(parseInt(e.target.value)||1)} />
        </div>
        <div style={{marginLeft:"auto", display:"flex", gap:6}}>
          <button style={S.viewBtn(view==="cards")} onClick={() => setView("cards")}>⬜ Cards</button>
          <button style={S.viewBtn(view==="lista")} onClick={() => setView("lista")}>≡ Lista</button>
          <button style={S.viewBtn(view==="time")}  onClick={() => setView("time")}>👥 Time</button>
          <button style={{
            ...S.viewBtn(false),
            color:"#f87171", borderColor:"#f8717166"
          }} onClick={() => {
            setEscopo("Todos"); setCategoria("Todas"); setRegiao("Todas");
            setMarca("Todas"); setMes("Todos"); setBudgetPP(""); setQtdPessoas(1);
            setBusca(""); setPessoasSel([]);
          }}>✕ Limpar</button>
        </div>
      </div>

      {/* VIEWS */}

      {/* CARDS */}
      {view === "cards" && (
        <div style={S.grid}>
          {filtered.length === 0 && (
            <div style={{gridColumn:"1/-1", textAlign:"center", color:"#555", padding:60, fontSize:14}}>
              Nenhum evento encontrado com esses filtros.
            </div>
          )}
          {filtered.map(ev => {
            const cm = CAT_META[ev.cat] || {};
            const mm = MARCA_META[ev.marca] || {};
            const prox = pessoasProximas(ev);
            const isHov = hoveredCard === ev.id;
            const totalCusto = ev.valorMin ? ev.valorMin * qtdPessoas : null;
            return (
              <div key={ev.id}
                style={{...S.card, ...(isHov ? S.cardHover : {})}}
                onMouseEnter={() => setHoveredCard(ev.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setDetalhes(ev)}
              >
                {/* top accent */}
                <div style={{
                  position:"absolute", top:0, left:0, right:0, height:3,
                  background:`linear-gradient(90deg, ${cm.color||"#57DF7F"}, transparent)`
                }} />

                {/* header */}
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10}}>
                  <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                    <Badge text={ev.mes} color="#aaa" bg="#1e1e1e" />
                    <Badge text={`${cm.emoji||""} ${ev.cat}`} color={cm.color} bg={cm.bg+"22"} />
                  </div>
                  <Badge text={ev.marca} color={mm.color} bg={mm.bg+"33"} />
                </div>

                {/* title */}
                <div style={{fontWeight:800, fontSize:14, color:"#fff", marginBottom:4, lineHeight:1.3}}>
                  {ev.evento}
                </div>

                {/* local */}
                <div style={{fontSize:11, color:"#888", marginBottom:10, display:"flex", alignItems:"center", gap:4}}>
                  <span>📍</span> {ev.local}
                </div>

                {/* desc */}
                <div style={{fontSize:11, color:"#777", lineHeight:1.5, marginBottom:12,
                  display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>
                  {ev.desc}
                </div>

                {/* bottom */}
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #1e1e1e", paddingTop:10}}>
                  <div>
                    <div style={{fontSize:13, fontWeight:700, color: ev.valorMin ? "#57DF7F" : "#666"}}>
                      {ev.valorDisp}
                    </div>
                    {totalCusto && qtdPessoas > 1 && (
                      <div style={{fontSize:10, color:"#555"}}>
                        Total ({qtdPessoas}×): R$ {(totalCusto).toLocaleString("pt-BR")}
                      </div>
                    )}
                  </div>
                  {prox.length > 0 && (
                    <div style={{display:"flex", gap:-4}}>
                      {prox.slice(0,4).map(p => (
                        <div key={p.nome} title={`${p.nome} — ${p.cidade}`} style={{
                          width:24, height:24, borderRadius:"50%",
                          background:`hsl(${p.nome.charCodeAt(0)*20%360}, 60%, 45%)`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:9, fontWeight:700, color:"#fff", border:"2px solid #14141a",
                          marginLeft:-6, cursor:"default"
                        }}>{p.nome[0]}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LISTA */}
      {view === "lista" && (
        <div style={{padding:"16px 28px"}}>
          <div style={{...S.listRow, background:"#111115", borderRadius:"8px 8px 0 0", cursor:"default"}}>
            <span style={{fontSize:10, color:"#666", fontWeight:700, textTransform:"uppercase"}}>MÊS</span>
            <span style={{fontSize:10, color:"#666", fontWeight:700, textTransform:"uppercase"}}>EVENTO</span>
            <span style={{fontSize:10, color:"#666", fontWeight:700, textTransform:"uppercase"}}>MARCA</span>
            <span style={{fontSize:10, color:"#666", fontWeight:700, textTransform:"uppercase"}}>ESCOPO</span>
            <span style={{fontSize:10, color:"#666", fontWeight:700, textTransform:"uppercase"}}>CATEGORIA</span>
            <span style={{fontSize:10, color:"#666", fontWeight:700, textTransform:"uppercase"}}>VALOR</span>
          </div>
          {filtered.map(ev => {
            const cm = CAT_META[ev.cat]||{};
            const mm = MARCA_META[ev.marca]||{};
            return (
              <div key={ev.id} style={{...S.listRow, background:"#0f0f14"}}
                onMouseEnter={e => e.currentTarget.style.background="#14141a"}
                onMouseLeave={e => e.currentTarget.style.background="#0f0f14"}
                onClick={() => setDetalhes(ev)}
              >
                <span style={{fontSize:11, color:"#888"}}>{ev.mes}</span>
                <span style={{fontSize:12, fontWeight:700, color:"#e8e8e8"}}>{ev.evento}</span>
                <Badge text={ev.marca} color={mm.color} bg={mm.bg+"33"} />
                <Badge text={ev.escopo === "Brasil" ? "🇧🇷 BR" : "🌍 Intl"} color={ev.escopo==="Brasil"?"#0B8043":"#7B2FBE"} bg={ev.escopo==="Brasil"?"#E3F5EC22":"#F3EAF922"} />
                <span style={{fontSize:10, color:cm.color||"#aaa"}}>{cm.emoji} {ev.cat}</span>
                <span style={{fontSize:12, fontWeight:700, color:ev.valorMin?"#57DF7F":"#555"}}>
                  {ev.valorDisp}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* TIME */}
      {view === "time" && (
        <div style={S.teamView}>
          <div style={{marginBottom:16, fontSize:12, color:"#666"}}>
            Selecione membros para ver eventos recomendados por proximidade geográfica.
          </div>
          {/* pessoa selector */}
          <div style={{display:"flex", flexWrap:"wrap", gap:8, marginBottom:24}}>
            {TEAM.map(p => {
              const sel = pessoasSel.includes(p.nome);
              return (
                <button key={p.nome} onClick={() => togglePessoa(p.nome)} style={{
                  background: sel ? "#57DF7F22" : "#14141a",
                  border: sel ? "1px solid #57DF7F" : "1px solid #2e2e38",
                  borderRadius:20, padding:"6px 14px",
                  color: sel ? "#57DF7F" : "#aaa",
                  fontSize:12, fontWeight:600, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:8, transition:"all 0.15s"
                }}>
                  <div style={{
                    width:22, height:22, borderRadius:"50%",
                    background:`hsl(${p.nome.charCodeAt(0)*20%360}, 60%, 45%)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:9, fontWeight:700, color:"#fff"
                  }}>{p.nome[0]}</div>
                  <div>
                    <div>{p.nome}</div>
                    <div style={{fontSize:9, color:sel?"#57DF7F88":"#555"}}>{p.cidade !== "—" ? p.cidade : "Localização a definir"}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {pessoasSel.length === 0 && (
            <div style={{textAlign:"center", color:"#555", padding:40}}>
              Selecione pelo menos uma pessoa para ver os eventos relevantes.
            </div>
          )}

          {pessoasSel.length > 0 && TEAM.filter(p => pessoasSel.includes(p.nome)).map(pessoa => {
            const evsPessoa = EVENTS.filter(ev => {
              if (pessoa.regiao === "Internacional") return ev.escopo === "Internacional";
              return ev.estado === pessoa.estado;
            }).sort((a,b) => a.mesN - b.mesN);
            return (
              <div key={pessoa.nome} style={S.memberCard}>
                <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:14}}>
                  <div style={{
                    width:40, height:40, borderRadius:"50%",
                    background:`hsl(${pessoa.nome.charCodeAt(0)*20%360}, 60%, 45%)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16, fontWeight:700, color:"#fff"
                  }}>{pessoa.nome[0]}</div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14, color:"#fff"}}>{pessoa.nome}</div>
                    <div style={{fontSize:11, color:"#888"}}>
                      {pessoa.cargo} · {pessoa.cidade !== "—" ? `${pessoa.cidade}, ${pessoa.estado}` : "Localização a definir"}
                    </div>
                  </div>
                  <div style={{marginLeft:"auto"}}>
                    <Badge
                      text={`${evsPessoa.length} evento${evsPessoa.length !== 1 ? "s" : ""} próximos`}
                      color={evsPessoa.length ? "#57DF7F" : "#888"}
                      bg={evsPessoa.length ? "#57DF7F22" : "#1e1e1e"}
                      size="md"
                    />
                  </div>
                </div>
                {evsPessoa.length === 0 ? (
                  <div style={{fontSize:12, color:"#555", fontStyle:"italic"}}>
                    Nenhum evento mapeado na região desta pessoa ainda.
                  </div>
                ) : (
                  <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
                    {evsPessoa.map(ev => {
                      const cm = CAT_META[ev.cat]||{};
                      return (
                        <div key={ev.id} onClick={() => setDetalhes(ev)} style={{
                          background:"#0f0f14", border:`1px solid ${cm.color||"#222"}33`,
                          borderRadius:10, padding:"8px 12px", cursor:"pointer",
                          minWidth:160, flex:"0 0 auto", transition:"all 0.15s"
                        }}
                          onMouseEnter={e => e.currentTarget.style.background="#1a1a24"}
                          onMouseLeave={e => e.currentTarget.style.background="#0f0f14"}
                        >
                          <div style={{fontSize:11, color:"#666", marginBottom:2}}>{ev.mes}</div>
                          <div style={{fontSize:12, fontWeight:700, color:"#e8e8e8", marginBottom:4}}>{ev.evento}</div>
                          <div style={{display:"flex", gap:4, flexWrap:"wrap"}}>
                            <Badge text={`${cm.emoji} ${ev.cat}`} color={cm.color} bg={cm.bg+"22"} />
                          </div>
                          <div style={{fontSize:11, fontWeight:700, color:ev.valorMin?"#57DF7F":"#555", marginTop:6}}>
                            {ev.valorDisp}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DETALHES */}
      {detalhes && (
        <div style={S.modal} onClick={() => setDetalhes(null)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            {(() => {
              const ev = detalhes;
              const cm = CAT_META[ev.cat]||{};
              const mm = MARCA_META[ev.marca]||{};
              const prox = pessoasProximas(ev);
              return (
                <>
                  <div style={{
                    height:4, background:`linear-gradient(90deg,${cm.color||"#57DF7F"},${mm.color||"#3A6BF5"})`,
                    borderRadius:4, marginBottom:20
                  }} />
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16}}>
                    <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                      <Badge text={`${cm.emoji} ${ev.cat}`} color={cm.color} bg={cm.bg+"33"} />
                      <Badge text={ev.escopo === "Brasil" ? "🇧🇷 Brasil" : "🌍 Internacional"} color={ev.escopo==="Brasil"?"#0B8043":"#7B2FBE"} bg={ev.escopo==="Brasil"?"#E3F5EC22":"#F3EAF922"} />
                      <Badge text={ev.marca} color={mm.color} bg={mm.bg+"33"} />
                    </div>
                    <button onClick={() => setDetalhes(null)} style={{
                      background:"transparent", border:"none", color:"#666",
                      fontSize:18, cursor:"pointer", lineHeight:1
                    }}>✕</button>
                  </div>

                  <h2 style={{fontSize:22, fontWeight:800, color:"#fff", marginBottom:8, lineHeight:1.2}}>
                    {ev.evento}
                  </h2>

                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16}}>
                    {[
                      ["📅 Mês", ev.mes],
                      ["📍 Local", ev.local],
                      ["🗺️ Região", ev.regiao],
                      ["🏷️ Estado/País", ev.estado],
                    ].map(([label, value]) => (
                      <div key={label} style={{background:"#0f0f14", borderRadius:8, padding:"10px 14px"}}>
                        <div style={{fontSize:10, color:"#666", marginBottom:3}}>{label}</div>
                        <div style={{fontSize:12, color:"#ddd", fontWeight:600}}>{value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{background:"#0f0f14", borderRadius:8, padding:"12px 14px", marginBottom:16}}>
                    <div style={{fontSize:10, color:"#666", marginBottom:6}}>💰 VALOR</div>
                    <div style={{fontSize:20, fontWeight:800, color:ev.valorMin?"#57DF7F":"#666"}}>
                      {ev.valorDisp}
                    </div>
                    {ev.valorMin && qtdPessoas > 1 && (
                      <div style={{fontSize:12, color:"#888", marginTop:4}}>
                        Para {qtdPessoas} pessoas: <strong style={{color:"#57DF7F"}}>
                          R$ {(ev.valorMin * qtdPessoas).toLocaleString("pt-BR")}
                        </strong> (mínimo)
                      </div>
                    )}
                  </div>

                  <div style={{background:"#0f0f14", borderRadius:8, padding:"12px 14px", marginBottom:16}}>
                    <div style={{fontSize:10, color:"#666", marginBottom:6}}>📝 DESCRIÇÃO</div>
                    <div style={{fontSize:12, color:"#bbb", lineHeight:1.6}}>{ev.desc}</div>
                  </div>

                  {prox.length > 0 && (
                    <div style={{background:"#0f0f14", borderRadius:8, padding:"12px 14px", marginBottom:16}}>
                      <div style={{fontSize:10, color:"#666", marginBottom:8}}>👥 TIME PRÓXIMO AO EVENTO</div>
                      <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
                        {prox.map(p => (
                          <div key={p.nome} style={{display:"flex", alignItems:"center", gap:6,
                            background:"#1a1a24", borderRadius:20, padding:"4px 10px"}}>
                            <div style={{
                              width:20, height:20, borderRadius:"50%",
                              background:`hsl(${p.nome.charCodeAt(0)*20%360}, 60%, 45%)`,
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:8, fontWeight:700, color:"#fff"
                            }}>{p.nome[0]}</div>
                            <span style={{fontSize:11, color:"#ddd"}}>{p.nome}</span>
                            <span style={{fontSize:10, color:"#555"}}>{p.cidade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ev.site && ev.site !== "" && (
                    <a href={ev.site} target="_blank" rel="noreferrer" style={{
                      display:"block", textAlign:"center",
                      background:"linear-gradient(135deg,#57DF7F,#3A6BF5)",
                      color:"#000", fontWeight:700, fontSize:13, padding:"12px",
                      borderRadius:10, textDecoration:"none", marginTop:4
                    }}>
                      Acessar site oficial →
                    </a>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
