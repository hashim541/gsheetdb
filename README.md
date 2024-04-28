#   Google Sheet as a Database API

Introduction:

Welcome to the documentation for using Google Sheets as a Database API. This guide will walk you through the setup and usage of this API, allowing you to leverage Google Sheets as a Database for your applications.

Step 1: Get API Key

Before using the Google Sheet as a Database API, you need to obtain an API key. This key will be used to authenticate your requests to the API. You can find your API key in the documentation dashboard at https://localhost:3000/dashboard/documentation. Follow the provided instructions to retrieve your API key.

Step 2: Setup Your Spreadsheet

To use Google Sheets as a database, you need to set up your spreadsheet correctly. Follow the instructions below to ensure your spreadsheet is properly configured:

Header Row Format:
The header row of your spreadsheet must contain columns. Each column represents a field in your database.
Each column header should consist of two values separated by a colon (":").
The first value represents the header name (i.e., the column name).
The second value represents the data type of the column and can be one of the following: string, number, bool, array, or object.
Example: "username:string", "isOnline:bool", "phoneNo:array", etc.
Data Types:
string: Represents text data.
number: Represents numerical data.
bool: Represents boolean (true/false) data.
array: Represents an array of values.
object: Represents an object containing key-value pairs.
Ensure that your spreadsheet adheres to the specified format before proceeding to use it as a database API.

