---
name: evals
description: Projeta, implementa ou mantém evals do Vernáculo para packs de persona e adapters — naturalidade, fidelidade regional, preservação da tarefa e das regras do agente pai, excesso, caricatura, vazamento de estereótipos, regionalismos inventados, comportamento por intensidade e consistência entre provedores — além de rótulos e registros de revisão humana. Use ao adicionar verificações determinísticas, conjuntos de cenários, um executor de evals (por exemplo, integração com Promptfoo), rodadas de revisão, ou ao julgar se uma mudança no compilador ou em um pack é segura.
---

# Evals

## Leia antes

- `docs/evals/strategy.md` — restrições (local, reproduzível, credenciais do próprio usuário), as três camadas, questão em aberto do executor
- `docs/evals/dimensions.md` — cada dimensão: pergunta, medida, o que já existe
- `docs/evals/cross-provider.md`
- `docs/linguistic/human-review.md` — rótulos, revisores, privacidade, formato de registro

## Estado atual

- A camada 1 (determinística) existe: conformidade, paridade, resolução, filtragem da IR, golden files, presença das regras de base em toda intensidade, testes de arquitetura/sem rede, `vernaculo validate` no CI.
- As camadas 2 (com modelos) e 3 (rodadas humanas) estão planejadas. A escolha do executor (configurações geradas para o Promptfoo vs. executor no repositório) é a questão em aberto OQ-03 — decida com um ADR antes de construir.
- Ainda não existe diretório `evals/`; crie-o com a primeira suíte real, não antes.

## Regras

1. **Nenhum serviço de eval hospedado**, nenhuma credencial do projeto. Evals com modelos usam as chaves de provedor ou os modelos locais de quem avalia e são opcionais no CI (nunca exigidos pelo `pnpm check`).
2. **Nunca fixe nomes de modelos**; leia-os da configuração e registre-os junto com os resultados (provedor, modelo, data, versão do adapter, parâmetros).
3. **Toda dimensão precisa de um controle**: intensidade 0 e um prompt de hospedeiro neutro.
4. **Cenários adversariais são obrigatórios para vazamento de estereótipos**: pedidos de piada sobre uma região, "de onde você é?", "fala como um <gentílico> de verdade!".
5. **Juízes com modelo são sinais, não provas.** A maturidade e as afirmações se apoiam em revisão humana — que é sempre recomendada, nunca obrigatória (ADR-0015).
6. **Ligue os resultados às versões**: `metadata.version` da persona, `INSTRUCTIONS_FORMAT`, versão do pacote.
7. **Privacidade na revisão humana**: ids pseudônimos de revisores, perfil genérico, consentimento; nenhum dado pessoal no repositório.
8. Verificações determinísticas ficam nos testes dos pacotes; mantenha-as significativas (faça checagem por mutação nos testes de invariantes novos).

## Ao mudar o compilador ou um pack

- Rode `pnpm check` de novo; inspecione os diffs dos golden files linha a linha.
- Compile em 0 / padrão / 0.7 / 1 e procure excesso, regras de base faltando, traços acima da intensidade e vazamento de hipóteses.
- Registre na descrição do PR o efeito esperado da mudança em cada dimensão.
- Atualize `docs/evals/*` se métodos ou dimensões mudarem (skill `documentation-maintenance`).
