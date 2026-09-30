---
paths:
  - "personas/**"
  - "fixtures/**"
  - "examples/**/*.yaml"
  - "schemas/conformance/**"
---

# Regras para dados de persona

- Packs da biblioteca (`personas/`) descrevem a variedade para qualquer IA, sem pressupor caso de uso (ADR-0017): nada de "cliente", "venda" ou "atendimento" como moldura; adequação descrita por registro e relação (formal/informal, desconhecido, mais velho, próximo). Personas de projeto (como `examples/project-persona`) podem, sim, ser específicas de um uso.
- Só traços de linguagem observáveis. Nunca personalidade, humor, inteligência, simpatia, agressividade, escolaridade, renda, classe social, profissão, religião, política ou comportamento — nem em notas ou exemplos.
- Nunca invente formas regionais. Traços reais precisam de `evidence` (`attested`/`reported` com `sources`); só use `corroborated` quando não houver fonte que sustente `attested` e duas fontes públicas independentes (≥ 1 local, com origens de evidência independentes) concordarem no mesmo sentido, com `minIntensity` ≥ 0.5 (ADR-0018, critérios em `docs/linguistic/methodology.md`). Esse rótulo não atesta frequência nem exclusividade regional; o resto fica como `hypothesis` (nunca renderizada).
- Evidência `synthetic` e palavras inventadas só são permitidas em `fixtures/` e nos arquivos de conformidade, sempre com `maturity: fixture`, claramente marcadas como não sendo conteúdo linguístico, em segmentos de id `x-`.
- `personas/` (a biblioteca real) só recebe conteúdo de pesquisa de verdade, começando como `maturity: draft`, com `metadata.license: Apache-2.0` (ADR-0014, verificado por teste).
- A revisão humana é sempre recomendada, nunca obrigatória (ADR-0015): recomende-a para todo rascunho; defina `reviewed` só quando uma revisão por falantes realmente aconteceu, e cite-a como fonte `speaker-review`.
- Toda fonte registra `license`, `usage` (`consulted` / `cited` / `redistributed`) e `accessed` (data entre aspas). Nunca copie conteúdo de corpus ou dataset, a menos que a licença permita redistribuição sob a licença do pack.
- O caminho do diretório dentro de uma raiz de personas precisa ser igual a `metadata.id`; slugs são ASCII minúsculo.
- Coloque entre aspas as datas e as strings ambíguas em YAML 1.1 (`"yes"`, `"no"`, `"on"`).
- Os nomes dos campos são do formato (em inglês); o conteúdo de cada persona fica no idioma da variedade.
- Valide com `pnpm build && pnpm vernaculo validate --root <raiz>` e observe a saída de `compile` nas intensidades 0, padrão e 1.
- Para trabalho com packs, carregue a skill `linguistic-research`.
