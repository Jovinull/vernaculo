# ADR-0008: Git e sistema de arquivos em vez de banco de dados, registry ou marketplace

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("Eu não colocaria banco de dados", "Não precisa de marketplace. Não precisa de registry próprio.")

## Contexto

Personas são documentos pequenos, revisados por pessoas e versionados. O
histórico, a revisão e o processo de release delas se encaixam naturalmente no Git
(commits, pull requests, CI, tags). Um banco de dados ou um registry proprietário
acrescentaria infraestrutura, custo e lock-in
([ADR-0001](0001-no-vernaculo-infrastructure-at-runtime.md)).

## Decisão

- **Nenhum banco de dados** (PostgreSQL, SQLite, Redis, MongoDB, ...) em nenhuma parte do Vernáculo. O "banco" é **Git + sistema de arquivos**.
- Uma **raiz de personas** é um diretório em que cada persona fica em `<raiz>/<id da persona>/persona.yaml`. As ferramentas buscam em uma ou mais raízes, em ordem; a primeira raiz que contém um id vence.
- **Canais de distribuição são conveniências opcionais**, todos espelháveis e gratuitos: GitHub (clone), GitHub Releases, npm (e talvez PyPI no futuro) ou cópia simples (`curl`, cópia de arquivos). Nenhum é necessário em runtime.
- `vernaculo eject` materializa uma persona autocontida (`persona.yaml` achatado + `instructions.md` compilado) dentro do projeto do usuário, eliminando qualquer dependência de pacotes do Vernáculo.
- Não existe marketplace proprietário. Um catálogo da comunidade, se um dia existir, será dado em um repositório Git.

## Consequências

- O versionamento dos packs usa semver em `metadata.version` mais o histórico do Git; releases passam por PR → CI → evals → tag.
- Como o catálogo público chega a `vernaculo add/search/update` (dados embutidos, um pacote npm como `@vernaculo/personas`, tarballs de release ou Git) é uma [questão em aberto](../roadmap/open-questions.md).

## Alternativas consideradas

- **Catálogo em SQLite** — rejeitado: binário, difícil de revisar, desnecessário nesta escala.
- **API de registry hospedada** — rejeitado: custo de runtime/infraestrutura e lock-in.
