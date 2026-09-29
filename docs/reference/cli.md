# Referência da CLI (`vernaculo`)

A CLI roda totalmente na máquina local. Ela nunca contata um serviço do Vernáculo
(não existe nenhum). Códigos de saída: `0` sucesso, `1` erro de uso ou de validação,
`2` erro interno. As mensagens da CLI ficam em inglês
([ADR-0016](../decisions/0016-documentation-in-portuguese.md)).

Opções comuns:

- `--root <dir>` — raiz de personas onde buscar; pode ser repetida; a primeira correspondência vence. Padrão: `personas` (relativo ao diretório de trabalho).
- Um argumento `<persona>` é um id de persona (`pt-BR/ba/salvador`) **ou** um caminho terminado em `.yaml`/`.yml` (uma persona de projeto cujo `extends` é resolvido pelas raízes).
- `--intensity <0..1>` — rejeitada quando está fora do intervalo ou não é número.

Avisos de maturidade (`FIXTURE`, `DRAFT`) são impressos no stderr por `compile`,
`export` e `eject`. Para personas `draft`, eles vêm com a recomendação de que
falantes da variedade revisem a persona (nunca obrigatória,
[ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)); `validate`
resume quantos rascunhos não foram revisados e `inspect` mostra uma linha "human
review". As dicas nunca mudam o código de saída.

## Implementados

| Comando | Para que serve |
| --- | --- |
| `vernaculo list [--root ...] [--json]` | lista as personas das raízes (duplicatas sombreadas são marcadas) |
| `vernaculo inspect <persona> [--intensity x] [--json]` | linhagem, maturidade, licença, intensidade padrão, o que uma intensidade renderiza e omite; `--json` imprime a persona achatada e a linhagem |
| `vernaculo validate [personas...]` | valida as personas indicadas, ou todas as personas das raízes; sai com 1 se alguma falhar |
| `vernaculo compile <persona> [--target markdown\|openai] [--intensity x] [--agent arquivo] [--out arquivo]` | imprime as instruções; `openai` imprime JSON `{ instructions, metadata }` e pode compor as instruções do agente vindas de `--agent` |
| `vernaculo export <persona> --target skill [--intensity x] [--out dir] [--force]` | grava um diretório de Agent Skill em `<out>/vernaculo-<slug-do-id>/`; recusa sobrescrever um diretório não vazio sem `--force` |
| `vernaculo eject <persona> [--intensity x] [--out dir] [--force]` | grava `persona.yaml` (achatado, autocontido; linhagem, licenças e maturidade no cabeçalho), `instructions.md` e `README.md` (com recomendação de revisão para rascunhos e as licenças de conteúdo da linhagem) em `vernaculo/<id>/` ou em `--out` |

## Planejados (rascunho de contrato)

| Comando | Comportamento pretendido | Depende de |
| --- | --- | --- |
| `vernaculo search <busca>` | buscar no catálogo (por exemplo, `search brasil` → ids `pt-BR/...`) | distribuição do catálogo ([OQ-04](../roadmap/open-questions.md)) |
| `vernaculo add <persona>` | copiar os arquivos de um pack para o projeto (por exemplo, `vernaculo/personas/<id>/`); funciona com `npx vernaculo add ...`; nenhuma dependência de runtime depois | OQ-04 |
| `vernaculo update [persona]` | atualizar os packs adicionados para versões mais novas, mostrando o diff | OQ-04 |
| `vernaculo export --target mcp` / outros targets | targets de exportação adicionais | adapters futuros |

## Mudanças em relação aos esboços da conversa

| Esboço | Agora | Por quê |
| --- | --- | --- |
| `personabr export ...` | `vernaculo export ...` | o projeto passou a se chamar Vernáculo |
| `--target openai-skill` / `claude-skill` | `--target skill` | um único padrão aberto de Agent Skills; variantes de fornecedor só se divergirem |
| `--target system-prompt` | `vernaculo compile` (Markdown) | imprimir instruções é compilação, não exportação de arquivos |
| `vernaculo install <persona>` | `vernaculo add` (planejado) | a lista de comandos da v0.1 na conversa ficou com `add` |
| `vernaculo compile ... --provider openai` | `vernaculo compile ... --target openai` | um único nome de opção (`--target`) em compile e export |
