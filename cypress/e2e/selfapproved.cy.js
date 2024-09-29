describe('Template Spec', () => {
  before(() => {
    // Read the Excel file and store data in a Cypress alias
    cy.task('readExcelFile', { filePath: '/home/ajaykumar/Documents/test_data.xlsx' }).then((data) => {
      cy.wrap(data).as('testData');
    });
  });

  it('passes', function () {
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
      .type(field1Value + '{Enter}'); // Field1
      

    const field2Value = this.testData.find(row => row.Field === 'Field2').Value;
    cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback').wait(500)
      .click({ force: true })
      .type(field2Value, { force: true }) // Field2
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
cy.get('.has-error > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .clear()  // Clear any existing date
  .click()  // Open the date picker
  .wait(500)
  .type(formattedDate + '{Enter}', { force: true }); // Enter the new formatted date with high force


    const field4Value = this.testData.find(row => row.Field === 'Field4').Value;
    cy.get('.rows > .grid-row > .data-row > .col-xs-4').click();
    cy.get('.field-area > .form-group > .link-field > .awesomplete > .input-with-feedback')
      .click().type(field4Value + '{Enter}').wait(5000);
       // cy.wait(2000);

       //Submting
     cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
     cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').click();
     cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').click();
  })
})
