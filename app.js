//Required files and modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

//Establishes path to output folder
const OUTPUT_DIR = path.resolve(__dirname, "output");

//Creates output folder if required
fs.mkdir(OUTPUT_DIR, { recursive: true }, (err) =>{
  if (err){
    console.log('Error: output directory could not be created. Please check your permissions and try again.');
  };
});

//array to store employee objects
const employees = [];

mkTeam();
//Initializes team-builder functions
async function mkTeam(){
  console.log('First, please enter your information.');

  //Collects manager info
  await mkManager();

  //Gets number of engineers and generates profiles for each
  await checkEngineers();

  //Gets number of interns and generates profiles for each
  await checkInterns();

  //Creates/stores html text
  let page = await render(employees);

  //Saves text as html file under team name
  createTeamPage(page);
};

//Collects/saves a Manager's information
async function mkManager(teamName) {
  //Collects manager information
  await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter your name:',
      name: 'name' 
    },
    {
      type: 'input',
      message: 'Enter your ID number:',
      name: 'idnum'
    },
    {
      type: 'input',
      message: `Enter your email:`,
      name: 'email'
    },
    {
      type: 'input',
      message: `Enter your office number:`,
      name: 'office'
    }
  ]).then(response => {
    //Creates/adds a manager object
    const manager = new Manager(response.name, response.idnum, response.email, response.office);
    employees.push(manager);
  });
};

//Collects/saves an Engineer's information
async function mkEngineer(){
  //Collects engineer information
  await inquirer.prompt([
    {
      type: 'input',
      message: `Enter an engineer's name:`,
      name: 'name'
    },
    {
      type: 'input',
      message: 'Enter their ID:',
      name: 'idnum',
    },
    {
      type: 'input',
      message: 'Enter their email:',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Enter a link to their Github page:',
      name: 'github'
    }
  ]).then(response => {
    //Creates/adds an engineer object
    const engineer = new Engineer(response.name, response.idnum, response.email, response.github);
    employees.push(engineer);
  });
};

//Collects/saves an intern's information
async function mkIntern(){
  //Collects Intern information
  await inquirer.prompt([
    {
      type: 'input',
      message: `Enter an intern's name:`,
      name: 'name'
    },
    {
      type: 'input',
      message: 'Enter their ID:',
      name: 'idnum',
    },
    {
      type: 'input',
      message: 'Enter their email:',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Enter their school:',
      name: 'school'
    }
  ]).then(response => {
    //Creates/adds an intern object
    const intern = new Intern(response.name, response.idnum, response.email, response.school);
    employees.push(intern);
  });
};

//Determine how many engineers are on a team
async function checkEngineers(){
  //Gets number of engineers
  await inquirer.prompt([
    {
      type: 'number',
      message: 'How many engineers are on your team?',
      name: 'engineers'
    }
  ]).then(async response => {
    let engineers = response.engineers;
    //Saves the data for each
    for(let i = 0; i < engineers; i++){
      await mkEngineer();
    };
  });
};

//Determine how many interns are on a team
async function checkInterns(){
  //Gets number of interns
  await inquirer.prompt([
    {
      type: 'number',
      message: 'How many interns are on your team?',
      name: 'interns'
    }
  ]).then(async response => {
    let interns = response.interns;
    //Saves the data for each
    for(let i = 0; i < interns; i++){
      await mkIntern();
    };
  });
};

//Names team and creates page
function createTeamPage(page){
  //Gets a unique filename
  inquirer.prompt([
    {
      type: 'input',
      message: `Finally, please enter your team's name:`,
      name: 'teamName'
    }
  ]).then(response => {
    //Creates a clean file path to pass below
    let outputPath = path.join(OUTPUT_DIR, `${response.teamName}`);

    //Creates an html file with the formatted data
    fs.writeFile(outputPath, page, (err) => {
      if (err) { 
        throw err;
      }
      console.log(`${response.teamName} page complete!`);
    });
  });
};