export const CONFIG = {
  appName: 'Investment Programming & Management System',
  shortName: 'IPMS',
  version: '0.1.0',
  author: 'Mark Lester A. Bolotaolo',
  // graphQLEndpoint: 'http://localhost:8000/graphql'
  // graphQLEndpoint: 'https://wh490179.ispot.cc/graphql'

  graphQLEndpoint: process.env.DEV
    ? 'https://wh490179.ispot.cc/graphql'
    : // ? 'http://localhost:8000/graphql'
      'https://wh490179.ispot.cc/graphql'
};
