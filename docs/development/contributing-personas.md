# Contribuindo com um pack de persona

Leia antes: [metodologia](../linguistic/methodology.md),
[política anti-caricatura](../linguistic/anti-caricature.md),
[formato](../specification/persona-format.md),
[proveniência](../specification/provenance.md).

## Antes de começar

- Confira [regional-packs.md](../linguistic/regional-packs.md) e as issues abertas: alguém pode já estar pesquisando a variedade.
- Confirme que você pode citar fontes cujas licenças permitem o uso pretendido ([sources.md](../linguistic/sources.md)).
- Planeje uma revisão por pessoas familiarizadas com a variedade: sempre recomendada, nunca obrigatória ([human-review.md](../linguistic/human-review.md)).
- Os packs da biblioteca são licenciados sob Apache-2.0: defina `metadata.license: Apache-2.0`; ao contribuir, você licencia o seu conteúdo sob ela ([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)).

## Passos

1. Crie `personas/<idioma>/<slug>/.../persona.yaml` com `maturity: draft` e `license: Apache-2.0`. O caminho do diretório precisa ser igual a `metadata.id`.
2. Acrescente as fontes em `provenance.sources` com `license`, `usage` e `accessed`.
3. Acrescente os traços. Cada um precisa de `evidence`; `attested`/`reported` precisam de `sources`. Mantenha formas não confirmadas como `hypothesis` (nunca renderizadas).
4. Defina `minIntensity` nos traços marcados; defina `regionality.defaultIntensity` para o uso típico do pack (geralmente sutil).
5. Acrescente `examples` positivos (com `neutral`, `text` e `intensity`) em situações realistas e variadas, sem pressupor um caso de uso ([ADR-0017](../decisions/0017-any-ai-use-case-neutral-packs.md)).
6. Acrescente `antiPatterns`: excesso, grafia fonética, atitudes estereotipadas, formas de outras regiões.
7. Escreva `RESEARCH.md` ao lado do `persona.yaml` (veja o de
   [Salvador](../../personas/pt-BR/ba/salvador/RESEARCH.md)): escopo, critério de
   evidência, o que cada fonte diz, o que entrou, o que ficou como hipótese ou foi
   descartado, licenças, perguntas para revisores e referências completas.
8. Valide e observe a saída:

   ```bash
   pnpm build
   pnpm vernaculo validate
   pnpm vernaculo inspect pt-BR/<...> --intensity 0.7
   pnpm vernaculo compile pt-BR/<...> --intensity 0.3
   pnpm vernaculo compile pt-BR/<...> --intensity 1
   ```

9. Escreva um `SPEAKER-SURVEY.md` (veja o de
   [Salvador](../../personas/pt-BR/ba/salvador/SPEAKER-SURVEY.md)) com as formas do
   pack e as hipóteses, para confirmação por falantes.
10. Teste com um modelo real e gere amostras para revisores com o
   [laboratório local](../../examples/agent-lab/) (a sua chave, o seu modelo).
11. Abra um pull request descrevendo as fontes, as lacunas de evidência e os riscos conhecidos.

## Checklist de revisão

- [ ] Nenhuma personalidade, atitude, humor, classe, escolaridade, profissão, religião, política ou comportamento — em lugar nenhum, incluindo exemplos e notas.
- [ ] Nenhum caso de uso pressuposto: nada de "cliente", "venda" ou "atendimento" como moldura; adequação descrita por registro e relação.
- [ ] Todo traço renderizado tem evidência; `attested`/`reported` citam fontes; nenhum conteúdo `synthetic`.
- [ ] O `RESEARCH.md` existe e bate com o `persona.yaml` (mesmas fontes, mesmas decisões).
- [ ] O uso de cada fonte bate com a licença dela; nada copiado que não possa ser redistribuído.
- [ ] A granularidade é justificada por evidência (e não "o estado inteiro" por padrão).
- [ ] A saída na intensidade 1 ainda não é caricatura; a intensidade 0 é neutra.
- [ ] Os exemplos são realistas e estão na intensidade declarada; os antipadrões cobrem os principais riscos.
- [ ] `metadata.license` é `Apache-2.0`.
- [ ] `maturity` é `draft`, a menos que uma revisão humana tenha realmente acontecido (nesse caso, cite-a; um registro é recomendado). Se ainda não houve revisão, o PR recomenda uma.
- [ ] A documentação foi atualizada se o pack exigiu convenções novas.

## Personas de empresas ou projetos

Não modifique packs da biblioteca por preferências de uma empresa. Mantenha uma
persona derivada no seu próprio repositório, com `extends`
([inheritance-and-composition.md](../specification/inheritance-and-composition.md)).
