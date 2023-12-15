/*
A row counter app for yarn projects, similar to a doto list with more complexity.
The user can add new project in a form, with the fields: project name, project type (knit or crochet), hook/needles size, yarn type/ yarn weight, notes about the project, date created?. The project name will be the key to retrieve info later (maybe display as a list on screen then user can click to access the counter).

The counter start with 0, with two button add + and subtract -
Each time the user click on the button, the appropriate event handler will fire.

The user can add/edit/delete the saved projects in localStorage.
The projects will be displayed as a table on index.html. There would be button at the end of row to access the poject (resume or edit details).

*/

//Sample data to work with functions
const project1 = {
    'name' : 'beanie hat',
    'type' : 'knit',
    'size': 5,
    'row' : 10,
    'notes' : 'a knit beanie hat for adult'
}

// Current project - Row counting elements
const currentProjectNameDisplay = document.getElementById('current-project-name')
const currentRow = document.getElementById('current-row-display');
const subtractBtn = document.getElementById('subtract-btn');
const addBtn = document.getElementById('add-btn');
const saveForLaterBtn = document.getElementById('save-btn');

// All form elements
const addProjectForm = document.querySelector("form");
const projectNameEl = addProjectForm.elements['project-name'];
const typeEl = addProjectForm.elements['type'];
const toolSizeEl = addProjectForm.elements['tool-size'];
const notesEl = addProjectForm.elements['notes'];

// Saves projects display elements
const displayBtn = document.getElementById('saved-projects-btn');
const projectDisplay = document.getElementById('all-projects-display');
const projectList = document.getElementById('project-list')


// All logic starts here

let currentProject = project1;
let rowCount;
let currentKey;

function addRow() {
    rowCount++;
    currentRow.innerHTML = rowCount;
}

function subtractRow() {
    if (rowCount>0) {
        rowCount--;
    }
    currentRow.innerHTML = rowCount;
}

addBtn.addEventListener('click', addRow);
subtractBtn.addEventListener('click', subtractRow);

// Show currentProject
const currentProjectDetails = document.getElementById('current-project-details')

function showCurrentProject(currentProject) {
    currentProjectDetails.innerHTML = `<p>You are making a ${currentProject.name}, type ${currentProject.type}, using tool size of ${currentProject.size}</p>
    <p>Notes: ${currentProject.notes}.</p>`
    rowCount = currentProject.row;
    currentRow.innerHTML = rowCount;
}

showCurrentProject(currentProject);


function saveForLater(){
    // save current project with current row count to local storage
    currentProject.row = rowCount;
    const jsonObj = JSON.stringify(currentProject);
    localStorage.setItem(currentKey, jsonObj);

    window.alert(`Your project: ${currentProject.name} has been saved.`);

    displayAProject(currentKey, currentProject);

}
saveForLaterBtn.addEventListener('click', saveForLater);



// ADD A NEW PROJECT
addProjectForm.addEventListener('submit', validateNewProject);

function validateNewProject(event) {
    event.preventDefault();

    // save a new project, start with 0 row
    const projectObj = {};
    projectObj.name = projectNameEl.value;
    projectObj.type = typeEl.value;
    projectObj.size = toolSizeEl.value;
    projectObj.notes = notesEl.value;
    projectObj.row = 0;

    // convert the name into an "id" key by lower case and remove all white space
    let nameToSave = projectObj.name.toLowerCase().replaceAll(' ', '');
    // console.log(nameToSave);

    // check to see if this name/project exist in local storage
    if (localStorage.getItem(nameToSave) !== null){
        window.alert('This name already exist, please choose a new name for your project.');
        return false;
    }

    // save to local storage
    const jsonObj = JSON.stringify(projectObj);
    localStorage.setItem(nameToSave, jsonObj);
    window.alert(`Your project: ${projectObj.name} has been saved.`);

    //display as a new card on page
    displayAProject(nameToSave, projectObj);

    // done saving details, reset form
    addProjectForm.reset();
    return true;
}


// DISPLAY ALL SAVED PROJECT
// toggle button
displayBtn.addEventListener('click', () => {
    if (projectDisplay.style.display == 'block') {
        projectDisplay.style.display = 'none';
        projectDisplay.innerHTML ='';
    }
    else {
        projectDisplay.style.display = 'block';
        getProjectObj();   
    }
    
    
})

// get projects from local storage to display
function getProjectObj(){
    if (localStorage.length <= 0) {
        projectDisplay.innerHTML = `<p>There is no saved project. Please add a new project to start.</p>`;
        return;
    }
    let storagelength = localStorage.length;
    for (let i=0; i<storagelength; i++){
        let projectObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        displayAProject(localStorage.key(i), projectObj);
    }

}

// OPTION 1. Display saved projects with template

function displayAProject(key, projectObj) {
    const newCard = document.createElement('div')
    newCard.innerHTML = 
    `<div class="card" style="width: 16rem;" id="${key}">
    <h4 class="card-title">${projectObj.name}</h4>
    <ul>
        <li>Type: ${projectObj.type}</li>
        <li>Tool size: ${projectObj.size}mm</li>
        <li>Row: ${projectObj.row}</li>
        <li>Notes: ${projectObj.notes}</li>
    </ul>
    
    <button>Resume this project</button>
    </div>`

    projectDisplay.appendChild(newCard);

    // Add resume button to the saved project
    newCard.addEventListener('click', () => {
        // auto save the current display project
        saveForLater();

        // get the project card to display as current project
        let projectObj = JSON.parse(localStorage.getItem(key));
        currentProject = projectObj;
        showCurrentProject(currentProject);
        currentKey = key;

        // erase the resumed project from the saved list after it has been displayed as current project
        let self = document.getElementById(`${key}`);
        self.parentNode.removeChild(self);
    });
    
}


// DON'T NEED THIS ANYMORE, use anonymous function inside displayAProject
// function resumeFunc(e) {
//     let key = e.target.getAttribute('id');
//     console('id: ' + key);
//     let projectObj = JSON.parse(localStorage.getItem(key));
//     console.log(projectObj);
//     currentProject = projectObj;
//     showCurrentProject(currentProject);
// }



// OPTION 2. Display saved project by creating new elements - DID NOT USE THIS / commented out the code in html

// function displayProjects(projectObj) {
//     projectDisplay.style.backgroundColor = 'white';

//     for (let key in projectObj) {
//         projectList.appendChild(document.createElement('li')).textContent = projectObj[key];
//     }
// }


