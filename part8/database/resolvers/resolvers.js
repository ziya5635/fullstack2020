require('dotenv').config()
const Book = require('../models/book')
const Author = require('../models/author')

const resolvers = {
  Mutation: {
    addBook: async(root, args) => {console.log('in addBook')
      const author_name = args.author;console.log(args)
      try{
        let author = await Author.findOne({name: author_name})
        if (!author) {
          author = await Author.create({name: args.author})
        }
        await Book.create({...args, author: author._id})
        const book = await Book.findOne({title: args.title}).populate('author');console.log(book)
        return book

      }catch(error){console.log('oops')
        console.log(error.message)
        return null
      }
    },
    editAuthor: async(root, args) => {console.log(args)
      try{
        const author = await Author.findOne({name: args.name})
        if (author) {
          const updated_author = await Author.update({name: args.name}, {$set: {'born': args.setBornTo}})
          return updated_author
        }
      }catch(error){
        console.log(error.message)
        return null
      }
    }
  },

  Query: {
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
    allBooks: (root, args) => {//no touch
      if (args.author && args.genre) {
        let res = books
        res = books.filter(book => book.author === args.author)
        return res.filter(book => book.genres.includes(args.genre))
      }else if (args.author) {
        return books.filter(book => book.author === args.author)
      }else if (args.genre){
        return books.filter(book => book.genres.includes(args.genre))
      }else{
        return books
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

