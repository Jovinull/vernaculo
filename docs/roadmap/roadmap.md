# Roadmap

Status em 2026-09-29. Atualize esta página sempre que um status mudar.
Legenda: ✅ feito · 🔜 próximo · 📋 planejado · 💡 ideia (não é compromisso).

## v0.1 — provar a tese

| Item | Status |
| --- | --- |
| Especificação `v1alpha1`: JSON Schema, regras semânticas, herança, intensidade, proveniência, suíte de conformidade | ✅ |
| `@vernaculo/schema`, `@vernaculo/core`, `@vernaculo/compiler` | ✅ |
| `@vernaculo/openai` (Responses API) | ✅ |
| `@vernaculo/skills` (exportador de Agent Skills) | ✅ |
| CLI: `list`, `inspect`, `validate`, `compile` (markdown, openai), `export --target skill`, `eject` | ✅ |
| CI, Changesets, Apache-2.0 | ✅ |
| Documentação, ADRs, configuração do Claude Code no projeto | ✅ |
| Licença do conteúdo dos packs: Apache-2.0, uma única licença para todo o repositório (ADR-0014) | ✅ |
| Política de revisão: revisão humana sempre recomendada, nunca obrigatória; a CLI a recomenda para rascunhos (ADR-0015) | ✅ |
| Repositório público no GitHub (https://github.com/Jovinull/vernaculo) | ✅ |
| Documentação e metadados em português (ADR-0016) | ✅ |
| Resolver as questões em aberto restantes: executor de evals, distribuição do catálogo | 🔜 |
| Pesquisar e escrever o rascunho de `pt-BR/ba/salvador`, `pt-BR/se/aracaju`, `pt-BR/pe/recife`, `pt-BR/sp/sao-paulo` | 🔜 |
| Conjunto compartilhado de cenários e executor de evals com modelos (local, credenciais do usuário) | 📋 |
| Primeiras rodadas de revisão humana (recomendadas, não um portão); schema dos registros de revisão | 📋 |
| CLI `add`, `search`, `update` (depois da decisão sobre o catálogo); `@clack/prompts` para fluxos interativos | 📋 |
| Primeira publicação no npm / GitHub Releases (manual) | 📋 |
| Releases da biblioteca com artefatos prontos por pack (skill exportada + `instructions.md` compilado), para quem consome não precisar de Node/Python | 📋 |

## v0.2 – v0.3

| Item | Status |
| --- | --- |
| `@vernaculo/mcp`: servidor stdio local que expõe personas (MCP TS SDK v2) | 📋 |
| Adapters: Anthropic, Gemini, modelos locais (Ollama) | 📋 |
| Relatórios de evals entre provedores por pack | 📋 |
| Modelagem de registro (atendimento / casual / formal) | 💡 (questão em aberto) |
| Packs com vários arquivos, arquivos de eval por pack | 💡 (questão em aberto) |
| Adapter de conveniência `@vernaculo/openai-agents` | 💡 |
| Intensidade escolhida em runtime nas skills exportadas | 💡 (questão em aberto) |

## Depois

| Item | Status |
| --- | --- |
| Mais variedades brasileiras, se houver evidência (por exemplo, Recôncavo, sul da Bahia, interior de Sergipe) | 💡 |
| Outros idiomas (`pt-PT`, `es-AR`, `es-MX`, `en-US`, `en-GB`) | 💡 |
| Site estático de documentação/catálogo (por exemplo, Astro + Starlight, hospedagem gratuita) | 💡 |
| Implementação em Python (PyPI) usando a suíte de conformidade | 💡 |
| Regionalização de voz/fala (por exemplo, datasets de vozes regionais) | 💡 |
| Core em Rust ou binário standalone — só com necessidade concreta | 💡 |
| Dataset público de feedback de revisores | 💡 |
| Especificação estável `vernaculo.dev/v1` | 📋 depois de packs reais, revisões e evals |
