# ADR-0010: Modelar apenas traços sociolinguísticos observáveis; nenhuma personalidade regional

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("O erro que eu evitaria desde o primeiro commit"; o contraexemplo `baiano: relaxed/humorous/likes_to_talk`)

## Contexto

Um design ingênuo codifica estereótipos como dados:

```yaml
baiano:          # ← o que o Vernáculo nunca deve fazer
  relaxed: true
  humorous: true
  likes_to_talk: true
```

Isso vira caricatura rapidamente e atribui traços psicológicos ou sociais às
pessoas por causa de onde elas vêm. Rótulos como *baiano*, *sergipano*,
*pernambucano* ou *paulista* também são grossos demais para serem tratados como
unidades linguísticas homogêneas: a dialetologia (por exemplo, o atlas ALiB)
documenta variação multidimensional dentro dos estados e continuidades que
atravessam fronteiras estaduais.

## Decisão

- Personas descrevem apenas **fenômenos de linguagem observáveis e defensáveis**: léxico e regionalismos, formas de tratamento, marcadores discursivos, convenções pragmáticas, construções morfossintáticas, registro, frequência/marcação (via intensidade), política de ortografia e exemplos positivos e negativos.
- Personas nunca codificam **personalidade, humor, inteligência, agressividade, simpatia, escolaridade, renda, profissão, religião, visão política ou comportamento**. O formato não tem campo para isso (campos desconhecidos são rejeitados; veja o fixture de conformidade `personality-traits-rejected`).
- Toda saída compilada carrega regras de base que proíbem encenar estereótipos, afirmar origem regional, inventar regionalismos e (por padrão) usar grafia fonética/"eye dialect" ([anti-caricature.md](../linguistic/anti-caricature.md)).
- A granularidade é progressiva e guiada por evidência (`pt-BR` → `pt-BR/ba` → `pt-BR/ba/salvador`, ou variedades que não seguem fronteiras administrativas). Nenhuma região é inventada sem evidência.
- Todo traço declara seu nível de **evidência**; `hypothesis` nunca é renderizado e `synthetic` só é permitido em fixtures.
- Nada é chamado de "validado", "representativo", "natural" ou "livre de estereótipos" sem evidência de revisão humana e evals.

## Consequências

- Se um dia personalidade virar uma preocupação, ela pertence a outra camada e a um ADR novo — nunca aos packs regionais.
- A revisão humana por falantes de cada variedade faz parte da metodologia, sempre recomendada ([human-review.md](../linguistic/human-review.md)).

## Alternativas consideradas

- **"Traços de estilo" livres por região** — rejeitado: impossível de distinguir de estereótipos.
- **Apenas packs por estado** — rejeitado: grosso demais; o esquema de ids suporta variedades mais finas, baseadas em evidência.
