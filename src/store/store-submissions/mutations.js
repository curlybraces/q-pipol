export function setSubmissionsDownloaded(state, value) {
  state.submissionsDownloaded = value;
}

export function addSubmission(state, value) {
  state.submissions.push(value);
}

export function clearSubmissions(state) {
  state.submissions = [];
}
