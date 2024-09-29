describe('Combined Cypress Tests', () => {
  beforeEach(() => {
    // Read the Excel file and store data in a Cypress alias
    cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
      cy.wrap(data).as('testData');
    });
  });


  // Utility functions defined once
  function getUserCredentialsByField(fieldPrefix, testData) {
    const emailField = `${fieldPrefix}`;
    const passwordField = `${fieldPrefix.replace('Email', 'Password')}`;

    const emailData = testData.find((item) => item.Field === emailField);
    const passwordData = testData.find((item) => item.Field === passwordField);

    return emailData && passwordData ? { email: emailData.Value, password: passwordData.Value } : null;
  }

  function getValueByField(field, testData) {
    const fieldData = testData.find((item) => item.Field === field);
    return fieldData ? fieldData.Value : null;
  }

//   it('Processes logins for Email, Email2, and Email3', function () {
//     // Fetch the URL from test data
//     const siteURL = getValueByField('URL', this.testData);

//     // Debugging log
//     cy.log('Navigating to URL:', siteURL);

//     if (!siteURL || siteURL === 'about:blank') {
//       throw new Error('Invalid URL provided in the test data.');
//     }

//     // List of email fields to process (skipping Email1)
//     const emailFields = ['Email', 'Email2', 'Email3'];

//     emailFields.forEach((emailField) => {
//       // Fetch credentials based on the email field
//       const userCredentials = getUserCredentialsByField(emailField, this.testData);
//       if (!userCredentials) {
//         throw new Error(`${emailField} not found in the provided test data`);
//       }

//       // Login using fetched credentials
//       cy.wait(1000);
//       cy.visit(siteURL);
//       cy.get('#login_email').click().type(userCredentials.email, { force: true });
//       cy.get('#login_password').click().type(userCredentials.password, { force: true });
//       cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

//       // Perform post-login actions or verifications as needed
//       cy.wait(1000);

//       // Navigate to the Quotations section and open a quotation
//       cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
//       cy.get('[shortcut_name="Quotations"] > .widget').click();
//       cy.get('[href="/app/quotation"]').click();
//       cy.get(':nth-child(3) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click();

//       // Email (default user) should NOT see the approval button
//       if (emailField === 'Email') {
//         cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn')
//           .should('not.be.visible');
//         cy.log(`${emailField} does not have access to approve.`);

//         // Logout for Email
//         cy.get('.nav-link > .avatar > .avatar-frame').click();
//         cy.get('[onclick="return frappe.app.logout()"]').click();
//         cy.log(`${emailField} user logged out.`);
//       }

//       // Email2 should see the approval button, but won't approve
//       else if (emailField === 'Email2') {
//         cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn')
//           .should('be.visible');
//         cy.log('Approval action button is visible for L2 user.');

//         // Logout for Email2
//         cy.get('.nav-link > .avatar > .avatar-frame').click();
//         cy.get('[onclick="return frappe.app.logout()"]').click();
//         cy.log(`${emailField} user logged out.`);
//       }

//       // Email3 should see the approval button and approve the quotation
//       else if (emailField === 'Email3') {
//         cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn')
//           .should('be.visible');
//         cy.log('Approval action button is visible for L3 user.');

//         // Approve the quotation for Email3 (L3 user)
//         cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
//         cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
//         cy.log('Approval action completed for L3 user.');

//         // Logout for Email3
//         cy.get('.nav-link > .avatar > .avatar-frame').click();
//         cy.get('[onclick="return frappe.app.logout()"]').click();
//         cy.log(`${emailField} user logged out.`);
//       }
//     });
//   });
// });

// it('Processes login and quotation request for Email2', function () {
//   const siteURL = getValueByField('URL', this.testData);
//   const userCredentials = getUserCredentialsByField('Email2', this.testData);

//   if (!userCredentials) throw new Error('Email2 not found in the provided test data');

//   cy.visit(siteURL);
//   cy.get('#login_email').click().type(userCredentials.email, { force: true });
//   cy.get('#login_password').click().type(userCredentials.password, { force: true });
//   cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

//   // Perform steps for Email2 (Same as Email1 but with different field values)
//   cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor > .sidebar-item-label').click();
//   cy.get('[shortcut_name="Quotations"] > .widget').click();
//   cy.get('.primary-action > .hidden-xs').click();
//   //cy.get('.btn-modal-close').click().wait(4000);

//   const field1Value = getValueByField('Field1', this.testData);
//   cy.get(':nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//     .click({ force: true })
//     .type(field1Value, { force: true })
//     .wait(500)
//     .type(field1Value + '{Enter}');

//   const field2Value = getValueByField('Field2', this.testData);
//   cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
//     .click({ force: true })
//     .type(field2Value, { force: true })
//     .wait(500)
//     .type(field2Value + '{enter}', { force: true, timeout: 3000 });

//   // Handle date input dynamically
//   const currentDate = new Date();
//   const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 4));
//   const formattedDate = `${futureDate.getDate().toString().padStart(2, '0')}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getFullYear()}`;
  
//   cy.get('.has-error > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//     .clear()
//     .click().wait(3000)
//     .type(formattedDate + '{Enter}', { force: true }).wait(3000);

//     const field4Value = this.testData.find(row => row.Field === 'Field4').Value;
//           cy.get('.rows > .grid-row > .data-row > .col-xs-4').click();
//           cy.get('.field-area > .form-group > .link-field > .awesomplete > .input-with-feedback')
//             .click().type(field4Value + '{Enter}').wait(5000);
      

//   // Use l3q and l3d for Email2
//   const field5Value = getValueByField('l3q', this.testData);
//   const field6Value = getValueByField('l3d', this.testData);

//   cy.get('.col-xs-1.bold > .field-area > .form-group > .input-with-feedback').dblclick()
//   .clear({ force: true })
//   .type(field5Value + '{Enter}', { force: true });

//   cy.get(':nth-child(10) > .section-head').click();
//   cy.get(':nth-child(10) > .section-body > :nth-child(2) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//     .type(field6Value, { force: true });

//   // Submit and perform post-actions
//   cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
//   cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
//   cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
//   cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').should('not.visible');

//   // Logout
//   cy.get('.nav-link > .avatar > .avatar-frame').click();
//   cy.get('[onclick="return frappe.app.logout()"]').click();
// });
// });

// it('Processes logins for Email, Email1, and Email3 (skipping Email2)', function () {
//   // Fetch the URL from test data
//   const siteURL = getValueByField('URL', this.testData);

//   // Debugging log
//   cy.log('Navigating to URL:', siteURL);

//   if (!siteURL || siteURL === 'about:blank') {
//     throw new Error('Invalid URL provided in the test data.');
//   }

//   // List of email fields to process (skipping Email2)
//   const emailFields = ['Email', 'Email1', 'Email3'];

//   emailFields.forEach((emailField) => {
//     // Fetch credentials based on the email field
//     const userCredentials = getUserCredentialsByField(emailField, this.testData);
//     if (!userCredentials) {
//       throw new Error(`${emailField} not found in the provided test data`);
//     }

//     // Login using fetched credentials
//     cy.wait(1000);
//     cy.visit(siteURL);
//     cy.get('#login_email').click().type(userCredentials.email, { force: true });
//     cy.get('#login_password').click().type(userCredentials.password, { force: true });
//     cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

//     // Perform post-login actions
//     cy.wait(1000);
//     cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
//     cy.get('[shortcut_name="Quotations"] > .widget').click();
//     cy.get('[href="/app/quotation"]').click();
//     cy.get(':nth-child(3) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click();

//     // Check if the action button is visible only for Email3
//     if (emailField === 'Email3') {
//       // For Email3: The action button should be visible
//       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn')
//         .should('be.visible');

//       // Perform the approval action for Email3
//       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
//       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
//       cy.log('Approval action completed for Email3 user.');

//       // Logout for Email3
//       cy.get('.nav-link > .avatar > .avatar-frame').click();
//       cy.get('[onclick="return frappe.app.logout()"]').click();
//       cy.log(`${emailField} user logged out.`);
//     } else {
//       // For Email and Email1: The action button should not be visible
//       cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn')
//         .should('not.be.visible');

//       // Logout for Email and Email1
//       cy.get('.nav-link > .avatar > .avatar-frame').click();
//       cy.get('[onclick="return frappe.app.logout()"]').click();
//       cy.log(`${emailField} user logged out.`);
//     }
//   });


it('Processes login and quotation request for Email3', function () {
  const siteURL = getValueByField('URL', this.testData);
  const userCredentials = getUserCredentialsByField('Email3', this.testData);

  if (!userCredentials) throw new Error('Email3 not found in the provided test data');

  cy.visit(siteURL);
  cy.get('#login_email').click().type(userCredentials.email, { force: true });
  cy.get('#login_password').click().type(userCredentials.password, { force: true });
  cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

  // Perform steps for Email3 (Same as Email2)
  cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor > .sidebar-item-label').click();
  cy.get('[shortcut_name="Quotations"] > .widget').click();
  cy.get('.primary-action > .hidden-xs').click();
  //cy.get('.btn-modal-close').click().wait(4000);

  const field1Value = getValueByField('Field1', this.testData);
  cy.get(':nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .click({ force: true })
    .type(field1Value, { force: true })
    .wait(500)
    .type(field1Value + '{Enter}');

  const field2Value = getValueByField('Field2', this.testData);
  cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
    .click({ force: true })
    .type(field2Value, { force: true })
    .wait(500)
    .type(field2Value + '{enter}', { force: true, timeout: 3000 });

  // Handle date input dynamically
  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 4));
  const formattedDate = `${futureDate.getDate().toString().padStart(2, '0')}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getFullYear()}`;
  
  cy.get('.has-error > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .clear()
    .click().wait(3000)
    .type(formattedDate + '{Enter}', { force: true }).wait(3000);

    const field4Value = this.testData.find(row => row.Field === 'Field4').Value;
    cy.get('.rows > .grid-row > .data-row > .col-xs-4').click();
    cy.get('.field-area > .form-group > .link-field > .awesomplete > .input-with-feedback')
      .click().type(field4Value + '{Enter}').wait(5000);

  // Use l3q and l3d for Email3
  const field5Value = getValueByField('l3q', this.testData);
  const field6Value = getValueByField('l3d', this.testData);

  cy.get('.col-xs-1.bold > .field-area > .form-group > .input-with-feedback').dblclick()
    .clear({ force: true })
    .type(field5Value + '{Enter}', { force: true });

  cy.get(':nth-child(10) > .section-head').click();
  cy.get(':nth-child(10) > .section-body > :nth-child(2) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .type(field6Value, { force: true });

  // Submit and perform post-actions
  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();

  cy.wait(500)

  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').should('be.visible');


  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();

  
  cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  cy.wait(1000)

  // No logout for Email3
});
});



