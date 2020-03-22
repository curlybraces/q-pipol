import { Notify } from "quasar";

export const graphQLErrorMessages = errorsFromCatch => {
  const errors = errorsFromCatch.graphQLErrors[0];
  const messages = [];

  if (errors.hasOwnProperty('functionError')) {
    const customErrors = JSON.parse(errors.functionError);
    messages.push(...customErrors.errors);
  } else {
    messages.push(errors.message);
  }

  return messages;
};

export const showGraphQLErrorMessage = (error) => {
  const { graphQLErrors } = error;
  Notify.create({
    color: 'red',
    message: graphQLErrors[0].debugMessage
  });
};
