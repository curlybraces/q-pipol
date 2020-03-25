export default function() {
  return {
    projects: {},
    projectsDownloaded: false,
    search: '',
    sort: 'title',
    direction: 'asc', // asc or desc
    filter: '',
    loading: false,
    pageInfo: {},
    error: false
  };
}
