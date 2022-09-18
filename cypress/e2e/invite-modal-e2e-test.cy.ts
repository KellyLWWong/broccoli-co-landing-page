describe('invite-modal-e2e-test', () => {
  beforeEach(() => {
    // set default url
    cy.visit('http://localhost:3000/')
    cy.contains('Request an invite').click()
  })

  it('Successfully request an invite', () => {
    cy.get('input[placeholder="Full Name"]')
      .type('SuccessTest')
      .should('have.value', 'SuccessTest')

    cy.get('input[placeholder="Email"]')
      .type('success.email@gmail.com')
      .should('have.value', 'success.email@gmail.com')

    cy.get('input[placeholder="Confirm Email"]')
      .type('success.email@gmail.com')
      .should('have.value', 'success.email@gmail.com')

    // await response from send with time out of 5 secs
    cy.contains('Send', {timeout: 5000}).click()

    // cy.wait(3000) // wait for 3 seconds/
    cy.contains('OK').click()
  })


  it('Unsuccessfully request an invite with a used email', () => {
    cy.get('input[placeholder="Full Name"]')
      .type('FailTest')
      .should('have.value', 'FailTest')

    cy.get('input[placeholder="Email"]')
      .type('usedemail@blinq.app')
      .should('have.value', 'usedemail@blinq.app')

    cy.get('input[placeholder="Confirm Email"]')
      .type('usedemail@blinq.app')
      .should('have.value', 'usedemail@blinq.app')

    // await response from send with time out of 5 secs
    cy.contains('Send', {timeout: 5000}).click()

    cy.get('p[id="error-backend"]').should('not.be.empty')
  })

  
  it('Successfully request an invite after failing with an used email', () => {
    cy.get('input[placeholder="Full Name"]')
      .type('FailSuccessTest')
      .should('have.value', 'FailSuccessTest')

    cy.get('input[placeholder="Email"]')
      .type('usedemail@blinq.app')
      .should('have.value', 'usedemail@blinq.app')

    cy.get('input[placeholder="Confirm Email"]')
      .type('usedemail@blinq.app')
      .should('have.value', 'usedemail@blinq.app')

    // await response from send with time out of 5 secs
    cy.contains('Send', {timeout: 5000}).click()

    cy.get('p[id="error-backend"]').should('not.be.empty')

    cy.get('input[placeholder="Email"]')
      .clear()
      .type('success.email@gmail.com')
      .should('have.value', 'success.email@gmail.com')

    cy.get('input[placeholder="Confirm Email"]')
      .clear()
      .type('success.email@gmail.com')
      .should('have.value', 'success.email@gmail.com')

    cy.contains('Send', {timeout: 5000}).click()

    cy.contains('OK').click()
  })
})

export {}