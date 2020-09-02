

describe('blog app', function(){
	beforeEach(function(){
		cy.request('post', 'https://localhost:3003/api/test/reset')
		cy.visit('http://localhost:3000')
		cy.request('post', 'https://localhost:3003/api/users', {name:'sina', username:'sina5635', password:'1367'})
		cy.request('post', 'https://localhost:3003/api/users', {name:'reza', username:'reza5635', password:'5635'})
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

	it('creates a new blog', function(){
		cy.login({username:'sina5635', password:'1367'})
		
		cy.contains('new blog').click()
		cy.get('#title').type('C++')
		cy.get('#author').type('Alexi')
		cy.get('#url').type('www.c++.com')
		cy.get('.form-button').click()
		cy.get('.success')
		cy.contains('C++ Alexi')
	})

	it('user can like a blog', function(){
		cy.login({username: 'sina5635', password: '1367'})
		cy.createBlog({title: 'python', url:'www.python.org', author:'Sami'})
		cy.get('.show').click()
		cy.get('.likeButton').click()
		
	})

	it('the owner of the blog can delete it', function(){
		cy.login({username: 'sina5635', password: '1367'})
		cy.createBlog({title: 'python', url:'www.python.org', author:'Sami'})
		cy.get('.show').click()
		cy.get('.remove-button').should('be.visible').click()
		cy.get('.success')
	})

	it('blogs can not be deleted if one is not the owner', function(){
		cy.login({username: 'sina5635', password: '1367'})
		cy.createBlog({title: 'python', url:'www.python.org', author:'Sami'})
		cy.get('.logout').click()
		cy.login({username: 'reza5635', password: '5635'})
		cy.get('.show').click()
		cy.get('.remove-button').should('not.be.visible')
	})

	it('blogs are orderd based on their likes', function(){
		cy.login({username: 'reza5635', password: '5635'})
		cy.createBlogs()

		cy.request('GET', 'https://localhost:3003/api/blogs')
		.then((response) => {
			const blogs = response.body
			blogs.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
			const highestLikes = blogs[0]
			const leastLikes = blogs[blogs.length-1]
			cy.get('.blog:first').should('have.id', highestLikes.title)
			cy.get('.blog:first').contains(highestLikes.title)
			cy.get('.blog:first').find('.author').contains(highestLikes.author)

			cy.get('.blog:last').should('have.id', leastLikes.title)
			cy.get('.blog:last').contains(leastLikes.title)
			cy.get('.blog:last').find('.author').contains(leastLikes.author)
		})

	})

})