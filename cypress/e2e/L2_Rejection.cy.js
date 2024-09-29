describe('Dynamic User Login Test', () => {
  before(() => {
    // Read the Excel file and store data in a Cypress alias
    cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
      cy.wrap(data).as('testData');
    });
  });

  it('logs in based on provided email', function () {
    const providedEmail = 'l2approver@lmnas.com'; // Define the email to be used for login (can be dynamic)

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
     //cy.get('#navbar-breadcrumbs > :nth-child(2) > a').click();
     cy.get(':nth-child(3) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click(); // change the nth child number for fetching expected quotaion () 
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

       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();

  });
});

/**
 * Function to fetch user credentials from test data by email
 * @param {string} email - The email to search for in the test data.
 * @param {Array} testData - The test data array read from the Excel file.
 * @returns {Object} - An object containing email and password if found, otherwise null.
 */
function getUserCredentialsByEmail(email, testData) {
  for (let i = 0; i < testData.length; i++) {
    if (testData[i].Field === 'Email1' && testData[i].Value === email) {
      return {
        email: testData[i].Value,
        password: testData[i + 1].Value, // Assuming the password is next to the email in the test data
      };
    } else if (testData[i].Field === 'Email2' && testData[i].Value === email) {
      return {
        email: testData[i].Value,
        password: testData[i + 1].Value,
      };
    } else if (testData[i].Field === 'Email3' && testData[i].Value === email) {
      return {
        email: testData[i].Value,
        password: testData[i + 1].Value,
      };
    }
  }
  return null; // Return null if the email is not found
}

/**
 * Function to fetch a value from test data by field
 * @param {string} field - The field to search for in the test data.
 * @param {Array} testData - The test data array read from the Excel file.
 * @returns {string} - The value associated with the field if found, otherwise null.
 */
function getValueByField(field, testData) {
  const fieldData = testData.find((item) => item.Field === field);
  return fieldData ? fieldData.Value : null;
}
