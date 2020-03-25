export default function() {
  return {
    projects: {},
    projectsDownloaded: false,
    search: '',
    sort: null,
    direction: null, // asc or desc
    filter: '',
    loading: false,
    pageInfo: {},
    error: false
  };
}
