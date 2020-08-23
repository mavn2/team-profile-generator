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
  await mkManager();
  console.log()
  await mkEngineer();
  await mkIntern
}

//Creates a single manager object
async function mkManager() {
  //Collects manager information
  await inquirer.prompt([
    {
      type: 'input',
      message: 'Enter your manager\'s name',
      name: 'name' 
    },
    {
      type: 'input',
      message: 'Enter your manager\'s Id number',
      name: 'idnum'
    },
    {
      type: 'input',
      message: `Enter your manager's email`,
      name: 'email'
    },
    {
      type: 'input',
      message: `Enter your manager's office number`,
      name: 'office'
    }
  ]).then(response => {
    //Creates/adds a manager object
    const manager = new Manager(response.name, response.idnum, response.email, response.office)
    employees.push(manager);
  });
};

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
  ]).then(response => {
    return response.engineers;
  });
};

async function checkInterns(){
  await inquirer.prompt([
    {
      type: 'number',
      message: 'How many interns are on your team?',
      name: 'interns'
    }
  ]).then(response => {
    return response.interns;
  });
};



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
