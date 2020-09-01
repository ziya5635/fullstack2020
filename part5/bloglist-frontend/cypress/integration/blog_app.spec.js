

describe('blog app', function(){
	beforeEach(function(){
		cy.request('post', 'https://localhost:3003/api/test/reset')
		cy.visit('http://localhost:3000')
	})


	it('login form is displayed', function(){
		cy.contains('login')
	})
})