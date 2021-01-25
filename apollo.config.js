module.exports = {
  client: {
    includes: ['./src/**/*.tsx'],
    tagName: 'gql',
    service: {
      name: 'podcast-backend',
      url: 'https://nuber-eats-assignment.herokuapp.com/graphql',
    },
  },
};
