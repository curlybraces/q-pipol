import { date } from 'quasar';

export const dateDiff = compareDate => {
  const date1 = Date.now();
  const date2 = new Date(compareDate);
  let diff = date.getDateDiff(date1, date2, 'days');

  return diff + ' days ago';
};
