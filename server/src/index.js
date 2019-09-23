const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client');
// const resolvers = require('./resolvers')
const Query = require('./resolvers/Queries');
const Mutation = require('./resolvers/Mutations');

const resolvers = {
	Query,
	Mutation
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: {
		prisma
	},
})

server.start(() => console.log('Server is running on http://localhost:4000'))
