import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			bookCount
			born
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			author
		}
	}
`

export const CREATE_BOOK = gql`
	mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String]!) {
		addBook(title: $title, published: $published, author: $author, genres: $genres){
			title
			published
			author
			genres
		}
		}
`