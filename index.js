import { createPoll } from "./poll.js";

const createPollEl = document.querySelector("#create-poll");
const addOptionEl = document.querySelector('[data-form-action="addOption"]');
const optionTemplateEl = document.querySelector(
  '[data-template="option-maker"]'
);
const optionContainerEl = document.querySelector('[data-section="options"]');

function start() {
  createPollEl.addEventListener("submit", handleCreatePoll);
  addOptionEl.addEventListener("click", handleAddOption);
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
  console.log({ question, options });
  console.log(createPoll(question, options));
}

function handleAddOption() {
  const number = optionContainerEl.children.length + 1;
  const newOption = optionTemplateEl.content.cloneNode(true);
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
