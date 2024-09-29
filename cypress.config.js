// Importing required modules for Cypress configuration
const { defineConfig } = require('cypress');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Defining Cypress configuration using the `defineConfig` function
module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 0,  // Retries 2 times in CLI mode
      openMode: 0, // Retries 2 times in interactive mode
    },
    // Setup function to define Node event listeners for Cypress
    setupNodeEvents(on, config) {
      // Defining custom Cypress task to read Excel files
      on('task', {
        // Task to read an Excel file from a given file path
        readExcelFile({ filePath }) {
          try {
            // Resolving the full path of the Excel file
            const fullPath = path.resolve(filePath);
            
            // Reading the file from the specified path as a binary buffer
            const file = fs.readFileSync(fullPath);

            // Reading the workbook from the file buffer using the `xlsx` library
            const workbook = xlsx.read(file, { type: 'buffer' });

            // Extracting the first sheet name from the workbook (assuming data is in the first sheet)
            const sheetName = workbook.SheetNames[0];

            // Accessing the first sheet's data using its sheet name
            const sheet = workbook.Sheets[sheetName];

            // Converting the sheet data to JSON format for easy use in Cypress tests
            const data = xlsx.utils.sheet_to_json(sheet);

            // Returning the extracted data to Cypress
            return data;
          } catch (err) {
            // Logging an error message if reading the file fails
            console.error(`Error reading file: ${err.message}`);
            return null;
          }
        }
      });
    },

  
    // Enabling experimental memory management
    experimentalMemoryManagement: true, // Improves Cypress memory handling

    // // Lowering the number of tests kept in memory during 'cypress open'
     numTestsKeptInMemory: 0, // Reduces memory usage by keeping fewer tests in memory
 },
 });
