// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "da-ipms",
      // URL to the GraphQL API
      url: "https://da-ipms.herokuapp.com/graphql"
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"]
  }
};
