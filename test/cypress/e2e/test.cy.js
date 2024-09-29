describe('Combined Cypress Tests', () => {
    beforeEach(() => {
      // Read the Excel file and store data in a Cypress alias
      cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
        cy.wrap(data).as('testData');
      });
    });
  


it('Processes login and quotation request for Email1', function () {
    const siteURL = getValueByField('URL', this.testData);
    const userCredentials = getUserCredentialsByField('Email1', this.testData);

    if (!userCredentials) throw new Error('Email1 not found in the provided test data');

    cy.visit(siteURL);
    cy.get('#login_email').click().type(userCredentials.email, { force: true });
    cy.get('#login_password').click().type(userCredentials.password, { force: true });
    cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();

    // Perform steps for Email1
    cy.get('[item-name="Offer"] > .desk-sidebar-item > .item-anchor > .sidebar-item-label').click();
    cy.get('[shortcut_name="Quotations"] > .widget').click();
    cy.get('.primary-action > .hidden-xs').click();
    cy.get('.btn-modal-close').click().wait(4000);

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

    // Use l2q and l2d for Email1
    const field5Value = getValueByField('l2q', this.testData);
    const field6Value = getValueByField('l2d', this.testData);

    cy.get('.col-xs-1.bold > .field-area > .form-group > .input-with-feedback').dblclick()
      .clear({ force: true })
      .type(field5Value + '{Enter}', { force: true });

    cy.get(':nth-child(10) > .section-head').click();
    cy.get(':nth-child(10) > .section-body > :nth-child(2) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
      .type(field6Value, { force: true });

    // Submit and perform post-actions
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
    cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').should('not.visible');

    // Logout
    cy.get('.avatar-frame').click();
    cy.get('[onclick="return frappe.app.logout()"]').click();
  });

});