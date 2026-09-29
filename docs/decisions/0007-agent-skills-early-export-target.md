# ADR-0007: Agent Skills é um target de exportação inicial, não a representação canônica

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("Skills fazem bem mais sentido como formato de exportação"; depois: "Agent Skills deve entrar já no MVP — isso eu mudaria em relação ao que falamos anteriormente")

## Contexto

O padrão aberto Agent Skills define uma skill como um diretório com um `SKILL.md`
(frontmatter YAML + Markdown) e, opcionalmente, `scripts/`, `references/` e
`assets/`. Muitos agentes carregam skills. Uma persona exportada como skill pode
ser colocada em um agente sem instalar nenhum pacote do Vernáculo. A conversa
primeiro colocou as skills entre os adapters futuros e depois moveu
explicitamente o exportador de skills para o primeiro release.

## Decisão

- O **exportador de Agent Skills faz parte do primeiro release** (`@vernaculo/skills`, `vernaculo export <persona> --target skill`).
- `SKILL.md` é uma **saída**, nunca a fonte da verdade. Os packs são escritos como `persona.yaml` ([ADR-0003](0003-yaml-markdown-json-schema-format.md)); as skills são regeneradas a partir deles.
- As skills exportadas seguem a especificação Agent Skills (verificada em 2026-09-29): `name` com até 64 caracteres de `a-z0-9-`, igual ao nome do diretório; `description` com até 1024 caracteres; `metadata` como mapa string→string; `SKILL.md` com menos de 500 linhas; arquivos de referência a um nível de profundidade.
- Na v1alpha1 a intensidade é **fixada no momento da exportação** (registrada em `metadata.vernaculo-intensity`). Deixar o agente hospedeiro escolher a intensidade em runtime é uma [questão em aberto](../roadmap/open-questions.md).

## Consequências

- Uma skill contém apenas os traços selecionados para sua intensidade (a IR); hipóteses e traços acima da intensidade nunca vazam para ela.
- Estrutura gerada: `SKILL.md` mais `references/{vocabulary,discourse,pragmatics,examples,sources}.md` (referências vazias são omitidas; `sources.md` está sempre presente).

## Alternativas consideradas

- **Escrever os packs diretamente como `SKILL.md`** — rejeitado: não é validável, não pode ser filtrado por intensidade e amarra o formato a um ecossistema.
- **Adiar as skills junto com o MCP** — rejeitado pela decisão posterior da conversa: skills são o caminho de distribuição sem instalação mais barato.
