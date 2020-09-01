import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogMaker from './BlogMaker.js'


const setBlogs = jest.fn()
const setMessage = jest.fn()
let blogs
let user
let component

beforeEach(() => {
	user = {
		token: 'sfajj23jljaj?jasd!lkajds',
		username: 'reza5635',
		name: 'reza'
	}
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
	component = render(<BlogMaker setBlogs={setBlogs} setMessage={setMessage} blogs={blogs} user={user} />)
	
})


test('fires the handler and receive appropriate props', () => {
	const form = component.container.querySelector('#blog-form')
	form.onsubmit = jest.fn()
	const author = component.container.querySelector('#author')
	const title = component.container.querySelector('#title')
	const url = component.container.querySelector('#url')
	fireEvent.change(author, {
		target: {value: 'sina'}
	})
	fireEvent.change(title, {
		target: {value: 'Rust'}
	})
	fireEvent.change(url, {
		target: {value: 'www.rust.com'}
	})
	//component.debug()

	fireEvent.submit(form)
	expect(form.onsubmit.mock.calls).toHaveLength(1) //since handler had been defined inside the component.
	console.log(form.onsubmit.mock.calls[0][0])

})