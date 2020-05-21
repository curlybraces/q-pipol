export function getLoading(state) {
  return state.loading;
}

// check progress of form based on required vs. filled fields
export function progress(state) {
  let progress = 0;

  state.required.forEach(req => {
    const filled = !state.project[req] ? 0 : 1;
    progress += filled;
  });

  return progress;
}
