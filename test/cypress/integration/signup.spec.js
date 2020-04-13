import * as ctx from  '../../../quasar.conf.js'

describe('Signup Process', () => {
	beforeEach(() => {
		cy.visit('/login')
		
		cy.contains('Sign up').click()
	})
	
	it('shows signup form', () => {
		cy.contains('Create an IPMS Account')
	})
	
	it('shows error when there are errors in inputs', () => {
		
		cy.get('[data-test-id="name"]').find('input').type('a')
		cy.get('[data-test-id="username"]').find('input').type('b')
		cy.get('[data-test-id="password"]').find('input').type('c')
		cy.get('[data-test-id="password_confirmation"]').find('input').type('d')
		
		cy.get('form').submit()
	})
	
	it('submits form when there are no errors', () => {
		cy.get('[data-test-id="name"]').find('input').type('Lester Bolotaolo')
		cy.get('[data-test-id="username"]').find('input').type('mlab817@gmail.com')
		cy.get('[data-test-id="password"]').find('input').type('password')
		cy.get('[data-test-id="password_confirmation"]').find('input').type('password')
		
		cy.get('form').submit()
		
		cy.contains('GraphQL error: Validation failed for the field [register].')
		
		cy.get('[data-test-id="clearError"]').click()
	})
	
	it('shows registration successful dialog when a new user is created', () => {
		cy.get('[data-test-id="name"]').find('input').type('Lester Bolotaolo')
		cy.get('[data-test-id="username"]').find('input').type('newemail@gmail.com')
		cy.get('[data-test-id="password"]').find('input').type('password')
		cy.get('[data-test-id="password_confirmation"]').find('input').type('password')
		
		cy.get('form').submit()
		
		cy.contains('Registration Successful')
	})
})