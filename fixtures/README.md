# Fixtures

**Dados sintéticos. Não é conteúdo linguístico.**

`personas/` é uma raiz de personas com personas inventadas, usadas por testes,
exemplos e pelo CI (`pnpm validate:data`):

| Id | Papel |
| --- | --- |
| `pt-BR/x-fixture` | persona base |
| `pt-BR/x-fixture/cidade-a` | localidade A; estende a base e acrescenta traços e exemplos |
| `pt-BR/x-fixture/cidade-b` | localidade B; estende a base e desencoraja uma forma da base |

Toda forma "regional" daqui (`termo-sintético-a`, `marcador-sintético-base`, ...) é
um marcador de posição. Toda persona é `maturity: fixture` e todo traço é
`evidence: synthetic`, o que a especificação só permite em fixtures. O segmento
`x-` marca os ids como privados/sintéticos.

Não copie estes arquivos para um pack real e não coloque afirmações regionais reais
aqui: os testes nunca podem depender de conteúdo linguístico não revisado. Os
comentários e descrições dentro dos YAML ficam em inglês, como o resto dos dados de
teste.
