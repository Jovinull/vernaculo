# Ciclo de vida de uma persona

Da pesquisa até o agente do usuário. Tudo são arquivos no Git, revisados por pull
requests e verificados no CI — a mesma disciplina que a OpenAI agora recomenda para
prompts de produção (veja os [fatos externos](../reference/external-facts.md)).

```text
pesquisa ─► persona.yaml (draft) ─► PR ─► CI (schema, semântica, testes) ─► revisão humana ─► evals ─► release x.y.z
                                                                                                        │
           usuário: add / cópia / npm ─► extends no próprio repositório (opcional) ─► compile / export / eject ◄─┘
```

## 1. Pesquisa

Reúna evidências para cada traço a partir de fontes cuja licença permita o uso
pretendido ([methodology.md](../linguistic/methodology.md), [sources.md](../linguistic/sources.md)).
Ideias não confirmadas são registradas como `evidence: hypothesis` — mantidas para
pesquisa, nunca renderizadas.

## 2. Autoria (`maturity: draft`)

Escreva `personas/<id>/persona.yaml` seguindo o
[formato](../specification/persona-format.md) e o
[guia de contribuição](../development/contributing-personas.md): traços com
evidência e fontes, exemplos positivos, antipadrões, proveniência com níveis de
uso e um `defaultIntensity` sensato.

## 3. Verificações automáticas (CI)

`pnpm check` executa lint, typecheck, testes, build e `vernaculo validate` em todas
as raízes de personas: estrutura, regras semânticas e resolução da linhagem.

## 4. Revisão humana (recomendada, não obrigatória)

Falantes da variedade revisam as saídas compiladas em várias intensidades usando o
conjunto de rótulos de [human-review.md](../linguistic/human-review.md). As
conclusões mudam o pack (remover, reduzir o escopo, subir `minIntensity`,
acrescentar antipadrões). Não existe critério obrigatório
([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)): um pack
pode ser lançado como `draft` e passa a `reviewed` quando uma revisão realmente
aconteceu e está documentada. As ferramentas continuam recomendando revisão para
rascunhos.

## 5. Evals

Evals locais e reproduzíveis rodam com as credenciais de provedor ou os modelos
locais de quem avalia ([evals/strategy.md](../evals/strategy.md)). Os resultados
são registrados junto com a versão do pack.

## 6. Release

Versionamento semântico em `metadata.version`:

- **patch** — correções que não mudam quais traços são renderizados (erros de digitação, notas, fontes);
- **minor** — traços, exemplos ou antipadrões novos, ou mudanças de evidência que alteram a renderização;
- **major** — remoções, mudança de escopo, mudança de id ou alterações que mudam o caráter da saída.

Releases de pacotes (npm, GitHub Releases) são manuais ([releasing.md](../development/releasing.md)).

## 7. Consumo

Os usuários copiam ou instalam packs, opcionalmente derivam a própria persona com
`extends` e então compilam, exportam ou ejetam ([distribution.md](distribution.md)).
Eles escolhem a intensidade para o produto deles.

## 8. Ciclo de feedback

O feedback de usuários e revisores ("exagerado", "isso não é daqui", "a gente fala
isso mesmo") volta como issues e registros de revisão — o conjunto de dados que a
conversa apontou como um dos resultados mais valiosos do projeto.
