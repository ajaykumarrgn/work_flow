describe('Combined Cypress Tests', () => {
  beforeEach(() => {
    // Read the Excel file and store data in a Cypress alias
    cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
      cy.wrap(data).as('testData');
    });
  });

  // beforeEach(() => {
  //   // Hook to handle failures and skip to the next test
  //   cy.on('fail', (error, runnable) => {
  //     // Prevent the test from failing
  //     runnable.skip();
  //   });
  // });
  

  // First two 'it' blocks without utility functions
  it('Self Approved',{ retries: 2 }, function () {
    // Read the login URL, email, and password from the Excel data
    const loginURL = this.testData.find(row => row.Field === 'URL').Value;
    const loginEmail = this.testData.find(row => row.Field === 'Email').Value;
    const loginPassword = this.testData.find(row => row.Field === 'Password').Value;

    cy.visit(loginURL);

    cy.get(`#login_email`).click().type(loginEmail);
    cy.get('#login_password').type(loginPassword);
    cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor > .sidebar-item-label').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('.primary-action > .hidden-xs').click();
    cy.get('.btn-modal-close').click().wait(4000);
    
    // Read and use form field values from the Excel data
    const field1Value = this.testData.find(row => row.Field === 'Field1').Value;
    cy.get(':nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .click({ force: true })
    .type(field1Value + '{Enter}') // Field1
    .wait(500)
    .type('{enter}', { force: true });

    const field2Value = this.testData.find(row => row.Field === 'Field2').Value;
    cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
     .click({ force: true })
      .type(field2Value , { force: true }) // Field2
      .wait(500)
      .type('{enter}', { force: true });

    // Read and format the date from the current date, adding 4 days
const currentDate = new Date();
const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 4));

// Function to format date based on the expected format
const formatDate = (date, format) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'dd-mm-yyyy') {
    return `${day}-${month}-${year}`;
  } else if (format === 'dd.mm.yyyy') {
    return `${day}.${month}.${year}`;
  } else {
    throw new Error('Unsupported date format');
  }
};

// Determine the expected format (you might need to customize this logic based on the page or test case)
const expectedFormat = 'dd-mm-yyyy'; // or 'dd.mm.yyyy' based on the format you need

// Format the date according to the expected format
const formattedDate = formatDate(futureDate, expectedFormat);

// Clear the date input field and enter the new formatted date with force option
cy.get('.has-error > .form-group > .control-input-wrapper > .control-input > .input-with-feedback').wait(500)
  .clear()  // Clear any existing date
  .click().wait(3000)  // Open the date picker
  .type(formattedDate + '{Enter}', { force: true }).wait(1000); // Enter the new formatted date with high force



    const field4Value = this.testData.find(row => row.Field === 'Field4').Value;
    cy.get('.rows > .grid-row > .data-row > .col-xs-4').click();
    cy.get('.field-area > .form-group > .link-field > .awesomplete > .input-with-feedback')
      .click().type(field4Value + '{Enter}').wait(5000);

    // Submitting
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  });

  it('Requesting to L level roles',{ retries: 2 }, function () {
    // Read the login URL, email, and password from the Excel data
    const loginURL = this.testData.find(row => row.Field === 'URL').Value;
    const loginEmail = this.testData.find(row => row.Field === 'Email').Value;
    const loginPassword = this.testData.find(row => row.Field === 'Password').Value;
    

    cy.visit(loginURL);

    cy.get(`#login_email`).click().type(loginEmail);
    cy.get('#login_password').type(loginPassword);
    cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor > .sidebar-item-label').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('.primary-action > .hidden-xs').click();
    cy.get('.btn-modal-close').click().wait(4000);

    // Read and use form field values from the Excel data
    const field1Value = this.testData.find(row => row.Field === 'Field1').Value;
    cy.get(':nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .click({ force: true })
    .type(field1Value, { force: true })
    .wait(500)
    .type(field1Value + '{Enter}'); // Field1

    const field2Value = this.testData.find(row => row.Field === 'Field2').Value;
    cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      .click({ force: true })
      .type(field2Value, { force: true }) // Field2
      .wait(500)
      .type(field2Value + '{enter}', { force: true, timeout: 3000 });

// Read and format the date from the current date, adding 4 days
const currentDate = new Date();
const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 4));

// Function to format date based on the expected format
const formatDate = (date, format) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'dd-mm-yyyy') {
    return `${day}-${month}-${year}`;
  } else if (format === 'dd.mm.yyyy') {
    return `${day}.${month}.${year}`;
  } else {
    throw new Error('Unsupported date format');
  }
};

// Determine the expected format (you might need to customize this logic based on the page or test case)
const expectedFormat = 'dd-mm-yyyy'; // or 'dd.mm.yyyy' based on the format you need

// Format the date according to the expected format
const formattedDate = formatDate(futureDate, expectedFormat);

// Clear the date input field and enter the new formatted date with force option
cy.get('.has-error > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .clear()  // Clear any existing date
  .click().wait(3000)   // Open the date picker
  .type(formattedDate + '{Enter}', { force: true }).wait(4000); // Enter the new formatted date with high force


    const field4Value = this.testData.find(row => row.Field === 'Field4').Value;
    cy.get('.rows > .grid-row > .data-row > .col-xs-4').click();
    cy.get('.field-area > .form-group > .link-field > .awesomplete > .input-with-feedback')
      .click().type(field4Value + '{Enter}').wait(5000);

    const field5Value = this.testData.find(row => row.Field === 'Field5').Value;
    cy.get('.col-xs-1.bold > .field-area > .form-group > .input-with-feedback').dblclick()
      .clear({ force: true })  // Clear any existing value with force option
      .type(field5Value + '{Enter}', { force: true }); // Field5 with force option

    const field6Value = this.testData.find(row => row.Field === 'Field6').Value;
    cy.get(':nth-child(10) > .section-head').click();
    cy.get(':nth-child(10) > .section-body > :nth-child(2) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
      .type(field6Value, { force: true });

    // Submit and click actions
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  });

  // The remaining six 'it' blocks will include the utility functions:

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

  it('If condition true approved by L1', function () {
    const providedEmail = 'lenstester@lmnas.com'; // Define the email to be used for login (can be dynamic)

    // Fetch the URL from test data
    const siteURL = getValueByField('URL', this.testData);

      // Debugging log
      cy.log('Navigating to URL:', siteURL);

      if (!siteURL || siteURL === 'about:blank') {
        throw new Error('Invalid URL provided in the test data.');
      }

    if (!siteURL) {
      throw new Error('URL not found in the provided test data');
    }

    // Fetch credentials based on the provided email
    const userCredentials = getUserCredentialsByEmail(providedEmail, this.testData);
    if (!userCredentials) {
      throw new Error('Email not found in the provided test data');
    }

    // Login using fetched credentials
    cy.visit(siteURL);
    cy.get('#login_email').click().type(userCredentials.email, { force: true });
    cy.get('#login_password').click().type(userCredentials.password, { force: true });
    cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

    // Perform post-login actions or verifications as needed
    cy.wait(2000);
    // Approving action example
    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('[href="/app/quotation"]').click();
    cy.get(':nth-child(3) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click();
    // submit buttons
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  });

  it('If condition true rejected by L1', function () {
    const providedEmail = 'lenstester@lmnas.com'; // Define the email to be used for login (can be dynamic)

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
     //cy.get('.filter-selector > .btn-group > .btn-default').click()
     cy.get('#navbar-breadcrumbs > :nth-child(2) > a').click();
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
      
    //Submit buttons 

       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
       cy.wait(4000);
       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link > .menu-item-label').click();
  });
  it('If condition true approved by L2', function () {
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

    // Approving 
    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('[href="/app/quotation"]').click();
    //cy.get('.filter-button').click()
    cy.get(':nth-child(3) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click(); // change the nth child number for fetching expected quotaion () 

    //Submit buttons  
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  });

  it('If condition true rejected by L2', function () {
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
     //Submit buttons 

       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
       //cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  });
  

  it('if condition true approved by L3', function () {
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

    // Approving 
    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('[href="/app/quotation"]').click();
    //cy.get('.filter-selector > .btn-group > .btn-default').click(); //or cy.get('.filter-button').click()
    cy.get('[data-value="100"]').click()
    cy.get(':nth-child(99) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click(); // change the nth child number for fetching expected quotaion () 

    //Submit buttons 
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();

    

  });
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
     cy.get('.fieldname-select-area > .awesomplete > .form-control').click().type()
     cy.get('.filter-field > .form-group > .link-field > .awesomplete > .input-with-feedback').click().type()

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