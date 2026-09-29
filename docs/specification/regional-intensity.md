# Intensidade regional

A intensidade é um conceito de primeira classe: quão fortemente a camada regional
marca a saída, de linguagem neutra a fortemente marcada.

```text
0.0 ──────────────────────────────── 1.0
linguagem neutra                 variedade fortemente marcada
```

## Contrato (normativo)

- A intensidade é um número JSON em **[0, 1]**. Valores fora do intervalo, não numéricos, `NaN` e infinitos são erro (`invalid-intensity`). As implementações NÃO DEVEM ajustar o valor silenciosamente para dentro do intervalo.
- A intensidade usada em uma compilação é a escolhida por quem chama ou, na falta dela, o `regionality.defaultIntensity` da persona achatada.
- **Regras de seleção** (aplicadas uma única vez, na IR):
  1. Na intensidade **0**, nenhum traço de forma usada e nenhum exemplo é renderizado: a saída é linguagem neutra mais restrições.
  2. Traços com `evidence: hypothesis` **nunca** são renderizados, em nenhuma intensidade.
  3. Um traço é renderizado quando intensidade > 0 e seu `minIntensity` (padrão 0) ≤ intensidade.
  4. Um exemplo é renderizado quando intensidade > 0 e sua `intensity` (padrão 0) ≤ intensidade.
  5. Formas desencorajadas e antipadrões são **sempre** renderizados.
- Toda renderização DEVE transmitir ao modelo a intensidade selecionada e DEVE manter as regras de base anti-caricatura em qualquer intensidade. **Intensidade alta nunca afrouxa as regras de naturalidade ou anti-caricatura.**

## O que a intensidade não é

A intensidade **não é um multiplicador de gírias** ("mais *oxente*"). A conversa foi
explícita: aumentar a intensidade deve ajustar, de forma linguisticamente
fundamentada, a frequência e a marcação de:

- léxico e regionalismos,
- marcadores discursivos,
- formas de tratamento,
- convenções pragmáticas,
- construções sintáticas,
- escolhas de registro e ritmo textual.

Na v1alpha1 isso é expresso apenas por dois mecanismos:

1. **Filtragem por marcação** — os autores definem `minIntensity` nos traços mais marcados, com base em evidência, para que apareçam apenas em intensidades mais altas.
2. **Orientação qualitativa** — o compilador diz ao modelo com que parcimônia usar os traços selecionados (veja as faixas provisórias em [compilation.md](../architecture/compilation.md#redação-da-intensidade-não-normativa-provisória)).

Nenhuma fórmula matemática (por exemplo, "traços por frase = k × intensidade") faz
parte da especificação. Uma calibração desse tipo precisa vir antes de evidência de
evals — veja as [questões em aberto](../roadmap/open-questions.md).

## Orientação para escolher uma intensidade

Da conversa de concepção (provisória, a ser verificada com evals):

| Uso | Faixa |
| --- | --- |
| Atendimento comercial | 0.15–0.35 |
| Personagens de jogos | 0.40–0.70 |
| Experimentos linguísticos | 0.80+ |

O primeiro esboço da conversa usava rótulos (*leve / moderada / forte*); a escala
numérica os substituiu. Os rótulos sobrevivem apenas como faixas de redação não
normativas no compilador.

## Orientação para autores de packs

- Defina `defaultIntensity` para o uso mais comum pretendido do pack (geralmente sutil).
- Deixe `minIntensity` sem definir (0) para traços não marcados ou amplamente compartilhados na variedade; aumente-o para traços que os falantes percebem como fortemente marcados. Registre a evidência dessa percepção.
- Dê uma `intensity` aos exemplos, para que cada um ilustre o nível a que pertence.
- Revise as saídas em várias intensidades (por exemplo, 0, a padrão, 0.7 e 1) com falantes; "exagerado" na intensidade 1 continua sendo um defeito.
