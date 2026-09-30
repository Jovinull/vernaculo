# Questões em aberto

Decisões ainda não tomadas. Cada uma deve terminar como um ADR, uma mudança na
especificação ou uma convenção documentada. Remova uma entrada quando ela for
resolvida (o Git guarda o histórico); os ids nunca são reutilizados.

Resolvidas até agora:

- OQ-01, licença do conteúdo dos packs → Apache-2.0 ([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)).
- OQ-02, critérios para `reviewed` → nenhum obrigatório; revisão sempre recomendada ([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)).
- OQ-14, hospedagem do repositório → https://github.com/Jovinull/vernaculo (público), com os campos `repository`, `homepage` e `bugs` nos `package.json`.

| ID | Questão | Contexto / opções | Bloqueia |
| --- | --- | --- | --- |
| OQ-03 | **Executor de evals** | Gerar configurações do Promptfoo a partir de arquivos de cenário do Vernáculo vs. um executor pequeno no repositório; formato dos arquivos de cenário; como os resultados são guardados. | evals com modelos |
| OQ-04 | **Distribuição do catálogo para `add` / `search` / `update`** | Embutir os packs no pacote da CLI; publicar um pacote npm `@vernaculo/personas` (a conversa citou `pnpm update @vernaculo/personas`); tarballs no GitHub Releases; ou sparse checkout do Git. Tem de continuar sendo só no momento da instalação. | comando `add` |
| OQ-05 | **Modelagem de registro** | Registro formal/informal como opção de compilação, aplicabilidade por traço ou subpersonas. Hoje a adequação é descrita no `context`/`usage` de cada traço. Variantes por caso de uso (`.../customer-service`, `register: "customer-service"` da conversa) ficam fora da biblioteca, como personas de projeto (ADR-0017). | — |
| OQ-06 | **Packs com vários arquivos** | Manter um único `persona.yaml` ou permitir `knowledge/*.yaml`, `examples/*.yaml`, `evals/*.yaml`, `SOURCES.md` (estrutura da conversa), com semântica de inclusão definida. O `RESEARCH.md` ao lado do pack já é convenção, mas é só documentação (as ferramentas o ignoram) e não resolve esta questão. | — |
| OQ-07 | **Intensidade escolhida em runtime nas skills** | Hoje a intensidade é fixada na exportação. O esboço de `AGENT.md` da conversa definia "Regional intensity: 0.30" no agente hospedeiro; uma skill poderia levar seções filtradas e deixar o hospedeiro escolher, ao custo de depender do modelo para a filtragem. | — |
| OQ-08 | **Enquadramento das instruções localizado** | O texto de enquadramento é em inglês, com o conteúdo da persona no idioma da variedade. O enquadramento deveria ser localizado por idioma? As renderizações deveriam variar por provedor (só com evidência de evals)? | — |
| OQ-09 | **Uma persona base `pt-BR`?** | A estrutura da conversa tinha `personas/pt-BR/base/`. O que uma base poderia conter de forma legítima sem generalizar demais (talvez só formas desencorajadas e antipadrões)? Ou cada localidade deveria ser independente? | primeiros packs reais |
| OQ-10 | **Remover itens herdados que não são formas de superfície** | A v1alpha1 consegue cancelar formas de superfície (desencorajar/reativar), mas não remover um padrão morfossintático, exemplo ou antipadrão herdado. Opções: uma lista `exclude` explícita; `remove: true` por item. | — |
| OQ-11 | **Calibração da intensidade** | Dicas de frequência por traço? Limites de faixa baseados em evidência? Manter só a filtragem? Precisa de dados de evals ("não congelar fórmula prematuramente"). | depois dos evals |
| OQ-12 | **Ritmo, verbosidade e outras dimensões de estilo** | O rascunho 1 tinha um bloco `style` (ritmo, verbosidade). Modelá-los exige evidência linguística e não pode virar personalidade. | — |
| OQ-13 | **Nomes e namespaces** | O escopo npm `@vernaculo` e o pacote `vernaculo` estavam livres em 2026-09-29; a situação do domínio `vernaculo.dev` é desconhecida (ele é só um identificador no `apiVersion`). Registrá-los é uma ação do mantenedor. | primeira publicação |
| OQ-15 | **Termos de contribuição** | A seção 5 da Apache-2.0 já faz as contribuições entrarem sob a mesma licença (sem CLA). Ainda em aberto: exigir DCO ou não; arquivo NOTICE e linha de copyright; código de conduta; política de segurança. | primeiras contribuições externas |
| OQ-16 | **Implementações em outras linguagens** | Prioridade de uma implementação em Python (a conversa citou o PyPI); a suíte de conformidade já está pronta para isso. | — |
| OQ-17 | **Nomes de variedades não administrativas** | Convenções de nome para variedades que não seguem fronteiras administrativas (por exemplo, `reconcavo`) e como documentar a extensão delas. | quando houver evidência para uma |
| OQ-18 | **Voz** | Escopo e momento da regionalização de fala/voz; quais datasets (e licenças) poderiam sustentá-la. | — |
