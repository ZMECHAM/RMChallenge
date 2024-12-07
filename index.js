// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What the title of your project?',
    },
    {
        type:'input',
        name:'description',
        message:'Provide description for project:',
    },
    {
        type: 'input',
        name: 'installation',
        message:'How to install'
    },
    {
        type:'input',
        name: 'usage',
        message: 'Provide usage information',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'provide test instructions:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for you project:',
        choices: ['MIT', 'GPLv3', 'Apache-2.0', 'BSD-3-Clause'],
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter your GitHub Username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },

];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
     if (err) {
       console.error('Error Writing file:', err);
     }else {
        console.log('Succesfully created README');
     }
    }); 
}

function generateMarkdown(data) {
    const licenseBadgeURL = `https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-blue.svg`;

    return `
    # ${data.title}
    ![License](${licenseBadgeURL})
    ## Description
    ${data.description}
    ## Table Of Contents
    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [license](#license)
    - [Contributing](# contributing)
    - [tests](#tests)
    - [Questions](#questions)
    
    ## Installation
    ${data.installation}
    
    ## Usage
    ${data.usage}
    
    ## License
    This Project is licensed under the ${data.license} license.
    
    ## Contributing
    ${data.contributing}
    
    ## Tests
    ${data.tests}
    
    ## Questions
    For questions, reach out to:
    - GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})
    - Email: [${data.email}](mailto:${data.email})
    `;
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const markdown = generateMarkdown(answers);
        writeToFile('README.md', markdown);
        console.log('README.md has been generated successfully!');
    })
}

// Function call to initialize app
init();
