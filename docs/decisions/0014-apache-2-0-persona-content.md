# ADR-0014: Apache-2.0 para o conteúdo das personas — uma única licença aberta para todo o repositório

- Status: Aceito
- Data: 2026-09-29
- Origem: decisão do mantenedor ("a licença do projeto é para ser open"), resolvendo a questão em aberto sobre a licença do conteúdo dos packs deixada pelo [ADR-0012](0012-apache-2-0-code-license.md)

## Contexto

O ADR-0012 licenciou o código sob Apache-2.0 e deixou em aberto qual licença o
conteúdo dos packs de persona usaria. O mantenedor pediu uma licença aberta e que a
melhor opção fosse aplicada já. Os packs são dados YAML mais textos curtos
(significados, exemplos, antipadrões) que os usuários copiam, estendem, ejetam e
compilam em prompts de agentes comerciais; skills exportadas são copiadas para
outros repositórios.

## Decisão

- O conteúdo de toda persona da biblioteca oficial (`personas/`) e todo arquivo não
  código deste repositório (documentação, schemas, fixtures de conformidade,
  registros de revisão) são licenciados sob **Apache-2.0**, a mesma licença do
  código. O repositório tem uma única licença: `LICENSE`.
- Toda persona da biblioteca declara `metadata.license: Apache-2.0` (verificado por
  `packages/core/test/architecture.test.ts`).
- Contribuições são aceitas sob Apache-2.0 (seção 5: contribuições entram nos termos
  da licença, salvo indicação em contrário).
- Material de terceiros não é afetado ([ADR-0012](0012-apache-2-0-code-license.md)):
  mantém a própria licença e é consultado ou citado; só é redistribuído em um pack
  quando a licença dele permite redistribuição em termos compatíveis com a
  Apache-2.0.
- Personas fora da biblioteca (por exemplo, a persona derivada de uma empresa)
  podem usar qualquer licença; `metadata.license` não é herdado, e a linhagem
  mantém visível a licença de cada ancestral (metadados da linhagem, cabeçalho e
  README do eject, `sources.md` da skill).

## Consequências

- Usuários podem usar, modificar, ejetar e embutir packs comercialmente sem pedir
  permissão. Se redistribuírem os arquivos (por exemplo, publicando uma persona
  ejetada ou uma skill exportada), mantêm o aviso de licença e marcam suas
  alterações — as obrigações usuais da Apache-2.0. Usar as instruções compiladas
  dentro do próprio agente não exige nada a mais.
- Uma única licença significa nenhuma análise de compatibilidade entre código e dados
  dentro do repositório, um único identificador SPDX em todo lugar e os mesmos
  termos para quem contribui.
- Registros de revisão humana também entram sob Apache-2.0; revisores são informados
  disso ao dar consentimento ([human-review.md](../linguistic/human-review.md)).

## Alternativas consideradas

| Licença | Por que não foi escolhida |
| --- | --- |
| **CC-BY-4.0** (comum em dados de pesquisa) | as obrigações de atribuição ao "compartilhar" ficam ambíguas quando o texto vira prompt ou skill exportada; seria uma segunda licença a analisar ao lado do código Apache-2.0 |
| **CC0-1.0** (dedicação ao domínio público) | liberdade máxima, mas perde a cadeia de aviso/atribuição que mantém a proveniência visível, e a renúncia a direitos morais é limitada em algumas jurisdições (como o Brasil), de modo que o CC0 recai em uma licença de qualquer forma |
| **CDLA-Permissive-2.0** (licença de dados) | permissiva e voltada a dados, mas pouco conhecida; acrescenta uma segunda licença sem ganho prático sobre a Apache-2.0 |
| **Copyleft (CC-BY-SA, GPL, ODbL)** | o compartilhamento pela mesma licença conflita com embutir packs em agentes comerciais ([ADR-0012](0012-apache-2-0-code-license.md)) |
