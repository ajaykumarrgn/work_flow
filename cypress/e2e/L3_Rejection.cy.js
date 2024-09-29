describe('Dynamic User Login Test', () => {
  before(() => {
    // Read the Excel file and store data in a Cypress alias
    cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
      cy.wrap(data).as('testData');
    });
  });


  // Utility functions defined once
  function getUserCredentialsByEmail(email, testData) {
    for (let i = 0; i < testData.length; i++) {
      if (['Email1', 'Email2', 'Email3'].includes(testData[i].Field) && testData[i].Value === email) {
        return {
          email: testData[i].Value,
          password: testData[i + 1].Value, // Assuming the password is next to the email in the test data
        };
      }
    }
    return null; // Return null if the email is not found
  }

  function getValueByField(field, testData) {
    const fieldData = testData.find((item) => item.Field === field);
    return fieldData ? fieldData.Value : null;
  }
  
  it('If condition true rejected by L3', function () {
    const providedEmail = 'l3approver@lmnas.com'; // Define the email to be used for login (can be dynamic)

    // Fetch the URL from test data
    const siteURL = getValueByField('URL', this.testData);
    
    if (!siteURL) {
      throw new Error('URL not found in the provided test data');
    }

    // Fetch credentials based on the provided email
    const userCredentials = getUserCredentialsByEmail(providedEmail, this.testData);
    if (!userCredentials) {
      throw new Error('Email not found in the provided test data');
    }

    // Login using fetched credentials
    cy.visit(siteURL); // Use the fetched URL from the Excel file

    // Perform login
    cy.get('#login_email').click().type(userCredentials.email, { force: true });
    cy.get('#login_password').click().type(userCredentials.password, { force: true });
    cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

    // Perform post-login actions or verifications as needed
    cy.wait(2000); // Adjust waiting time if needed


    // Rejecting 
     cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
     cy.get('[shortcut_name="Quotations"] > .widget').click()
     cy.get('[href="/app/quotation"]').click();
     cy.get('.filter-button').click()
     const field7Value = this.testData.find(row => row.Field === 'Field7').Value;
     cy.get('.fieldname-select-area > .awesomplete > .form-control').click().type(field7Value + '{Enter}').wait(500);
     const field8Value = this.testData.find(row => row.Field === 'Field8').Value;
     cy.get('.filter-field > .form-group > .link-field > .awesomplete > .input-with-feedback').click().type(field8Value + '{Enter}',{force: true}).wait(500);
     cy.get('.filter-action-buttons > div > .btn-primary').click()

     //cy.get('#navbar-breadcrumbs > :nth-child(2) > a').click();
     //cy.get('[data-value="100"]').click()
     cy.get(':nth-child(91) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click(); // change the nth child number for fetching expected quotaion () 
     cy.get('#quotation-more_info_tab-tab').click();

     //Enter rejection message dynamically from test data
    const rejectionMessage = getValueByField('Message', this.testData);
    if (rejectionMessage) {
      cy.get(':nth-child(5) > .section-body > :nth-child(2) > form > div[data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
        .click()
        .type(rejectionMessage, { force: true }); // Type the rejection message
    } else {
      throw new Error('Rejection message not found in the provided test data');
    }
     //Submit buttons 

      //  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
      //  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
      //  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();

  });

});