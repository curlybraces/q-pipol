import { date } from 'quasar';

export const handleResponse = response => {
  return response.data;
};

export const handleError = err => {
  console.error(`error: ${err.message}`);
  return err;
};

export const displayDateDifference = data => {
  if (!data || typeof data === undefined) {
    return null;
  }

  const today = new Date();

  let diff;

  diff = date.getDateDiff(today, data, 'days');

  if (diff == 0) {
    diff = date.getDateDiff(today, data, 'hours') + ' hours ago';
  } else if (diff >= 7) {
    diff = date.getDateDiff(today, data, 'weeks') + ' weeks ago';
  } else {
    diff = diff + ' days ago';
  }

  return diff;
};

export const validateEmail = email => {
  // define pattern
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // check if conforms to pattern
  return re.test(email);
};
