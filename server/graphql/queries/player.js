const {
  GraphQLString,
  GraphQLList,
} = require('graphql')
const artsyApi = require('../../external/artsy')
const PlayerType = require('../types/player')

const PlayerQuery = {
  name: 'PlayerQuery',
  type: PlayerType,
  args: {
    id: { type: GraphQLString },
  },
  resolve: () => ({}),
}

const PlayerListQuery = {
  name: 'PlayerListQuery',
  type: new GraphQLList(PlayerType),
  resolve: async () => artsyApi.getArtists(),
}

module.exports = {
  player: PlayerQuery,
  players: PlayerListQuery,
}
