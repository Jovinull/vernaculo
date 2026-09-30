/**
 * Creates the Salvador speaker survey as a Google Form, with responses saved to a
 * new Google Sheet. Paste into https://script.google.com (new project), run
 * `createSurvey` once and read the links in the execution log.
 *
 * SPEAKER-SURVEY.md is the source of this survey: change both together. Like the
 * Markdown version, the form is blind — it never shows the meanings the sources
 * give, nor which forms are already in the pack.
 */

const TITLE = "Questionário para quem é de Salvador";

const WORDS = [
  "massa",
  "vumbora / bó",
  "barril",
  "é bala",
  "oxe / oxente",
  "me respeite",
  "buzu",
  "é nenhuma",
  "retado",
  "queimado",
  "não é o quê? (como resposta a alguém)",
  "abusado / abusar",
  "porreta",
  "à vera",
  "aonde? (como resposta a alguém)",
  "baba",
  "é lenha",
  "vixe",
  "na telha",
  "na pala",
  "bateno",
  "muxoxo",
  "meu rei / minha rainha",
];

const CHOICES = [
  ["24. Numa conversa do dia a dia, o que soa mais como você?", "Me diga uma coisa", "Me diz uma coisa"],
  ["25. Numa conversa do dia a dia, o que soa mais como você?", "Deixe eu ver", "Deixa eu ver"],
  ["26. Ao começar uma explicação, o que soa mais como você?", "Olhe, é assim…", "Olha, é assim…"],
  ["27a. Com alguém que você NÃO conhece, o que soa mais natural?", "Posso lhe ajudar?", "Posso te ajudar?"],
  ["27b. Com um AMIGO, o que soa mais natural?", "Posso lhe ajudar?", "Posso te ajudar?"],
];

function createSurvey() {
  const form = FormApp.create(TITLE);
  form
    .setDescription(
      [
        "Oi! Estamos ensinando uma inteligência artificial a escrever com o jeito de falar de Salvador, sem caricatura. Para isso a gente precisa de quem é daqui. Leva uns 15 minutos.",
        "",
        "• Responda pelo que você fala e ouve no dia a dia, não pelo que \"baiano fala\" na TV.",
        "• Não tem resposta certa. \"Nunca ouvi\" e \"soa forçado\" ajudam tanto quanto \"uso\".",
        "• Nenhuma pergunta é obrigatória: pule o que não souber.",
        "• Não coloque nome, telefone nem dados pessoais. Este formulário não coleta e-mail.",
        "• As respostas vão para um projeto aberto (licença Apache-2.0) e podem ser citadas sem identificar você, como \"revisão de falantes de Salvador, rodada 1\".",
      ].join("\n"),
    )
    .setCollectEmail(false)
    .setProgressBar(true)
    .setAllowResponseEdits(false)
    .setConfirmationMessage(
      "Obrigado! Suas respostas decidem o que a IA vai usar, o que ela vai evitar e em que situações.",
    );

  // About you (optional)
  form
    .addMultipleChoiceItem()
    .setTitle("Você:")
    .setChoiceValues([
      "Nasci ou cresci em Salvador",
      "Moro em Salvador há mais de 10 anos",
      "Outro",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("Idade:")
    .setChoiceValues(["Até 24", "25 a 39", "40 a 59", "60 ou mais"]);

  // Part 1 — words (A: do you use it; B: meaning; C: how it would sound from an AI)
  form
    .addPageBreakItem()
    .setTitle("Parte 1 — Você usa estas palavras?")
    .setHelpText("Marque uma opção por linha. Pule as que preferir.");
  form
    .addGridItem()
    .setTitle("Você usa?")
    .setRows(WORDS)
    .setColumns(["Uso", "Conheço mas não uso", "Nunca ouvi"]);

  form
    .addPageBreakItem()
    .setTitle("Parte 1 — O que significam pra você?")
    .setHelpText(
      "Escreva o sentido do seu jeito e, se puder, uma frase de exemplo. Se nunca ouviu, deixe em branco.",
    );
  for (const word of WORDS) {
    form.addParagraphTextItem().setTitle(word);
  }

  form
    .addPageBreakItem()
    .setTitle("Parte 1 — E se uma IA falasse assim?")
    .setHelpText(
      "Imagine uma IA usando cada palavra numa conversa com você. Como soaria? Pule as que não conhece.",
    );
  form
    .addGridItem()
    .setTitle("Numa IA, soaria:")
    .setRows(WORDS)
    .setColumns(["Natural", "Forçado", "Caricato"]);

  // Part 2 — grammar as a choice between variants
  form
    .addPageBreakItem()
    .setTitle("Parte 2 — Jeito de falar")
    .setHelpText("Escolha o que soa mais como você falaria numa conversa do dia a dia.");
  for (const [title, first, second] of CHOICES) {
    form
      .addMultipleChoiceItem()
      .setTitle(title)
      .setChoiceValues([first, second, "As duas", "Depende"])
      .showOtherOption(true);
  }
  form
    .addParagraphTextItem()
    .setTitle(
      "28. Você fala com o \"não\" no fim, como \"sei não\" ou \"tem não\"? Em que situação?",
    );

  // Part 3 — open questions
  form.addPageBreakItem().setTitle("Parte 3 — Perguntas abertas");
  const open = [
    "29. Que palavras ou expressões fazem você reconhecer NA HORA que alguém é de Salvador, e que caberiam numa conversa respeitosa?",
    "30. O que o pessoal de fora acha que baiano fala, mas vocês NÃO falam (ou só falam de brincadeira)?",
    "31. Alguma palavra desta pesquisa é mais de uma idade, de um bairro ou de um grupo?",
    "32. Alguma delas você acharia ofensiva ou de mau gosto vinda de uma IA?",
    "(Opcional) Se você recebeu uma folha de conversas para avaliar, cole aqui suas respostas.",
  ];
  for (const title of open) {
    form.addParagraphTextItem().setTitle(title);
  }

  const sheet = SpreadsheetApp.create(`${TITLE} (respostas)`);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  // Newer Google accounts create forms unpublished; publish when the method exists.
  if (typeof form.setPublished === "function") form.setPublished(true);

  Logger.log(`Link para enviar: ${form.getPublishedUrl()}`);
  Logger.log(`Editar o formulário: ${form.getEditUrl()}`);
  Logger.log(`Planilha de respostas: ${sheet.getUrl()}`);
}
