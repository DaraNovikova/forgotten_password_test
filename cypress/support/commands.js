const {authorizationPage} = require("../pages/authorization.page");

Cypress.Commands.add("signUp", (user) => {
    cy.fixture('userData').its(user).then((userData) => {
        cy.get(authorizationPage.signUpEmail)
            .type(userData.email);
        cy.get(authorizationPage.signUpPassword)
            .type(userData.password);
        cy.get(authorizationPage.signUpConfirmPassword)
            .type(userData.password);
        cy.get(authorizationPage.signUpBtn)
            .click({force: true});
        cy.get(authorizationPage.accountActivationText)
            .should('be.visible');
    });    
  })
  