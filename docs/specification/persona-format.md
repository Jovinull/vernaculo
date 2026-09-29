# Formato de persona (`vernaculo.dev/v1alpha1`)

Estrutura normativa: [`schemas/v1alpha1/persona.schema.json`](../../schemas/v1alpha1/persona.schema.json).
Esta página explica os campos e especifica as regras semânticas que o schema não
consegue expressar. Todo objeto é fechado: **campos desconhecidos são erro** (é isso
que mantém traços de personalidade fora do formato — veja o fixture de conformidade
`personality-traits-rejected`).

## Exemplo (sintético)

```yaml
apiVersion: vernaculo.dev/v1alpha1
kind: Persona
extends: pt-BR/x-fixture              # opcional, pai explícito
metadata:
  id: pt-BR/x-fixture/cidade-a
  name: Fixture — Cidade A
  description: Synthetic locality A.
  language: pt-BR                     # = primeiro segmento do id
  version: 0.1.0                      # semver desta persona
  maturity: fixture                   # fixture | draft | reviewed
  license: Apache-2.0                 # licença do conteúdo desta persona
  region: { country: BR, subdivision: BA, locality: Synthetic locality }
regionality:
  defaultIntensity: 0.25
linguistics:
  vocabulary:
    preferred:   [{ term: termo-sintético-a, meaning: ..., evidence: synthetic }]
    contextual:  [{ term: ..., context: Only in informal closings., evidence: synthetic, minIntensity: 0.5 }]
    discouraged: [{ term: ..., reason: ... }]
  discourse:
    markers:     [{ form: ..., function: ..., evidence: synthetic }]
  morphosyntax:
    patterns:    [{ id: padrao-a, description: ..., example: ..., evidence: synthetic, minIntensity: 0.4 }]
  pragmatics:
    addressForms: [{ form: ..., usage: ..., evidence: synthetic }]
    greetings: [...]
    acknowledgements: [...]
    disagreements: [...]
    closings: [...]
  orthography:
    phoneticSpelling: avoid           # avoid (padrão) | allow
examples:
  - { id: saudacao, situation: ..., neutral: "Olá! Como posso ajudar?", text: ..., intensity: 0.25 }
antiPatterns:
  - { id: excesso, text: ..., category: overuse, explanation: ... }
provenance:
  sources:
    - { id: algum-atlas, type: atlas, title: ..., url: https://..., license: ..., usage: consulted, accessed: "2026-09-29" }
  notes: ...
```

Exemplos reais ficam em [`fixtures/personas`](../../fixtures/personas) (sintéticos) e
em [`schemas/conformance/v1alpha1/valid/complete.yaml`](../../schemas/conformance/v1alpha1/valid/complete.yaml).

## Campos

### Nível superior

| Campo | Obrig. | Significado |
| --- | --- | --- |
| `apiVersion` | sim | `vernaculo.dev/v1alpha1` |
| `kind` | sim | `Persona` |
| `metadata` | sim | identidade, versão, maturidade |
| `extends` | não | id da persona pai ([herança](inheritance-and-composition.md)) |
| `regionality.defaultIntensity` | na linhagem | intensidade usada quando quem chama não escolhe uma; obrigatória em algum ponto da linhagem |
| `linguistics` | não | os traços |
| `examples` | não | exemplos positivos |
| `antiPatterns` | não | exemplos negativos |
| `provenance` | não | fontes e notas |

### `metadata`

`id`, `name` (≤ 200), `language`, `version` (semver) e `maturity` são obrigatórios.
`description` (≤ 2000), `license` e `region` são opcionais e **não são herdados**.
`region` (`country` ISO 3166-1 alfa-2, `subdivision` código ISO 3166-2 sem o prefixo
do país, `locality`, `note`) é apenas informativo: nunca guia a herança nem a
seleção.

### Traços

Todo traço renderizado tem `evidence` (obrigatório) e, opcionalmente, `sources`
(≥ 1 id de fonte), `notes` (para pesquisadores; não são enviadas aos modelos) e
`minIntensity`.

| Lista | Chave | Campos específicos | O que descreve |
| --- | --- | --- | --- |
| `linguistics.vocabulary.preferred` | `term` | `meaning` | itens lexicais usados onde cabem |
| `linguistics.vocabulary.contextual` | `term` | `context` (obrig.), `meaning` | itens usados apenas em um contexto declarado |
| `linguistics.vocabulary.discouraged` | `term` | `reason` (sem `evidence`/`minIntensity`) | formas a evitar; sempre renderizadas |
| `linguistics.discourse.markers` | `form` | `function` (obrig.) | marcadores discursivos e sua função |
| `linguistics.morphosyntax.patterns` | `id` | `description` (obrig.), `example` | construções morfossintáticas |
| `linguistics.pragmatics.addressForms` / `greetings` / `acknowledgements` / `disagreements` / `closings` | `form` | `usage` | formas de tratamento e convenções conversacionais |
| `examples` | `id` | `situation`, `neutral`, `text` (obrig.), `intensity` | exemplos positivos |
| `antiPatterns` | `id` | `text`, `category`, `explanation` (todos obrig.) | saídas que nunca devem ser produzidas |
| `provenance.sources` | `id` | `type`, `title`, `usage` (obrig.); `url`, `citation`, `license`, `accessed` | de onde vem a evidência |

`evidence`: `attested` | `reported` | `hypothesis` | `synthetic` — veja [provenance.md](provenance.md).
`category` dos antipadrões: `caricature`, `stereotype`, `overuse`, `phonetic-spelling`,
`invented-regionalism`, `wrong-region`, `register-mismatch`, `other`.

**Formas de superfície.** Os itens de `preferred`, `contextual`, `markers` e das cinco
listas de pragmática são formas de superfície *usadas*; os itens de `discouraged` são
formas de superfície *evitadas*. As chaves são comparadas depois de normalização
Unicode NFC e conversão para minúsculas (`Termo` = `termo`).

## Regras semânticas

No nível do documento (verificadas em cada documento):

| Código | Regra |
| --- | --- |
| `language-mismatch` | `metadata.language` DEVE ser igual ao primeiro segmento de `metadata.id`. |
| `duplicate-key` | As chaves DEVEM ser únicas dentro de cada lista. |
| `conflicting-forms` | Dentro de um documento, uma forma NÃO DEVE ser ao mesmo tempo usada (em qualquer lista de formas usadas) e desencorajada. |
| `evidence-without-source` | Traços `attested` e `reported` DEVEM citar pelo menos uma fonte. |

Na linhagem e na persona resolvida (verificadas durante a resolução):

| Código | Regra |
| --- | --- |
| `invalid-id` | Todo id usado (pedido ou em `extends`) DEVE seguir a sintaxe de id. |
| `persona-not-found` / `parent-not-found` | A persona pedida e todo pai DEVEM existir nas raízes. |
| `id-mismatch` | Um documento armazenado para o id `I` DEVE declarar `metadata.id: I`. |
| `inheritance-cycle` | Uma linhagem NÃO DEVE conter ciclo (incluindo uma persona que estende a si mesma). |
| `inheritance-too-deep` | Uma linhagem NÃO DEVE passar de 32 documentos. |
| `lineage-language-mismatch` | Todos os documentos de uma linhagem DEVEM ter o mesmo `metadata.language`. |
| `unknown-source` | Toda referência a fonte DEVE apontar para uma fonte da persona achatada. |
| `synthetic-outside-fixture` | Evidência `synthetic` só é permitida quando a maturidade efetiva é `fixture`. |
| `missing-default-intensity` | A persona achatada DEVE definir `regionality.defaultIntensity`. |

## Histórico do formato (da conversa de concepção)

Dois rascunhos antecederam a `v1alpha1`:

1. `apiVersion: regionalpersona.dev/v1`, `kind: RegionalPersona`, id `br.ba.salvador`, snake_case (`default_intensity`, `discourse_markers`, `phonetic_spelling`), com `scope.register`, um bloco `style` (`rhythm`, `verbosity`, `regional_marker_frequency`), `constraints` booleanas e `review.native_review_required`.
2. `apiVersion: vernaculo.dev/v1`, `kind: Persona`, id `pt-BR/ba/salvador`, camelCase, `regionality.defaultIntensity`, `linguistics.{vocabulary, discourse.markers, morphosyntax.patterns, pragmatics}`, `constraints` booleanas (`avoidCaricature`, `avoidStereotypes`, `preserveParentRole`, `preserveTaskAccuracy`) e `provenance.sources`.

A `v1alpha1` se baseia no rascunho 2, com estas decisões do bootstrap:

| Elemento do rascunho | Na v1alpha1 | Motivo |
| --- | --- | --- |
| `vernaculo.dev/v1` | `vernaculo.dev/v1alpha1` | maturidade honesta; nenhum pack real exercitou o formato |
| `country`/`state`/`locality` em metadata | `metadata.region.{country, subdivision, locality, note}` | informativo, não identidade |
| `constraints` booleanas | removidas; os invariantes são normativos e sempre renderizados | um pack não pode conseguir desligar as regras anti-caricatura |
| bloco `override:` | removido; os mesmos campos são mesclados por regras normativas | um único formato para todos os documentos ([herança](inheritance-and-composition.md)) |
| `review.native_review_required` | `metadata.maturity` + processo de revisão humana | o status de revisão precisa ser visível e ordenado |
| `examples` com `neutral`/`regionalized` (rascunho 1) | `examples` com `neutral`/`text`, mais `antiPatterns` | exemplos positivos e negativos |
| `orthography.phonetic_spelling: avoid` (rascunho 1) | `linguistics.orthography.phoneticSpelling` | mantido |
| `disagreement_patterns` (rascunho 1) | `pragmatics.disagreements` | mantido |
| `style` do rascunho 1 (ritmo, verbosidade, frequência de marcadores) | não adotado | frequência de marcadores é intensidade; ritmo/verbosidade exigem modelagem baseada em evidência ([questões em aberto](../roadmap/open-questions.md)) |
| `scope.register` do rascunho 1 | não adotado | a modelagem de registro é uma questão em aberto |
| `evidence`, `sources` e `minIntensity` por traço | novos | separação entre evidência e hipótese; filtragem por intensidade |
