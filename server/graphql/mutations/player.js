const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql')
const PlayerType = require('../types/player')

const editPlayer = {
  name: 'PlayerMutation',
  type: PlayerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    teamId: { type: GraphQLString },
  },
  resolve: () => ({}),
}

module.exports = {
  editPlayer,
}
