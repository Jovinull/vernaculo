# Testes

```bash
pnpm test            # todos os testes (sobre os fontes, sem build)
pnpm test:watch
pnpm check           # lint + typecheck + testes + build + validação de dados (o que o CI roda)
```

Os testes importam os fontes dos pacotes pela condição de export
`@vernaculo/source` (`vitest.config.ts`), então nunca testam builds desatualizados.

## O que é testado, e onde

| Área | Arquivo | Garantias |
| --- | --- | --- |
| Conformidade com a especificação (estrutura) | `packages/schema/test/conformance.test.ts` | todo arquivo de conformidade recebe o mesmo veredito do Ajv (JSON Schema canônico) e do Zod |
| Paridade de schemas | `packages/schema/test/schema-parity.test.ts` | o JSON Schema gerado a partir do Zod tem exatamente as restrições canônicas, nó a nó |
| Conformidade com a especificação (semântica, resolução) | `packages/core/test/conformance.test.ts` | fixtures semânticos falham com o código esperado; casos de resolução produzem a linhagem e o documento achatado esperados (incluindo a ordem das chaves) |
| Parse | `packages/core/test/parse.test.ts` | erros de YAML, chaves duplicadas, valores fora do modelo JSON, caminhos dos issues, todos os issues do documento reportados de uma vez |
| Resolução | `packages/core/test/resolve.test.ts` | linhagem, cancelamento, herança de escalares, determinismo, sombreamento entre raízes, arquivos de projeto, ids seguros para caminhos, limite de profundidade, ordem da listagem |
| Intensidade / IR | `packages/core/test/ir.test.ts` | limites, neutralidade no 0, filtragem, hipóteses nunca renderizadas, filtragem de exemplos, IR congelada, sem mutação |
| Serialização | `packages/core/test/serialize.test.ts` | ida e volta; aspas seguras para YAML 1.1 |
| Invariantes de arquitetura | `packages/core/test/architecture.test.ts` | nenhum import ou dependência de SDK de provedor/rede; direção de dependências; pontos de entrada independentes de runtime; toda persona da biblioteca é Apache-2.0 (ADR-0014) |
| Compilador | `packages/compiler/test/compile.test.ts` | saídas golden por intensidade; regras de base em toda intensidade; aviso de maturidade; determinismo; escape; funciona com a rede desativada |
| Adapter da OpenAI | `packages/openai/test/openai.test.ts` | ordem da composição, imutabilidade, idempotência por requisição, sem dependência de SDK |
| Exportador de skills | `packages/skills/test/skills.test.ts` | restrições da especificação Agent Skills, estrutura, filtragem, determinismo |
| CLI | `packages/cli/test/cli.test.ts` | todos os comandos, códigos de saída, proteção contra sobrescrita, ida e volta do eject (a persona ejetada compila para instruções idênticas), recomendação de revisão para rascunhos e notas de licença nos arquivos ejetados (ADR-0015) |

## Convenções

- Teste comportamento e invariantes, não detalhes de implementação; nada de testes escritos só para aumentar cobertura.
- Use `fixtures/personas` (sintético) ou YAML sintético inline. Nunca coloque afirmações regionais reais nos testes.
- Arquivos temporários vão para `os.tmpdir()` e são removidos em `afterAll`.
- Golden files (`__golden__/*.md`) só mudam de propósito: rode `pnpm vitest run <caminho> -u`, revise o diff e explique a mudança de redação.
- Quando a especificação mudar, acrescente primeiro os fixtures de conformidade (válidos e inválidos) e depois atualize os dois validadores.
- Checagem por mutação é um bom hábito para testes de invariantes: quebre a regra de propósito uma vez e confirme que o teste falha.
- Nomes de testes e mensagens de asserção ficam em inglês, como o resto do código ([ADR-0016](../decisions/0016-documentation-in-portuguese.md)).
