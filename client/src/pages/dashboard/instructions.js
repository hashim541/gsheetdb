const instructions = [
    {
      title: "Create a New Google Account",
      steps: [
        "Navigate to the Google Account sign-up page in your web browser.",
        "Look for the 'Create account' button, usually located towards the center of the page, and click on it.",
        "You will be prompted to enter your personal information. Start by entering your first and last name.",
        "Follow the on-screen prompts to continue setting up your account. This will include choosing a unique username and a secure password.",
        "Once you've entered all the necessary information, complete the sign-up process to create your new Google account."
      ]
    },
    {
      title: "Create a New Project in Google Cloud Console",
      steps: [
        "Open your web browser and navigate to the Google Cloud Console.",
        "Click on the menu button, usually represented by three horizontal lines in the top left corner of the page. Navigate to 'IAM & Admin' and then select 'Create a Project'.",
        "You will be asked to enter a name for your project in the 'Project Name' field. Choose a descriptive name that will help you identify the project later.",
        "Optionally, you can edit the Project ID if necessary. This ID is a unique identifier for your project.",
        "Choose a location for your project. This is typically the region or zone where your project's resources will be located.",
        "Once you've entered all the necessary information, click on the 'Create' button to create your new project."
      ]
    },
    {
      title: "Enable Google Sheets API",
      steps: [
        "In the Google Cloud Console, click on the menu button and navigate to 'APIs & Services', then select 'Library'.",
        "Look for the '+ ENABLE APIS AND SERVICES' button, usually located at the top of the page, and click on it.",
        "You will see a search bar. Type 'Google Sheets API' into this bar and press Enter.",
        "From the search results, click on the 'Google Sheets API'.",
        "You will be taken to a new page with information about the Google Sheets API. Look for the 'ENABLE' button, usually located towards the top of the page, and click on it to enable the Google Sheets API for your project."
      ]
    },
    {
      title: "Get `keyfile.json` from a Service Account",
      steps: [
        "In the Google Cloud Console, click on the menu button and navigate to 'IAM & Admin', then select 'Service Accounts'.",
        "You will see a table with a list of your service accounts. Use the Filter table feature to search for the desired service account.",
        "Once you've found the required service account in the list, select it.",
        "Look for the Action button, usually represented by three vertical dots, and click on it. From the dropdown menu, select 'Create key'.",
        "You will be asked to choose a Key Type. Select 'JSON'.",
        "After selecting 'JSON', click the 'Create' button. This will download the service account key, which will be named `keyfile.json`, to your computer."
      ]
    },
    {
      title:"How to get client Email and Private Key",
      steps:[
        "Open keyfile.json  you can see clientEmail and private key copy them both",
        "Paste them in api route /dashboard/apikey and click on get apikey button",
        "After creating apikey you can check them in your apikey section",
        "Now you can use them in your project",
        "!! IMPORTANT PLEASE DONT SHARE YOU APIKEY, CLIENT EMAIL, PRIVATE KEY !!"
      ]
    }
]
export default instructions
