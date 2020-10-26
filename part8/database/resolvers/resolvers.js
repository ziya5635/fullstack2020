require('dotenv').config()
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Mutation: {
    createUser: async(root, args) => {
      try{
        const new_user = await User.create({username: args.username, favoriteGenre: args.favoriteGenre})
        return new_user
      }catch(error){
        if (error.name == 'ValidationError') {
          throw new UserInputError(error.message, {invalidArgs: args})
        }
        console.log(error.message)
        return null
      }
      
    },
    login: async(root, args) => {
      try{
        const user = await User.findOne({username: args.username})
        if (!user || args.password != 'secret') {
          throw new UserInputError("wrong credentials!")
        }
        const token = jwt.sign({username: user.username, id: user._id}, JWT_SECRET)
        return {value: token}

      }catch(error){
        console.log(error.message)
      }
    },
    addBook: async(root, args, context) => {
      const author_name = args.author
      if (!context.currentUser) {
        throw new AuthenticationError("login required!")
      }
      try{
        let author = await Author.findOne({name: author_name})
        if (!author) {
          author = await Author.create({name: args.author})
        }
        await Book.create({...args, author: author._id})
        const book = await Book.findOne({title: args.title}).populate('author')
        return book

      }catch(error){
        if (error.name == 'ValidationError') {
          throw new UserInputError(error.message, {invalidArgs: args})
        }
        console.log(error.message)
        return null
      }
    },
    editAuthor: async(root, args, context) => {console.log(context.currentUser)
      if (!context.currentUser) {
        throw new AuthenticationError("login required!")
      }
      try{
        const author = await Author.findOne({name: args.name})
        if (author) {
          const updated_author = await Author.findOneAndUpdate({name: args.name}, {$set: {'born': args.setBornTo}}, {new: true})
          return updated_author
        }
      }catch(error){
        if (error.name == 'ValidationError') {
          throw new UserInputError(error.message, {invalidArgs: args})
        }
        console.log(error.message)
        return null
      }
    }
  },

  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async() => {
      try{
        const res = await Book.count({})
        return res
      }catch(error){
        console.log(error.message)
      }
    },
    authorCount: async() => {
      try{
        const res = await Author.count({})
        return res
      }catch(error){
        console.log(message.error)
      }
    },
    allBooks: async(root, args) => {
      try{
        const books = await Book.find({}).populate('author')
        if (args.author && args.genre) {
          const res = books.filter(book.author.name === args.author)
          return res.filter(book => book.genres.includes(args.genre))
        }else if (args.author) {
          return books.filter(book => book.author.name === args.author)
        }else if (args.genre) {
          return books.filter(book => book.genres.includes(args.genre))
        }else{
          return books
        }
      }catch(error){
        console.log(error.message)
      }
    },
    allAuthors: async() => {
      try{
        const authors = await Author.find({})
        const books = await Book.find({}).populate('author')
        const author_books = authors.map(author => {
          return books.filter(book => book.author.name === author.name)
        })
        non_empty_author_books = author_books.filter(book => book.length > 0)
        return non_empty_author_books.map(book => {
          const born = authors.find(author => author.name === book[0].author.name).born
          return {name: book[0].author.name, bookCount: book.length, born: born}
        })
      }catch(error){
        console.log(error.message)
      }
    }
  },

  Book: {
    title: root => root.title,
    author: root => root.author,
    published: root => root.published,
    genres: root => root.genres
  },

  Author: {
    name: root => root.name,
    bookCount: root => root.bookCount,
    born: root => root.born
  }
}
module.exports = resolvers

