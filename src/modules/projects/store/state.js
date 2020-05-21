export default function() {
  return {
    projects: [],
    projectsDownloaded: false,
    search: null,
    sort: 'title',
    direction: 'asc', // asc or desc
    filter: '',
    loading: false,
    pageInfo: {},
    error: false,
    selectedProjects: []
  };
}
