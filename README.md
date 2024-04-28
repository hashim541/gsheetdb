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

- **Live API**: You can access the live API at **https://gsheetdb.onrender.com**. This API allows you to perform CRUD operations on your Google Sheets data.
- **Example Query findOne Endpoint**: To find a single data entry in the spreadsheet, you can use the findOne endpoint. The URL for querying findOne is **https://gsheetdb.onrender.com/query/findOne**.  
   
|   **ENDPOINT**    |           **DESCRIPTION**                                         |  
|-------------------|-------------------------------------------------------------------|  
|   /findOne        |   This endpoint finds a single data entry in the spreadsheet      |  
|   /findMany       |   This endpoint finds multiple data entries in the spreadsheet    |  
|   /createOne      |   This endpoint creates a single row of data in the spreadsheet   |  
|   /createMany     |   This endpoint creates multiple rows of data in the spreadsheet  |  
|   /updateOne      |   This endpoint updates a single row of data in the spreadsheet   |  
|   /updateMany     |   This endpoint updates multiple rows of data in the spreadsheet  |  
|   /deleteOne      |   This endpoint deletes a single row of data in the spreadsheet   |  
|   /deleteMany     |   This endpoint deletes multiple rows of data in the spreadsheet  |  
  
  

There are also aggregate functions available for performing calculations on your spreadsheet data. You can use the endpoint **https://gsheetdb.onrender.com/query/aggregate/** to access these functions.  
  

For example, if you need to count the number of records, you can use the endpoint **https://gsheetdb.onrender.com/query/aggregate/count**.

  
| **Aggregate Functions** |   **DESCRIPTION**                                                     |
|-------------------------|-----------------------------------------------------------------------|
|      /count             |   Returns the count of total rows                                     |
|      /average           |   Returns the average value of a specified column in the spreadsheet  |
|      /sum               |   Returns the sum of values in a specified column of the spreadsheet  |
|      /min               |   Returns the minimum value of a specified column in the spreadsheet  |
|      /max               |   Returns the maximum value of a specified column in the spreadsheet  |


Before sending a request, make sure to include the following:

In the header, add:

```javascript
headers: {
    'Content-Type': 'application/json',
    'apikey': 'yourapikey'
}
```  
In the body, add:  
```javascript
body: JSON.stringify({
    spreadSheetId: '11V0iILqRDt-K0NX6TH74YKGsE12-P-a-q-xQfTRGw2g', 
    // this is the unique spreadsheet id. You can find your own spreadsheet id in the URL of your spreadsheet.
    sheetIndex: 0 ,
    // Your spreadsheet can contain multiple sheets, each with a unique index from 0 to n.
    query:{}
})
```  

This information ensures that your request is properly formatted and includes necessary details for accessing the spreadsheet data. Make sure to replace `'yourapikey'` with your actual API key.

Lets take an example **Spread Sheet**  


| **EEID:string**   |   **FullName:string**   |   **AnnualSalary:number**   |   **Friends:array**   |
|:-----------------:|:-----------------------:|:---------------------------:|:---------------------:|
| E02387 | Emily Davis      | 141604 | [] |
| E02572 | Luna Sanders     | 163099 | [] |
| E02832 | Penelope Jordan  | 84913  | [] |
| E01639 | Austin Vo        | 95409  | [] |
| E00644 | Joshua Gupta     | 50994  | [] |
| E01550 | Ruby Barnes      | 119746 | [] |
| E04332 | Luke Martin      | 41336  | [] |


**findOne**
```javascript
const options = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey':'yourapikey'
      },
      body:JSON.stringify({    
        spreadSheetId:'11V0iILqRDt-K0NX6TH74YKGsE12-P-a-q-xQfTRGw2g',
        sheetIndex:0,
        query:{
          header:'AnnualSalary',
          value:100000,
          where:'>',
          return:[],
          sort:"_rowNumber:asc"
        },
      })
    }
    

try {
    const response = await fetch('https://gsheetdb.onrender.com/query/findOne',options)
    const data = await response.json()
    console.log(JSON.stringify(data))
} catch (error) {
    console.error('Error:', error.message);
}
```