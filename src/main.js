import { questions } from "./lib/questions.js";
import {
  createResults,
  countCorrect,
  pickQuestions,
  updateStats,
} from "./lib/quiz.js";
import {
  renderQuestion,
  renderStats,
  showScreen,
  renderResults,
} from "./lib/ui.js";

/** Fasti sem segir til um hversu margar spurningar við sýnum. */
const NUMBER_OF_QUESTIONS = 4;

/**
 * Staða leiks, heldur utanum tölfræði, spurningar í núverandi leik,
 * svör notanda í núverandi leik og á hvaða spurningu við erum.
 * @type {{
 *   stats: import("./lib/quiz.js").Stats,
 *   questions: import("./lib/quiz.js").Question[],
 *   answers: string[],
 *   current: number,
 * }}
 */
const state = {
  stats: { played: 0, correct: 0, incorrect: 0 },
  questions: [],
  answers: [],
  current: 0,
};

/**
 * Byrjar nýjan leik og sýnir fyrstu spurningu.
 * @returns {void}
 */
function start() {
  state.questions = pickQuestions(questions, NUMBER_OF_QUESTIONS);
  state.current = 1;
  state.answers = [];

  showScreen("question");
  renderQuestion(
    state.questions[state.current - 1],
    state.current,
    NUMBER_OF_QUESTIONS,
  );
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
  const results = createResults(state.questions, state.answers);
  state.stats = updateStats(state.stats, results);
  renderStats(state.stats);
  renderResults(results, countCorrect(results));
  showScreen("results");
}
3;

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @param answer {string}
 * @returns {void}
 */
function submitAnswer(answer) {
  /* TODO skrá stöðu svars, klára ef seinasta spurning, annars sýna næstu */

  state.answers.push(answer);

  const nextQuestionNum = state.current + 1;

  if (nextQuestionNum > NUMBER_OF_QUESTIONS) {
    finish();
  } else {
    state.current = nextQuestionNum;
    renderQuestion(
      state.questions[state.current - 1],
      state.current,
      NUMBER_OF_QUESTIONS,
    );
  }

  // TODO klára ef seinasta spurning

  /*
  console.log(
    "Svarið notanda er",
    answer,
    "rétt svar er",
    state.questions[state.current - 1].answer,
  );
  const correctAnswer = isCorrect(answer, state.questions[state.current - 1].answer)

  if (correctAnswer) {
    alert('RÉTT!!')
  } else {
    alert('Ekki rétt :(')
  }
  */

  //finish();
}

/**
 * Fer aftur á upphafsskjá með uppfærðri tölfræði.
 * @returns {void}
 */
function restart() {
  renderStats(state.stats);
  showScreen("start");
}

function initialize() {
  renderStats(state.stats);

  const startButton = document.querySelector(".start-button");

  if (startButton) {
    startButton.addEventListener("click", start);
  } else {
    console.error("fann ekki start button");
  }

  const form = document.querySelector("form");

  if (!form) {
    console.error("form not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const answer = data.get("answer");

    if (typeof answer !== "string") {
      console.warn("answer is not a string");
      return;
    }

    submitAnswer(answer);
    const input = form.querySelector("input");
    form.reset();
    input?.focus();
  });

  const restartButton = document.querySelector("button.restart-button");

  if (restartButton) {
    restartButton.addEventListener("click", restart);
  } else {
    console.error("fann ekki restart button");
  }
}

initialize();
