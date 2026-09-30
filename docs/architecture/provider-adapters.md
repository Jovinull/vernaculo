# Adapters de provedores

Um adapter molda a saída compilada da persona para um destino. Regras para todo
adapter ([ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md)):

- depende de `@vernaculo/compiler` (e dos tipos do core), nunca o contrário;
- consome a IR/saída compilada e nunca seleciona traços de novo;
- não faz nenhuma requisição de rede nem carrega credenciais; o cliente, a chave e o modelo do usuário fazem o trabalho;
- evita depender de SDKs de provedores quando tipos estruturais bastam;
- documenta o comportamento do provedor com data de verificação ([external-facts.md](../reference/external-facts.md)).

## OpenAI Responses API — `@vernaculo/openai` (feito)

```ts
import OpenAI from "openai";                          // dependência do próprio usuário
import { compilePersona } from "@vernaculo/compiler";
import { loadPersona } from "@vernaculo/core/node";
import { withPersona } from "@vernaculo/openai";

const persona = compilePersona(await loadPersona("pt-BR/ba/salvador"), { intensity: 0.25 });

const response = await new OpenAI().responses.create(
  withPersona({ model, instructions: instrucoesDaSuaIA, input: mensagemDaPessoa }, persona),
);
```

(`pt-BR/ba/salvador` existe como rascunho; veja [`examples/openai`](../../examples/openai/)
para uma versão executável com fixtures e [`examples/agent-lab`](../../examples/agent-lab/)
para testar um pack com um modelo real.)

Fatos em que o adapter se apoia (verificados em 2026-09-29):

- `instructions` é "a system (or developer) message inserted into the model's context". Comportamento e estilo ficam ali.
- **Com `previous_response_id`, as instructions da resposta anterior não são reaplicadas.** A persona (e as instruções do próprio agente) precisa ser enviada em toda requisição. `withPersona` foi feito para ser aplicado a cada requisição; é puro e idempotente.
- A OpenAI agora recomenda manter os prompts de produção no código da aplicação, versionados e testados no Git (os reusable prompt objects foram descontinuados; desligamento em 2026-11-30). O design de personas como arquivos do Vernáculo segue exatamente isso.
- O cache de prompt depende de prefixos idênticos; mantenha o conteúdo estático (instruções do agente, depois a camada de persona) primeiro e o dinâmico depois.

Escolhas de design:

- **Sem dependência de SDK**: `withPersona` é tipado estruturalmente (`{ instructions?: string | null }` mais o tipo de parâmetros do próprio chamador).
- **Ordem**: instruções do agente primeiro, camada de persona depois. O texto da persona diz que as regras do agente têm precedência.
- **Modelo**: nunca escolhido pelo Vernáculo. Os exemplos leem `OPENAI_MODEL`; o nome de modelo de exemplo da conversa era ilustrativo e não é usado.
- `developerMessage(persona)` atende fluxos que passam instruções como itens de entrada.

## OpenAI Agents SDK — `@vernaculo/openai-agents` (ideia)

O Agents SDK roda dentro da aplicação do desenvolvedor e aceita `instructions` em
texto, então a saída compilada já funciona:
`new Agent({ name, instructions: composeInstructions(instrucoesDoAgente, persona) })`.
Um pacote dedicado só acrescentaria conveniência. `@openai/agents` nunca deve ser
dependência do core. (A abstração `Model`/`ModelProvider` do SDK, que permite usar
provedores que não são a OpenAI, foi citada na conversa; não foi verificada de novo.)

## Agent Skills — `@vernaculo/skills` (feito)

Veja o [ADR-0007](../decisions/0007-agent-skills-early-export-target.md) e
[compilation.md](compilation.md). A conversa observou que a OpenAI suporta Agent
Skills compatíveis com o padrão aberto (não verificado de novo neste bootstrap); o
exportador segue a especificação aberta, não uma variante de fornecedor.

## Markdown simples / system prompt (feito)

`vernaculo compile <persona>` imprime Markdown neutro de provedor, utilizável com
qualquer provedor ou modelo local.

## Adapters planejados

| Adapter | Observações |
| --- | --- |
| Anthropic (Claude) | composição com o system prompt; mesmas regras |
| Google (Gemini) | composição com a system instruction |
| Modelos locais (por exemplo, Ollama com Qwen, Llama, Gemma) | texto simples; implantações isoladas da internet são um caso de uso de primeira classe |
| MCP (`@vernaculo/mcp`) | servidor stdio local que expõe recursos `vernaculo://<id da persona>`; MCP TypeScript SDK v2 (`@modelcontextprotocol/server`, especificação 2026-07-28); veja o [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md). Atenderia clientes compatíveis com MCP (a conversa citou Claude, Gemini, Codex, Cursor e o OpenAI Agents SDK, que consegue usar servidores MCP locais via stdio — não verificado de novo) |

Para adicionar um: siga a skill de projeto `adapter-development`
(`.claude/skills/adapter-development/SKILL.md`) e atualize esta página.
