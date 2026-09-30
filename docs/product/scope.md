# Escopo

Legenda de status: **feito** (implementado e testado), **planejado** (direção
assumida, não implementada), **ideia** (futuro possível, não é requisito),
**rejeitado** (explicitamente fora).

## No escopo do primeiro release (v0.1)

| Item | Status |
| --- | --- |
| Persona Specification `v1alpha1` (JSON Schema, regras semânticas, suíte de conformidade) | feito |
| `@vernaculo/schema`, `@vernaculo/core`, `@vernaculo/compiler` | feito |
| `@vernaculo/openai` (adapter da Responses API) | feito |
| `@vernaculo/skills` (exportador de Agent Skills) | feito |
| CLI: `list`, `inspect`, `validate`, `compile`, `export --target skill`, `eject` | feito |
| CLI: `add`, `search`, `update` | planejado (depende da distribuição do catálogo; veja as questões em aberto) |
| Packs pesquisados, com revisão humana recomendada: começar por `pt-BR/ba`, depois especializar localidades com evidência | em andamento: Bahia estadual e Salvador em rascunho (sem revisão por falantes); outras localidades aguardam pesquisa |
| Laboratório local para testar packs com um modelo real e gerar amostras para revisão (`examples/agent-lab`) | feito (manual; o executor de evals continua em aberto) |
| Licença do conteúdo (Apache-2.0) e política de revisão (recomendada, não obrigatória) | feito (ADR-0014, ADR-0015) |
| Metodologia de evals, dimensões e rótulos de revisão humana | feito (documentado) |
| Executor de evals e suítes de eval por pack | planejado |
| CI (GitHub Actions), Changesets | feito |
| Documentação em português (ADR-0016) | feito |
| Publicação no npm / GitHub Releases | planejado (manual, decisão do mantenedor) |

## Depois

| Item | Status |
| --- | --- |
| `@vernaculo/mcp` (servidor stdio local que expõe personas) | planejado para v0.2/v0.3 |
| Adapter `@vernaculo/openai-agents` | ideia |
| Adapters para Anthropic / Gemini / modelos locais (Ollama) | planejado (o design já suporta) |
| Site de documentação/catálogo (estático, por exemplo Astro + Starlight em hospedagem gratuita) | ideia |
| Outros idiomas e variedades (`pt-PT`, `es-AR`, `es-MX`, `en-US`, `en-GB`...) | ideia |
| Modelagem de registro (formal/informal); variantes por caso de uso ficam em personas de projeto, não na biblioteca (ADR-0017) | ideia (questão em aberto) |
| Implementação em Python (PyPI) | ideia |
| Core em Rust / binário standalone | ideia (só com necessidade concreta, ADR-0004) |
| Regionalização de voz / fala | ideia |

## Fora de escopo e direções rejeitadas

| Item | Por quê |
| --- | --- |
| API hospedada, SaaS, backend, proxy, contas, chaves | [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md) |
| Telemetria obrigatória | ADR-0001 |
| Banco de dados, registry proprietário ou marketplace | [ADR-0008](../decisions/0008-git-and-filesystem-no-database.md) |
| MCP como formato central/canônico | [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| `SKILL.md` como formato canônico | [ADR-0007](../decisions/0007-agent-skills-early-export-target.md) |
| Traços de personalidade/psicologia regional | [ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md) |
| Projetar em torno de fine-tuning | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md) |
| Chamar um LLM para criar ou renderizar personas no core | ADR-0011 |
| Um formato de personalidade de IA de uso geral | [vision.md](vision.md) |
| Next.js ou qualquer framework web no core | um futuro site de documentação é estático e fica fora do runtime |
| Cobrir os 27 estados brasileiros de uma vez | qualidade acima de cobertura: quatro packs excelentes primeiro |
