const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { doesNotMatch } = require("assert");

//array to store employee objects
const employees = [];

mkTeam();
//Initializes team-builder functions
async function mkTeam(){
  console.log('First, please enter your information.')

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
}

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
      message: 'Enter your Id number:',
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
    const manager = new Manager(response.name, response.idnum, response.email, response.office)
    employees.push(manager);
  });
};

//Collects/saves an Engineer's information
async function mkEngineer(){
  //Collects engineer information
  await inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter their name',
      name: 'name'
    },
    {
      type: 'input',
      message: 'Please enter their ID',
      name: 'idnum',
    },
    {
      type: 'input',
      message: 'Please enter their email',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Please enter a link to their github page',
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
      message: 'Please enter their name',
      name: 'name'
    },
    {
      type: 'input',
      message: 'Please enter their ID',
      name: 'idnum',
    },
    {
      type: 'input',
      message: 'Please enter their email',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Please enter their school',
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
  await inquirer.prompt([
    {
      type: 'number',
      message: 'How many engineers are on your team?',
      name: 'engineers'
    }
  ]).then(async response => {
    let engineers = response.engineers;

    for(let i = 0; i < engineers; i++){
      await mkEngineer();
    };
  });
};

//Determine how many interns are on a team
async function checkInterns(){
  await inquirer.prompt([
    {
      type: 'number',
      message: 'How many interns are on your team?',
      name: 'interns'
    }
  ]).then(async response => {
    let interns = response.interns;
    for(let i = 0; i < interns; i++){
      await mkIntern();
    }
  });
};

//Names team and creates page
function createTeamPage(page){
  inquirer.prompt([
    {
      type: 'input',
      message: `Finally, please enter your team's name:`,
      name: 'teamName'
    }
  ]).then(response => {
    fs.writeFile(`${response.teamName}.html`, page, (err) => {
      if (err) { 
        throw err;
      }
      console.log(`${response.teamName} page complete!`)
    })
  })
};