#   Google Sheet as a Database API

## Introduction:
  
Welcome to the documentation for using Google Sheets as a Database API. This guide will walk you through the setup and usage of this API, allowing you to leverage Google Sheets as a Database for your applications.
  
  
  
## Step 1: Get API Key
  
Before using the Google Sheet as a Database API, you need to obtain an API key. This key will be used to authenticate your requests to the API. You can find your API key in the documentation dashboard at [Documentation](https://localhost:3000/dashboard/documentation). Follow the provided instructions to retrieve your API key.
  
  
  
## Step 2: Setup Your Spreadsheet

To use Google Sheets as a database, you need to set up your spreadsheet correctly. Follow the instructions below to ensure your spreadsheet is properly configured:
  
  
### Header Row Format:
- The header row of your spreadsheet must contain columns. Each column represents a field in your database.
- Each column header should consist of two values separated by a colon (":").
- The first value represents the header name (i.e., the column name).
- The second value represents the data type of the column and can be one of the following: string, number, bool, array, or object.  
Example: "username:string", "isOnline:bool", "phoneNo:array", etc.

### Data Types:
* string: Represents text data.
* number: Represents numerical data.
* bool: Represents boolean (true/false) data.
* array: Represents an array of values.
* object: Represents an object containing key-value pairs.  
Ensure that your spreadsheet adheres to the specified format before proceeding to use it as a database API.

### Sample Spread Sheet
To understand the correct syntax for header rows, you can refer to this
[link](https://docs.google.com/spreadsheets/d/11V0iILqRDt-K0NX6TH74YKGsE12-P-a-q-xQfTRGw2g/edit#gid=670927116).

## Step 3: Querying the Spreadsheet

Once you have completed Step 1 and Step 2, you are ready to query and use the spreadsheet as a database. Below are the endpoints you need to know to interact with the spreadsheet:

+-------------------+-------------------------------------------------------------------+  
|   **ENDPOINT**    |           **DESCRIPTION**                                         |  
|-------------------+-------------------------------------------------------------------+  
|   /findOne        |   This endpoint finds a single data entry in the spreadsheet      |  
|   /findMany       |   This endpoint finds multiple data entries in the spreadsheet    |  
|   /createOne      |   This endpoint creates a single row of data in the spreadsheet   |  
|   /createMany     |   This endpoint creates multiple rows of data in the spreadsheet  |  
|   /updateOne      |   This endpoint updates a single row of data in the spreadsheet   |  
|   /updateMany     |   This endpoint updates multiple rows of data in the spreadsheet  |  
|   /deleteOne      |   This endpoint deletes a single row of data in the spreadsheet   |  
|   /deleteMany     |   This endpoint deletes multiple rows of data in the spreadsheet  |  
+-------------------+-------------------------------------------------------------------+  
