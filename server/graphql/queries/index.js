const {
  GraphQLObjectType,
} = require('graphql')
const { player, players } = require('./player')

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    player,
    players,
  },
})

module.exports = RootQuery
