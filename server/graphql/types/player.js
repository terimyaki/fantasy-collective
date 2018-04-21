const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const PlayerType = new GraphQLObjectType({
  name: 'PlayerType',
  fields: () => ({
    id: { type: GraphQLID },
    artistId: { type: GraphQLID },
    teamId: { type: GraphQLID },
    pendingWaiverId: { type: GraphQLID },
    pendingTradeId: { type: GraphQLID },
    name: { type: GraphQLString },
    biography: { type: GraphQLString },
  }),
})

module.exports = PlayerType
