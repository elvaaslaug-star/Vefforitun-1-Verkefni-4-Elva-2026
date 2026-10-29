/**
 * @typedef {object} Question
 * @property {string} category Flokkur spurningar
 * @property {string} question Spurningin sjálf
 * @property {string} answer Rétt svar
 */

/**
 * @typedef {object} Result
 * @property {string} category Flokkur spurningar
 * @property {string} question Spurningin sjálf
 * @property {string} answer Svar notanda
 * @property {string} correctAnswer Rétt svar
 * @property {boolean} correct `true` ef notandi svaraði rétt
 */

/**
 * @typedef {object} Stats
 * @property {number} played Fjöldi spilaðra leikja
 * @property {number} correct Fjöldi réttra svara
 * @property {number} incorrect Fjöldi rangra svara
 */

/**
 * Stokkar fylki.
 * @template T
 * @param {T[]} array Fylki sem á að stokka
 * @returns {T[]} Nýtt, stokkað fylki
 */
export function shuffle(array) {
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Velur `count` spurningar af handahófi, engin spurning er valin oftar en einu sinni.
 * @param {Question[]} questions Allar spurningar
 * @param {number} count Fjöldi spurninga sem á að velja
 * @returns {Question[]} Valdar spurningar
 */
export function pickQuestions(questions, count) {
  /* TODO útfæra */
  return [];
}

/**
 * Athugar hvort svar sé rétt.
 * Hunsar whitespace í byrjun og enda; og há- og lágstafi.
 * @param {string} answer Svar notanda
 * @param {string} correctAnswer Rétt svar
 * @returns {boolean} `true` ef svar er rétt
 */
export function isCorrect(answer, correctAnswer) {
  if (typeof answer !== "string") {
    return false;
  }

  if (typeof correctAnswer !== "string") {
    return false;
  }

  if (correctAnswer === "") {
    return false;
  }

  const answerNormalized = answer.trim().toLocaleLowerCase();
  const correctAnswerNormalized = correctAnswer.trim().toLocaleLowerCase();

  //console.log('answer',answerTrimmed, correctAnswerTrimmed, correctAnswer )

  return answerNormalized == correctAnswerNormalized;
}
console.assert(isCorrect("test", "test"), "sami strengur er true");
console.assert(isCorrect("  test", "test"), "hunsar bil fyrir framan");
console.assert(
  isCorrect("  test", "test  "),
  "hunsar bil fyrir framan og aftan á báðum strengjum",
);
console.assert(isCorrect(".", ".\n"), "hunsar newline");
console.assert(isCorrect("æ", "Æ"), "há og lágstafir skipta ekki máli");
console.assert(isCorrect("😭GRÁTUR", "😭grátur"), "styðjur emoji");
console.assert(!isCorrect("", ""), "má ekki vera tómistrengur í réttu svari");

/**
 * Býr til niðurstöður út frá spurningum og svörum notanda, í sömu röð.
 * @param {Question[]} questions Spurningar sem voru spurðar
 * @param {string[]} answers Svör notanda, í sömu röð og spurningar
 * @returns {Result[]} Niðurstöður
 */
export function createResults(questions, answers) {
  return questions.map((q, i) => {
    const answer = answers[i] ?? "";
    return {
      category: q.category,
      question: q.question,
      answer,
      correctAnswer: q.answer,
      correct: isCorrect(answer, q.answer),
    };
  });
}
/**
 * Telur fjölda réttra svara í niðurstöðum.
 * @param {Result[]} results Niðurstöður
 * @returns {number} Fjöldi réttra svara
 */
export function countCorrect(results) {
  return results.filter((r) => r.correct).length;
}

/**
 * Uppfærir tölfræði með niðurstöðum úr leik. Breytir ekki `stats`.
 * @param {Stats} stats Tölfræði fyrir leik
 * @param {Result[]} results Niðurstöður leiks
 * @returns {Stats} Ný tölfræði
 */
export function updateStats(stats, results) {
  const correct = countCorrect(results);
  return {
    played: stats.played + 1,
    correct: stats.correct + correct,
    incorrect: stats.incorrect + (results.length - correct),
  };
}
