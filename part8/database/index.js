require('dotenv').config()
const { ApolloServer, UserInputError } = require('apollo-server')
const typeDefs = require('./types/types')
const resolvers = require('./resolvers/resolvers')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {console.log('connected to mongodb.')})
  .catch(error => {console.log(error.message)})

const JWT_SECRET = process.env.JWT_SECRET



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startWith('bearer ')) {
      const decodedToken = jwt.verify(auth.subString(7), JWT_SECRET)
    }
    const currentUser = User.findById(decodedToken.id)
    return { currentUser }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})