// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })



Cypress.Commands.add('login', ({username, password}) => {
	cy.request('POST', 'https://localhost:3003/api/login', {
		username, password
	}).then(({body}) => {
		const myStorage = window.localStorage
		myStorage.setItem('loggedUser', JSON.stringify(body))
    	cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlog', ({title, author, url}) => {
	cy.request({
		url: 'https://localhost:3003/api/blogs',
		method: 'POST',
		body: {title, author, url},
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
		}
	})
	cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlogs', () => {
	
		cy.request({
		url: 'https://localhost:3003/api/blogs',
		method: 'POST',
		body: {title: 'Java', author: 'Ansi', url:'www.java.com', likes: 4},
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
		}
	})
		cy.request({
		url: 'https://localhost:3003/api/blogs',
		method: 'POST',
		body: {title: 'Rust', author: 'Ziya', url:'www.rust.io', likes: 2},
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
		}
	})
		cy.request({
		url: 'https://localhost:3003/api/blogs',
		method: 'POST',
		body: {title: 'Javascript', author: 'Farhan', url:'www.java.com', likes: 8},
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
		}
	})
		cy.request({
		url: 'https://localhost:3003/api/blogs',
		method: 'POST',
		body: {title: 'Go', author: 'Ahoora', url:'www.google.com', likes: 5},
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
		}
	})
		cy.visit('http://localhost:3000')
})



