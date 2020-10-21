require('dotenv').config()
const { ApolloServer, UserInputError } = require('apollo-server')
const typeDefs = require('./types/types')
const resolvers = require('./resolvers/resolvers')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {console.log('connected to mongodb.')})
  .catch(error => {console.log(error.message)})





const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})