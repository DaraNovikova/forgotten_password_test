const {authorizationPage} = require("../pages/authorization.page");

const modalText = 'Please check your email inbox and click url to reset your password';

describe('Authorization page', () => {

    //you can uncomment before block if you need to sign up the user

    // before(() => {
    //   cy.visit('/login?method=sign-up');
    //   cy.signUp('testUser');
    // })

    beforeEach(() => {
      cy.visit('/');
    })
  
    it('User should be able to email forgotten password', () => {
        cy.url().should('include', '/login');
        cy.get(authorizationPage.signInWrapper).should('be.visible')
          .find(authorizationPage.signInTab)
          .should('have.class', 'active')
          .and('contain', 'Sign In');
        cy.get(authorizationPage.forgotPasswordLink).click();
        cy.get(authorizationPage.forgotPasswordTitle).should('be.visible')
          .and('have.text', 'Forgot Password');
        cy.fixture('userData').its('testUser').then((user) => {
          cy.get(authorizationPage.forgotPasswordEmailInput)
            .type(user.email); 
        });
        cy.get(authorizationPage.modalSubmitBtn).click();
        cy.get(authorizationPage.returnedResetPasswordText).should('be.visible')
          .and('have.text', modalText);
        cy.get(authorizationPage.modalSubmitBtn).click();
        cy.get(authorizationPage.forgotPasswordModal).should('not.be.visible');
    })
}) 
 