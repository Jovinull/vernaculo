# Consistência entre provedores

**Pergunta:** GPT, Claude, Gemini e modelos locais produzem comportamento
semelhante a partir da mesma persona compilada, na mesma intensidade?

A persona é neutra de provedor por design
([ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md)); esta
dimensão verifica se o *comportamento* também é.

## Método (planejado)

1. Compilar o pack uma vez (mesma versão de persona, `INSTRUCTIONS_FORMAT` e intensidade).
2. Rodar o conjunto de cenários compartilhado em cada provedor/modelo disponível para quem avalia, usando o adapter correspondente (ou Markdown simples para provedores sem adapter), com as credenciais ou os modelos locais de quem avalia.
3. Comparar por dimensão ([dimensions.md](dimensions.md)): densidade de formas, violações de regras, asserções da tarefa, notas de juízes e rótulos humanos em uma amostra.
4. Registrar, junto com os resultados: provedor, identificador do modelo, data, versão do adapter e parâmetros (temperatura etc.).

## Interpretando as diferenças

- Diferenças na *força do estilo* entre modelos são esperadas; a pergunta é se todo modelo fica dentro dos traços do pack, da faixa de intensidade e das regras de base.
- Um modelo que exagera ou inventa formas de forma sistemática pode precisar de uma renderização específica. Isso seria implementado no adapter dele (nunca na persona nem no core), documentado em [provider-adapters.md](../architecture/provider-adapters.md) e justificado por resultados de evals.
- Modelos locais são de primeira classe: implantações isoladas da internet precisam saber como um pack se comporta neles.

## Notas de reprodutibilidade

- Identificadores de modelos mudam e modelos são aposentados; os resultados são retratos datados.
- Nunca fixe um nome de modelo em exemplos ou em padrões das ferramentas; leia-o da configuração.
