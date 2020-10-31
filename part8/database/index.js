require('dotenv').config()
const { ApolloServer, UserInputError } = require('apollo-server')
const typeDefs = require('./types/types')
const resolvers = require('./resolvers/resolvers')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {console.log('connected to mongodb.')})
  .catch(error => {console.log(error.message)})

const JWT_SECRET = process.env.JWT_SECRET



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscription server ready at ${subscriptionsUrl}`)
})