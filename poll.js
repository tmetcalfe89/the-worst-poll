export function createPoll(question, options) {
  return { question, options: options.map((option) => ({ option, votes: 0 })) };
}

export function vote(quiz, optionIndex) {
  quiz.options[optionIndex].value++;
}
