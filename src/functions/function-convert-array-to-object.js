export const ConvertArrayToObject = (array, key) => {
  const object = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, object);
};
