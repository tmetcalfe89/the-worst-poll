import { decode, encode } from "./encoding.js";
import { createPoll, vote } from "./poll.js";
import { getQueryProps } from "./query.js";

const createPollEl = document.querySelector(
  '[data-section="create-poll"] form'
);
const takePollEl = document.querySelector('[data-section="vote-poll"] form');
const addOptionEl = document.querySelector('[data-form-action="addOption"]');
const optionMakerTemplateEl = document.querySelector(
  '[data-template="option-maker"]'
);
const optionTakerTemplateEl = document.querySelector(
  '[data-template="option-taker"]'
);
const optionContainerEl = document.querySelector('[data-section="options"]');
const optionTakerContainerEl = document.querySelector(
  '[data-section="option-container"]'
);

let poll = null;

function start() {
  const { poll: storedPoll } = getQueryProps();
  if (storedPoll) {
    poll = decode(storedPoll);
    startVotePoll();
  } else {
    startCreatePoll();
  }
}

function startVotePoll() {
  const questionEl = document.querySelector('[data-vote-poll="question"]');
  questionEl.innerText = poll.question;

  poll.options.forEach(({ option, votes }) => {
    const newOption = optionTakerTemplateEl.content.cloneNode(true);
    newOption.querySelector("span").innerText = `${option} (x${votes})`;
    newOption.querySelector("input").value = option;
    optionTakerContainerEl.appendChild(newOption);
  });

  takePollEl.addEventListener("submit", handleVotePoll);

  document
    .querySelector('[data-section="vote-poll"]')
    .classList.remove("hidden");
}

function handleVotePoll(e) {
  e.preventDefault();
  vote(poll, e.target.options.value);
  redirectToPoll();
}

function startCreatePoll() {
  createPollEl.addEventListener("submit", handleCreatePoll);
  addOptionEl.addEventListener("click", handleAddOption);
  document
    .querySelector('[data-section="create-poll"]')
    .classList.remove("hidden");
}

function handleCreatePoll(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const options = [];
  data.forEach((value, key) => {
    if (key === "options") {
      options.push(value);
    }
  });
  const question = form.question.value;
  const poll = createPoll(question, options);
  redirectToPoll(poll);
}

function redirectToPoll(targetPoll = poll) {
  const encodedPoll = encode(targetPoll);
  window.location.href = `${window.location.href
    .split("?")
    .shift()}?poll=${encodedPoll}`;
}

function handleAddOption() {
  const number = optionContainerEl.children.length + 1;
  const newOption = optionMakerTemplateEl.content.cloneNode(true);
  fixOption(newOption, number);
  optionContainerEl.appendChild(newOption);
}

function fixOption(optionEl, number) {
  const optionId = `option-${number}`;
  const label = optionEl.querySelector("label");
  const input = optionEl.querySelector("input");
  const removeButton = optionEl.querySelector("button");
  const fieldset = optionEl.querySelector("fieldset") || optionEl;

  label.innerText = number;
  label.setAttribute("for", optionId);

  input.id = optionId;

  removeButton.addEventListener("click", handleRemoveOption);
  removeButton.dataset.target = `[data-option-id="${optionId}"]`;

  fieldset.dataset.optionId = optionId;
}

function handleRemoveOption(e) {
  const removeButton = e.target;
  const optionId = removeButton.dataset.target;
  const option = document.querySelector(optionId);
  option.remove();

  [...optionContainerEl.children].forEach((optionEl, i) => {
    console.log(optionEl, i);
    fixOption(optionEl, i + 1);
  });
}

start();
