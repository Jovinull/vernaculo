# Herança e composição

Duas coisas diferentes se combinam no Vernáculo:

- **Herança** — uma persona estende outra (`extends`), produzindo uma persona achatada. Normativa, especificada abaixo.
- **Composição** — uma camada de persona compilada é colocada sobre as instruções do próprio agente hospedeiro. Especificada abaixo como um contrato de renderização.

## Herança

Registro de decisão: [ADR-0013](../decisions/0013-explicit-inheritance.md).

- `extends: <id da persona>` nomeia exatamente um pai. Sem `extends`, o documento é a raiz de uma linhagem.
- Ids nunca implicam herança: `pt-BR/ba/salvador` **não** herda de `pt-BR/ba`, a menos que diga isso.
- A **linhagem** é a cadeia do ancestral raiz até a persona pedida. Ela tem um único idioma, nenhum ciclo e no máximo 32 documentos.

### Achatamento (normativo)

Os documentos são mesclados na ordem da linhagem, a raiz primeiro. O resultado é um
documento autônomo sem `extends` (a *persona achatada*).

1. **Identidade.** `apiVersion` e `kind` recebem as constantes atuais. `metadata` é o `metadata` da própria folha — `description`, `license` e `region` **não são herdados** — exceto `maturity`, que vira a **maturidade efetiva**: o nível menos maduro da linhagem (`fixture` < `draft` < `reviewed`).
2. **Escalares.** `regionality.defaultIntensity`, `linguistics.orthography.phoneticSpelling` e `provenance.notes` recebem o valor do último documento da linhagem que os define.
3. **Cancelamento de formas de superfície.** Ao processar um documento `D`:
   - toda forma que `D` desencoraja é removida das listas de formas usadas acumuladas dos ancestrais;
   - toda forma que `D` usa é removida da lista de formas desencorajadas acumulada dos ancestrais.

   (Um documento não pode usar e desencorajar a mesma forma — `conflicting-forms`.) Assim, um descendente pode *desencorajar* uma forma que o pai usa (uma empresa que evita um termo) ou *reativar* uma forma que o pai desencorajou.
4. **Listas com chave.** Em seguida, cada lista de `D` é mesclada à lista acumulada: um item cuja chave já existe **substitui aquele item no mesmo lugar, por inteiro** (sem merge profundo); itens novos são **acrescentados** na ordem de `D`. Chaves: `term` (vocabulário), `form` (marcadores, pragmática), `id` (padrões, exemplos, antipadrões, fontes), comparadas depois de NFC + minúsculas.
5. **Forma canônica.** O documento achatado ordena as chaves como o JSON Schema as declara e omite valores indefinidos, listas vazias e objetos vazios. A forma canônica torna o achatamento reproduzível byte a byte entre implementações.

Depois do achatamento, valem as regras da persona resolvida (`unknown-source`,
`synthetic-outside-fixture`, `missing-default-intensity`).

O caso de conformidade `schemas/conformance/v1alpha1/resolution/inheritance-merge/`
exercita todas as regras acima, incluindo a ordem das chaves.

### Por que não há bloco `override:`

A conversa esboçou um arquivo de empresa com uma seção `override:` separada. A
v1alpha1 usa os mesmos campos em todo documento, com as regras de merge acima:
substituição por chave, acréscimo e cancelamento entre formas desencorajadas e usadas
cobrem as necessidades descritas ("herdar o pack de Salvador, mudar a intensidade,
desencorajar um termo") com um formato único. Remover um item herdado que *não é
forma de superfície* (por exemplo, um padrão morfossintático) ainda não é possível —
uma [questão em aberto](../roadmap/open-questions.md); baixar a intensidade ou ejetar
e editar são as alternativas atuais.

### Exemplo: persona de uma empresa

```yaml
# acme-salvador.yaml, no repositório da empresa
apiVersion: vernaculo.dev/v1alpha1
kind: Persona
extends: pt-BR/ba/salvador
metadata:
  id: pt-BR/x-acme/salvador
  name: ACME — Salvador
  language: pt-BR
  version: 1.0.0
  maturity: reviewed        # a maturidade efetiva ainda pode ser menor se o pai for menos maduro
regionality:
  defaultIntensity: 0.25
linguistics:
  vocabulary:
    discouraged:
      - term: ...           # removido das formas usadas herdadas
        reason: Guia de estilo da empresa.
```

Versão executável (com fixtures): [`examples/project-persona`](../../examples/project-persona/).

## Composição com o agente hospedeiro

```text
instruções do agente hospedeiro (papel, regras, conhecimento)
+ camada de persona compilada (apenas linguagem)
= agente localizado
```

Contrato para renderizadores e adapters ([ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md)):

- A camada de persona é colocada **depois** das instruções do agente hospedeiro e DEVE afirmar que o papel, as regras de negócio, as políticas e os fatos do hospedeiro têm precedência.
- A camada NÃO DEVE redefinir o papel do agente e DEVE instruir o modelo a não afirmar origem regional nem história pessoal na região.
- Quando o estilo regional reduziria clareza, precisão ou adequação, a linguagem neutra vence.
- Os adapters aplicam a camada em toda requisição quando o provedor não mantém as instruções (por exemplo, `previous_response_id` da OpenAI).

A composição de várias personas ao mesmo tempo (por exemplo, duas variedades) não é
suportada.
