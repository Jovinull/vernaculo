# ADR-0016: Documentação e metadados do projeto em português

- Status: Aceito
- Data: 2026-09-29
- Origem: decisão do mantenedor ("tudo em português ... para alcançar público"), revertendo a convenção de documentação em inglês adotada no bootstrap

## Contexto

No bootstrap, a documentação foi escrita em inglês, pensando em uma audiência open
source internacional. O público que o projeto quer alcançar primeiro, porém, é
brasileiro: desenvolvedores que criam agentes para empresas no Brasil, linguistas
e falantes que vão pesquisar e revisar os primeiros packs (Salvador, Aracaju,
Recife e São Paulo). O próprio projeto nasceu em português e se chama Vernáculo.

## Decisão

- Toda a documentação voltada a pessoas fica em **português brasileiro**: `README.md`,
  `CONTRIBUTING.md`, `docs/` (incluindo ADRs), READMEs de diretórios, `CLAUDE.md`,
  regras e skills do Claude Code, descrições do JSON Schema, descrições dos pacotes
  npm, e a descrição e as tags (topics) do repositório no GitHub.
- Mensagens de commit seguem Conventional Commits em português (ver `CLAUDE.md`).
- Permanecem em inglês, por serem código ou interface com modelos:
  - identificadores, comentários de código e nomes de testes;
  - mensagens da CLI;
  - o texto de enquadramento das instruções compiladas, que é lido pelo modelo —
    mudá-lo altera o comportamento e depende de evals (questão aberta OQ-08);
  - códigos estáveis (issue codes, valores de enums, `apiVersion`).
- Nomes de arquivos e diretórios continuam como estão (em inglês), para manter
  caminhos estáveis em links, regras e mensagens da CLI.
- Material voltado a revisores de uma variedade continua no idioma dessa variedade.

## Consequências

- Novas páginas, ADRs e skills são escritos em português.
- As tags do GitHub são em português, sem acento (o GitHub só aceita letras
  minúsculas ASCII, números e hífens), complementadas por alguns termos universais
  (`llm`, `openai`, `typescript`) para alcance.
- Leitores de outros idiomas dependem de tradução automática; um resumo em inglês
  pode ser acrescentado no futuro, se houver demanda.

## Alternativas consideradas

- **Manter inglês** (convenção do bootstrap) — rejeitado pelo mantenedor: afasta o
  público brasileiro que o projeto quer alcançar primeiro.
- **Documentação bilíngue** — rejeitado por ora: dobra a manutenção e cria risco de
  as versões divergirem.
