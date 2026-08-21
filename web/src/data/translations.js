export const LANGUAGES = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

const SKILLS_SHARED = [
  {
    key: 'backend',
    items: ['Java', 'Spring Boot', 'APIs REST', 'POO', 'SOLID', 'Clean Code', 'JUnit 5', 'TDD', 'DDD'],
  },
  {
    key: 'frontend',
    items: ['Angular', 'React', 'JavaScript', 'Typescript', 'TailwindCSS'],
  },
  {
    key: 'data',
    items: ['PostgreSQL', 'MySQL', 'JPA / Hibernate', 'Flyway', 'Modelagem de Dados', 'SQL Avançado'],
  },
  {
    key: 'devops',
    items: ['Docker', 'Docker Swarm', 'CI/CD', 'Git', 'GitHub Actions', 'Gitea', 'Ansible', 'Linux', 'SonarQube'],
  },
  {
    key: 'observability',
    items: ['Zabbix', 'Grafana', 'SNMPv3', 'Logging', 'Troubleshooting', 'Análise de Incidentes'],
  },
  {
    key: 'networking',
    items: ['TCP/IP', 'VPN', 'Firewall', 'MikroTik RouterOS', 'DHCP', 'Roteamento'],
  },
]

export const EXPERIENCE_STACKS = {
  ascesUnita: ['Java', 'Spring Boot', 'APIs REST', 'Angular', 'Docker', 'Ansible', 'PostgreSQL', 'Flyway', 'DSpace', 'Git', 'Linux'],
  mibo: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'APIs REST', 'Docker', 'Gitea', 'CI/CD', 'Git'],
  inforNetwork: ['Zabbix', 'Grafana', 'SNMPv3', 'VPN', 'Firewall', 'Power Automate', 'Webhooks'],
  networkSupport2: ['MikroTik RouterOS', 'Troubleshooting', 'Análise de Tráfego', 'Documentação Técnica'],
  tier1Support: ['PPPoE', 'DHCP', 'Wi-Fi', 'CRM', 'ERP'],
}

const CERTIFICATIONS = [
  { name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', year: '2026' },
  { name: 'Introduction to Model Context Protocol', issuer: 'Anthropic', year: '2026' },
  { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', year: '2026' },
  { name: 'Cloud Fundamentals, Administration and Solution Architect', issuer: 'FIAP', year: '2025' },
  { name: 'DevOps & Agile Culture', issuer: 'FIAP', year: '2025' },
  { name: 'Linux Fundamentals', issuer: 'FIAP', year: '2025' },
  { name: 'Design de APIs RESTful com Spring Boot, TDD, JUnit5 e Mocks', issuer: 'Alura', year: '2024' },
  { name: 'Docker Fundamentals', issuer: 'Alura', year: '2024' },
  { name: 'Persistência com JPA / Hibernate', issuer: 'Alura', year: '2024' },
  { name: 'Spring Boot: JPA, REST, JWT, OAuth2, Docker e AWS', issuer: 'Udemy', year: '2023' },
  { name: 'Git & GitHub: Branching, Conflitos e Pull Requests', issuer: 'Alura', year: '2023' },
  { name: 'SOLID with Java: Object-Oriented Programming Principles', issuer: 'Alura', year: '2023' },
  { name: 'Software Development Foundations', issuer: 'Microsoft & LinkedIn', year: '2023' },
]

const CONTACT_BASE = {
  email: 'ezequielnascimento.ofc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ezequielmiguel/',
  github: 'https://github.com/ezequielnascimento-ofc',
}

export const translations = {
  pt: {
    nav: {
      sobre: 'Sobre',
      experiencia: 'Experiência',
      competencias: 'Competências',
      formacao: 'Formação',
      contato: 'Contato',
    },
    hero: {
      status: 'Disponível para novas oportunidades',
      name: 'Ezequiel Nascimento',
      role: 'Engenheiro de Software - Java · Spring Boot · APIs REST · React / Angular · Docker · CI/CD',
      lede: 'Construo sistemas pensados para produção: não apenas para funcionar, mas para permanecer disponíveis, observáveis e fáceis de evoluir.',
      ctaContact: 'Entrar em contato',
      ctaExperience: 'Ver experiência',
    },
    about: {
      eyebrow: 'Sobre',
      title: 'Da operação ao desenvolvimento',
      paragraphs: [
        'Minha carreira começou em suporte técnico e operação de redes - lidando diretamente com incidentes, disponibilidade e a rotina de sistemas em produção. Foi ali que entendi, na prática, o que separa um sistema que "funciona" de um sistema confiável.',
        'Hoje atuo no desenvolvimento de software com foco em backend, aplicando essa mesma exigência: APIs bem desenhadas, bancos de dados modelados com cuidado, automação de deploy e observabilidade desde o primeiro commit.',
        'Busco oportunidades em Engenharia de Software, Desenvolvimento Backend ou Full Stack, contribuindo com uma visão sistêmica que une código e infraestrutura.',
      ],
    },
    metrics: [
      { value: 99.88, suffix: '%', decimals: 2, label: 'de disponibilidade em sistema institucional em produção' },
      { value: 6000, suffix: '+', decimals: 0, label: 'execuções processadas no período de inscrições da Bolsa Social' },
      { value: 3400, suffix: '+', decimals: 0, label: 'documentos acadêmicos preservados em migração de repositório' },
      { value: 40, suffix: '%', decimals: 0, label: 'de redução no tempo de deploy com pipeline de CI/CD' },
    ],
    experience: {
      eyebrow: 'Trajetória',
      title: 'Experiência profissional',
      detailed: [
        {
          period: 'Jul/2025 - Presente',
          role: 'Técnico de TI',
          org: 'Asces-Unita · Caruaru, PE',
          key: 'ascesUnita',
          items: [
            'Desenvolvimento de aplicação web interna para inscrição na Bolsa Social Filantrópica, com autenticação institucional e validação de dados dos candidatos.',
            'Mecanismos de segurança e auditoria que sustentaram 99,88% de disponibilidade e mais de 6.000 execuções no período de inscrições.',
            'Migração do repositório institucional do DSpace 5 para o DSpace 10, incluindo atualização do banco PostgreSQL e reestruturação do schema, preservando mais de 3.400 documentos acadêmicos.',
            'Diagnóstico e correção de inconsistências em bancos de dados legados com migrations versionadas no Flyway, garantindo rastreabilidade das alterações.',
            'Conteinerização e modernização do ambiente DSpace 10 com Docker, incluindo customização de frontend e imagens próprias para deploy.',
            'Automação de ambientes e processos operacionais com Ansible, reduzindo trabalho manual e padronizando implantações.',
          ],
        },
        {
          period: 'Out/2023 - Abr/2024',
          role: 'Auxiliar de Analista de Redes e Suporte I | NOC',
          org: 'Digital Tecnologia e Telecomunicação · Belo Jardim, PE',
          key: 'mibo',
          items: [
            'Atuação dupla: suporte e troubleshooting de conectividade em ambiente de provedor, e liderança técnica no desenvolvimento do Mibo Digital.',
            'Desenvolvimento do Mibo Digital, um SaaS para administração de câmeras, com Java, Spring Boot, Angular e MySQL.',
            'Implementação de APIs REST, logging e alertas operacionais para rastreabilidade em produção.',
            'Estruturação de pipeline de CI/CD com Docker e Gitea, automatizando build, testes e deploy - redução de ~40% no tempo de implantação.',
            'Aplicação de versionamento, documentação técnica e testes automatizados ao longo do ciclo de desenvolvimento.',
          ],
        },
      ],
      condensed: [
        {
          period: 'Jan/2025 - Abr/2025',
          role: 'Analista de Redes N1 | NOC',
          org: 'Infor Network - monitoramento proativo, criação de templates e triggers no Zabbix, dashboards em Grafana, telemetria segura com SNMPv3 e automação de alertas com Power Automate e Webhooks.',
          key: 'inforNetwork',
        },
        {
          period: 'Abr/2024 - Jan/2025',
          role: 'Auxiliar de Analista de Redes e Suporte II | NOC',
          org: 'Digital Tecnologia - especialista em MikroTik RouterOS, projetos de migração de infraestrutura, testes de desempenho, análise de tráfego e produção de documentação técnica padronizada.',
          key: 'networkSupport2',
        },
        {
          period: 'Set/2022 - Set/2023',
          role: 'Atendimento ao Usuário | Suporte Técnico Tier 1',
          org: 'Digital Tecnologia - suporte a base de 5.000+ usuários, troubleshooting de PPPoE, DHCP e Wi-Fi, atendimento via CRM/ERP e base da minha entrada em tecnologia.',
          key: 'tier1Support',
        },
      ],
    },
    skills: {
      eyebrow: 'Stack',
      title: 'Competências técnicas',
      groups: {
        backend: 'Backend',
        frontend: 'Frontend',
        data: 'Dados & Arquitetura',
        devops: 'DevOps & Infraestrutura',
        observability: 'Observabilidade',
        networking: 'Redes',
      },
    },
    education: {
      eyebrow: 'Formação',
      title: 'Formação & certificações',
      certLabel: 'Cursos e certificações',
      items: [
        {
          title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
          meta: 'Uniasselvi · 2022 - 2025 (concluído)',
          text: 'Formação com foco em Engenharia de Software, POO, arquitetura, APIs REST, modelagem e otimização SQL, segurança da informação e metodologias ágeis. Projetos práticos incluíram integração com a API REST do GitHub, modelagem relacional normalizada e avaliações heurísticas de UX/UI.',
        },
        {
          title: 'Corporate Executive Certificate - English',
          meta: 'United Idiomas · Jun/2025 - Presente',
          text: 'Comunicação profissional em inglês para contextos técnicos e acadêmicos, com foco em reuniões, documentação e conversação com falantes nativos.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Vamos conversar?',
      lede: 'Estou aberto a oportunidades em Engenharia de Software, Backend ou Full Stack. O melhor caminho é por e-mail ou LinkedIn.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      location: 'Caruaru, Pernambuco - Brasil',
    },
  },

  en: {
    nav: {
      sobre: 'About',
      experiencia: 'Experience',
      competencias: 'Skills',
      formacao: 'Education',
      contato: 'Contact',
    },
    hero: {
      status: 'Open to new opportunities',
      name: 'Ezequiel Nascimento',
      role: 'Software Engineer - Java · Spring Boot · REST APIs · React / Angular · Docker · CI/CD',
      lede: 'I build systems designed for production: not just to work, but to stay available, observable, and easy to evolve.',
      ctaContact: 'Get in touch',
      ctaExperience: 'See experience',
    },
    about: {
      eyebrow: 'About',
      title: 'From operations to development',
      paragraphs: [
        'My career started in technical support and network operations - dealing directly with incidents, uptime, and the day-to-day of production systems. That is where I learned, in practice, what separates a system that "works" from a system that is reliable.',
        'Today I work on software development with a backend focus, applying that same standard: well-designed APIs, carefully modeled databases, deployment automation, and observability from the first commit.',
        'I am looking for opportunities in Software Engineering, Backend or Full Stack Development, bringing a systemic view that connects code and infrastructure.',
      ],
    },
    metrics: [
      { value: 99.88, suffix: '%', decimals: 2, label: 'uptime on an institutional system in production' },
      { value: 6000, suffix: '+', decimals: 0, label: 'executions processed during the scholarship application period' },
      { value: 3400, suffix: '+', decimals: 0, label: 'academic documents preserved during a repository migration' },
      { value: 40, suffix: '%', decimals: 0, label: 'reduction in deployment time with a CI/CD pipeline' },
    ],
    experience: {
      eyebrow: 'Path',
      title: 'Professional experience',
      detailed: [
        {
          period: 'Jul/2025 - Present',
          role: 'IT Technician',
          org: 'Asces-Unita · Caruaru, PE, Brazil',
          key: 'ascesUnita',
          items: [
            'Built an internal web application for the Social Scholarship application process, including institutional authentication and applicant data validation.',
            'Implemented security and audit mechanisms that sustained 99.88% uptime and over 6,000 executions during the application period.',
            'Migrated the institutional repository from DSpace 5 to DSpace 10, including a PostgreSQL database update and schema restructuring, preserving over 3,400 academic documents.',
            'Diagnosed and fixed inconsistencies in legacy databases using versioned migrations with Flyway, ensuring full traceability of changes.',
            'Containerized and modernized the DSpace 10 environment with Docker, including a custom frontend and dedicated deployment images.',
            'Automated environments and operational processes with Ansible, reducing manual work and standardizing deployments.',
            'Provided technical support for hardware, software, network and institutional services, directly supporting rollouts and incident resolution.',
          ],
        },
        {
          period: 'Oct/2023 - Apr/2024',
          role: 'Network & Support Analyst Assistant I | NOC',
          org: 'Digital Tecnologia e Telecomunicação · Belo Jardim, PE, Brazil',
          key: 'mibo',
          items: [
            'Dual role: connectivity support and troubleshooting in an ISP environment, plus technical lead on the development of Mibo Digital.',
            'Developed Mibo Digital, a SaaS platform for camera management, with Java, Spring Boot, Angular and MySQL.',
            'Implemented REST APIs, logging and operational alerts for traceability in production.',
            'Set up a CI/CD pipeline with Docker and Gitea, automating build, test and deploy - roughly a 40% reduction in deployment time.',
            'Applied versioning, technical documentation and automated testing throughout the development cycle.',
          ],
        },
      ],
      condensed: [
        {
          period: 'Jan/2025 - Apr/2025',
          role: 'Network Analyst N1 | NOC',
          org: 'Infor Network - proactive monitoring, custom Zabbix templates and triggers, Grafana dashboards, secure SNMPv3 telemetry, and alert automation with Power Automate and Webhooks.',
          key: 'inforNetwork',
        },
        {
          period: 'Apr/2024 - Jan/2025',
          role: 'Network & Support Analyst Assistant II | NOC',
          org: 'Digital Tecnologia - MikroTik RouterOS specialist, infrastructure migration projects, performance testing, traffic analysis and standardized technical documentation.',
          key: 'networkSupport2',
        },
        {
          period: 'Sep/2022 - Sep/2023',
          role: 'Customer Support | Tier 1 Technical Support',
          org: 'Digital Tecnologia - support for a 5,000+ user base, PPPoE/DHCP/Wi-Fi troubleshooting, CRM/ERP ticketing, and where I first entered tech.',
          key: 'tier1Support',
        },
      ],
    },
    skills: {
      eyebrow: 'Stack',
      title: 'Technical skills',
      groups: {
        backend: 'Backend',
        frontend: 'Frontend',
        data: 'Data & Architecture',
        devops: 'DevOps & Infrastructure',
        observability: 'Observability',
        networking: 'Networking',
      },
    },
    education: {
      eyebrow: 'Education',
      title: 'Education & certifications',
      certLabel: 'Courses & certifications',
      items: [
        {
          title: 'Associate Degree in Systems Analysis and Development',
          meta: 'Uniasselvi · 2022 - 2025 (completed)',
          text: 'Focused on Software Engineering, OOP, architecture, REST APIs, SQL modeling and optimization, information security and agile methodologies. Practical projects included integrating with the GitHub REST API, normalized relational modeling, and UX/UI heuristic evaluations.',
        },
        {
          title: 'Corporate Executive Certificate - English',
          meta: 'United Idiomas · Jun/2025 - Present',
          text: 'Professional English communication for technical and academic contexts, focused on meetings, documentation and conversation with native speakers.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's talk",
      lede: 'I am open to opportunities in Software Engineering, Backend or Full Stack. The best way to reach me is by email or LinkedIn.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      location: 'Caruaru, Pernambuco - Brazil',
    },
  },

  es: {
    nav: {
      sobre: 'Sobre mí',
      experiencia: 'Experiencia',
      competencias: 'Habilidades',
      formacao: 'Formación',
      contato: 'Contacto',
    },
    hero: {
      status: 'Disponible para nuevas oportunidades',
      name: 'Ezequiel Nascimento',
      role: 'Ingeniero de Software - Java · Spring Boot · APIs REST · React / Angular · Docker · CI/CD',
      lede: 'Construyo sistemas pensados para producción: no solo para que funcionen, sino para que sigan disponibles, observables y fáciles de evolucionar.',
      ctaContact: 'Ponerse en contacto',
      ctaExperience: 'Ver experiencia',
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'De la operación al desarrollo',
      paragraphs: [
        'Mi carrera comenzó en soporte técnico y operación de redes - trabajando directamente con incidentes, disponibilidad y la rutina de sistemas en producción. Ahí entendí, en la práctica, qué separa un sistema que "funciona" de un sistema confiable.',
        'Hoy trabajo en desarrollo de software con foco en backend, aplicando esa misma exigencia: APIs bien diseñadas, bases de datos modeladas con cuidado, automatización de despliegue y observabilidad desde el primer commit.',
        'Busco oportunidades en Ingeniería de Software, Desarrollo Backend o Full Stack, aportando una visión sistémica que une código e infraestructura.',
      ],
    },
    metrics: [
      { value: 99.88, suffix: '%', decimals: 2, label: 'de disponibilidad en un sistema institucional en producción' },
      { value: 6000, suffix: '+', decimals: 0, label: 'ejecuciones procesadas durante el período de inscripciones de la beca' },
      { value: 3400, suffix: '+', decimals: 0, label: 'documentos académicos preservados en una migración de repositorio' },
      { value: 40, suffix: '%', decimals: 0, label: 'de reducción en el tiempo de despliegue con un pipeline de CI/CD' },
    ],
    experience: {
      eyebrow: 'Trayectoria',
      title: 'Experiencia profesional',
      detailed: [
        {
          period: 'Jul/2025 - Presente',
          role: 'Técnico de TI',
          org: 'Asces-Unita · Caruaru, PE, Brasil',
          key: 'ascesUnita',
          items: [
            'Desarrollo de una aplicación web interna para la inscripción en la Beca Social Filantrópica, con autenticación institucional y validación de los datos de los candidatos.',
            'Mecanismos de seguridad y auditoría que sostuvieron un 99,88% de disponibilidad y más de 6.000 ejecuciones durante el período de inscripciones.',
            'Migración del repositorio institucional de DSpace 5 a DSpace 10, incluyendo actualización de la base de datos PostgreSQL y reestructuración del esquema, preservando más de 3.400 documentos académicos.',
            'Diagnóstico y corrección de inconsistencias en bases de datos heredadas mediante migraciones versionadas con Flyway, garantizando trazabilidad de los cambios.',
            'Contenerización y modernización del entorno DSpace 10 con Docker, incluyendo personalización de frontend e imágenes propias para despliegue.',
            'Automatización de entornos y procesos operativos con Ansible, reduciendo el trabajo manual y estandarizando las implementaciones.',
            'Soporte técnico a hardware, software, redes y servicios institucionales, apoyando directamente implementaciones y resolución de incidentes.',
          ],
        },
        {
          period: 'Oct/2023 - Abr/2024',
          role: 'Auxiliar de Analista de Redes y Soporte I | NOC',
          org: 'Digital Tecnologia e Telecomunicação · Belo Jardim, PE, Brasil',
          key: 'mibo',
          items: [
            'Rol dual: soporte y resolución de problemas de conectividad en un entorno ISP, además de liderazgo técnico en el desarrollo de Mibo Digital.',
            'Desarrollo de Mibo Digital, un SaaS para administración de cámaras, con Java, Spring Boot, Angular y MySQL.',
            'Implementación de APIs REST, logging y alertas operativas para trazabilidad en producción.',
            'Estructuración de un pipeline de CI/CD con Docker y Gitea, automatizando build, pruebas y despliegue - reducción de ~40% en el tiempo de implementación.',
            'Aplicación de versionado, documentación técnica y pruebas automatizadas a lo largo del ciclo de desarrollo.',
          ],
        },
      ],
      condensed: [
        {
          period: 'Ene/2025 - Abr/2025',
          role: 'Analista de Redes N1 | NOC',
          org: 'Infor Network - monitoreo proactivo, plantillas y triggers personalizados en Zabbix, dashboards en Grafana, telemetría segura con SNMPv3 y automatización de alertas con Power Automate y Webhooks.',
          key: 'inforNetwork',
        },
        {
          period: 'Abr/2024 - Ene/2025',
          role: 'Auxiliar de Analista de Redes y Soporte II | NOC',
          org: 'Digital Tecnologia - especialista en MikroTik RouterOS, proyectos de migración de infraestructura, pruebas de rendimiento, análisis de tráfico y documentación técnica estandarizada.',
          key: 'networkSupport2',
        },
        {
          period: 'Sep/2022 - Sep/2023',
          role: 'Atención al Usuario | Soporte Técnico Nivel 1',
          org: 'Digital Tecnologia - soporte a una base de más de 5.000 usuarios, troubleshooting de PPPoE/DHCP/Wi-Fi, atención vía CRM/ERP y mi punto de entrada a la tecnología.',
          key: 'tier1Support',
        },
      ],
    },
    skills: {
      eyebrow: 'Stack',
      title: 'Habilidades técnicas',
      groups: {
        backend: 'Backend',
        frontend: 'Frontend',
        data: 'Datos & Arquitectura',
        devops: 'DevOps e Infraestructura',
        observability: 'Observabilidad',
        networking: 'Redes',
      },
    },
    education: {
      eyebrow: 'Formación',
      title: 'Formación & certificaciones',
      certLabel: 'Cursos y certificaciones',
      items: [
        {
          title: 'Tecnólogo en Análisis y Desarrollo de Sistemas',
          meta: 'Uniasselvi · 2022 - 2025 (concluido)',
          text: 'Formación enfocada en Ingeniería de Software, POO, arquitectura, APIs REST, modelado y optimización SQL, seguridad de la información y metodologías ágiles. Proyectos prácticos incluyeron integración con la API REST de GitHub, modelado relacional normalizado y evaluaciones heurísticas de UX/UI.',
        },
        {
          title: 'Corporate Executive Certificate - English',
          meta: 'United Idiomas · Jun/2025 - Presente',
          text: 'Comunicación profesional en inglés para contextos técnicos y académicos, con foco en reuniones, documentación y conversación con hablantes nativos.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Hablamos?',
      lede: 'Estoy abierto a oportunidades en Ingeniería de Software, Backend o Full Stack. La mejor forma de contactarme es por correo o LinkedIn.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      location: 'Caruaru, Pernambuco - Brasil',
    },
  },

  fr: {
    nav: {
      sobre: 'À propos',
      experiencia: 'Expérience',
      competencias: 'Compétences',
      formacao: 'Formation',
      contato: 'Contact',
    },
    hero: {
      status: 'Ouvert à de nouvelles opportunités',
      name: 'Ezequiel Nascimento',
      role: 'Ingénieur Logiciel - Java · Spring Boot · API REST · React / Angular · Docker · CI/CD',
      lede: 'Je conçois des systèmes pensés pour la production : non seulement pour fonctionner, mais pour rester disponibles, observables et faciles à faire évoluer.',
      ctaContact: 'Me contacter',
      ctaExperience: "Voir l'expérience",
    },
    about: {
      eyebrow: 'À propos',
      title: "De l'exploitation au développement",
      paragraphs: [
        "Ma carrière a commencé dans le support technique et l'exploitation réseau - en gérant directement des incidents, la disponibilité et le quotidien des systèmes en production. C'est là que j'ai compris, en pratique, ce qui distingue un système qui « fonctionne » d'un système fiable.",
        "Aujourd'hui, je développe des logiciels avec un focus backend, en appliquant cette même exigence : des API bien conçues, des bases de données modélisées avec soin, une automatisation du déploiement et une observabilité dès le premier commit.",
        "Je recherche des opportunités en Ingénierie Logicielle, développement Backend ou Full Stack, en apportant une vision systémique qui relie code et infrastructure.",
      ],
    },
    metrics: [
      { value: 99.88, suffix: '%', decimals: 2, label: 'de disponibilité sur un système institutionnel en production' },
      { value: 6000, suffix: '+', decimals: 0, label: "exécutions traitées pendant la période d'inscription à la bourse" },
      { value: 3400, suffix: '+', decimals: 0, label: 'documents académiques préservés lors d\'une migration de dépôt' },
      { value: 40, suffix: '%', decimals: 0, label: 'de réduction du temps de déploiement grâce à un pipeline CI/CD' },
    ],
    experience: {
      eyebrow: 'Parcours',
      title: 'Expérience professionnelle',
      detailed: [
        {
          period: 'Juil/2025 - Présent',
          role: 'Technicien IT',
          org: 'Asces-Unita · Caruaru, PE, Brésil',
          key: 'ascesUnita',
          items: [
            "Développement d'une application web interne pour l'inscription à la Bourse Sociale, avec authentification institutionnelle et validation des données des candidats.",
            'Mécanismes de sécurité et d\'audit ayant maintenu 99,88 % de disponibilité et plus de 6 000 exécutions durant la période d\'inscription.',
            'Migration du dépôt institutionnel de DSpace 5 vers DSpace 10, incluant la mise à jour de la base PostgreSQL et la restructuration du schéma, préservant plus de 3 400 documents académiques.',
            'Diagnostic et correction d\'incohérences dans des bases de données héritées via des migrations versionnées avec Flyway, garantissant la traçabilité des changements.',
            "Conteneurisation et modernisation de l'environnement DSpace 10 avec Docker, incluant un frontend personnalisé et des images de déploiement dédiées.",
            "Automatisation des environnements et des processus opérationnels avec Ansible, réduisant le travail manuel et standardisant les déploiements.",
            "Support technique du matériel, des logiciels, du réseau et des services institutionnels, en appui direct aux déploiements et à la résolution d'incidents.",
          ],
        },
        {
          period: 'Oct/2023 - Avr/2024',
          role: 'Assistant Analyste Réseau et Support I | NOC',
          org: 'Digital Tecnologia e Telecomunicação · Belo Jardim, PE, Brésil',
          key: 'mibo',
          items: [
            "Double rôle : support et dépannage de connectivité en environnement FAI, et responsabilité technique du développement de Mibo Digital.",
            'Développement de Mibo Digital, un SaaS de gestion de caméras, avec Java, Spring Boot, Angular et MySQL.',
            'Implémentation d\'API REST, de journalisation et d\'alertes opérationnelles pour la traçabilité en production.',
            'Mise en place d\'un pipeline CI/CD avec Docker et Gitea, automatisant build, tests et déploiement - réduction d\'environ 40 % du temps de déploiement.',
            'Application du versionnement, de la documentation technique et des tests automatisés tout au long du cycle de développement.',
          ],
        },
      ],
      condensed: [
        {
          period: 'Jan/2025 - Avr/2025',
          role: 'Analyste Réseau N1 | NOC',
          org: "Infor Network - supervision proactive, modèles et déclencheurs Zabbix personnalisés, tableaux de bord Grafana, télémétrie sécurisée avec SNMPv3 et automatisation des alertes avec Power Automate et Webhooks.",
          key: 'inforNetwork',
        },
        {
          period: 'Avr/2024 - Jan/2025',
          role: 'Assistant Analyste Réseau et Support II | NOC',
          org: "Digital Tecnologia - spécialiste MikroTik RouterOS, projets de migration d'infrastructure, tests de performance, analyse de trafic et documentation technique standardisée.",
          key: 'networkSupport2',
        },
        {
          period: 'Sep/2022 - Sep/2023',
          role: 'Support Client | Support Technique Niveau 1',
          org: "Digital Tecnologia - support pour plus de 5 000 utilisateurs, dépannage PPPoE/DHCP/Wi-Fi, gestion via CRM/ERP, mon point d'entrée dans la tech.",
          key: 'tier1Support',
        },
      ],
    },
    skills: {
      eyebrow: 'Stack',
      title: 'Compétences techniques',
      groups: {
        backend: 'Backend',
        frontend: 'Frontend',
        data: 'Données & Architecture',
        devops: 'DevOps & Infrastructure',
        observability: 'Observabilité',
        networking: 'Réseaux',
      },
    },
    education: {
      eyebrow: 'Formation',
      title: 'Formation & certifications',
      certLabel: 'Cours & certifications',
      items: [
        {
          title: 'BTS en Analyse et Développement de Systèmes',
          meta: 'Uniasselvi · 2022 - 2025 (terminé)',
          text: "Formation axée sur l'Ingénierie Logicielle, la POO, l'architecture, les API REST, la modélisation et l'optimisation SQL, la sécurité de l'information et les méthodologies agiles. Projets pratiques incluant l'intégration avec l'API REST de GitHub, la modélisation relationnelle normalisée et des évaluations heuristiques UX/UI.",
        },
        {
          title: 'Corporate Executive Certificate - English',
          meta: 'United Idiomas · Juin/2025 - Présent',
          text: "Communication professionnelle en anglais pour des contextes techniques et académiques, axée sur les réunions, la documentation et la conversation avec des locuteurs natifs.",
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Discutons',
      lede: "Je suis ouvert à des opportunités en Ingénierie Logicielle, Backend ou Full Stack. Le meilleur moyen de me joindre est par e-mail ou LinkedIn.",
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
      location: 'Caruaru, Pernambuco - Brésil',
    },
  },
}

export const SKILLS_DATA = SKILLS_SHARED
export const CERTIFICATIONS_DATA = CERTIFICATIONS
export const CONTACT_DATA = CONTACT_BASE
