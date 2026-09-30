---
name: linguistic-research
description: Cria, amplia ou revisa um pack de persona regional do Vernáculo (por exemplo pt-BR/ba/salvador, pt-BR/pe/recife) com evidência citada, licenças conferidas e sem caricatura. Use ao adicionar traços linguísticos, exemplos ou antipadrões, pesquisar uma variedade, avaliar uma fonte (ALiB, NURC, corpora, datasets), revisar o PR de um pack ou responder se uma forma regional pertence a um pack.
---

# Pesquisa linguística para packs regionais

## Leia antes

- `docs/linguistic/methodology.md` — o que é modelado, granularidade, evidência
- `docs/linguistic/anti-caricature.md` — a política inegociável
- `docs/specification/provenance.md` — níveis de evidência, uso das fontes, maturidade
- `docs/linguistic/sources.md` — fontes conhecidas e suas licenças verificadas
- `docs/development/contributing-personas.md` — passos e checklist de revisão

## Regras rígidas

1. **Nunca invente regionalismos.** Não acrescente uma forma porque ela "soa regional" ou porque um modelo sugeriu. Você (Claude) não pode gerar traços regionais a partir do próprio conhecimento como se fossem evidência: encontre uma fonte citável ou registre como `hypothesis`, com uma nota, para que pessoas confirmem.
2. **Evidência por traço.** `attested` precisa de uma fonte publicada; `reported` precisa de uma rodada de revisão por falantes citada; o resto é `hypothesis` (nunca renderizada).
3. **Licenças.** Para cada fonte, registre `license`, `usage` (`consulted` / `cited` / `redistributed`) e `accessed` (data entre aspas). Parafraseie com citação; nunca copie conteúdo de corpus/atlas, a menos que a licença permita redistribuição sob a licença do pack. O MuPe-Diversidades é CC BY-NC-ND 4.0: só consultar/citar.
4. **Fontes primárias primeiro**: universidades, páginas institucionais, artigos revisados por pares, repositórios oficiais. Verifique com acesso à web; se não houver, registre o ponto como verificação pendente — nunca afirme uma confirmação que você não tem.
5. **A granularidade segue a evidência**: nível de cidade por padrão; nada de variedade estadual ou não administrativa sem evidência; compartilhe traços com `extends` explícito.
6. **Só linguagem**: nada de personalidade, humor, classe, escolaridade, profissão, religião, política ou comportamento — em traços, exemplos, notas ou explicações de antipadrões.
7. **Maturidade honesta**: trabalho novo é `draft`. A revisão humana por falantes é sempre recomendada e nunca obrigatória (ADR-0015): recomende-a sempre, nunca bloqueie por causa dela. Defina `reviewed` só quando uma revisão realmente aconteceu (`docs/linguistic/human-review.md`) e cite-a. Nunca descreva um pack como validado, natural ou representativo sem evidência.
8. **Licença**: packs da biblioteca são Apache-2.0 (`metadata.license: Apache-2.0`, ADR-0014).
9. **Idioma**: o conteúdo da persona fica no idioma da variedade; a documentação da pesquisa, em português (ADR-0016).
10. **Nenhum caso de uso pressuposto** (ADR-0017): o pack serve a qualquer IA. Nada de "cliente", "venda", "atendimento" como moldura de traços, contextos, motivos, exemplos ou antipadrões; descreva a adequação pelo registro e pela relação (formal/informal, desconhecido, mais velho, próximo). Exemplos cobrem situações variadas.

## Procedimento

1. Delimite a variedade (padrão: uma cidade). Não delimite um caso de uso: o pack serve a qualquer IA; a intensidade padrão é sutil por prudência.
2. Reúna traços candidatos com fontes; separe evidência de hipótese no `RESEARCH.md` do pack.
3. Escreva/amplie `personas/<id>/persona.yaml` (veja `docs/specification/persona-format.md`): `minIntensity` nos traços marcados, itens contextuais com contextos explícitos, formas desencorajadas com motivo.
4. Acrescente exemplos positivos (neutro vs. com a camada, intensidade declarada) e antipadrões (excesso, grafia fonética, estereótipo, outra região, formas inventadas).
5. `pnpm build && pnpm vernaculo validate` e depois `pnpm vernaculo compile <id> --intensity 0|padrão|1`; leia a saída com olhar crítico: a intensidade 1 continua não sendo caricatura? o 0 é neutro?
6. Prepare amostras e perguntas para revisores humanos (rótulos em `human-review.md`).
7. Registre fontes novas em `docs/linguistic/sources.md` se forem relevantes de forma ampla; atualize o status em `docs/linguistic/regional-packs.md`.

## Revisando um pack

Use o checklist de `docs/development/contributing-personas.md`. Bloqueie quando houver:
conteúdo de personalidade/comportamento, evidência faltando, licença incompatível,
granularidade sem justificativa, caricatura em intensidade alta, maturidade exagerada.
A falta de revisão humana não bloqueia: recomende-a.
