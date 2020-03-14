export const convertToNumber = val => {
  if (!val) {
    return 0;
  }
  return Number(val.replace(/,/g, ''));
};
