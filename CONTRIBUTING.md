# Contribuindo

Obrigado pelo interesse no Vernáculo. O projeto está no começo; a documentação em
[`docs/`](docs/README.md) é a fonte da verdade.

## Antes de mudar qualquer coisa importante

1. Leia a documentação e os ADRs relacionados ([docs/decisions](docs/decisions/README.md)).
2. Respeite os invariantes de [docs/product/principles.md](docs/product/principles.md) — em especial: nenhuma infraestrutura do Vernáculo em runtime, nenhum acoplamento a provedores no core, compilação determinística e a política anti-caricatura.
3. Para mudanças estruturais, proponha um ADR antes.

## Fluxo de trabalho

```bash
pnpm install
pnpm check          # precisa passar antes de um PR
pnpm changeset      # quando o comportamento público de um pacote publicado mudar
```

- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/) em português, só com a linha de assunto (sem corpo e sem trailers como `Co-Authored-By`), um assunto por commit — por exemplo, `feat(cli): adiciona comando add`, `docs(spec): documenta regra de herança`.
- Código, especificação, evals e documentação mudam juntos: se a sua mudança altera uma decisão, um comportamento, um formato ou um contrato, atualize a página correspondente em `docs/` no mesmo PR.
- A documentação é escrita em português ([ADR-0016](docs/decisions/0016-documentation-in-portuguese.md)).
- Mudanças de comportamento vêm com testes; veja [docs/development/testing.md](docs/development/testing.md).
- Mudanças de formato passam juntas pelo JSON Schema, pelo espelho Zod, pelos fixtures de conformidade e pela documentação da especificação.

## Convenções de código

- TypeScript, ESM, strict; tipos explícitos nos exports (`isolatedDeclarations`); imports com extensão `.ts`; sem enums/namespaces (`erasableSyntaxOnly`).
- Identificadores, comentários de código, nomes de testes e mensagens da CLI ficam em inglês.
- O Biome formata e faz o lint (`pnpm lint:fix`).
- Erros: lance `VernaculoError` com códigos de issue estáveis; código de biblioteca nunca encerra o processo.
- Nada de acesso à rede, SDKs de provedores ou imports `node:` onde a arquitetura proíbe (verificado por testes).

## Packs de persona

Veja [docs/development/contributing-personas.md](docs/development/contributing-personas.md).
Evidência, fontes e conferência de licenças são obrigatórias; a revisão por falantes
da variedade é sempre recomendada (nunca obrigatória). Dados sintéticos ficam só em
`fixtures/`.

## Licença

Tudo no repositório (código, documentação, schemas e conteúdo das personas) é
Apache-2.0. Ao contribuir, você licencia a sua contribuição sob a Apache-2.0 (seção
5); não é preciso CLA. Exigir ou não assinatura DCO ainda é uma questão em aberto.
