# Glossário

| Termo | Significado |
| --- | --- |
| **Persona** | Documento que descreve traços de linguagem observáveis de uma variedade, aplicado em camada sobre um agente de IA. Nunca uma personalidade. |
| **Pack de persona regional** (também "Regional Style Pack") | Uma persona publicada na biblioteca, em `personas/`, para uma variedade (por exemplo, `pt-BR/ba/salvador`). |
| **Variedade** | Uma forma de falar associada a um lugar ou comunidade. Pode coincidir ou não com fronteiras administrativas. |
| **Id da persona** | `<tag de idioma BCP 47>/<slug>/...`; um nome, não uma cadeia de herança. |
| **Raiz de personas** | Um diretório com personas em `<raiz>/<id>/persona.yaml`. |
| **Linhagem** | A cadeia de personas de um ancestral raiz até uma persona, via `extends`. |
| **Persona achatada** | O documento autônomo produzido ao resolver uma linhagem; sem `extends`. |
| **Maturidade efetiva** | O `maturity` menos maduro de uma linhagem. |
| **Maturidade** | `fixture` (sintético), `draft` (não revisado), `reviewed` (uma revisão humana aconteceu). A revisão é sempre recomendada, nunca obrigatória. |
| **Evidência** | Nível de sustentação de cada traço: `attested`, `reported`, `hypothesis` (nunca renderizado), `synthetic` (só em fixtures). |
| **Forma de superfície** | Um termo ou forma que a persona usa (preferred, contextual, marcadores, pragmática) ou evita (discouraged). |
| **Intensidade regional** | Número em [0, 1] que controla quanto a camada marca a saída; 0 = neutro. |
| **`minIntensity`** | Limiar por traço: o traço só é renderizado a partir dessa intensidade. |
| **IR** (representação intermediária) | A persona resolvida com as regras de intensidade e evidência aplicadas; a única entrada de renderizadores e targets. |
| **Compilador** | Renderizador determinístico da IR em instruções neutras de provedor. |
| **Regras de base** | Regras anti-caricatura e de preservação do papel presentes em toda renderização. |
| **Target / adapter** | Código que molda a saída compilada para um destino (parâmetros da OpenAI, Agent Skill, MCP...). |
| **Agente hospedeiro / agente pai** | O agente do usuário (papel, regras, conhecimento) sobre o qual a camada de persona é composta. |
| **Composição** | Colocar a camada de persona compilada depois das instruções do agente hospedeiro. |
| **Eject** | Materializar em um projeto uma persona achatada e as instruções compiladas, para que ele não precise mais do Vernáculo. |
| **Fixture** | Dado de persona sintético para testes (`fixtures/personas`, ids em `x-fixture`). Não é conteúdo linguístico. |
| **Suíte de conformidade** | Arquivos de teste neutros de linguagem em `schemas/conformance/`, que qualquer implementação pode executar. |
| **Antipadrão** | Um exemplo negativo: saída que nunca deve ser produzida, com a sua categoria. |
| **Camada de linguagem** | Nome preferido para o que a conversa chamou de "middleware comportamental": muda a linguagem, não o comportamento. |
