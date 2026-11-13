// Conteúdo do site em quatro idiomas.
// Fonte do texto em português: docs/site/04-conteudo-final.md (aprovado).

export const LANGUAGES = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'fr', label: 'FR', name: 'Français' },
]

export const LINKS = {
  email: 'ezequielnascimento.ofc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ezequielmiguel/',
  github: 'https://github.com/ezequielnascimento-ofc',
}

export const TICKER = [
  'MCP',
  'Java · Spring Boot',
  'Node.js',
  'OAuth 2.0',
  'PostgreSQL · Row-Level Security',
  'Angular · React',
  'Docker · GitHub Actions',
  'Redis · k6',
]

export const CHIPS = [
  'MCP',
  'Claude',
  'Java · Spring Boot',
  'Node.js',
  'Angular · React · TypeScript',
  'PostgreSQL · Redis',
  'Docker · GitHub Actions',
  'Trivy · CodeQL',
  'Testcontainers · Playwright · k6',
]

export const STACKS = {
  perto: 'Java 21 · Spring Boot 4 · Angular 22',
  asces: 'Java 21 · Spring Boot 3 · React 19 · Redis · Testcontainers · ArchUnit · k6',
}

export const content = {
  pt: {
    meta: {
      title: 'Ezequiel Nascimento · AI Software Engineer',
      description:
        'Sistemas orientados ao crescimento do negócio, com arquitetura, segurança e IA. Servidor MCP multi-tenant em produção e SaaS com isolamento por cliente.',
    },
    nav: {
      projects: 'Projetos',
      method: 'Método',
      experience: 'Experiência',
      contact: 'Contato',
      language: 'Idioma',
      menu: 'Abrir menu',
      close: 'Fechar menu',
      main: 'Principal',
    },
    hero: {
      role: 'AI Software Engineer · Plugin IA',
      location: 'Caruaru, PE · Brasil',
      title: 'Sistemas orientados ao crescimento do negócio, do desenho da arquitetura à produção',
      lead:
        'Um servidor MCP que responde a gestores em linguagem natural, um SaaS em que o próprio banco isola cada cliente e um portal que protege o CPF de cada candidato.',
      ctaProjects: 'Ver projetos',
      ctaContact: 'Falar comigo',
      photoAlt: 'Ezequiel Nascimento',
      stats: [
        { value: 'nov/2026', label: 'MCP multi-tenant em produção' },
        { value: '3', label: 'sistemas em produção' },
        { value: '10+', label: 'empresas na plataforma de atendimento que evoluo', accent: true },
      ],
      tickerLabel: 'Tecnologias',
    },
    mcp: {
      title: 'Plataforma MCP multi-tenant',
      meta: 'Plugin IA · out/2026 – atual · em produção',
      statement: ['A empresa vem do token.', 'Nunca da pergunta.'],
      problemLabel: 'Problema',
      problem:
        'Gestores querem perguntar a uma IA como vai o negócio, sem expor dados pessoais e sem que uma empresa veja os dados de outra.',
      decisionLabel: 'Decisão',
      decision:
        'Um núcleo único para todas as empresas, com a empresa derivada do token OAuth. Nem o usuário nem o modelo, por injeção de prompt, trocam de empresa.',
      chat: {
        label: 'Exemplo de conversa com o assistente, com dados fictícios',
        status: 'Assistente · MCP conectado',
        tag: 'dados fictícios',
        question: 'Quantos clientes voltaram em 24 horas nesta semana?',
        tool: 'ferramenta retorno · empresa: derivada do token OAuth · somente leitura',
        answers: [
          'A maior parte dos retornos veio de conversas iniciadas fora do horário comercial.',
          'O retorno subiu em relação à semana anterior nos dois canais com mais atendimentos.',
          'Telefones, documentos e texto livre ficaram fora da análise',
        ],
        note: 'dados pessoais mascarados antes de chegar ao modelo',
      },
      metrics: [
        { value: '≥90%', label: 'menos recursos reservados que um servidor por empresa, na projeção para 10 empresas', accent: true },
        { value: '12', label: 'ferramentas versionadas' },
        { value: '2', label: 'contêineres' },
        { value: '~64 MB', label: 'em produção' },
      ],
    },
    perto: {
      title: 'Agenda Perto',
      meta: 'Perto Plataforma · set/2026 – atual · em produção com o primeiro cliente',
      statement: ['Um filtro esquecido no código', 'não vaza dados.'],
      layers: [
        { label: 'Camada 1 · Aplicação', text: 'O cliente vem do token, nunca de um cabeçalho.' },
        { label: 'Camada 2 · ORM', text: 'Um filtro global aplica o cliente em toda consulta.' },
        { label: 'Camada 3 · PostgreSQL', text: 'Row-Level Security barra qualquer linha de outro cliente.' },
      ],
      footnote: 'Testes de isolamento a cada pull request · rollback automático já testado em produção',
    },
    asces: {
      title: 'Sistemas da Asces-Unita',
      meta: 'Asces-Unita · jul/2025 – atual · Vestibular Portal em produção',
      statement: ['O CPF nunca aparece na URL,', 'nos logs ou nas métricas.'],
      portal: {
        label: 'Vestibular Portal',
        status: 'em produção',
        text: 'Arquitetura hexagonal, CPF por hash com chave secreta (HMAC-SHA-256), a mesma resposta para qualquer erro e limite de tentativas por IP, por CPF e global no Redis.',
        limit: 'limite atingido · por IP · por CPF · global',
      },
      dspace: {
        label: 'DSpace',
        text: 'Migração do repositório institucional, com base PostgreSQL, Docker Compose próprio e frontend da instituição.',
      },
      bolsa: {
        label: 'Bolsa Social',
        value: '99,88%',
        text: 'de execuções sem erro, em mais de 6.000 execuções no período de inscrições.',
      },
    },
    method: {
      title: 'Da pergunta de negócio à produção',
      steps: [
        { title: 'Começo pela pergunta de negócio.', text: 'Cada ferramenta MCP responde a uma pergunta de gestor, em vez de expor tabelas.' },
        { title: 'Uso só o dado necessário.', text: 'Telefone, documento e texto livre ficam fora das análises.' },
        { title: 'Registro a decisão e a alternativa.', text: 'Monólito modular em vez de microsserviços, registrado em ADR.' },
        { title: 'Coloco em produção com rede de segurança.', text: 'Migração destrutiva só com confirmação explícita e backup verificado.' },
        { title: 'Uso IA na engenharia, com portões.', text: 'Claude Code, com CI verde, testes de isolamento e varreduras como condição para o merge.' },
      ],
      chipsLabel: 'Tecnologias',
    },
    experience: {
      title: 'Experiência',
      intro: 'Da operação de redes ao agente de IA',
      education:
        'Análise e Desenvolvimento de Sistemas, Uniasselvi · Model Context Protocol e AI Fluency, Anthropic · Cloud, FIAP',
      jobs: [
        { period: 'out/2026 – atual', role: 'AI Software Engineer · Plugin IA', text: 'Plataforma MCP multi-tenant e evolução da plataforma de atendimento usada por mais de 10 empresas.' },
        { period: 'set/2026 – atual', role: 'Software Engineer · Perto Plataforma', text: 'Agenda Perto: arquitetura, backend, frontend, banco, infraestrutura e pipeline.' },
        { period: 'jul/2025 – atual', role: 'Técnico de Suporte · Asces-Unita', text: 'Vestibular Portal, DSpace, Bolsa Social e eleições da CIPA.' },
        { period: 'jan/2025 – abr/2025', role: 'Analista de Redes Nível 1 · Infor Network', text: 'Monitoramento com Zabbix, Grafana e SNMPv3, e automação de alertas.' },
        { period: 'set/2022 – jan/2025', role: 'Três cargos · Digital Tecnologia', text: 'Do suporte ao usuário à operação de rede com MikroTik, e o Mibo Digital, SaaS de câmeras.' },
      ],
    },
    contact: {
      kicker: 'Tem um sistema para levar à produção?',
      title: 'Vamos conversar.',
      text: 'Para falar sobre um projeto, uma arquitetura ou uma oportunidade. Respondo por e-mail e pelo LinkedIn.',
      email: 'E-mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      newTab: '(abre em nova aba)',
    },
    footer: { location: 'Caruaru, Pernambuco, Brasil' },
  },

  en: {
    meta: {
      title: 'Ezequiel Nascimento · AI Software Engineer',
      description:
        'Systems built for business growth, with architecture, security and AI. A multi-tenant MCP server in production and a SaaS with per-client isolation.',
    },
    nav: {
      projects: 'Projects',
      method: 'Method',
      experience: 'Experience',
      contact: 'Contact',
      language: 'Language',
      menu: 'Open menu',
      close: 'Close menu',
      main: 'Main',
    },
    hero: {
      role: 'AI Software Engineer · Plugin IA',
      location: 'Caruaru, PE · Brazil',
      title: 'Systems built for business growth, from architecture design to production',
      lead:
        'An MCP server that answers managers in plain language, a SaaS where the database itself isolates each client, and a portal that protects every applicant’s national ID number.',
      ctaProjects: 'See projects',
      ctaContact: 'Get in touch',
      photoAlt: 'Ezequiel Nascimento',
      stats: [
        { value: 'Nov 2026', label: 'multi-tenant MCP in production' },
        { value: '3', label: 'systems in production' },
        { value: '10+', label: 'companies on the customer service platform I evolve', accent: true },
      ],
      tickerLabel: 'Technologies',
    },
    mcp: {
      title: 'Multi-tenant MCP platform',
      meta: 'Plugin IA · Oct 2026 – present · in production',
      statement: ['The company comes from the token.', 'Never from the question.'],
      problemLabel: 'Problem',
      problem:
        'Managers want to ask an AI how the business is doing, without exposing personal data and without one company seeing another’s data.',
      decisionLabel: 'Decision',
      decision:
        'A single core for every company, with the company derived from the OAuth token. Neither the user nor the model, through prompt injection, can switch companies.',
      chat: {
        label: 'Sample conversation with the assistant, using fictitious data',
        status: 'Assistant · MCP connected',
        tag: 'fictitious data',
        question: 'How many customers came back within 24 hours this week?',
        tool: 'return tool · company: derived from the OAuth token · read-only',
        answers: [
          'Most returns came from conversations started outside business hours.',
          'Returns rose compared with last week on the two busiest channels.',
          'Phone numbers, documents and free text were left out of the analysis',
        ],
        note: 'personal data masked before it reaches the model',
      },
      metrics: [
        { value: '≥90%', label: 'less reserved capacity than one server per company, projected for 10 companies', accent: true },
        { value: '12', label: 'versioned tools' },
        { value: '2', label: 'containers' },
        { value: '~64 MB', label: 'in production' },
      ],
    },
    perto: {
      title: 'Agenda Perto',
      meta: 'Perto Plataforma · Sep 2026 – present · in production with its first client',
      statement: ['A filter forgotten in the code', 'does not leak data.'],
      layers: [
        { label: 'Layer 1 · Application', text: 'The client comes from the token, never from a header.' },
        { label: 'Layer 2 · ORM', text: 'A global filter applies the client to every query.' },
        { label: 'Layer 3 · PostgreSQL', text: 'Row-Level Security blocks any row from another client.' },
      ],
      footnote: 'Isolation tests on every pull request · automatic rollback already tested in production',
    },
    asces: {
      title: 'Asces-Unita systems',
      meta: 'Asces-Unita · Jul 2025 – present · Vestibular Portal in production',
      statement: ['The ID number never shows up in the URL,', 'the logs or the metrics.'],
      portal: {
        label: 'Vestibular Portal',
        status: 'in production',
        text: 'Hexagonal architecture, ID numbers hashed with a secret key (HMAC-SHA-256), the same response for any error, and rate limits per IP, per ID and global in Redis.',
        limit: 'limit reached · per IP · per ID · global',
      },
      dspace: {
        label: 'DSpace',
        text: 'Migration of the institutional repository, with a PostgreSQL database, its own Docker Compose setup and the institution’s frontend.',
      },
      bolsa: {
        label: 'Bolsa Social',
        value: '99.88%',
        text: 'of runs without errors, across more than 6,000 runs during the application period.',
      },
    },
    method: {
      title: 'From business question to production',
      steps: [
        { title: 'I start from the business question.', text: 'Each MCP tool answers a manager’s question instead of exposing tables.' },
        { title: 'I use only the data that is needed.', text: 'Phone numbers, documents and free text stay out of the analyses.' },
        { title: 'I record the decision and the alternative.', text: 'A modular monolith instead of microservices, recorded in an ADR.' },
        { title: 'I ship to production with a safety net.', text: 'Destructive migrations only with explicit confirmation and a verified backup.' },
        { title: 'I use AI in engineering, with gates.', text: 'Claude Code, with green CI, isolation tests and scans required before merge.' },
      ],
      chipsLabel: 'Technologies',
    },
    experience: {
      title: 'Experience',
      intro: 'From network operations to AI agents',
      education:
        'Systems Analysis and Development, Uniasselvi · Model Context Protocol and AI Fluency, Anthropic · Cloud, FIAP',
      jobs: [
        { period: 'Oct 2026 – present', role: 'AI Software Engineer · Plugin IA', text: 'Multi-tenant MCP platform and evolution of the customer service platform used by more than 10 companies.' },
        { period: 'Sep 2026 – present', role: 'Software Engineer · Perto Plataforma', text: 'Agenda Perto: architecture, backend, frontend, database, infrastructure and pipeline.' },
        { period: 'Jul 2025 – present', role: 'Support Technician · Asces-Unita', text: 'Vestibular Portal, DSpace, Bolsa Social and the CIPA elections.' },
        { period: 'Jan 2025 – Apr 2025', role: 'Network Analyst I · Infor Network', text: 'Monitoring with Zabbix, Grafana and SNMPv3, and alert automation.' },
        { period: 'Sep 2022 – Jan 2025', role: 'Three roles · Digital Tecnologia', text: 'From user support to network operations with MikroTik, and Mibo Digital, a camera SaaS.' },
      ],
    },
    contact: {
      kicker: 'Have a system to take to production?',
      title: 'Let’s talk.',
      text: 'About a project, an architecture or an opportunity. I reply by email and on LinkedIn.',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      newTab: '(opens in a new tab)',
    },
    footer: { location: 'Caruaru, Pernambuco, Brazil' },
  },

  es: {
    meta: {
      title: 'Ezequiel Nascimento · AI Software Engineer',
      description:
        'Sistemas orientados al crecimiento del negocio, con arquitectura, seguridad e IA. Servidor MCP multi-tenant en producción y SaaS con aislamiento por cliente.',
    },
    nav: {
      projects: 'Proyectos',
      method: 'Método',
      experience: 'Experiencia',
      contact: 'Contacto',
      language: 'Idioma',
      menu: 'Abrir menú',
      close: 'Cerrar menú',
      main: 'Principal',
    },
    hero: {
      role: 'AI Software Engineer · Plugin IA',
      location: 'Caruaru, PE · Brasil',
      title: 'Sistemas orientados al crecimiento del negocio, del diseño de la arquitectura a la producción',
      lead:
        'Un servidor MCP que responde a gerentes en lenguaje natural, un SaaS en el que la propia base de datos aísla a cada cliente y un portal que protege el documento de identidad de cada postulante.',
      ctaProjects: 'Ver proyectos',
      ctaContact: 'Hablemos',
      photoAlt: 'Ezequiel Nascimento',
      stats: [
        { value: 'nov 2026', label: 'MCP multi-tenant en producción' },
        { value: '3', label: 'sistemas en producción' },
        { value: '10+', label: 'empresas en la plataforma de atención que evoluciono', accent: true },
      ],
      tickerLabel: 'Tecnologías',
    },
    mcp: {
      title: 'Plataforma MCP multi-tenant',
      meta: 'Plugin IA · oct 2026 – actual · en producción',
      statement: ['La empresa viene del token.', 'Nunca de la pregunta.'],
      problemLabel: 'Problema',
      problem:
        'Los gerentes quieren preguntarle a una IA cómo va el negocio, sin exponer datos personales y sin que una empresa vea los datos de otra.',
      decisionLabel: 'Decisión',
      decision:
        'Un núcleo único para todas las empresas, con la empresa derivada del token OAuth. Ni el usuario ni el modelo, mediante inyección de prompt, cambian de empresa.',
      chat: {
        label: 'Ejemplo de conversación con el asistente, con datos ficticios',
        status: 'Asistente · MCP conectado',
        tag: 'datos ficticios',
        question: '¿Cuántos clientes volvieron en 24 horas esta semana?',
        tool: 'herramienta retorno · empresa: derivada del token OAuth · solo lectura',
        answers: [
          'La mayoría de los retornos vino de conversaciones iniciadas fuera del horario comercial.',
          'El retorno subió respecto a la semana anterior en los dos canales con más atenciones.',
          'Teléfonos, documentos y texto libre quedaron fuera del análisis',
        ],
        note: 'datos personales enmascarados antes de llegar al modelo',
      },
      metrics: [
        { value: '≥90%', label: 'menos recursos reservados que un servidor por empresa, en la proyección para 10 empresas', accent: true },
        { value: '12', label: 'herramientas versionadas' },
        { value: '2', label: 'contenedores' },
        { value: '~64 MB', label: 'en producción' },
      ],
    },
    perto: {
      title: 'Agenda Perto',
      meta: 'Perto Plataforma · sep 2026 – actual · en producción con el primer cliente',
      statement: ['Un filtro olvidado en el código', 'no filtra datos.'],
      layers: [
        { label: 'Capa 1 · Aplicación', text: 'El cliente viene del token, nunca de un encabezado.' },
        { label: 'Capa 2 · ORM', text: 'Un filtro global aplica el cliente en toda consulta.' },
        { label: 'Capa 3 · PostgreSQL', text: 'Row-Level Security bloquea cualquier fila de otro cliente.' },
      ],
      footnote: 'Pruebas de aislamiento en cada pull request · rollback automático ya probado en producción',
    },
    asces: {
      title: 'Sistemas de Asces-Unita',
      meta: 'Asces-Unita · jul 2025 – actual · Vestibular Portal en producción',
      statement: ['El documento nunca aparece en la URL,', 'en los logs ni en las métricas.'],
      portal: {
        label: 'Vestibular Portal',
        status: 'en producción',
        text: 'Arquitectura hexagonal, documento con hash y clave secreta (HMAC-SHA-256), la misma respuesta para cualquier error y límite de intentos por IP, por documento y global en Redis.',
        limit: 'límite alcanzado · por IP · por documento · global',
      },
      dspace: {
        label: 'DSpace',
        text: 'Migración del repositorio institucional, con base PostgreSQL, Docker Compose propio y el frontend de la institución.',
      },
      bolsa: {
        label: 'Bolsa Social',
        value: '99,88 %',
        text: 'de ejecuciones sin errores, en más de 6.000 ejecuciones durante el período de inscripciones.',
      },
    },
    method: {
      title: 'De la pregunta de negocio a la producción',
      steps: [
        { title: 'Empiezo por la pregunta de negocio.', text: 'Cada herramienta MCP responde a una pregunta de un gerente, en lugar de exponer tablas.' },
        { title: 'Uso solo el dato necesario.', text: 'Teléfono, documento y texto libre quedan fuera de los análisis.' },
        { title: 'Registro la decisión y la alternativa.', text: 'Monolito modular en lugar de microservicios, registrado en un ADR.' },
        { title: 'Llevo a producción con red de seguridad.', text: 'Migración destructiva solo con confirmación explícita y backup verificado.' },
        { title: 'Uso IA en la ingeniería, con controles.', text: 'Claude Code, con CI en verde, pruebas de aislamiento y escaneos como condición para el merge.' },
      ],
      chipsLabel: 'Tecnologías',
    },
    experience: {
      title: 'Experiencia',
      intro: 'De la operación de redes al agente de IA',
      education:
        'Análisis y Desarrollo de Sistemas, Uniasselvi · Model Context Protocol y AI Fluency, Anthropic · Cloud, FIAP',
      jobs: [
        { period: 'oct 2026 – actual', role: 'AI Software Engineer · Plugin IA', text: 'Plataforma MCP multi-tenant y evolución de la plataforma de atención usada por más de 10 empresas.' },
        { period: 'sep 2026 – actual', role: 'Software Engineer · Perto Plataforma', text: 'Agenda Perto: arquitectura, backend, frontend, base de datos, infraestructura y pipeline.' },
        { period: 'jul 2025 – actual', role: 'Técnico de Soporte · Asces-Unita', text: 'Vestibular Portal, DSpace, Bolsa Social y elecciones de la CIPA.' },
        { period: 'ene 2025 – abr 2025', role: 'Analista de Redes Nivel 1 · Infor Network', text: 'Monitoreo con Zabbix, Grafana y SNMPv3, y automatización de alertas.' },
        { period: 'sep 2022 – ene 2025', role: 'Tres cargos · Digital Tecnologia', text: 'Del soporte al usuario a la operación de red con MikroTik, y Mibo Digital, un SaaS de cámaras.' },
      ],
    },
    contact: {
      kicker: '¿Tienes un sistema para llevar a producción?',
      title: 'Hablemos.',
      text: 'Sobre un proyecto, una arquitectura o una oportunidad. Respondo por correo y por LinkedIn.',
      email: 'Correo',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      newTab: '(se abre en una pestaña nueva)',
    },
    footer: { location: 'Caruaru, Pernambuco, Brasil' },
  },

  fr: {
    meta: {
      title: 'Ezequiel Nascimento · AI Software Engineer',
      description:
        'Des systèmes au service de la croissance, avec architecture, sécurité et IA. Un serveur MCP multi-tenant en production et un SaaS isolé par client.',
    },
    nav: {
      projects: 'Projets',
      method: 'Méthode',
      experience: 'Parcours',
      contact: 'Contact',
      language: 'Langue',
      menu: 'Ouvrir le menu',
      close: 'Fermer le menu',
      main: 'Principale',
    },
    hero: {
      role: 'AI Software Engineer · Plugin IA',
      location: 'Caruaru, PE · Brésil',
      title: 'Des systèmes au service de la croissance, de la conception de l’architecture à la production',
      lead:
        'Un serveur MCP qui répond aux dirigeants en langage naturel, un SaaS où la base de données isole elle-même chaque client et un portail qui protège le numéro d’identité de chaque candidat.',
      ctaProjects: 'Voir les projets',
      ctaContact: 'Me contacter',
      photoAlt: 'Ezequiel Nascimento',
      stats: [
        { value: 'nov. 2026', label: 'MCP multi-tenant en production' },
        { value: '3', label: 'systèmes en production' },
        { value: '10+', label: 'entreprises sur la plateforme de service client que je fais évoluer', accent: true },
      ],
      tickerLabel: 'Technologies',
    },
    mcp: {
      title: 'Plateforme MCP multi-tenant',
      meta: 'Plugin IA · oct. 2026 – aujourd’hui · en production',
      statement: ['L’entreprise vient du jeton.', 'Jamais de la question.'],
      problemLabel: 'Problème',
      problem:
        'Les dirigeants veulent demander à une IA comment va l’activité, sans exposer de données personnelles et sans qu’une entreprise voie les données d’une autre.',
      decisionLabel: 'Décision',
      decision:
        'Un noyau unique pour toutes les entreprises, l’entreprise étant déduite du jeton OAuth. Ni l’utilisateur ni le modèle, par injection de prompt, ne changent d’entreprise.',
      chat: {
        label: 'Exemple de conversation avec l’assistant, avec des données fictives',
        status: 'Assistant · MCP connecté',
        tag: 'données fictives',
        question: 'Combien de clients sont revenus en 24 heures cette semaine ?',
        tool: 'outil retour · entreprise : déduite du jeton OAuth · lecture seule',
        answers: [
          'La plupart des retours viennent de conversations ouvertes en dehors des heures de bureau.',
          'Le taux de retour a augmenté par rapport à la semaine dernière sur les deux canaux les plus actifs.',
          'Téléphones, documents et texte libre sont restés hors de l’analyse',
        ],
        note: 'données personnelles masquées avant d’arriver au modèle',
      },
      metrics: [
        { value: '≥90 %', label: 'de ressources réservées en moins qu’un serveur par entreprise, en projection pour 10 entreprises', accent: true },
        { value: '12', label: 'outils versionnés' },
        { value: '2', label: 'conteneurs' },
        { value: '~64 Mo', label: 'en production' },
      ],
    },
    perto: {
      title: 'Agenda Perto',
      meta: 'Perto Plataforma · sept. 2026 – aujourd’hui · en production avec le premier client',
      statement: ['Un filtre oublié dans le code', 'ne fait pas fuiter de données.'],
      layers: [
        { label: 'Couche 1 · Application', text: 'Le client vient du jeton, jamais d’un en-tête.' },
        { label: 'Couche 2 · ORM', text: 'Un filtre global applique le client à chaque requête.' },
        { label: 'Couche 3 · PostgreSQL', text: 'Le Row-Level Security bloque toute ligne d’un autre client.' },
      ],
      footnote: 'Tests d’isolation à chaque pull request · rollback automatique déjà testé en production',
    },
    asces: {
      title: 'Systèmes d’Asces-Unita',
      meta: 'Asces-Unita · juil. 2025 – aujourd’hui · Vestibular Portal en production',
      statement: ['Le numéro d’identité n’apparaît jamais dans l’URL,', 'les logs ou les métriques.'],
      portal: {
        label: 'Vestibular Portal',
        status: 'en production',
        text: 'Architecture hexagonale, numéro d’identité haché avec une clé secrète (HMAC-SHA-256), la même réponse pour toute erreur et une limite de tentatives par IP, par numéro et globale dans Redis.',
        limit: 'limite atteinte · par IP · par numéro · globale',
      },
      dspace: {
        label: 'DSpace',
        text: 'Migration du dépôt institutionnel, avec une base PostgreSQL, un Docker Compose dédié et le frontend de l’établissement.',
      },
      bolsa: {
        label: 'Bolsa Social',
        value: '99,88 %',
        text: 'd’exécutions sans erreur, sur plus de 6 000 exécutions pendant la période d’inscription.',
      },
    },
    method: {
      title: 'De la question métier à la production',
      steps: [
        { title: 'Je pars de la question métier.', text: 'Chaque outil MCP répond à une question de dirigeant, au lieu d’exposer des tables.' },
        { title: 'Je n’utilise que la donnée nécessaire.', text: 'Téléphone, document et texte libre restent hors des analyses.' },
        { title: 'J’enregistre la décision et l’alternative.', text: 'Un monolithe modulaire plutôt que des microservices, consigné dans un ADR.' },
        { title: 'Je mets en production avec un filet de sécurité.', text: 'Migration destructive uniquement avec confirmation explicite et sauvegarde vérifiée.' },
        { title: 'J’utilise l’IA en ingénierie, avec des garde-fous.', text: 'Claude Code, avec CI au vert, tests d’isolation et analyses exigés avant le merge.' },
      ],
      chipsLabel: 'Technologies',
    },
    experience: {
      title: 'Parcours',
      intro: 'De l’exploitation réseau à l’agent d’IA',
      education:
        'Analyse et développement de systèmes, Uniasselvi · Model Context Protocol et AI Fluency, Anthropic · Cloud, FIAP',
      jobs: [
        { period: 'oct. 2026 – aujourd’hui', role: 'AI Software Engineer · Plugin IA', text: 'Plateforme MCP multi-tenant et évolution de la plateforme de service client utilisée par plus de 10 entreprises.' },
        { period: 'sept. 2026 – aujourd’hui', role: 'Software Engineer · Perto Plataforma', text: 'Agenda Perto : architecture, backend, frontend, base de données, infrastructure et pipeline.' },
        { period: 'juil. 2025 – aujourd’hui', role: 'Technicien support · Asces-Unita', text: 'Vestibular Portal, DSpace, Bolsa Social et élections de la CIPA.' },
        { period: 'janv. 2025 – avr. 2025', role: 'Analyste réseau niveau 1 · Infor Network', text: 'Supervision avec Zabbix, Grafana et SNMPv3, et automatisation des alertes.' },
        { period: 'sept. 2022 – janv. 2025', role: 'Trois postes · Digital Tecnologia', text: 'Du support utilisateur à l’exploitation réseau avec MikroTik, et Mibo Digital, un SaaS de caméras.' },
      ],
    },
    contact: {
      kicker: 'Un système à mettre en production ?',
      title: 'Parlons-en.',
      text: 'Pour un projet, une architecture ou une opportunité. Je réponds par e-mail et sur LinkedIn.',
      email: 'E-mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      newTab: '(s’ouvre dans un nouvel onglet)',
    },
    footer: { location: 'Caruaru, Pernambuco, Brésil' },
  },
}
