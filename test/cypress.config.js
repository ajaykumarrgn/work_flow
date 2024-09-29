const fs = require('fs');
const XLSX = require('xlsx');

// Read and parse XLSX file
const filePath = '/home/ajaykumar/Documents/updated_env.xlsx';
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Convert array to an object
const env = {};
data.forEach(row => {
  env[row[0]] = row[1];
});

module.exports = {
  env,
  // other config options
};
