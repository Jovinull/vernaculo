# Revisão humana

Verificações automáticas conseguem provar estrutura; só pessoas familiarizadas com
uma variedade conseguem julgar se a saída soa natural, exagerada ou errada. A
revisão por falantes da variedade é **sempre recomendada e nunca obrigatória**
([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)): não há
número mínimo de revisores, limiar de concordância nem portão de revisão para
publicar ou usar um pack. Tudo nesta página é orientação para fazer uma boa
revisão. A CLI recomenda revisão sempre que lida com uma persona `draft`.

Status: **processo definido, ainda não executado** (não existe pack real). O formato
de registro abaixo é uma proposta; ele vira schema quando a primeira rodada de
revisão acontecer.

## O que os revisores veem

Amostras geradas localmente a partir de um pack (pela pessoa que coordena a
revisão, com as próprias credenciais de provedor ou modelos locais), cobrindo:

- cenários padrão (atendimento primeiro: saudação, pergunta sobre produto, pergunta sobre preço/financiamento, reclamação, despedida);
- várias intensidades: 0 (controle), a padrão do pack, ~0.7 e 1;
- mais de um provedor/modelo quando possível (veja [cross-provider.md](../evals/cross-provider.md));
- controles neutros misturados, para que os revisores não sejam induzidos a encontrar traços regionais em tudo.

Os revisores também revisam diretamente o conteúdo do pack: cada forma, seu
significado, contexto e exemplos.

## Rótulos

Os revisores marcam uma saída inteira ou uma forma específica com um ou mais
rótulos. O texto mostrado aos revisores fica no idioma da variedade; os ids são
estáveis.

| Id | Texto para o revisor (pt-BR) | Significado |
| --- | --- | --- |
| `natural` | parece natural | plausível para um falante da variedade nesta situação |
| `authentic` | isso realmente usamos | a forma é de fato usada aqui (confirma um traço) |
| `exaggerated` | parece exagerado | frequente ou marcado demais para a situação/intensidade |
| `unrecognized` | não reconheço essa expressão | o revisor não conhece a forma nesta variedade |
| `wrong-region` | isso é de outra região | a forma pertence a outra variedade |
| `caricatural` | parece caricato | soa como paródia ou estereótipo |
| `offensive` | é ofensivo | ofensivo ou depreciativo |
| `register-mismatch` | formalidade inadequada | formalidade errada para a situação |

Mais um comentário livre. Como os rótulos se traduzem em mudanças no pack:

| Sinal | Ação típica |
| --- | --- |
| `authentic`, `natural` entre revisores | sustenta `evidence: reported` (cite a rodada de revisão) |
| `exaggerated` | subir `minIntensity`, ajustar exemplos, reforçar as faixas |
| `unrecognized`, `wrong-region` | reconferir a evidência; reduzir o escopo; rebaixar para `hypothesis` ou remover |
| `caricatural`, `offensive` | remover ou desencorajar a forma e acrescentar um antipadrão, como a [política anti-caricatura](anti-caricature.md) exige independentemente da maturidade |
| `register-mismatch` | acrescentar contexto (`contextual`), ajustar exemplos |

## Revisores

- Pessoas familiarizadas com a variedade (por exemplo, que cresceram ou vivem há muito tempo no lugar). O perfil de cada revisor é registrado de forma genérica, sem identificá-lo.
- Mais revisores e mais diversidade (idade, trajetória, área) dão sinais mais fortes; um revisor cuidadoso ainda é melhor que nenhum.
- Não há números obrigatórios nem limiares de concordância. O registro mostra quão extensa foi uma revisão, para que os usuários julguem por si mesmos.

## Privacidade e consentimento

- Consentimento informado antes de participar; os revisores podem desistir.
- Registros públicos usam ids pseudônimos de revisores e apenas dados de perfil genéricos (familiaridade, localidade, faixa etária opcional). Nada de nomes, contatos ou dados pessoais em texto livre no repositório.
- Revisões são contribuições para um projeto aberto: os registros de revisão são licenciados sob Apache-2.0, como o resto do repositório ([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)); os revisores são informados disso ao consentir.

## Formato de registro proposto (ainda não normativo)

```yaml
persona: pt-BR/ba/salvador
personaVersion: 0.3.0
instructionsFormat: vernaculo-instructions/v1alpha1
round: 2026-11-review-1
reviewer:
  id: r-017                    # pseudônimo
  familiarity: lifelong        # lifelong | long-term-resident | other
  locality: Salvador
items:
  - sample: s-042              # id de uma amostra gerada, guardada com a rodada
    intensity: 0.3
    labels: [natural]
  - form: "..."                # uma forma específica do pack
    labels: [exaggerated]
    comment: "..."
```

Uma rodada de revisão é citada no pack como fonte `speaker-review`.

## Resultado

Defina `maturity: reviewed` quando uma revisão por falantes da variedade realmente
aconteceu: é uma afirmação de fato, não uma nota de qualidade. Recomendado: manter o
registro da revisão ao lado do pack, citar a rodada como fonte `speaker-review` e
aplicar as conclusões (qualquer coisa marcada `caricatural` ou `offensive` é
corrigida pela política anti-caricatura de qualquer forma). Um pack que nunca foi
revisado continua `draft`, ainda pode ser publicado e usado, e continua recomendando
revisão.
