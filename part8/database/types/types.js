const { gql } = require('apollo-server')

module.exports = gql`
  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type Book {
    title: String! 
    author: Author!
    published: Int
    genres: [String]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
    title: String!
    author: String!
    published: Int
    genres: [String]!
    ): Book

    editAuthor(
    name: String!
    setBornTo: Int!
    ): Author

  }

`