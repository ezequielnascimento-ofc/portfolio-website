// Estudo de caso 01 · Plataforma MCP multi-tenant.
// Fonte: docs/kb/projetos/proj-plugin-mcp-gateway.md (versão pública).
// Design aprovado em 2026-11-14 no canvas "Portfolio Ezequiel · Estudos de caso".
// Idiomas: PT e EN. ES e FR mostram o texto em EN, com um aviso (plano EC3).

const pt = {
  meta: {
    title: 'Plataforma MCP multi-tenant · Estudo de caso · Ezequiel Nascimento',
    description:
      'Servidor MCP remoto com OAuth e isolamento por empresa, que leva dados de atendimento ao Claude sem expor dados pessoais.',
  },
  back: 'Voltar aos projetos',
  counter: 'Estudo de caso · 01 de 03',
  number: '01',
  title: 'Plataforma MCP multi-tenant',
  meta_line: 'Plugin IA · out/2026 – atual · em produção',
  statement: ['A empresa vem do token.', 'Nunca da pergunta.'],
  lead:
    'Um servidor MCP remoto que deixa gestores perguntarem ao Claude como vai o atendimento da empresa, sem expor dados pessoais e sem que uma empresa veja os dados de outra.',
  facts: [
    { label: 'Papel', value: 'Arquitetura e desenvolvimento' },
    { label: 'Período', value: 'out/2026 – atual' },
    { label: 'Status', value: 'Em produção desde nov/2026', live: true },
    { label: 'Stack', value: 'Node.js · MCP · OAuth · PostgreSQL · Docker' },
  ],
  metrics: [
    { value: '≥90%', label: 'menos recursos reservados que um servidor por empresa, na projeção para 10 empresas', accent: true },
    { value: '12', label: 'ferramentas versionadas' },
    { value: '2', label: 'contêineres' },
    { value: '~64 MB', label: 'de memória em produção' },
  ],
  tocLabel: 'Neste caso',
  sections: {
    contexto: 'Contexto',
    problema: 'Problema',
    ferramentas: 'Ferramentas a partir de perguntas',
    decisoes: 'Decisões',
    arquitetura: 'Arquitetura',
    seguranca: 'Segurança e qualidade',
    resultado: 'Resultado',
    proximos: 'Próximos passos',
  },
  tocShort: { ferramentas: 'Ferramentas' },
  context: [
    'A Plugin IA mantém uma plataforma de atendimento usada por mais de 10 empresas, em três segmentos: contábil, comercial e provedores de internet. Os gestores dessas empresas já tinham os dados do atendimento, mas só em telas e relatórios.',
    'A proposta: levar esses dados ao Claude por um servidor MCP, para que o gestor pergunte em linguagem natural e receba a resposta com os números da própria empresa.',
  ],
  problem: [
    { label: 'Pergunta', text: 'O gestor quer perguntar “como foi a semana?” ou “onde perdemos clientes?” e receber a resposta com os números da empresa dele.' },
    { label: 'Privacidade', text: 'Telefone, documento e conversa de cliente não podem chegar ao modelo sem necessidade.' },
    { label: 'Isolamento', text: 'Uma empresa nunca vê os dados de outra: nem por engano, nem por injeção de prompt.' },
  ],
  tools: {
    intro: 'Em vez de expor tabelas para o modelo montar a consulta, cada ferramenta responde a uma pergunta que um gestor faz.',
    tableLabel: 'Pergunta do gestor e o que a ferramenta devolve',
    head: ['Pergunta do gestor', 'O que a ferramenta devolve'],
    rows: [
      ['“O que eu faço esta semana?”', 'Resumo executivo: os três pontos principais, comparados ao período anterior.'],
      ['“Quando os clientes nos procuram?”', 'Demanda por dia, dia da semana e hora, com os horários de pico.'],
      ['“Como está a equipe?”', 'Indicadores por atendente, lado a lado.'],
      ['“Onde perdemos clientes?”', 'Quem ficou sem atendimento ou sem resposta.'],
      ['“Resolvemos de primeira?”', 'Clientes que voltaram em 24 h e em 72 h, e atendimentos reabertos.'],
      ['“Como foi o atendimento de X?”', 'Histórico em resumo ou em detalhe, com os dados pessoais mascarados.'],
    ],
    note: '12 ferramentas, cada uma com versão semântica própria · cada empresa recebe só as do seu pacote',
  },
  decisions: {
    intro: 'Cada decisão, a alternativa que ficou de fora e o motivo.',
    labels: ['Decisão', 'Alternativa descartada', 'Por quê'],
    rows: [
      ['A empresa sai sempre do token OAuth.', 'Receber a empresa como parâmetro da ferramenta.', 'Nem o usuário nem o modelo, por injeção de prompt, conseguem trocar de empresa.'],
      ['Um núcleo único para todas as empresas.', 'Um servidor por empresa.', 'Na projeção para 10 empresas, reserva pelo menos 90% menos recursos. E uma correção no núcleo chega a todas ao mesmo tempo.'],
      ['Ferramentas desenhadas a partir de perguntas de gestor.', 'Expor tabelas e endpoints para o modelo montar a consulta.', 'O modelo recebe uma resposta pronta e pequena, no formato definido para cada ferramenta.'],
      ['Acesso ao sistema da empresa só por API e só leitura.', 'Ler direto do banco de produção da empresa.', 'O MCP não toca no banco da empresa e não consegue alterar nada.'],
      ['Saída mínima: dados pessoais e texto livre ficam fora.', 'Devolver os registros completos e deixar o modelo filtrar.', 'O modelo recebe só o que a pergunta precisa, como pede a LGPD.'],
      ['Um pacote de configuração por empresa.', 'Uma cópia do código para cada cliente.', 'Endpoint, ferramentas habilitadas e identidade visual mudam por configuração; o código continua um só.'],
    ],
  },
  architecture: {
    steps: [
      'Cada empresa tem o próprio endpoint, cadastrado no Claude como conector personalizado. Funciona até no plano gratuito.',
      'O acesso é autorizado por OAuth, numa tela de consentimento com a marca da empresa e o login do próprio sistema de atendimento.',
      'A plataforma identifica a empresa pelo token e oferece só as ferramentas do pacote dela.',
      'Os dados vêm do sistema da empresa por API, só leitura. Sessões, tokens e o registro de consultas ficam num PostgreSQL próprio.',
    ],
    diagramLabel:
      'Diagrama: o gestor no Claude se conecta por HTTPS, MCP e OAuth a um proxy reverso, que encaminha pelo endpoint da empresa para a Plataforma MCP. A plataforma lê o sistema da empresa só por API e só leitura, e guarda sessões, tokens e auditoria num PostgreSQL.',
    nodes: {
      client: ['Gestor no Claude', 'conector personalizado da empresa'],
      proxy: ['Proxy reverso', 'TLS e roteamento por endpoint'],
      platform: ['Plataforma MCP', 'empresa derivada do token', 'ferramentas do pacote da empresa', 'saída mínima, sem dados pessoais'],
      source: ['Sistema da empresa', 'só API, só leitura'],
      db: ['PostgreSQL', 'sessões, tokens e auditoria'],
    },
    links: ['HTTPS · MCP · OAuth', '/<empresa>/mcp'],
  },
  security: {
    items: [
      ['Menor privilégio', 'Só coordenadores e administradores podem conectar a empresa ao Claude.'],
      ['Dados mascarados', 'Telefone, documento, conversa e texto livre ficam fora das análises, e as listas têm limite. A única exceção, o detalhe do atendimento, mostra trechos com o telefone mascarado, por decisão registrada.'],
      ['Trava de produção', 'A suíte de testes só deixa ir para produção as empresas aprovadas.'],
      ['Rede restrita', 'O conector só aceita conexões vindas da rede da Anthropic, conferido por um script de segurança.'],
      ['Auditoria e decisões registradas', 'Fica registrado quem perguntou o quê. Cada decisão de arquitetura e cada pendência são numeradas.'],
    ],
    code: {
      label: 'Exemplo de chamada de ferramenta, com dados fictícios',
      status: 'chamada de ferramenta',
      tag: 'dados fictícios',
      lines: [
        ['empresa', 'derivada do token OAuth'],
        ['acesso', 'somente leitura · por API'],
        ['saída', 'sem telefone, documento ou texto livre'],
      ],
    },
  },
  result: {
    statement: ['Em produção desde nov/2026.', 'Coordenadores consultam os indicadores do atendimento direto no Claude.'],
    metrics: [
      { value: '9', label: 'coordenadores com acesso na primeira empresa', accent: true },
      { value: '10 de 12', label: 'ferramentas habilitadas para ela' },
      { value: '10+', label: 'empresas na plataforma de atendimento' },
    ],
    note: 'O MCP está em produção com 1 empresa; a plataforma de atendimento atende mais de 10. Indicadores de uso entram aqui quando houver um mês completo de dados.',
  },
  next: {
    planned: 'previsto',
    items: [
      ['Outros clientes de IA', 'Cada empresa poderá escolher o seu cliente de IA, com a mesma segurança. Hoje, o suporte é ao Claude.'],
      ['Gestão de IA', 'Chave de IA da própria empresa (BYOK), troca de provedor em caso de falha e controle de custos.'],
    ],
    stackLabel: 'Stack',
    stack: ['Node.js', 'JavaScript com JSDoc', 'MCP sobre HTTP', 'OAuth', 'PostgreSQL', 'Docker', 'Linux', 'Testes unitários', 'Claude Code'],
  },
  nextCase: {
    kicker: 'Próximo estudo de caso · em breve',
    number: '02',
    title: 'Agenda Perto',
    statement: ['Um filtro esquecido no código', 'não vaza dados.'],
    cta: 'Ver todos os projetos',
  },
}

const en = {
  meta: {
    title: 'Multi-tenant MCP platform · Case study · Ezequiel Nascimento',
    description:
      'A remote MCP server with OAuth and per-company isolation that brings customer-service data into Claude without exposing personal data.',
  },
  back: 'Back to projects',
  counter: 'Case study · 01 of 03',
  number: '01',
  title: 'Multi-tenant MCP platform',
  meta_line: 'Plugin IA · Oct 2026 – present · in production',
  statement: ['The company comes from the token.', 'Never from the question.'],
  lead:
    'A remote MCP server that lets managers ask Claude how their company’s customer service is doing, without exposing personal data and without one company ever seeing another’s data.',
  facts: [
    { label: 'Role', value: 'Architecture and development' },
    { label: 'Period', value: 'Oct 2026 – present' },
    { label: 'Status', value: 'In production since Nov 2026', live: true },
    { label: 'Stack', value: 'Node.js · MCP · OAuth · PostgreSQL · Docker' },
  ],
  metrics: [
    { value: '≥90%', label: 'fewer reserved resources than one server per company, projected for 10 companies', accent: true },
    { value: '12', label: 'versioned tools' },
    { value: '2', label: 'containers' },
    { value: '~64 MB', label: 'of memory in production' },
  ],
  tocLabel: 'In this case',
  sections: {
    contexto: 'Context',
    problema: 'Problem',
    ferramentas: 'Tools built from questions',
    decisoes: 'Decisions',
    arquitetura: 'Architecture',
    seguranca: 'Security and quality',
    resultado: 'Result',
    proximos: 'Next steps',
  },
  tocShort: { ferramentas: 'Tools' },
  context: [
    'Plugin IA runs a customer-service platform used by more than 10 companies in three segments: accounting, retail and internet providers. Their managers already had the service data, but only in screens and reports.',
    'The idea: bring that data into Claude through an MCP server, so a manager can ask in plain language and get the answer with their own company’s numbers.',
  ],
  problem: [
    { label: 'Question', text: 'A manager wants to ask “how did this week go?” or “where are we losing customers?” and get the answer with their company’s numbers.' },
    { label: 'Privacy', text: 'Phone numbers, ID documents and customer conversations must not reach the model unless needed.' },
    { label: 'Isolation', text: 'A company never sees another company’s data: not by mistake, not through prompt injection.' },
  ],
  tools: {
    intro: 'Instead of exposing tables for the model to build its own query, each tool answers a question a manager actually asks.',
    tableLabel: 'Manager’s question and what the tool returns',
    head: ['Manager’s question', 'What the tool returns'],
    rows: [
      ['“What should I focus on this week?”', 'Executive summary: the three main points, compared with the previous period.'],
      ['“When do customers reach out?”', 'Demand by day, weekday and hour, with the peak times.'],
      ['“How is the team doing?”', 'Indicators per agent, side by side.'],
      ['“Where are we losing customers?”', 'Who was left without service or without a reply.'],
      ['“Do we solve it the first time?”', 'Customers who came back within 24 h and 72 h, and reopened tickets.'],
      ['“How was X’s service?”', 'History as a summary or in detail, with personal data masked.'],
    ],
    note: '12 tools, each with its own semantic version · each company gets only the tools in its package',
  },
  decisions: {
    intro: 'Each decision, the alternative left out and the reason.',
    labels: ['Decision', 'Rejected alternative', 'Why'],
    rows: [
      ['The company always comes from the OAuth token.', 'Passing the company as a tool parameter.', 'Neither the user nor the model, through prompt injection, can switch companies.'],
      ['One core for every company.', 'One server per company.', 'Projected for 10 companies, it reserves at least 90% fewer resources. And a fix in the core reaches every company at once.'],
      ['Tools designed from managers’ questions.', 'Exposing tables and endpoints for the model to build the query.', 'The model gets a small, ready answer, in a format defined for each tool.'],
      ['Read-only access to the company’s system, through its API only.', 'Reading straight from the company’s production database.', 'The MCP never touches the company’s database and cannot change anything.'],
      ['Minimal output: personal data and free text stay out.', 'Returning full records and letting the model filter them.', 'The model gets only what the question needs, as LGPD (Brazil’s data protection law) requires.'],
      ['One configuration package per company.', 'A copy of the code for each client.', 'Endpoint, enabled tools and branding change through configuration; the code stays one.'],
    ],
  },
  architecture: {
    steps: [
      'Each company has its own endpoint, added to Claude as a custom connector. It works even on the free plan.',
      'Access is authorized through OAuth, on a consent screen with the company’s branding and the login of its own customer-service system.',
      'The platform identifies the company from the token and offers only the tools in its package.',
      'Data comes from the company’s system through its API, read-only. Sessions, tokens and the query log live in a dedicated PostgreSQL database.',
    ],
    diagramLabel:
      'Diagram: the manager in Claude connects over HTTPS, MCP and OAuth to a reverse proxy, which routes through the company’s endpoint to the MCP platform. The platform reads the company’s system through its API only, read-only, and stores sessions, tokens and audit data in PostgreSQL.',
    nodes: {
      client: ['Manager in Claude', 'the company’s custom connector'],
      proxy: ['Reverse proxy', 'TLS and routing by endpoint'],
      platform: ['MCP platform', 'company derived from the token', 'tools from the company’s package', 'minimal output, no personal data'],
      source: ['Company system', 'API only, read-only'],
      db: ['PostgreSQL', 'sessions, tokens and audit'],
    },
    links: ['HTTPS · MCP · OAuth', '/<company>/mcp'],
  },
  security: {
    items: [
      ['Least privilege', 'Only coordinators and admins can connect their company to Claude.'],
      ['Masked data', 'Phone numbers, ID documents, conversations and free text stay out of the analyses, and lists are capped. The only exception, the ticket detail, shows excerpts with the phone number masked, by a recorded decision.'],
      ['Production lock', 'The test suite only lets approved companies go to production.'],
      ['Restricted network', 'The connector only accepts connections from Anthropic’s network, checked by a security script.'],
      ['Audit and recorded decisions', 'Who asked what is logged. Every architecture decision and open item is numbered.'],
    ],
    code: {
      label: 'Example tool call, with fictional data',
      status: 'tool call',
      tag: 'fictional data',
      lines: [
        ['company', 'derived from the OAuth token'],
        ['access', 'read-only · through the API'],
        ['output', 'no phone, ID or free text'],
      ],
    },
  },
  result: {
    statement: ['In production since Nov 2026.', 'Coordinators check customer-service indicators right inside Claude.'],
    metrics: [
      { value: '9', label: 'coordinators with access at the first company', accent: true },
      { value: '10 of 12', label: 'tools enabled for it' },
      { value: '10+', label: 'companies on the customer-service platform' },
    ],
    note: 'The MCP is in production with 1 company; the customer-service platform serves more than 10. Usage indicators will be added once there is a full month of data.',
  },
  next: {
    planned: 'planned',
    items: [
      ['Other AI clients', 'Each company will be able to choose its AI client, with the same security. Today, Claude is supported.'],
      ['AI management', 'The company’s own AI key (BYOK), provider failover and cost control.'],
    ],
    stackLabel: 'Stack',
    stack: ['Node.js', 'JavaScript with JSDoc', 'MCP over HTTP', 'OAuth', 'PostgreSQL', 'Docker', 'Linux', 'Unit tests', 'Claude Code'],
  },
  nextCase: {
    kicker: 'Next case study · coming soon',
    number: '02',
    title: 'Agenda Perto',
    statement: ['A filter forgotten in the code', 'doesn’t leak data.'],
    cta: 'See all projects',
  },
}

const fallbackNotice = {
  es: 'Este estudio de caso está disponible en inglés y portugués.',
  fr: 'Cette étude de cas est disponible en anglais et en portugais.',
}

export function plataformaMcp(lang) {
  if (lang === 'pt') return { ...pt, lang: 'pt' }
  if (lang === 'en') return { ...en, lang: 'en' }
  return { ...en, lang: 'en', notice: fallbackNotice[lang] }
}
