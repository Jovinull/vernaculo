# ADR-0011: Compilação determinística, sem LLM

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("o compiler não chama IA. Portanto custa R$ 0. É basicamente transformação determinística de dados.")

## Contexto

Gerar ou reescrever personas com um modelo em runtime custaria tokens (para
alguém), quebraria a reprodutibilidade, vazaria dados para um provedor e deixaria
os testes instáveis.

## Decisão

- `persona.yaml → resolução → IR → instruções` é uma **transformação pura, local e determinística**. Mesmas entradas (arquivos de persona, intensidade, versão do compilador) ⇒ saída idêntica byte a byte.
- Nenhum pacote do pipeline chama um modelo ou a rede. Os provedores são usados apenas pela aplicação *do usuário*, depois, com as credenciais do usuário.
- Detalhes de determinismo: ordem canônica de chaves (a ordem de propriedades do JSON Schema), ordem estável das listas (regras de merge da herança), listagens ordenadas por unidade de código, finais de linha LF, sem timestamps ou valores aleatórios nas saídas.
- Fine-tuning não faz parte do design (portabilidade; o fine-tuning da OpenAI também está fechado para novas organizações em 2026 — veja os [fatos externos](../reference/external-facts.md)).

## Consequências

- Mudanças de redação nas instruções compiladas aparecem como diffs revisáveis nos golden files (`packages/compiler/test/__golden__/`).
- Avaliação com modelos existe apenas nos evals, executados localmente ou no CI do usuário ([evals/strategy.md](../evals/strategy.md)).
- Os testes verificam: determinismo, não mutação da representação canônica e funcionamento do pipeline com `fetch` desativado.

## Alternativas consideradas

- **"Renderização de persona" assistida por LLM** — rejeitado para o core; no máximo poderia ser, no futuro, um auxílio opcional e offline de autoria, proposto por um ADR novo.
