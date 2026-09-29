# ADR-0001: Nenhuma infraestrutura do Vernáculo em runtime

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt`, seções "Zero custo para você de verdade" e o modelo de distribuição; bootstrap

## Contexto

O Vernáculo é mantido como projeto open source com uma restrição explícita: o custo
operacional do mantenedor deve continuar essencialmente zero mesmo com adoção
massiva ("se amanhã houver 1 milhão de instalações, seu custo de inferência
continua R$ 0"). Uma API hospedada, um proxy ou um serviço de inferência fariam o
custo crescer com o uso, criariam um ponto único de falha e colocariam o mantenedor
no caminho dos dados dos usuários.

## Decisão

> **Uma aplicação que utiliza Vernáculo não deve depender da infraestrutura do Vernáculo em runtime.**
>
> *An application that uses Vernáculo must not depend on Vernáculo infrastructure at runtime.*

Concretamente, o core e todos os pacotes oficiais funcionam sem:

- API, backend, proxy ou banco de dados do Vernáculo;
- conta, chave ou autenticação do Vernáculo;
- tokens ou inferência pagos ou executados pelo mantenedor;
- telemetria obrigatória;
- registry ou marketplace proprietário necessário em runtime.

Os usuários executam o Vernáculo dentro do próprio projeto ou servidor, com a
própria conta de provedor, a própria API key ou um modelo local. Personas são
arquivos que o usuário possui: se o repositório do Vernáculo desaparecesse,
aplicações que já instalaram ou ejetaram um pack continuariam funcionando.

Serviços permitidos do lado do mantenedor são os que não custam nada por uso e não
ficam no caminho de runtime: GitHub (repositório, Actions para CI, Releases), npm
(e talvez PyPI) para distribuição opcional e, opcionalmente, um site estático de
documentação em hospedagem gratuita.

## Consequências

- A distribuição é por cópia de arquivos: npm, GitHub Releases e Git são canais opcionais, nunca dependências de runtime ([ADR-0008](0008-git-and-filesystem-no-database.md)).
- `vernaculo eject` precisa sempre conseguir materializar uma persona autocontida.
- O compilador precisa ser local e determinístico ([ADR-0011](0011-deterministic-llm-free-compilation.md)).
- Evals rodam localmente ou no CI do usuário, com as credenciais do usuário; não existe serviço de eval hospedado.
- Qualquer recurso futuro que precise de um serviço de rede deve ser opcional, desligado por padrão e substituível por uma alternativa local. Um recurso assim exige um ADR novo.
- Verificação automática: `packages/core/test/architecture.test.ts` falha se algum pacote importar um módulo de rede, chamar `fetch` ou depender de um SDK de provedor; `packages/compiler/test/compile.test.ts` executa o pipeline completo com `fetch` desativado.

## Alternativas consideradas

- **"API de personas" ou servidor MCP hospedado pelo projeto** — rejeitado: o custo cresce com a adoção, cria lock-in e expõe a privacidade dos usuários.
- **Telemetria opcional ligada por padrão** — rejeitado: viola o invariante e a confiança dos usuários.
- **Registry proprietário de packs** — rejeitado: Git, npm e GitHub Releases já oferecem distribuição gratuita e espelhável.
