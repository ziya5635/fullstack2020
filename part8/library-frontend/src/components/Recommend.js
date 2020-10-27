import React from 'react'
import { ALL_BOOKS, USER } from '../queries.js'
import { useQuery } from '@apollo/client'

const Recommend = ({ show }) => {
	const res_books = useQuery(ALL_BOOKS)
	const res_user = useQuery(USER)
	if (res_books.loading) {return <div>...loading</div>}
	if (res_user.loading) {return <div>...loading</div>}

	const books = res_books.data.allBooks
	const user = res_user.data.me
	
	if (!show) {return null}
	const user_favorites = []
	books.forEach(book => {
		const res = book.genres.filter(item => item === user.favoriteGenre)
		if (res.length) {
			user_favorites.push(book)
		}
	})

	return (
		<div>
			<h2>Recommendations</h2>
			<div>books in your favorite genre pattern</div>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{user_favorites.map(book => 
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
						)}
				</tbody>
			</table>
		</div>
		)

}

export default Recommend