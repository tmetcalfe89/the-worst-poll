export function createPoll(question, options) {
  return { question, options: options.map((option) => ({ option, votes: 0 })) };
}

export function vote(poll, optionValue) {
  console.log(poll, optionValue);
  const foundIndex = poll.options.findIndex((e) => e.option === optionValue);
  poll.options[foundIndex].votes++;
}
