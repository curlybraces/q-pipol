import * as ctx from  '../../../quasar.conf.js'

describe('Login', () => {
	
	context('Unauthenticated', () => {
		it('redirects user if they are not authenticated', () => {
			cy.visit('/')
			cy.url().should('include','/login')
		})
	})
	
	context('Login using form', () => {
		beforeEach(() => {
			cy.visit('/login')
		})
		
		it('shows error message if the user provided wrong username/password', () => {
			cy
				.get('[data-test-id="username"]')
				.find('input')
				.type('mlab817@gmail.com')
				.should('have.value','mlab817@gmail.com')
			
			cy
				.get('[data-test-id="password"]')
				.find('input')
				.type('password123')
				.should('have.value','password123')
			
			// cy.get('[data-test-id="login"]').click()
			cy.get('form').submit()
			
			cy.contains('Error: Incorrect username or password.')
		})
		
		it('should be able to login user and redirect to home page', () => {
			// provide inputs and click login
			cy
				.get('[data-test-id="username"]')
				.find('input')
				.type('mlab817@gmail.com')
				.should('have.value','mlab817@gmail.com')
			
			cy
				.get('[data-test-id="password"]')
				.find('input')
				.type('password')
				.should('have.value','password')
			
			// cy.get('[data-test-id="login"]').click()
			cy.get('form').submit()
			
			// after login, should be redirected to home page
			cy.url().should('include','', () => {
				// after login, localstorage should have a token
				expect(localStorage.getItem('token')).to.exist()
			})
		})
	})
	
})