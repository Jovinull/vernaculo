# Infraestrutura zero

> **Uma aplicação que utiliza Vernáculo não deve depender da infraestrutura do Vernáculo em runtime.**
>
> *An application that uses Vernáculo must not depend on Vernáculo infrastructure at runtime.*

Registro de decisão: [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md).

## O que isso significa

```text
Empresa
 ├── o sistema dela
 ├── o modelo dela (provedor hospedado com a própria chave, ou local)
 └── a persona (arquivos que ela possui)

API do Vernáculo: não existe.
```

- Nenhuma requisição passa pelo mantenedor. Nenhuma API, banco de dados, servidor, autenticação, conta ou chave do Vernáculo.
- Nenhuma inferência ou token pago pelo mantenedor; com um milhão de instalações, o custo de inferência do mantenedor continua zero.
- Nenhuma telemetria obrigatória.
- GitHub e npm absorvem a distribuição normal de um projeto open source; quem executa o software arca com a própria infraestrutura.
- Se o repositório desaparecesse amanhã, os packs instalados ou ejetados continuariam funcionando.

## Checklist para qualquer mudança

Antes do merge, uma mudança não pode:

- [ ] adicionar uma chamada de rede (HTTP, sockets, `fetch`) a qualquer pacote;
- [ ] adicionar um SDK de provedor ou cliente de rede como dependência de qualquer pacote;
- [ ] exigir conta, chave ou configuração remota para validar, resolver, compilar ou exportar;
- [ ] buscar schemas, packs ou "atualizações" de forma implícita (o `apiVersion` `vernaculo.dev/...` é um identificador, nunca uma URL a carregar);
- [ ] introduzir telemetria;
- [ ] tornar qualquer serviço hospedado (site de documentação, catálogo) necessário para o software funcionar.

Permitido: downloads opcionais, explícitos e iniciados pelo usuário por canais
gratuitos de terceiros (npm, GitHub) no momento da *instalação*, nunca em runtime
da aplicação.

## Verificação automática

- `packages/core/test/architecture.test.ts`: proíbe `http`, `https`, `http2`, `net`, `tls`, `dgram`, `undici`, `axios`, `node-fetch`, SDKs de provedores (`openai`, `@openai/*`, `@anthropic-ai/*`, `@google/*`, `@modelcontextprotocol/*`) e `fetch(` no código e no manifesto de todo pacote.
- `packages/compiler/test/compile.test.ts`: executa carregar → resolver → compilar com `fetch` substituído por uma função que lança erro.
- `packages/openai/test/openai.test.ts`: o adapter da OpenAI não pode depender de um SDK da OpenAI.

## Local por design

Modelos de linguagem locais (por exemplo, Ollama rodando Qwen, Llama ou Gemma) fazem
parte do design desde o início: as instruções compiladas são texto simples, então
uma empresa isolada da internet pode rodar toda a pilha internamente.
