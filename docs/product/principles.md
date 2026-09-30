# Princípios e invariantes

Estas são as regras inegociáveis do projeto. Cada uma aponta para a decisão que a
estabelece. Mudar qualquer uma exige um ADR novo.

## 1. Nenhuma infraestrutura do Vernáculo em runtime

> Uma aplicação que utiliza Vernáculo não deve depender da infraestrutura do Vernáculo em runtime.

Nenhuma API, backend, banco de dados, conta, proxy, telemetria, token pago ou
inferência do lado do mantenedor. O custo do mantenedor continua ≈ zero em qualquer
nível de adoção.
[ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md) ·
[zero-infrastructure.md](../architecture/zero-infrastructure.md)

## 2. Independência de provedor

A especificação e o core não sabem nada sobre OpenAI, Anthropic, Google, MCP,
Agent Skills ou qualquer framework. Provedores são adapters na borda.
[ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md)

## 3. O formato é o produto, e ele é aberto

Personas são YAML + Markdown com um JSON Schema normativo e uma suíte de
conformidade neutra de linguagem. O significado delas nunca depende de código
TypeScript.
[ADR-0003](../decisions/0003-yaml-markdown-json-schema-format.md)

## 4. Compilação determinística e local

Nenhum modelo é chamado para gerar instruções. Mesma entrada ⇒ mesmos bytes.
[ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md)

## 5. Camada de linguagem, não um novo agente

A persona ajusta apenas a linguagem; o papel, as regras, as políticas e os fatos do
agente hospedeiro sempre vencem. O agente nunca afirma ter origem regional.
[ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md)

A camada serve a **qualquer IA** — assistente, tutor, personagem, ferramenta de
escrita, atendimento — e os packs não pressupõem caso de uso: descrevem a variedade;
o uso é de quem integra.
[ADR-0017](../decisions/0017-any-ai-use-case-neutral-packs.md)

## 6. Sociolinguística, não caricatura

Apenas traços de linguagem observáveis. Nenhuma personalidade, humor, inteligência,
escolaridade, renda, classe social, profissão, religião, política ou comportamento
associado a uma região. Nenhum regionalismo inventado. Intensidade alta nunca
afrouxa essas regras.
[ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md) ·
[anti-caricature.md](../linguistic/anti-caricature.md)

## 7. Evidência antes de afirmações

Todo traço declara sua evidência; hipóteses nunca são renderizadas; dados sintéticos
só existem em fixtures. Nada é chamado de validado, natural, representativo, livre
de estereótipos ou pronto para produção sem evidência de revisão humana e evals. A
maturidade (`fixture` / `draft` / `reviewed`) é visível em toda saída.
[provenance.md](../specification/provenance.md)

## 8. Evals fazem parte do produto

Os packs são entregues com — e julgados por — evals locais e reproduzíveis. A
revisão humana por falantes da variedade é sempre recomendada e nunca obrigatória;
as ferramentas a recomendam para todo rascunho.
[evals/strategy.md](../evals/strategy.md) ·
[ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)

## 9. Sem lock-in

Personas são arquivos portáveis. Os usuários podem copiar, fazer fork, sobrescrever
(`extends`) ou ejetar; se o projeto desaparecesse, os packs instalados continuariam
funcionando.
[distribution.md](../architecture/distribution.md)

## 10. Licença aberta e respeito às licenças alheias

Tudo no repositório (código, especificação, documentação e conteúdo das personas) é
Apache-2.0. Material linguístico de terceiros mantém a própria licença e só é
consultado, citado ou redistribuído como essa licença permite.
[ADR-0012](../decisions/0012-apache-2-0-code-license.md) ·
[ADR-0014](../decisions/0014-apache-2-0-persona-content.md)

## 11. Pequeno, correto e extensível

Prefira uma fundação pequena e bem testada a abstrações especulativas; nada de
pacotes placeholder ou stubs enganosos. Documentação, especificação, código e evals
evoluem juntos — nenhuma decisão importante vive só em uma conversa.

## 12. Documentação em português

A documentação e os metadados do projeto são escritos em português brasileiro,
para alcançar primeiro o público que vai usar, pesquisar e revisar os packs.
[ADR-0016](../decisions/0016-documentation-in-portuguese.md)
