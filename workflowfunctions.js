
let csvToJson = require('convert-csv-to-json');
let csv = require('csvtojson')
const json2csv = require('json2csv').parse;
const fs = require('fs').promises;
const axios = require('axios');

async function readCSV(filePath) {
  return csv().fromFile(filePath);
}

async function writeCSV(jsonData, filePath) {
  const csvData = json2csv(jsonData);
  await fs.writeFile(filePath, csvData);
}

// Convert all text columns in a row to lowercase
async function filterData(filePath) {
  const data = await readCSV(filePath);
  console.log('Original Data:', data);

  const modifiedData = data.map(row => {
      console.log('Original Row:', row);
      const transformedRow = Object.keys(row).reduce((newRow, key) => {
          newRow[key] = isNaN(row[key]) ? row[key].toLowerCase() : row[key];
          return newRow;
      }, {});
      
      console.log('Transformed Row:', transformedRow);
      return transformedRow;
  });
  await writeCSV(modifiedData, filePath);
  return modifiedData; 
}
  
  async function wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  
  async function convertFormat(inputfile) {
    let data =csvToJson.getJsonFromCsv(inputfile);
    return data;
  }
  
  async function sendPostRequest( payload) {
    let url = 'https://flow.requestcatcher.com';
    await axios.post(url, payload);
  }
  
  module.exports = {
    filterData,
    wait,
    convertFormat,
    sendPostRequest
  };
  