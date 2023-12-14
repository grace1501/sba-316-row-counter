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
    'name' : 'project 1',
    'type' : 'knit',
    'size': 5,
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

displayBtn.addEventListener('click', () => {
    projectDisplay.classList.toggle('display-style');
})

let rowCount = 0;

function addRow() {
    rowCount++;
    currentRow.innerHTML = rowCount;
}

function subtractRow() {
    rowCount--;
    currentRow.innerHTML = rowCount;
}

addBtn.addEventListener('click', addRow);
subtractBtn.addEventListener('click', subtractRow);


addProjectForm.addEventListener('submit', validateNewProject);

function validateNewProject(event) {
    event.preventDefault();

    const projectObj = {};
    projectObj.name = projectNameEl.value;
    projectObj.type = typeEl.value;
    projectObj.size = toolSizeEl.value;
    projectObj.notes = notesEl.value;

    // convert the name into an "id" by lower case and remove all white space
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

    // done saving details, reset form
    addProjectForm.reset();
    return true;
}


function saveForLater(){

}
saveForLaterBtn.addEventListener('click', saveForLater);


// get projects from local storage to display
function getProjectObj(){
    let storagelength = localStorage.length;
    for (let i=0; i<storagelength; i++){
        let projectObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(projectObj)
        displayProjects(projectObj);
    }

}

// OPTION 1. Display saved projects with template
// This one can only display one, need to display multiple
// function displayProjects(projectObj) {
//     projectDisplay.innerHTML = 
//     `<ul>
//     <h4>Saved project: ${projectObj.name}</h4>
//         <li>This is a ${projectObj.type} project</li>
//         <li>The needle/hook size is ${projectObj.size}mm</li>
//         <li>Note: ${projectObj.notes}</li>
//     </ul>`
// }



// OPTION 2. Display saved project by creating new elements
// Need to display this in a better way for viewing - Table data?
function displayProjects(projectObj) {
    projectDisplay.style.backgroundColor = 'white';

    for (let key in projectObj) {
        projectList.appendChild(document.createElement('li')).textContent = projectObj[key];
    }
}

getProjectObj();
