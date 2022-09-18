describe('form-validation-unit-test', () => {
  beforeEach(() => {
    // set default url
    cy.visit('http://localhost:3000/')
    cy.contains('Request an invite').click()
  })

  it('Empty form submission', () => {
    cy.contains('Send', {timeout: 1000}).click()

    cy.get('p[id="error-full-name"]').should('have.text', 'Full name is required')
    cy.get('p[id="error-email"]').should('have.text', 'Email is required')
    cy.get('p[id="error-confirm-email"]').should('have.text', 'Email confirmation is required')
  })


  it('Full name less than 3 characters submission', () => {
    cy.get('input[placeholder="Full Name"]').type('ab')
    cy.get('input[placeholder="Email"]').type('success.email@gmail.com')
    cy.get('input[placeholder="Confirm Email"]').type('success.email@gmail.com')

    cy.contains('Send', {timeout: 5000}).click()

    cy.get('p[id="error-full-name"]').should('have.text', 'Full name needs to be at least 3 characters long :(')
  })


  it('Email is not valid format submission', () => {
    cy.get('input[placeholder="Full Name"]').type('abc def')
    cy.get('input[placeholder="Email"]').type('success.emailgmail.com')
    cy.get('input[placeholder="Confirm Email"]').type('success.emailgmail.com')

    cy.contains('Send', {timeout: 5000}).click()

    cy.get('p[id="error-email"]').should('have.text', 'Email is not valid :(')
  })


  it('Confirm email doesn\'t match submission', () => {
    cy.get('input[placeholder="Full Name"]').type('abc def')
    cy.get('input[placeholder="Email"]').type('success.email@gmail.com')
    cy.get('input[placeholder="Confirm Email"]').type('fail.email@gmail.com')

    cy.contains('Send', {timeout: 5000}).click()

    cy.get('p[id="error-confirm-email"]').should('have.text', 'Email doesn\'t match :(')
  })

  it('Form valid but used email submission', () => {
    cy.get('input[placeholder="Full Name"]').type('abc def')
    cy.get('input[placeholder="Email"]').type('usedemail@blinq.app')
    cy.get('input[placeholder="Confirm Email"]').type('usedemail@blinq.app')

    cy.contains('Send', {timeout: 10000}).click()

    cy.get('p[id="error-backend"]').should('have.text', 'This email address is already in use')
  })
})

export {}