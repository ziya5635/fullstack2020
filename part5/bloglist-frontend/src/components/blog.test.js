import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog.js'

let blog
let blogs
let user
const setBlogsMock = jest.fn()
const setMessageMock = jest.fn()
let component


beforeEach(() => {
	blogs = [
	{
		title: "C++",
		author: "Sam",
		likes: 8,
		url: "www.C++.com",
		user:{username:'reza5635', password:'adsfjlkadjlj', name:'reza', blogs: ['asjakjjsf']}
	},
	{
		title: "Python",
		author: "Aleksi",
		likes: 3,
		url: "www.python.org",
		user:{username:'sina5635', password:'skdjwjk', name: 'sina', blogs: ['sdkfjjkj']}
	},
	{
		title: "Java",
		author: "Sina",
		likes:2,
		url: "www.java.gov",
		user:{username:'reza5635', password:'adsfjlkadjlj', name:'reza', blogs: ['asjakjjsf']}
	}
	]
	blog = blogs[2]
	user = {
		token: 'sfajj23jljaj?jasd!lkajds',
		username: 'reza5635',
		name: 'reza'
	}
	component = render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogsMock} setMessage={setMessageMock} user={user} />)

	//component.debug()

})

test('blogs render only title and author by default', () => {
	const title = component.container.querySelector('.title')
	const author = component.container.querySelector('.author')
	const likes = component.container.querySelector('.likes')
	const url = component.container.querySelector('.url')
	expect(title).toBeDefined()
	expect(title).toHaveTextContent('Java')
	expect(author).toBeDefined()
	expect(author).toHaveTextContent('Sina')
	expect(likes).toBeNull()
	expect(url).toBeNull()
})

test('likes and url appears once show button clicked', () => {
	const button = component.container.querySelector('.show')
	fireEvent.click(button)
	const likes = component.container.querySelector('.likes')
	expect(likes).toBeDefined()
	const url = component.container.querySelector('.url')
	expect(url).toBeDefined()
	//component.debug()
})

test('when like button cliked twice, its handledr called twice also', () => {
	const button = component.container.querySelector('.show')
	fireEvent.click(button)
	const likeButton = component.container.querySelector('.likeButton')
	likeButton.onclick = jest.fn() //since the handler had been defined inside the component.
	fireEvent.click(likeButton)
	fireEvent.click(likeButton)
	expect(likeButton.onclick.mock.calls).toHaveLength(2)
})
