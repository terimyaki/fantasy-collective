const {
  GraphQLObjectType,
} = require('graphql')
const { editPlayer } = require('./player')

const MutationQuery = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    editPlayer,
  },
})

module.exports = MutationQuery
