

describe('blog app', function(){
	beforeEach(function(){
		cy.request('post', 'https://localhost:3003/api/test/reset')
		cy.visit('http://localhost:3000')
		cy.request('post', 'https://localhost:3003/api/users', {name:'sina', username:'sina5635', password:'1367'})
	})


	it('login form is displayed', function(){
		cy.contains('login').click()
	})

	describe('login', function(){
		it('able to login successfuly using correct credentials', function(){
			cy.contains('login').click()
			cy.get('#username').type('sina5635')
			cy.get('#password').type('1367')
			cy.contains('login').click()

			cy.get('.success')
		})

		it('not able to login when invalid credentials provided', function(){
			cy.contains('login').click()
			cy.get('#username').type('sina5635')
			cy.get('#password').type('132llsa')
			cy.contains('login').click()

			cy.get('.error')
			cy.get('.error').should('have.css', 'font-family', 'Helvetica, Arial, sans-serif')
		})
	})

	it.only('creates a new blog', function(){
		cy.login({username:'sina5635', password:'1367'})
		
		cy.contains('new blog').click()
		cy.get('#title').type('C++')
		cy.get('#author').type('Alexi')
		cy.get('#url').type('www.c++.com')
		cy.get('.form-button').click()
		cy.get('.success')
		cy.contains('C++ Alexi')
	})
})