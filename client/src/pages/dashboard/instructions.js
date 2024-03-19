import img1 from '../../../asset/images/img1.png'
import img2 from '../../../asset/images/img2.png'
import img3 from '../../../asset/images/img3.png'
import img4 from '../../../asset/images/img4.png'
import img5 from '../../../asset/images/img5.png'
import img6 from '../../../asset/images/img6.png'
import img7 from '../../../asset/images/img7.png'
import img8 from '../../../asset/images/img8.png'
import img9 from '../../../asset/images/img9.png'
import img10 from '../../../asset/images/img10.png'
import img11 from '../../../asset/images/img11.png'
import img12 from '../../../asset/images/img12.png'
import img13 from '../../../asset/images/img13.png'
import img14 from '../../../asset/images/img14.png'
import img15 from '../../../asset/images/img15.png'
import img16 from '../../../asset/images/img16.png'
import img17 from '../../../asset/images/img17.png'
import img18 from '../../../asset/images/img18.png'
import img19 from '../../../asset/images/img19.png'



const instructions = [
  {
    title:'How to get APIKEY from gsheetdb',
    steps:[]
  },
  {
    title: "Create a New Google Account ( Recomended )",
    steps: [
      {text:"Navigate to the Google Account sign-up page in your web browser."},
      {
        text:"Look for the 'Create account' button, usually located towards the center of the page, and click on it.",
        img:img1  
      },
      {text:"You will be prompted to enter your personal information. Start by entering your first and last name."},
      {text:"Follow the on-screen prompts to continue setting up your account. This will include choosing a unique username and a secure password."},
      {
        text:"Once you've entered all the necessary information, complete the sign-up process to create your new Google account.",
        img:img2
      }
    ]
  },
  {
    title: "Create a New Project in Google Cloud Console",
    steps: [
      {
        text:"Open your web browser and navigate to the https://console.cloud.google.com .",
        img:img3
      },
      {
        text:"Click on the menu button, usually represented by three horizontal lines in the top left corner of the page. Navigate to 'IAM & Admin' and then select 'Create a Project'.",
        img:img4
      },
      {text:"You will be asked to enter a name for your project in the 'Project Name' field. Choose a descriptive name that will help you identify the project later."},
      {text:"Optionally, you can edit the Project ID if necessary. This ID is a unique identifier for your project."},
      {text:"Choose a location for your project. This is typically the region or zone where your project's resources will be located ( Optional )."},
      {
        text:"Once you've entered all the necessary information, click on the 'Create' button to create your new project.",
        img:img5
      },
      {
        text:'It may take upto 2min to 5min'
      }
    ]
  },
  {
    title: "Enable Google Sheets API",
    steps: [
      {
        text:"In the Google Cloud Console, click on the menu button and navigate to 'APIs & Services', then select 'Library'.",
        img:img6
      },
      {text:"Look for the '+ ENABLE APIS AND SERVICES' button, usually located at the top of the page, and click on it."},
      {
        text:"You will see a search bar. Type 'Google Sheets API' into this bar and press Enter.",
        img:img7
      },
      {text:"From the search results, click on the 'Google Sheets API'."},
      {
        text:"You will be taken to a new page with information about the Google Sheets API. Look for the 'ENABLE' button and click on it to enable the Google Sheets API for your project.",
        img:img8
      }
    ]
  },
  {
    title: "Get `keyfile.json` from a Service Account",
    steps: [
      {
        text:"In the Google Cloud Console, click on the menu button and navigate to 'IAM & Admin', then select 'Service Accounts'.",
        img:img9
      },
      {
        text:"You will see a table with an empty list of your service accounts. Click on + CREATE SERVICE ACCOUNT button.",
        img:img10
      },
      {
        text:'Enter the required details as below.',
        img:img11
      },
      {text:"Youcan skip step 2 and step 3 and click on done"},
      {
        text:"Now you will be redirected to page to something below",
        img:img12
      },
      {
        text:"Look for the Action button, usually represented by three vertical dots, and click on it. From the dropdown menu, select 'Manage keys'.",
        img:img13
      },
      {
        text:'You can click on Add Key button. on dropdown selest create newkey',
        img:img14
      },
      {text:"You will be asked to choose a Key Type. Select 'JSON'."},
      {
        text:"After selecting 'JSON', click the 'Create' button. This will download the service account key, which will be named `keyfile.json`, to your computer.",
        img:img15
      }
    ]
  },
  {
    title:"How to get client Email and Private Key",
    steps:[
      {
        text:"Open keyfile.json you can see clientEmail and private key copy them both",
        img:img16
      },
      {text:"Paste them in api route /dashboard/apikey and click on get apikey button"},
      {text:"After creating apikey you can check them in your apikey section"},
      {text:"Now you can use them in your project"},
      {text:"!! IMPORTANT PLEASE DONT SHARE YOU APIKEY, CLIENT EMAIL, PRIVATE KEY !!"}
    ]
  },
  {
    title:"Setup your spread sheet",
    steps:[]
  },
  {
    title: "Create a New Spreadsheet in Google Sheets",
    steps: [
      {text: "Navigate to https://sheets.google.com in your web browser.",},
      {text: "Click on the 'Blank' option to create a new blank spreadsheet.",},
      {
        text: "You will be redirected to a new spreadsheet document.",
        img:img17
      },
      {
        text: "Take a note of spread sheet Id in the url and sheet index in bottom left corner of the page",
        img:img18
      },
      {text: "In this case spread sheet Id is 1P42UKK1b1tl4cwCA1WRl522KhgVjePr_O2ZItvt1NMA",},
      {text :"The Sheet1's index will be 1 and Sheet2's index will be 2, so on.."}      
    ]
  },
  {
    title: "Share Spreadsheet with Client Email",
    steps: [
      {text: "Open the Google Sheets spreadsheet that you want to share."},
      {text: "Click on the 'Share' button in the top-right corner of the screen."},
      {
        text: "In the 'Share with others' dialog box, enter the client email address obtained from the service account JSON file in the 'People' field.",
        img:img19
      },
      {text: "Choose the access level for the client as 'Editor'."},
      {text: "Click on the 'Send' button to share the spreadsheet with the client email address."},
      {text:"YOU CAN USE THE SAME APIKEY JUST BY SHARING YOUR SPREAD SHEET WITH CLIENT EMAIL FROM SERVICE ACCOUNT."}
    ]
  },
  {
    title: "Now you should have the necessary things below",
    steps: [
      { text: "An API key from gsheetDB (refer to dashboard/apikey route)." },
      { text: "A new spreadsheet created in Google Sheets." },
      { text: "The spreadsheet ID and sheet index of your newly created spreadsheet." },
      { text: "You shared this spreadsheet with your client email obtained from the service account." }
    ]
  }
]
export default instructions
