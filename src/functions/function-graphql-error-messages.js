export const graphQLErrorMessages = errorsFromCatch => {
  const errors = errorsFromCatch.graphQLErrors[0];
  const messages = [];

  if (errors.hasOwnProperty("functionError")) {
    const customErrors = JSON.parse(errors.functionError);
    messages.push(...customErrors.errors);
  } else {
    messages.push(errors.message);
  }

  return messages;
};
