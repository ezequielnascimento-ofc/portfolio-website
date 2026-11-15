// Estudo de caso 03 · Sistemas da Asces-Unita (foco no Vestibular Portal).
// Fonte: docs/kb/projetos/proj-vestibular-portal.md (versão pública), a partir do repositório
// vestibular-portal (ADR-001 a 007, docs/security, docs/operations, relatório de carga de 27/09).
// Design aprovado em 2026-11-15 no canvas "Portfolio Ezequiel · Estudos de caso".

const pt = {
  meta: {
    title: 'Sistemas da Asces-Unita · Estudo de caso · Ezequiel Nascimento',
    description:
      'Vestibular Portal: consulta de local de prova e resultado por CPF, com HMAC, limites no Redis, arquitetura hexagonal e testes de carga sem nenhum CPF exposto.',
  },
  back: 'Voltar aos projetos',
  counter: 'Estudo de caso · 03 de 03',
  number: '03',
  title: 'Sistemas da Asces-Unita',
  meta_line: 'Asces-Unita · jul/2025 – atual · Vestibular Portal em produção',
  statement: ['O CPF nunca aparece na URL,', 'nos logs ou nas métricas.'],
  lead:
    'Sistemas de um centro universitário, com foco no Vestibular Portal: o candidato consulta o local de prova e o resultado só com CPF e data de nascimento, e o CPF fica protegido em cada camada.',
  facts: [
    { label: 'Papel', value: 'Desenvolvimento do sistema completo, implantação e suporte' },
    { label: 'Período', value: 'jul/2025 – atual' },
    { label: 'Status', value: 'Em produção desde out/2026, hoje na etapa de resultado', live: true },
    { label: 'Stack', value: 'Java 21 · Spring Boot 3 · React 19 · PostgreSQL 17 · Redis 8' },
  ],
  metrics: [
    { value: '0 CPF', label: 'exposto em mais de 118 mil verificações dos testes de carga', accent: true },
    { value: '186 req/s', label: 'a 100 usuários virtuais, p95 de 195 ms (ambiente local)' },
    { value: '3 limites', label: 'de tentativas no Redis: por IP, por CPF e global' },
    { value: '99,88%', label: 'de execuções sem erro na Bolsa Social, em mais de 6.000' },
  ],
  tocLabel: 'Neste caso',
  sections: {
    contexto: 'Contexto',
    problema: 'Problema',
    cpf: 'O caminho do CPF',
    decisoes: 'Decisões',
    arquitetura: 'Arquitetura',
    testes: 'Testes e evidências',
    resultado: 'Resultado',
    proximos: 'Próximos passos',
  },
  tocShort: { cpf: 'O caminho do CPF' },
  context: [
    'A Asces-Unita é um centro universitário em Caruaru (PE), com mais de 60 anos de história. Ali desenvolvo os sistemas institucionais: o Vestibular Portal, a migração do repositório DSpace e a inscrição da Bolsa Social, entre outros.',
    'No vestibular, uma base de até 5.000 candidatos consulta o local de prova e, depois, o resultado. Não há conta nem senha: o candidato informa CPF e data de nascimento. O CPF é a chave de acesso, e por isso é o dado que mais precisa de proteção.',
  ],
  problem: [
    { label: 'Enumeração', text: 'Sem senha, um robô pode testar CPFs em sequência para descobrir quem está inscrito e onde vai fazer a prova.' },
    { label: 'Dado pessoal', text: 'O CPF não pode vazar em URL, log, métrica, cache nem chave do Redis.' },
    { label: 'Pico na mesma rede', text: 'Todos consultam na mesma janela, muitas vezes pela rede da própria instituição, com o mesmo IP.' },
  ],
  cpf: {
    intro: 'Do formulário até o log, o CPF passa por cinco pontos. Em nenhum deles fica exposto.',
    steps: [
      ['1 · Requisição', 'Só no corpo de um POST.', 'Nunca na URL nem no armazenamento do navegador. O JSON é limitado a 16 KiB, e o proxy também limita o corpo.'],
      ['2 · Limite de tentativas', 'A chave no Redis é um HMAC.', 'O contador por CPF usa o resumo com chave secreta, nunca o número.'],
      ['3 · Banco', 'Busca por HMAC-SHA-256.', 'A chave fica fora do repositório, e o banco não guarda o CPF em texto.'],
      ['4 · Resposta', 'A mesma para qualquer erro.', 'CPF inválido, data errada ou inscrição inexistente: mesma mensagem e status. Sem cache, sem CPF na resposta.'],
      ['5 · Logs', 'Nem corpo, nem CPF.', 'O ID de correlação só aceita UUID: um valor com cara de CPF é trocado antes de chegar ao log.'],
    ],
    limits: {
      label: 'Limites de tentativas da consulta pública',
      title: 'limites por janela de 60 s · Redis compartilhado entre réplicas',
      tag: 'acima do limite: 429 + Retry-After',
      items: [
        ['500', 'por IP · alto para redes compartilhadas'],
        ['5', 'por CPF · vale para qualquer IP', true],
        ['3.000', 'global · protege a capacidade total'],
      ],
      unit: '/min',
    },
  },
  decisions: {
    intro: 'Registradas em ADRs no repositório: a decisão, a alternativa que ficou de fora e o motivo.',
    labels: ['Decisão', 'Alternativa descartada', 'Por quê'],
    rows: [
      ['Monólito modular hexagonal, com a regra de dependência verificada pelo ArchUnit.', 'Microsserviços desde o início.', 'O domínio ainda é pequeno. As regras não dependem de Spring, HTTP, JPA nem Redis, e um teste quebra se alguém inverter a dependência.'],
      ['Limites no Redis, compartilhados entre réplicas, em três níveis.', 'Um contador em memória em cada instância.', 'Com várias réplicas, só um contador compartilhado é consistente. E o limite por CPF segura a enumeração mesmo vinda de muitos IPs.'],
      ['Se o Redis cair, a consulta falha (fail closed).', 'Seguir respondendo sem limite.', 'Melhor indisponível por alguns minutos do que aberto à enumeração. Mudar isso exige nova análise de ameaças.'],
      ['PostgreSQL e MySQL suportados, os dois testados com Testcontainers.', 'Prender a aplicação a um banco só.', 'A infraestrutura da instituição oferece MySQL. O domínio não muda, e os dois testes de integração são portão de versão.'],
      ['Painel administrativo em serviços separados: API, frontend e Redis próprios.', 'Rotas de administração dentro da API pública.', 'A API pública não tem rota de administração. O painel entra na base com três credenciais, cada uma com o mínimo: importar candidatos, importar resultados e publicar.'],
      ['Importação em duas etapas: validar sem gravar, depois confirmar numa transação.', 'Gravar o arquivo direto, linha a linha.', 'Os erros aparecem por linha antes de tocar na base. Reenviar o mesmo arquivo não duplica nada, e o recibo guarda o SHA-256, nunca o CPF.'],
      ['Resultado publicado substitui o local; se faltar, a resposta é "indisponível".', 'Voltar a mostrar o local quando o resultado não existe.', 'Uma informação antiga pode enganar o candidato. Local e resultado têm publicação independente.'],
    ],
  },
  architecture: {
    steps: [
      'O domínio fica no centro, sem Spring, HTTP, JPA nem Redis. Os adaptadores dependem dele, nunca o contrário.',
      'Contextos separados: candidato, prova, local, acesso e resultado.',
      'Uma consulta parametrizada escolhe a fase visível (resultado antes de local). As notas só são lidas quando o resultado foi publicado.',
      'A API não fica exposta na internet: só o proxy chega até ela, e a porta de saúde é interna.',
      'O painel administrativo fica em outro endereço, com API, banco de contas e Redis próprios. A divulgação de cada etapa tem janela de horário, trava contra edição simultânea e auditoria.',
    ],
    diagramLabel:
      'Diagrama: o candidato acessa por HTTPS o proxy reverso, que encaminha pela rede privada à API pública Spring Boot. A API consulta o Redis para os limites de tentativas e o PostgreSQL pela chave HMAC, sem CPF em texto.',
    nodes: {
      client: ['Candidato', 'React 19, só CPF e data de nascimento'],
      proxy: ['Proxy reverso', 'TLS e limite do corpo da requisição'],
      platform: ['API pública · Spring Boot 3', 'domínio hexagonal', 'tudo negado por padrão', 'mesma resposta para qualquer erro'],
      source: ['Redis 8', 'limites por IP, CPF e global'],
      db: ['PostgreSQL 17', 'busca por HMAC, sem CPF em texto'],
    },
    links: ['HTTPS · POST', 'rede privada'],
  },
  tests: {
    intro:
      'Testes de carga com k6, num ambiente local com recursos limitados (1 CPU para a API, 1 CPU para o banco) e 5.000 candidatos fictícios. Cada requisição também verifica que nenhum CPF saiu na resposta.',
    tableLabel: 'Rodadas do teste de carga',
    head: ['Rodada', 'Respostas', 'Vazão', 'p95', 'Falhas', 'CPF exposto'],
    rows: [
      ['50 usuários', '15.881', '158,6 req/s', '16,9 ms', '0', '0'],
      ['100 usuários · 1ª rodada', '8.119', '81,1 req/s', '600,7 ms', '414 (5,1%)', '0', 'warn'],
      ['100 usuários · repetição', '18.640', '186,2 req/s', '195,0 ms', '0', '0'],
      ['IP institucional · 50 req/s', '500 × 200 e 2.500 × 429', '49,9 req/s', '11,6 ms', '0', '0'],
    ],
    note: 'A 1ª rodada a 100 usuários falhou e continua no relatório. O teste passou a contar falhas de transporte e foi repetido: a repetição passou. No IP institucional, o limite de 500 por minuto agiu exatamente como configurado.',
    items: [
      ['Dois bancos reais nos testes', 'Testcontainers roda a integração contra PostgreSQL e MySQL. Compilar não basta como prova de portabilidade.'],
      ['Arquitetura testada', 'O ArchUnit quebra o build se o domínio passar a depender de framework.'],
      ['Restauração ensaiada', 'Backup restaurado num contêiner isolado, sem rede, com as contagens conferidas antes e depois.'],
      ['Segurança com checklist', 'OWASP ASVS 5.0 adaptado, com a evidência de cada item, e modelo de ameaças documentado.'],
      ['Achados de segurança com registro', '11 achados de auditoria corrigidos e documentados. Os que seguem abertos ficam listados com o risco e o motivo.'],
      ['Frontend e acessibilidade', 'Vitest e Playwright, revisão em 390 px e 320 px, e o widget oficial do VLibras.'],
    ],
  },
  result: {
    statement: ['Em produção na Asces-Unita.', 'Candidatos consultam local de prova e resultado sem que o CPF saia da API.'],
    liveLabel: 'Etapas no ar, nesta ordem',
    live: [
      '1 · consulta do local de prova',
      '2 · gabarito oficial e PDF da prova',
      '3 · resultado com notas, situação e classificação (atual)',
      'orientação de matrícula conforme a situação',
      'painel: importação validada e etapas com horário',
    ],
    deploy:
      'A equipe de infraestrutura entregou o servidor Linux. Preparei o projeto no servidor, subi os contêineres e fiz a manutenção e o suporte durante cada etapa.',
    othersLabel: 'Outros sistemas na mesma instituição',
    others: {
      bolsa: ['Bolsa Social', '99,88%', 'de execuções sem erro, em mais de 6.000 no período de inscrições. Google Apps Script, sem servidor para manter.'],
      dspace: ['DSpace', '5 → 10', 'Migração do repositório institucional: base PostgreSQL, Docker Compose próprio e frontend da instituição, com manutenção contínua.'],
      cipa: ['Eleições da CIPA', 'Da inscrição ao boletim de urna', 'Inscrição, eleitorado, apuração e auditoria em Google Apps Script.'],
    },
  },
  next: {
    planned: 'previsto',
    items: [
      ['Carga na infraestrutura real', 'Os perfis de 2.000 e 3.000 usuários e o teste de duas horas já estão no script; falta rodar no servidor de produção.'],
      ['Integração contínua', 'Levar para o CI os testes que hoje rodam antes de cada versão.'],
    ],
    stackLabel: 'Stack',
    stack: ['Java 21', 'Spring Boot 3', 'Spring Security', 'PostgreSQL 17', 'MySQL 8.4', 'Redis 8', 'Flyway', 'React 19', 'TypeScript', 'Testcontainers', 'ArchUnit', 'Playwright', 'k6', 'Google Apps Script'],
  },
  nextCase: {
    kicker: 'Voltar ao primeiro estudo de caso',
    number: '01',
    title: 'Plataforma MCP multi-tenant',
    statement: ['A empresa vem do token.', 'Nunca da pergunta.'],
    cta: 'Ler estudo de caso',
    href: '/casos/plataforma-mcp/',
    theme: 'dark',
  },
}

const en = {
  meta: {
    title: 'Asces-Unita systems · Case study · Ezequiel Nascimento',
    description:
      'Vestibular Portal: exam location and result lookup by ID number (CPF), with HMAC, Redis rate limits, hexagonal architecture and load tests with zero ID numbers exposed.',
  },
  back: 'Back to projects',
  counter: 'Case study · 03 of 03',
  number: '03',
  title: 'Asces-Unita systems',
  meta_line: 'Asces-Unita · Jul 2025 – present · Vestibular Portal in production',
  statement: ['The ID number never shows up in the URL,', 'the logs or the metrics.'],
  lead:
    'Systems for a university center, focused on the Vestibular Portal: applicants look up their exam location and result with only their ID number (CPF) and birth date, and the CPF is protected at every layer.',
  facts: [
    { label: 'Role', value: 'Built the whole system, deployment and support' },
    { label: 'Period', value: 'Jul 2025 – present' },
    { label: 'Status', value: 'In production since Oct 2026, now in the result phase', live: true },
    { label: 'Stack', value: 'Java 21 · Spring Boot 3 · React 19 · PostgreSQL 17 · Redis 8' },
  ],
  metrics: [
    { value: '0 CPFs', label: 'exposed in more than 118,000 load-test checks', accent: true },
    { value: '186 req/s', label: 'at 100 virtual users, p95 of 195 ms (local environment)' },
    { value: '3 limits', label: 'on attempts in Redis: per IP, per CPF and global' },
    { value: '99.88%', label: 'error-free executions in the Social Scholarship app, out of 6,000+' },
  ],
  tocLabel: 'In this case',
  sections: {
    contexto: 'Context',
    problema: 'Problem',
    cpf: 'The CPF’s path',
    decisoes: 'Decisions',
    arquitetura: 'Architecture',
    testes: 'Tests and evidence',
    resultado: 'Result',
    proximos: 'Next steps',
  },
  tocShort: { cpf: 'The CPF’s path' },
  context: [
    'Asces-Unita is a university center in Caruaru, Brazil, with more than 60 years of history. There I build the institution’s systems: the Vestibular Portal, the DSpace repository migration and the Social Scholarship application, among others.',
    'For the entrance exam, a base of up to 5,000 applicants looks up their exam location and, later, their result. There is no account and no password: the applicant enters their CPF (Brazil’s taxpayer ID) and birth date. The CPF is the access key, so it is the data that needs the most protection.',
  ],
  problem: [
    { label: 'Enumeration', text: 'Without a password, a bot can try CPFs in sequence to find out who registered and where they take the exam.' },
    { label: 'Personal data', text: 'The CPF must not leak into a URL, log, metric, cache or Redis key.' },
    { label: 'Peaks on one network', text: 'Everyone checks in the same window, often from the institution’s own network, behind the same IP.' },
  ],
  cpf: {
    intro: 'From the form to the logs, the CPF goes through five points. It is exposed in none of them.',
    steps: [
      ['1 · Request', 'Only in a POST body.', 'Never in the URL or in browser storage. JSON is capped at 16 KiB, and the proxy also caps the body.'],
      ['2 · Rate limit', 'The Redis key is an HMAC.', 'The per-CPF counter uses the keyed digest, never the number.'],
      ['3 · Database', 'Lookup by HMAC-SHA-256.', 'The key lives outside the repository, and the database never stores the CPF in plain text.'],
      ['4 · Response', 'The same for any error.', 'Invalid CPF, wrong date or no registration: same message and status. No caching, no CPF in the response.'],
      ['5 · Logs', 'No body, no CPF.', 'The correlation ID only accepts a UUID: a CPF-like value is replaced before it reaches the log.'],
    ],
    limits: {
      label: 'Public lookup rate limits',
      title: 'limits per 60 s window · Redis shared across replicas',
      tag: 'over the limit: 429 + Retry-After',
      items: [
        ['500', 'per IP · high for shared networks'],
        ['5', 'per CPF · applies across every IP', true],
        ['3,000', 'global · protects total capacity'],
      ],
      unit: '/min',
    },
  },
  decisions: {
    intro: 'Recorded as ADRs in the repository: the decision, the alternative left out and the reason.',
    labels: ['Decision', 'Rejected alternative', 'Why'],
    rows: [
      ['Hexagonal modular monolith, with the dependency rule enforced by ArchUnit.', 'Microservices from day one.', 'The domain is still small. Business rules do not depend on Spring, HTTP, JPA or Redis, and a test fails if anyone inverts a dependency.'],
      ['Rate limits in Redis, shared across replicas, at three levels.', 'An in-memory counter in each instance.', 'With several replicas, only a shared counter is consistent. And the per-CPF limit stops enumeration even from many IPs.'],
      ['If Redis goes down, the lookup fails (fail closed).', 'Keep answering without limits.', 'Better unavailable for a few minutes than open to enumeration. Changing this requires a new threat review.'],
      ['PostgreSQL and MySQL supported, both tested with Testcontainers.', 'Tying the app to a single database.', 'The institution’s infrastructure offers MySQL. The domain does not change, and both integration suites gate every release.'],
      ['Admin panel in separate services: its own API, frontend and Redis.', 'Admin routes inside the public API.', 'The public API has no admin routes. The panel reaches the database with three credentials, each with the bare minimum: import applicants, import results and publish.'],
      ['Two-step imports: validate without writing, then confirm in one transaction.', 'Writing the file straight in, row by row.', 'Errors show up per row before the database is touched. Resending the same file duplicates nothing, and the receipt keeps the SHA-256, never the CPF.'],
      ['A published result replaces the location; if it is missing, the answer is "unavailable".', 'Falling back to the location when there is no result.', 'Stale information could mislead the applicant. Location and result are published independently.'],
    ],
  },
  architecture: {
    steps: [
      'The domain sits at the center, with no Spring, HTTP, JPA or Redis. Adapters depend on it, never the other way around.',
      'Separate contexts: applicant, exam, location, access and result.',
      'One parameterized query picks the visible phase (result before location). Scores are only read once the result is published.',
      'The API is not exposed to the internet: only the proxy reaches it, and the health port is internal.',
      'The admin panel lives at another address, with its own API, accounts database and Redis. Publishing each phase has a time window, a lock against concurrent edits and an audit trail.',
    ],
    diagramLabel:
      'Diagram: the applicant reaches the reverse proxy over HTTPS, which forwards through the private network to the public Spring Boot API. The API checks Redis for rate limits and PostgreSQL by HMAC key, with no plain-text CPF.',
    nodes: {
      client: ['Applicant', 'React 19, only CPF and birth date'],
      proxy: ['Reverse proxy', 'TLS and request body limit'],
      platform: ['Public API · Spring Boot 3', 'hexagonal domain', 'deny by default', 'same answer for any error'],
      source: ['Redis 8', 'limits per IP, CPF and global'],
      db: ['PostgreSQL 17', 'HMAC lookup, no plain-text CPF'],
    },
    links: ['HTTPS · POST', 'private network'],
  },
  tests: {
    intro:
      'Load tests with k6 in a resource-capped local environment (1 CPU for the API, 1 CPU for the database) with 5,000 fictional applicants. Every request also checks that no CPF came back in the response.',
    tableLabel: 'Load test runs',
    head: ['Run', 'Responses', 'Throughput', 'p95', 'Failures', 'CPF exposed'],
    rows: [
      ['50 users', '15,881', '158.6 req/s', '16.9 ms', '0', '0'],
      ['100 users · 1st run', '8,119', '81.1 req/s', '600.7 ms', '414 (5.1%)', '0', 'warn'],
      ['100 users · repeat', '18,640', '186.2 req/s', '195.0 ms', '0', '0'],
      ['Institutional IP · 50 req/s', '500 × 200 and 2,500 × 429', '49.9 req/s', '11.6 ms', '0', '0'],
    ],
    note: 'The 1st run at 100 users failed and stays in the report. The test was changed to count transport failures and run again: the repeat passed. On the institutional IP, the 500-per-minute limit behaved exactly as configured.',
    items: [
      ['Two real databases in tests', 'Testcontainers runs the integration suite against PostgreSQL and MySQL. Compiling is not proof of portability.'],
      ['Tested architecture', 'ArchUnit breaks the build if the domain starts depending on a framework.'],
      ['Rehearsed restore', 'A backup restored into an isolated container with no network, with record counts checked before and after.'],
      ['Security checklist', 'A tailored OWASP ASVS 5.0 with evidence for each item, plus a documented threat model.'],
      ['Tracked security findings', '11 audit findings fixed and documented. The ones still open are listed with their risk and reason.'],
      ['Frontend and accessibility', 'Vitest and Playwright, reviews at 390 px and 320 px, and the official VLibras (sign language) widget.'],
    ],
  },
  result: {
    statement: ['In production at Asces-Unita.', 'Applicants look up their exam location and result without the CPF ever leaving the API.'],
    liveLabel: 'Phases released, in this order',
    live: [
      '1 · exam location lookup',
      '2 · official answer key and exam PDF',
      '3 · result with scores, status and ranking (current)',
      'enrollment guidance based on the status',
      'admin: validated imports and timed phases',
    ],
    deploy:
      'The infrastructure team handed over the Linux server. I prepared the project on the server, brought up the containers and handled maintenance and support through each phase.',
    othersLabel: 'Other systems at the same institution',
    others: {
      bolsa: ['Social Scholarship', '99.88%', 'error-free executions, out of more than 6,000 during the application period. Google Apps Script, with no server to maintain.'],
      dspace: ['DSpace', '5 → 10', 'Migration of the institutional repository: PostgreSQL database, a custom Docker Compose setup and the institution’s own frontend, with ongoing maintenance.'],
      cipa: ['Safety committee elections', 'From sign-up to the ballot report', 'Sign-up, voter roll, counting and audit in Google Apps Script.'],
    },
  },
  next: {
    planned: 'planned',
    items: [
      ['Load on the real infrastructure', 'The 2,000- and 3,000-user profiles and the two-hour soak test are already in the script; they still need to run on the production server.'],
      ['Continuous integration', 'Move the tests that now run before each release into CI.'],
    ],
    stackLabel: 'Stack',
    stack: ['Java 21', 'Spring Boot 3', 'Spring Security', 'PostgreSQL 17', 'MySQL 8.4', 'Redis 8', 'Flyway', 'React 19', 'TypeScript', 'Testcontainers', 'ArchUnit', 'Playwright', 'k6', 'Google Apps Script'],
  },
  nextCase: {
    kicker: 'Back to the first case study',
    number: '01',
    title: 'Multi-tenant MCP platform',
    statement: ['The company comes from the token.', 'Never from the question.'],
    cta: 'Read case study',
    href: '/casos/plataforma-mcp/',
    theme: 'dark',
  },
}

const fallbackNotice = {
  es: 'Este estudio de caso está disponible en inglés y portugués.',
  fr: 'Cette étude de cas est disponible en anglais et en portugais.',
}

export function ascesUnita(lang) {
  if (lang === 'pt') return { ...pt, lang: 'pt' }
  if (lang === 'en') return { ...en, lang: 'en' }
  return { ...en, lang: 'en', notice: fallbackNotice[lang] }
}
