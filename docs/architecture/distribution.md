# Distribuição e zero lock-in

Canais de distribuição são conveniências. Nenhum deles é necessário em runtime
([ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md),
[ADR-0008](../decisions/0008-git-and-filesystem-no-database.md)).

```text
                  GitHub (fonte da verdade: especificação + packs + código)
                         │
          ┌──────────────┼───────────────────┐
     git clone     GitHub Releases          npm            (cópia simples / curl também funciona)
          └──────────────┼───────────────────┘
                         ▼
                 projeto do usuário ──► provedor ou modelo local do usuário
```

## Três modos de consumo

| Modo | Como | Dependência do Vernáculo em runtime |
| --- | --- | --- |
| **Pack** | copiar uma persona (ou uma cópia ejetada e achatada) para o projeto | nenhuma |
| **Skill** | `vernaculo export <persona> --target skill` e copiar o diretório para o agente | nenhuma |
| **SDK** | `@vernaculo/core` + `@vernaculo/compiler` + adapter instalados pelo npm | só pacotes que o usuário instalou e controla |

A conversa pedia que consumir uma persona não exigisse Node, Python nem qualquer
biblioteca. Hoje os modos Pack e Skill atendem a isso depois que os arquivos
existem, mas *produzi-los* (`export`, `eject`, `compile`) exige a CLI em Node.
**Planejado:** os releases da biblioteca de personas trarão artefatos prontos por
pack (uma skill exportada e o `instructions.md` compilado na intensidade padrão),
para que quem consome possa baixar arquivos simples sem nunca rodar as ferramentas
do Vernáculo.

## Raízes de personas

Uma raiz de personas é um diretório organizado como `<raiz>/<id da persona>/persona.yaml`:

```text
personas/
└── pt-BR/
    └── ba/
        └── salvador/
            └── persona.yaml
```

As ferramentas aceitam várias raízes (`--root a --root b`); a primeira que contém
um id vence, o que permite a um projeto sombrear localmente uma persona da
biblioteca. Um projeto também pode manter arquivos avulsos (`acme-salvador.yaml`)
cuja cadeia de `extends` é resolvida pelas raízes.

Na conversa, o diretório de um pack também continha `SKILL.md`, `examples.yaml`,
`evals.yaml`, `SOURCES.md`, `knowledge/*.yaml`... Na v1alpha1 a fonte de um pack é um
único `persona.yaml`; o `SKILL.md` é gerado; dividir um pack em vários arquivos e
incluir evals por pack são [questões em aberto](../roadmap/open-questions.md).

## `eject` — deixando o Vernáculo para trás

```bash
vernaculo eject pt-BR/ba/salvador --intensity 0.3
# → vernaculo/pt-BR/ba/salvador/{persona.yaml, instructions.md, README.md}
```

- O `persona.yaml` é **achatado**: toda a linhagem resolvida, `extends` removido e a linhagem (ids, versões, maturidade, licenças) registrada em um comentário de cabeçalho. É uma persona autônoma válida.
- O `instructions.md` é a camada compilada; a aplicação pode lê-lo como texto simples sem nenhum pacote do Vernáculo instalado.
- Recompilar o `persona.yaml` ejetado produz instruções idênticas byte a byte (testado).
- O `README.md` ejetado lista as licenças de conteúdo da linhagem (packs da biblioteca são Apache-2.0: mantenha o aviso e marque as alterações se redistribuir os arquivos) e, para rascunhos, recomenda revisão humana.
- A CLI não edita o `package.json` do usuário; remover as dependências `@vernaculo/*` depois do eject é decisão do usuário.

## Planejado: `add`, `search`, `update`

A conversa descreveu `vernaculo search brasil`, `vernaculo add pt-BR/ba/salvador`
(também `npx vernaculo add ...`) copiando arquivos para o projeto, e
`vernaculo update` / `pnpm update @vernaculo/personas`. Isso depende de como o
catálogo público será entregue (embutido na CLI, um pacote npm `@vernaculo/personas`,
tarballs no GitHub Releases ou Git) — uma [questão em aberto](../roadmap/open-questions.md).
Seja qual for a escolha: os arquivos são copiados para o projeto e nada é buscado
em runtime da aplicação.

## Publicação

Publicar no npm e no GitHub Releases são ações manuais do mantenedor
([releasing.md](../development/releasing.md)); nada é publicado automaticamente. Um
site estático de documentação/catálogo (por exemplo, Astro + Starlight no GitHub
Pages ou no Cloudflare Pages) é uma ideia; ele nunca ficaria no caminho de runtime.
