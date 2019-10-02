export function submissions(state) {
  let sortedSubmissions = [],
    originalSubmissions = [...state.submissions];

  sortedSubmissions = originalSubmissions.sort((a, b) => {
    if (a.operatingUnit > b.operatingUnit) {
      return 1;
    } else if (a.operatingUnit < b.operatingUnit) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedSubmissions;
}
