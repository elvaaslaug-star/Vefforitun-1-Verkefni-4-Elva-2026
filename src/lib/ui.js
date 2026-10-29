import { el, empty, setText } from "./elements.js";

/**
 * @typedef {"start" | "question" | "results"} Screen
 */

/**
 * Allir mögulegir skjáir.
 * @type {Screen[]}
 */
const SCREENS = ["start", "question", "results"];

/**
 * Sýnir skjá `name` og felur aðra.
 * @param {Screen} name Skjár sem á að sýna
 * @returns {void}
 */
export function showScreen(name) {
  /*
  1. .hidden á alla skjái
  2. staðfesta að `name` sé skjár
  3. ef skjár, taka .hidden af
  */
  for (const screen of SCREENS) {
    const section = document.querySelector(`section.${screen}`);

    if (!section) {
      console.warn("section is null");
      continue;
    }

    section.classList.add("hidden");
  }

  const targetScreen = document.querySelector(`section.${name}`);

  if (targetScreen) {
    targetScreen.classList.remove("hidden");
  }
}

/**
 * Birtir tölfræði á upphafsskjá.
 * @param {import("./quiz.js").Stats} stats Tölfræði
 * @returns {void}
 */
export function renderStats(stats) {
  setText(".stats-played", String(stats.played));
  setText(".stats-correct", String(stats.correct));
  setText(".stats-incorrect", String(stats.incorrect));
}

/**
 * Birtir spurningu, tæmir svarreit og setur fókus á hann.
 * @param {import("./quiz.js").Question} question Spurning
 * @param {number} num Númer spurningar, byrjar á 1
 * @param {number} total Heildarfjöldi spurninga
 * @returns {void}
 */
export function renderQuestion(question, num, total) {
  setText(".progress .current", String(num));
  setText(".progress .total", String(total));

  const categoryElement = document.querySelector(".title .category");

  console.log(question, num, total);

  if (!categoryElement) {
    console.warn("category element not found");
    return;
  }

  categoryElement.textContent = question.category;

  const questionElement = document.querySelector(".title .question-text");

  if (questionElement) {
    questionElement.textContent = question.question;
  } else {
    console.error("fann ekki question element");
  }
}

/**
 * Birtir niðurstöður leiks.
 * @param {import("./quiz.js").Result[]} results Niðurstöður
 * @param {number} correctCount Fjöldi réttra svara
 * @returns {void}
 */
export function renderResults(results, correctCount) {
  setText(".correct-count", String(correctCount));

  const list = document.querySelector(".results-list");
  if (!list) return;
  empty(list);

  for (const r of results) {
    list.appendChild(
      el(
        "li",
        { class: `result ${r.correct ? "correct" : "incorrect"}` },
        el("p", { class: "result-category" }, r.category),
        el("p", { class: "result-question" }, r.question),
        el(
          "p",
          {},
          "Þitt svar: ",
          el("span", { class: "result-answer" }, r.answer || "(tómt)"),
        ),
        el(
          "p",
          {},
          "Rétt svar: ",
          el("span", { class: "result-correct" }, r.correctAnswer),
        ),
      ),
    );
  }
}
