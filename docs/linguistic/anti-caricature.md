# Política anti-caricatura

Esta é a regra de conteúdo mais importante do projeto. Registro de decisão:
[ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md).

## A regra

Uma persona regional muda **como as coisas são ditas**, nunca **quem alguém é**.

A regionalidade nunca pode implicar, sugerir ou encenar:

- personalidade (tranquilo, preguiçoso, trabalhador, caloroso, frio...);
- humor ou ser "engraçado";
- inteligência ou competência;
- agressividade ou simpatia;
- escolaridade ou letramento;
- renda ou classe social;
- profissão;
- religião;
- visão política;
- qualquer comportamento ou atitude.

Se personalidade um dia virar uma preocupação do projeto, ela pertence a uma camada
separada, projetada à parte — nunca aos packs regionais.

## O que o contraexemplo ensina

A conversa de concepção apontou o erro a evitar desde o primeiro commit:

```yaml
baiano:
  relaxed: true
  humorous: true
  likes_to_talk: true
  uses_oxe: true
  uses_meu_rei: true
```

São três problemas de uma vez: traços psicológicos atribuídos a uma população; um
estado inteiro tratado como uma única comunidade de fala; e um par de palavras
salientes representando uma variedade — o que, enfiado em toda frase, é exatamente
o som de uma caricatura. O formato torna o primeiro impossível (esses campos não
existem; campos desconhecidos são rejeitados), o esquema de ids e a metodologia
tratam do segundo, e evidência + intensidade + antipadrões tratam do terceiro.

## Regras de base presentes em toda renderização

Toda saída compilada, em qualquer intensidade, instrui o modelo a
(veja [compilation.md](../architecture/compilation.md)):

1. manter o papel, as regras, as políticas e os fatos do agente hospedeiro; preferir linguagem neutra quando o estilo regional prejudicaria clareza, precisão ou adequação;
2. aplicar a camada apenas à linguagem (vocabulário, marcadores discursivos, estrutura das frases, formas de tratamento, convenções conversacionais);
3. nunca atribuir ou encenar personalidade, humor, inteligência, escolaridade, renda, classe social, profissão, religião, visão política ou comportamento com base na origem regional; nunca imitar um estereótipo;
4. nunca afirmar ser da região nem ter história pessoal lá;
5. usar apenas as formas listadas; nunca inventar regionalismos nem emprestar formas de outras regiões;
6. não forçar traços em toda frase;
7. usar a ortografia padrão, a menos que a persona permita explicitamente grafia fonética.

Essas regras são normativas para qualquer renderizador
([visão geral da especificação](../specification/overview.md)). O texto delas no
compilador de referência fica em inglês, porque é lido pelo modelo
([ADR-0016](../decisions/0016-documentation-in-portuguese.md)). O rascunho de SKILL.md
da conversa ("Do not impersonate a stereotypical 'Bahian person'... They do not imply
personality, intelligence, profession, socioeconomic status, political views,
behavior. Preserve the parent agent's role and business rules.") é a origem desta
lista.

## Riscos específicos e como o design responde

| Risco | Resposta |
| --- | --- |
| Excesso (um marcador em cada oração) | faixas de intensidade; "não forçar traços"; antipadrões `overuse`; dimensão de eval |
| Grafia fonética / "eye dialect" (grafia de deboche) | `phoneticSpelling: avoid` por padrão; antipadrões `phonetic-spelling` |
| Regionalismos inventados | só as formas listadas são renderizadas; `hypothesis` nunca é renderizada; `corroborated` exige fontes reais independentes, só aparece a partir de 0.5 e vai numa seção marcada como não confirmada; dimensão de eval |
| Formas de outra região | antipadrões `wrong-region`; rótulo de revisão "isso é de outra região" |
| Atitudes estereotipadas vazando para o conteúdo | regra de base 3; antipadrões `stereotype`; evals de vazamento de estereótipos |
| O agente afirmar ser local | regra de base 4 |
| Intensidade alta como licença para exagerar | a intensidade nunca afrouxa as regras; "exagerado" na intensidade 1 é defeito |
| Formas ofensivas ou antiquadas | `discouraged` com motivo; rótulo de revisão "é ofensivo" |

## Afirmações

Não descreva nenhum pack, saída ou traço como linguisticamente validado,
representativo de uma região, natural, livre de estereótipos ou pronto para produção
sem evidência de revisão humana e evals. A maturidade fixture e draft precisa
continuar visível.
