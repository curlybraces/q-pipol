export const CONFIG = {
  appName: 'Investment Programming & Management System',
  shortName: 'IPMS',
  version: '0.1.1',
  author: 'Mark Lester A. Bolotaolo',
  // graphQLEndpoint: 'http://localhost:8000/graphql'
  // graphQLEndpoint: 'https://wh490179.ispot.cc/graphql'

  graphQLEndpoint: process.env.DEV
    ? 'http://localhost:8000/graphql'
    // ?  'https://da-ipms.herokuapp.com/graphql'
    // ? 'https://wh490179.ispot.cc/graphql'
    :  'https://da-ipms.herokuapp.com/graphql'
};
