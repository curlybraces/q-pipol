export const search = (searchInput, searchArray) => {
  let searchResults = [];

  const search =
    typeof searchInput === 'number'
      ? searchInput
      : searchInput.trim().toLowerCase();

  if (search) {
    searchResults = searchArray.filter(item => {
      return Object.keys(item).some(key => {
        return typeof item[key] === 'number'
          ? false
          : item[key].toLowerCase().includes(search);
      });
    });

    return searchResults;
  }

  searchResults = searchArray;

  return searchResults;
};
