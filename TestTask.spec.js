describe('Form Authentication ', () => {
    it('Login with valid credentials', () => {
      cy.visit('http://the-internet.herokuapp.com/login');
      cy.get('#username').type('tomsmith');
      cy.get('#password').type('SuperSecretPassword!');
      cy.get('button[type="submit"]').click();
      cy.get('h2').should('contain', 'Secure Area');
      cy.screenshot('successful_login');
    });
  });