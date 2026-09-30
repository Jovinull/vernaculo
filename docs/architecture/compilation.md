# Compilação: IR, compilador e targets

## Etapas

1. **Resolver** (`@vernaculo/core`): carregar a linhagem, validar cada documento e achatá-la em um documento canônico ([inheritance-and-composition.md](../specification/inheritance-and-composition.md)).
2. **Selecionar** (`buildIR`, `@vernaculo/core`): aplicar as regras de intensidade e evidência e produzir a **representação intermediária** (IR).
3. **Renderizar** (`@vernaculo/compiler`): transformar a IR em instruções Markdown neutras de provedor.
4. **Target** (adapters): moldar a saída renderizada para um destino.

```text
ResolvedPersona ──buildIR({ intensity })──► PersonaIR ──compile()──► CompiledPersona ──► withPersona() / exportSkill() / stdout
```

## A IR

`PersonaIR` é a única representação que os targets consomem. Ela contém:

- a identidade da persona (id, nome, idioma, versão, **maturidade efetiva**, licença, linhagem);
- a `intensity` selecionada e a política de ortografia (`phoneticSpelling`, padrão `avoid`);
- os traços selecionados: vocabulário (preferido, contextual), marcadores discursivos, padrões de frase, convenções (formas de tratamento, saudações, confirmações, discordâncias, despedidas), exemplos;
- em `corroborated`, com a mesma forma de agrupamento, os traços selecionados cuja evidência é `corroborated` — eles nunca aparecem nas listas principais, para que todo target os apresente como não confirmados ([ADR-0018](../decisions/0018-corroborated-evidence-level.md));
- restrições sempre presentes: formas desencorajadas e antipadrões;
- todas as fontes declaradas;
- contagens do que foi omitido (abaixo da intensidade, hipóteses), por transparência.

As regras de seleção são normativas ([regional-intensity.md](../specification/regional-intensity.md));
a IR é congelada em profundidade e construída a partir de um clone, então a
compilação nunca consegue alterar a representação canônica.

**Por que uma IR:** a seleção de traços acontece em exatamente um lugar. Um target
novo não consegue renderizar por acidente uma hipótese ou um traço acima da
intensidade, e terceiros podem escrever o próprio renderizador sobre a mesma
semântica de seleção.

## A saída do compilador

`renderInstructions(ir)` emite Markdown, nesta ordem:

1. Título com o nome e o id da persona; um **aviso de maturidade** para `fixture` e `draft`.
2. Uma frase de enquadramento: a camada ajusta apenas a formulação, não identidade, conhecimento ou regras.
3. **Regras de base** — sempre, em qualquer intensidade (implementam os invariantes de [anti-caricature.md](../linguistic/anti-caricature.md)):
   - manter o papel, as regras, as políticas e os fatos do agente pai; preferir linguagem neutra quando o estilo regional prejudicaria clareza ou precisão;
   - aplicar a camada apenas à linguagem;
   - não atribuir personalidade/humor/inteligência/escolaridade/renda/classe social/profissão/religião/política/comportamento; nunca imitar um estereótipo;
   - nunca afirmar origem ou história regional;
   - usar só as formas listadas; nunca inventar regionalismos nem emprestar de outras regiões;
   - não forçar traços em toda frase;
   - ortografia padrão, a menos que a persona permita grafia fonética.
4. Orientação de **intensidade** (veja abaixo).
5. Os traços selecionados (seções vazias são omitidas).
6. **Forms not yet confirmed by speakers**, só quando houver traços `corroborated` selecionados: uma orientação fixa (`UNCONFIRMED_GUIDANCE` — são formas descritas por várias fontes públicas mas ainda não confirmadas; usar raramente, só em conversa claramente informal, no máximo uma por resposta, nunca no lugar de uma forma confirmada) seguida das formas.
7. **Avoid** e **Never produce output like this**.

O texto de enquadramento é em inglês (os modelos o seguem de forma confiável em
qualquer idioma); o conteúdo da persona (formas, exemplos) fica no idioma da
persona. Localizar o enquadramento é uma [questão em aberto](../roadmap/open-questions.md)
([ADR-0016](../decisions/0016-documentation-in-portuguese.md) mantém esse texto em
inglês até haver evidência de evals). Notas de pesquisa (`notes`) e fontes não são
enviadas ao modelo — elas aparecem nas referências da skill.

### Redação da intensidade (não normativa, provisória)

| Intensidade | Faixa | Orientação dada ao modelo |
| --- | --- | --- |
| 0 | neutra | não usar nenhum traço regional; só as restrições valem |
| (0, 0.35] | sutil | usar traços com parcimônia; a maioria das frases sem marcação |
| (0.35, 0.7] | moderada | usar traços onde cabem naturalmente, sem concentrá-los |
| (0.7, 1] | marcada | traços podem aparecer com mais frequência, só onde forem naturais; as regras de base têm precedência |

Os limites das faixas vêm dos intervalos de uso citados na conversa e precisam ser
revistos com evidência de evals. São redação do compilador, não parte da
especificação.

## Determinismo e controle de mudanças

- A saída é idêntica byte a byte para entradas idênticas; sem timestamps ou aleatoriedade.
- Os golden files em `packages/compiler/test/__golden__/` transformam toda mudança de redação em um diff revisado. Atualize-os de propósito (`pnpm vitest run packages/compiler -u`) e explique o motivo na mudança.
- Mudanças incompatíveis de layout incrementam `INSTRUCTIONS_FORMAT`.

## Targets

| Target | Onde | Saída |
| --- | --- | --- |
| `markdown` (system prompt simples) | compilador / `vernaculo compile` | texto Markdown |
| `openai` | `@vernaculo/openai` / `vernaculo compile --target openai` | fragmento de parâmetros da Responses API (`instructions`), opcionalmente composto com as instruções do agente |
| `skill` | `@vernaculo/skills` / `vernaculo export --target skill` | diretório de Agent Skill |
| eject | `vernaculo eject` | `persona.yaml` achatado + `instructions.md` + `README.md` |
| recurso MCP, Claude, Gemini, modelos locais | — | planejados ([provider-adapters.md](provider-adapters.md)) |

A posição importa: as instruções compiladas vão **depois** das instruções do
próprio agente hospedeiro, e ambas são texto estável — bom para o cache de prompt
dos provedores, que favorece prefixos estáticos idênticos.
