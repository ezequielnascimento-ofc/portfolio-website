// Estudo de caso 02 · Agenda Perto.
// Fonte: docs/kb/projetos/proj-perto-agenda.md (versão pública), a partir do repositório
// agenda.pertoplataforma.com.br (README, ARCHITECTURE, SECURITY, ADR-001 a 005, docs/deployment, workflows).
// Design aprovado em 2026-11-15 no canvas "Portfolio Ezequiel · Estudos de caso".

const policySql = [
  ['kw', 'alter table'], ['', ' activity '], ['kw', 'force row level security'], ['', ';\n\n'],
  ['kw', 'create policy'], ['', ' activity_tenant_isolation '], ['kw', 'on'], ['', ' activity\n  '],
  ['kw', 'using'], ['', " (tenant_id = nullif(current_setting("], ['str', "'app.current_tenant'"], ['', ', true), '], ['str', "''"], ['', ')::uuid)\n  '],
  ['kw', 'with check'], ['', " (tenant_id = nullif(current_setting("], ['str', "'app.current_tenant'"], ['', ', true), '], ['str', "''"], ['', ')::uuid);'],
]

const pt = {
  meta: {
    title: 'Agenda Perto · Estudo de caso · Ezequiel Nascimento',
    description:
      'SaaS de acompanhamento infantil em que o próprio PostgreSQL isola cada cliente com Row-Level Security, com pipeline de CI/CD, varreduras de segurança e rollback automático.',
  },
  back: 'Voltar aos projetos',
  counter: 'Estudo de caso · 02 de 03',
  number: '02',
  title: 'Agenda Perto',
  meta_line: 'Perto Plataforma · set/2026 – atual · em produção com o primeiro cliente',
  statement: ['Um filtro esquecido no código', 'não vaza dados.'],
  lead:
    'Um SaaS de acompanhamento infantil: a equipe registra a rotina da criança e a família acompanha pelo celular. Cada espaço de educação infantil é um cliente, e o próprio banco garante que um não veja os dados do outro.',
  facts: [
    { label: 'Papel', value: 'Arquitetura, backend, frontend, banco, infraestrutura e pipeline' },
    { label: 'Período', value: 'set/2026 – atual' },
    { label: 'Status', value: 'Em produção com o primeiro cliente', live: true },
    { label: 'Stack', value: 'Java 21 · Spring Boot 4 · Angular 22 · PostgreSQL 16' },
  ],
  metrics: [
    { value: '3 camadas', label: 'de isolamento entre clientes: aplicação, ORM e banco', accent: true },
    { value: '13', label: 'verificações obrigatórias em cada pull request' },
    { value: '24', label: 'versões publicadas em cinco semanas' },
    { value: '0', label: 'portas web abertas no servidor' },
  ],
  tocLabel: 'Neste caso',
  sections: {
    contexto: 'Contexto',
    problema: 'Problema',
    isolamento: 'Isolamento em três camadas',
    decisoes: 'Decisões',
    arquitetura: 'Arquitetura',
    pipeline: 'Pipeline e segurança',
    resultado: 'Resultado',
    proximos: 'Próximos passos',
  },
  tocShort: { isolamento: 'Isolamento' },
  context: [
    'A Perto Plataforma conecta espaços de educação infantil, como hotelzinhos e creches, às famílias. A equipe registra presença, rotina, ocorrências e remédios; os responsáveis acompanham o dia da criança pelo celular e recebem avisos mesmo com o app fechado.',
    'São quatro perfis: o operador da plataforma, a gestora do espaço, as colaboradoras e os responsáveis. Cada um vê só o que o papel e o vínculo permitem.',
  ],
  problem: [
    { label: 'Dados sensíveis', text: 'Rotina, alergias, remédios e ocorrências de crianças: dados que pedem cuidado redobrado pela LGPD.' },
    { label: 'Vários clientes, um banco', text: 'Todos os espaços ficam no mesmo banco. Um erro de código não pode mostrar a criança de um espaço para outro.' },
    { label: 'Entrega contínua', text: 'Publicar versões com frequência sem perder dados, e voltar rápido se algo der errado.' },
  ],
  isolation: {
    intro: 'Cada camada sozinha já isola os espaços. Juntas, uma falha em qualquer uma delas ainda é barrada pela seguinte.',
    layers: [
      ['Camada 1 · Aplicação', 'O espaço vem do token, nunca de um cabeçalho.', 'A API não recebe o espaço na URL. O contexto é preenchido a partir da identidade autenticada.'],
      ['Camada 2 · ORM', 'Um filtro global aplica o espaço em toda consulta.', 'O filtro do Hibernate entra em todas as leituras, sem depender de cada consulta lembrar dele.'],
      ['Camada 3 · PostgreSQL', 'Row-Level Security barra qualquer linha de outro espaço.', 'RLS com FORCE em todas as tabelas, e a aplicação conecta com um papel sem privilégios, sempre sujeito à política.'],
    ],
    code: {
      label: 'Política de isolamento de uma tabela, como está nas migrações',
      title: 'migração Flyway · tabela activity',
      tag: 'sem espaço na transação = zero linhas',
      sql: policySql,
    },
    note: 'A única leitura entre espaços, achar o usuário pelo e-mail no login, passa por uma função de banco que devolve só o mínimo necessário.',
  },
  decisions: {
    intro: 'Registradas em ADRs no repositório: a decisão, a alternativa que ficou de fora e o motivo.',
    labels: ['Decisão', 'Alternativa descartada', 'Por quê'],
    rows: [
      ['Banco único, com o espaço em cada linha e RLS.', 'Um schema ou um banco por cliente.', 'Simples de operar num servidor só. Um espaço grande pode ir para um banco próprio depois, trocando o roteamento, sem reescrita.'],
      ['Monólito modular, um módulo por contexto de negócio.', 'Microsserviços.', 'Um time e um domínio coeso. Os módulos já nascem separados e podem ser extraídos quando houver motivo.'],
      ['Sessão em cookie HttpOnly, com proteção CSRF.', 'Token guardado no navegador, ao alcance do JavaScript.', 'Um script injetado (XSS) não consegue roubar a sessão. O custo é exigir o token CSRF nas alterações.'],
      ['Agenda e relatórios como leituras da rotina.', 'Tabelas próprias de agenda e de relatório.', 'Uma fonte de verdade só, sem cópias para manter sincronizadas.'],
      ['O público de cada comunicado sai dos vínculos reais da família.', 'Gravar a lista de destinatários a cada publicação.', 'Ninguém escolhe destinatário pelo navegador: a família só vê o que é do público dela.'],
      ['Deploy por recriação, com imagens baixadas antes e volta automática.', 'Blue/green.', 'Com um servidor e um banco, blue/green duplica a stack e complica as migrações. Assim, a janela fora do ar é só o reinício do backend.'],
    ],
  },
  architecture: {
    steps: [
      'O servidor não abre nenhuma porta web: o tráfego chega por um túnel do Cloudflare, que é uma conexão de saída. A entrada fica só no SSH por chave.',
      'O frontend Angular é servido por nginx. Backend e banco ficam numa rede interna, sem porta no host.',
      'O backend é organizado por contexto: crianças, rotina, presença, ocorrências, comunicação e relatórios.',
      'Os avisos às famílias saem por uma fila no próprio banco (transactional outbox) e chegam por Web Push, mesmo com o app fechado.',
    ],
    diagramLabel:
      'Diagrama: famílias e equipe acessam pelo Cloudflare, que chega ao servidor por um túnel de saída. Dentro do servidor, sem porta web aberta, o nginx serve o frontend e fala com o backend Spring Boot pela rede interna; o backend acessa o PostgreSQL com um papel restrito, e o banco aplica RLS em todas as tabelas.',
    nodes: [
      ['Famílias e equipe', 'celular e navegador (PWA)'],
      ['Cloudflare', 'TLS, WAF e Zero Trust'],
      ['Frontend · nginx', 'Angular 22, cabeçalhos e limites'],
      ['Backend · Spring Boot 4', 'monólito modular, espaço vindo do token'],
      ['PostgreSQL 16', 'RLS com FORCE em todas as tabelas'],
    ],
    links: ['HTTPS', 'túnel de saída', 'rede interna', 'papel restrito'],
    serverLabel: 'servidor · nenhuma porta web aberta',
  },
  pipeline: {
    flowLabel: 'Caminho de uma mudança até a produção',
    flow: ['pull request', '13 verificações', 'main', 'versão + imagens + SBOM', 'deploy manual', 'backup', 'migração', 'saúde + smoke', 'ou volta à última estável'],
    items: [
      ['Isolamento como portão', 'Os testes de isolamento rodam num job próprio, contra PostgreSQL real (Testcontainers), e são obrigatórios para o merge.'],
      ['Migração destrutiva com trava', 'Uma guarda no CI barra mudança destrutiva no banco; ela só passa com aprovação explícita e backup verificado.'],
      ['Varreduras em todo PR e toda semana', 'CodeQL, gitleaks, Trivy e npm audit. As Actions são fixadas pelo hash do commit.'],
      ['Autenticação', 'Senhas com Argon2id, refresh token rotativo e revogável, limite de tentativas no login e respostas que não revelam se o e-mail existe.'],
      ['Auditoria e LGPD', 'Ações críticas e exportações ficam registradas, e os logs não levam dados pessoais.'],
      ['IA com portões', 'O Claude Code trabalha em branches com pull request. Push na main, tags, releases e deploy ficam bloqueados para ele.'],
    ],
  },
  result: {
    statement: ['Em produção com o primeiro cliente.', 'Cada versão passa pelo mesmo portão antes de chegar às famílias.'],
    metrics: [
      { value: '1 mês', label: 'do primeiro commit à v1.0.0', accent: true },
      { value: '24', label: 'versões, da v1.0.0 à v1.7.1' },
      { value: '4', label: 'perfis, cada um com o seu escopo' },
    ],
    note: 'O nome do espaço em produção e os números de uso não são publicados.',
  },
  next: {
    planned: 'previsto',
    items: [
      ['Tempo real', 'Trocar a consulta periódica por eventos enviados pelo servidor (SSE), para a família ver o registro no momento em que ele acontece.'],
      ['Isolamento por unidade', 'Levar a RLS também ao nível da unidade, para redes com mais de um espaço.'],
    ],
    stackLabel: 'Stack',
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'PostgreSQL 16 · RLS', 'Flyway', 'Angular 22', 'Tailwind CSS v4', 'Docker', 'GitHub Actions', 'Testcontainers', 'Cloudflare Zero Trust', 'Claude Code'],
  },
  nextCase: {
    kicker: 'Próximo estudo de caso · em breve',
    number: '03',
    title: 'Sistemas da Asces-Unita',
    statement: ['O CPF nunca aparece na URL,', 'nos logs ou nas métricas.'],
    cta: 'Ver todos os projetos',
    href: '/#projetos',
    theme: 'dark',
  },
}

const en = {
  meta: {
    title: 'Agenda Perto · Case study · Ezequiel Nascimento',
    description:
      'A childcare SaaS where PostgreSQL itself isolates each client with Row-Level Security, with a CI/CD pipeline, security scans and automatic rollback.',
  },
  back: 'Back to projects',
  counter: 'Case study · 02 of 03',
  number: '02',
  title: 'Agenda Perto',
  meta_line: 'Perto Plataforma · Sep 2026 – present · in production with its first client',
  statement: ['A filter forgotten in the code', 'does not leak data.'],
  lead:
    'A childcare SaaS: staff log each child’s routine and families follow along on their phones. Every early-childhood center is a client, and the database itself guarantees that one never sees another’s data.',
  facts: [
    { label: 'Role', value: 'Architecture, backend, frontend, database, infrastructure and pipeline' },
    { label: 'Period', value: 'Sep 2026 – present' },
    { label: 'Status', value: 'In production with the first client', live: true },
    { label: 'Stack', value: 'Java 21 · Spring Boot 4 · Angular 22 · PostgreSQL 16' },
  ],
  metrics: [
    { value: '3 layers', label: 'of isolation between clients: application, ORM and database', accent: true },
    { value: '13', label: 'required checks on every pull request' },
    { value: '24', label: 'releases in five weeks' },
    { value: '0', label: 'web ports open on the server' },
  ],
  tocLabel: 'In this case',
  sections: {
    contexto: 'Context',
    problema: 'Problem',
    isolamento: 'Isolation in three layers',
    decisoes: 'Decisions',
    arquitetura: 'Architecture',
    pipeline: 'Pipeline and security',
    resultado: 'Result',
    proximos: 'Next steps',
  },
  tocShort: { isolamento: 'Isolation' },
  context: [
    'Perto Plataforma connects early-childhood centers, such as daycares and nurseries, with families. Staff log attendance, routine, incidents and medication; guardians follow the child’s day on their phones and get notified even with the app closed.',
    'There are four roles: the platform operator, the center’s manager, the staff and the guardians. Each one sees only what their role and relationship allow.',
  ],
  problem: [
    { label: 'Sensitive data', text: 'Children’s routines, allergies, medication and incidents: data that calls for extra care under LGPD (Brazil’s data protection law).' },
    { label: 'Many clients, one database', text: 'Every center lives in the same database. A bug must never show one center’s child to another.' },
    { label: 'Continuous delivery', text: 'Ship releases often without losing data, and roll back fast if something goes wrong.' },
  ],
  isolation: {
    intro: 'Each layer alone already isolates the centers. Together, a failure in any one of them is still stopped by the next.',
    layers: [
      ['Layer 1 · Application', 'The center comes from the token, never from a header.', 'The API never takes the center in the URL. The context is filled from the authenticated identity.'],
      ['Layer 2 · ORM', 'A global filter applies the center to every query.', 'The Hibernate filter applies to every read, without relying on each query to remember it.'],
      ['Layer 3 · PostgreSQL', 'Row-Level Security blocks any row from another center.', 'RLS with FORCE on every table, and the app connects with an unprivileged role that is always subject to the policy.'],
    ],
    code: {
      label: 'Isolation policy for one table, as it appears in the migrations',
      title: 'Flyway migration · activity table',
      tag: 'no center in the transaction = zero rows',
      sql: policySql,
    },
    note: 'The only cross-center read, finding the user by email at login, goes through a database function that returns only the bare minimum.',
  },
  decisions: {
    intro: 'Recorded as ADRs in the repository: the decision, the alternative left out and the reason.',
    labels: ['Decision', 'Rejected alternative', 'Why'],
    rows: [
      ['One shared database, with the center on every row and RLS.', 'A schema or a database per client.', 'Simple to run on a single server. A large center can move to its own database later by changing the routing, with no rewrite.'],
      ['Modular monolith, one module per business context.', 'Microservices.', 'One team and a cohesive domain. Modules are separated from day one and can be extracted when there is a reason.'],
      ['Session in an HttpOnly cookie, with CSRF protection.', 'A token stored in the browser, within JavaScript’s reach.', 'An injected script (XSS) cannot steal the session. The cost is requiring the CSRF token on writes.'],
      ['Agenda and reports as reads over the routine.', 'Separate agenda and report tables.', 'A single source of truth, with no copies to keep in sync.'],
      ['Each announcement’s audience comes from the family’s real relationships.', 'Saving the recipient list on every publication.', 'No one picks recipients from the browser: a family only sees what belongs to its audience.'],
      ['Recreate deployment, with images pulled first and automatic rollback.', 'Blue/green.', 'With one server and one database, blue/green duplicates the stack and complicates migrations. This way, downtime is just the backend restart.'],
    ],
  },
  architecture: {
    steps: [
      'The server opens no web ports: traffic arrives through a Cloudflare tunnel, which is an outbound connection. The only way in is SSH with a key.',
      'The Angular frontend is served by nginx. Backend and database live on an internal network, with no port on the host.',
      'The backend is organized by context: children, routine, attendance, incidents, communication and reports.',
      'Notifications to families go out through a queue in the database itself (transactional outbox) and arrive via Web Push, even with the app closed.',
    ],
    diagramLabel:
      'Diagram: families and staff reach Cloudflare, which connects to the server through an outbound tunnel. Inside the server, with no web port open, nginx serves the frontend and talks to the Spring Boot backend over the internal network; the backend reaches PostgreSQL with a restricted role, and the database applies RLS on every table.',
    nodes: [
      ['Families and staff', 'phone and browser (PWA)'],
      ['Cloudflare', 'TLS, WAF and Zero Trust'],
      ['Frontend · nginx', 'Angular 22, headers and limits'],
      ['Backend · Spring Boot 4', 'modular monolith, center from the token'],
      ['PostgreSQL 16', 'RLS with FORCE on every table'],
    ],
    links: ['HTTPS', 'outbound tunnel', 'internal network', 'restricted role'],
    serverLabel: 'server · no web port open',
  },
  pipeline: {
    flowLabel: 'How a change reaches production',
    flow: ['pull request', '13 checks', 'main', 'version + images + SBOM', 'manual deploy', 'backup', 'migration', 'health + smoke', 'or back to the last stable'],
    items: [
      ['Isolation as a gate', 'Isolation tests run in their own job, against a real PostgreSQL (Testcontainers), and are required to merge.'],
      ['Guarded destructive migrations', 'A CI guard blocks destructive database changes; they only pass with explicit approval and a verified backup.'],
      ['Scans on every PR and every week', 'CodeQL, gitleaks, Trivy and npm audit. Actions are pinned by commit hash.'],
      ['Authentication', 'Argon2id passwords, rotating and revocable refresh tokens, login rate limiting and responses that never reveal whether an email exists.'],
      ['Audit and LGPD', 'Critical actions and exports are logged, and logs carry no personal data.'],
      ['AI with gates', 'Claude Code works on branches through pull requests. Pushing to main, tags, releases and deploys are blocked for it.'],
    ],
  },
  result: {
    statement: ['In production with the first client.', 'Every release goes through the same gate before reaching families.'],
    metrics: [
      { value: '1 month', label: 'from first commit to v1.0.0', accent: true },
      { value: '24', label: 'releases, from v1.0.0 to v1.7.1' },
      { value: '4', label: 'roles, each with its own scope' },
    ],
    note: 'The name of the center in production and usage numbers are not published.',
  },
  next: {
    planned: 'planned',
    items: [
      ['Real time', 'Replace polling with server-sent events (SSE), so families see a log entry the moment it happens.'],
      ['Isolation per unit', 'Extend RLS to the unit level, for networks with more than one center.'],
    ],
    stackLabel: 'Stack',
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'PostgreSQL 16 · RLS', 'Flyway', 'Angular 22', 'Tailwind CSS v4', 'Docker', 'GitHub Actions', 'Testcontainers', 'Cloudflare Zero Trust', 'Claude Code'],
  },
  nextCase: {
    kicker: 'Next case study · coming soon',
    number: '03',
    title: 'Asces-Unita systems',
    statement: ['The ID number never shows up in the URL,', 'the logs or the metrics.'],
    cta: 'See all projects',
    href: '/#projetos',
    theme: 'dark',
  },
}

const fallbackNotice = {
  es: 'Este estudio de caso está disponible en inglés y portugués.',
  fr: 'Cette étude de cas est disponible en anglais et en portugais.',
}

export function agendaPerto(lang) {
  if (lang === 'pt') return { ...pt, lang: 'pt' }
  if (lang === 'en') return { ...en, lang: 'en' }
  return { ...en, lang: 'en', notice: fallbackNotice[lang] }
}
