describe('Combined Cypress Tests', () => {
  beforeEach(() => {
    // Read the Excel file and store data in a Cypress alias
    cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
      cy.wrap(data).as('testData');
    });
  });

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

  function loginAndSubmitQuotation(testData, email, password, submit = true) {
    const loginURL = getValueByField('URL', testData);

    cy.visit(loginURL);
    cy.get('#login_email').click().type(email);
    cy.get('#login_password').type(password);
    cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click().wait(1000);

    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor > .sidebar-item-label').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('.primary-action > .hidden-xs').click().wait(4000);
    cy.get('.btn-modal-close').click();

    const field1Value = getValueByField('Field1', testData);
    cy.get(':nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
      .click({ force: true })
      .type(field1Value, { force: true })
      .wait(500)
      .type(field1Value + '{Enter}'); // Field1

    const field2Value = getValueByField('Field2', testData);
    cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      .click({ force: true })
      .type(field2Value, { force: true }) // Field2
      .wait(500)
      .type(field2Value + '{enter}', { force: true, timeout: 3000 });

    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 4));

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

    const expectedFormat = 'dd-mm-yyyy'; // or 'dd.mm.yyyy' based on the format you need
    const formattedDate = formatDate(futureDate, expectedFormat);

    cy.get('.has-error > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
      .clear()
      .click().wait(3000)
      .type(formattedDate + '{Enter}', { force: true }).wait(4000);

    const field4Value = getValueByField('Field4', testData);
    cy.get('.rows > .grid-row > .data-row > .col-xs-4').click();
    cy.get ('.field-area > .form-group > .link-field > .awesomplete > .input-with-feedback')
      .click().type(field4Value + '{Enter}').wait(5000);

    const field5Value = getValueByField('Field5', testData);
    cy.get('.col-xs-1.bold > .field-area > .form-group > .input-with-feedback').dblclick()
      .clear({ force: true })
      .type(field5Value + '{Enter}', { force: true }); // Field5 with force option

    const field6Value = getValueByField('Field6', testData);
    cy.get(':nth-child(10) > .section-head').click();
    cy.get(':nth-child(10) > .section-body > :nth-child(2) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
      .type(field6Value, { force: true });

    if (submit) {
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
    }
  }

  it('Requesting to L level roles', { retries: 2 }, function () {
    const field5Value = this.testData.find(row => row.Field === 'Field5').Value;
    const field6Value = this.testData.find(row => row.Field === 'Field6').Value;

    const quantityThreshold = 25;
    const discountThreshold = 10;

    if (field5Value < quantityThreshold && field6Value < discountThreshold) {
      // Automatically approve if below the threshold
      loginAndSubmitQuotation(this.testData, 'lenstester@lmnas.com', 'lensTester@03');
    } else {
      // Send for approval to respective roles if above the threshold
      if (field5Value < 27 && field6Value < 15) {
        // L1 role
        loginAndSubmitQuotation(this.testData, 'l1approver@lmnas.com', 'l1Approver@03', false);
      } else if (field5Value < 50 && field6Value < 20) {
        // L2 role
        loginAndSubmitQuotation(this.testData, 'l2approver@lmnas.com', 'l2Approver@03', false);
      } else {
        // L3 role
        loginAndSubmitQuotation(this.testData, 'l3approver@lmnas.com', 'l3Approver@03', false);
      }
    }
  });

  it('L1 role approval', function () {
    loginAndSubmitQuotation(this.testData, 'l1approver@lmnas.com', 'l1Approver@03');
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

  it('L2 role approval', function () {
    loginAndSubmitQuotation(this.testData, 'l2approver@lmnas.com', 'l2Approver@03');
    // Perform post-login actions or verifications as needed
    cy.wait(2000);
    // Approving action example
    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('[href="/app/quotation"]').click();
    cy.get(':nth-child(3) > .list-row > .level-left > .list-subject > .bold > .ellipsis').click();
    // submit buttons
    cy.get ('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  });

  it('L3 role approval', function () {
    loginAndSubmitQuotation(this.testData, 'l3approver@lmnas.com', 'l3Approver@03');
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
});