/*
A row counter app for yarn projects, similar to a doto list with more complexity.
The user can add new project in a form, with the fields: project name, project type (knit or crochet), hook/needles size, yarn type/ yarn weight, notes about the project, date created?. The project name will be the key to retrieve info later (maybe display as a list on screen then user can click to access the counter).

The counter start with 0, with two button add + and subtract -
Each time the user click on the button, the appropriate event handler will fire.

The user can add/edit/delete the saved projects in localStorage.
The projects will be displayed as a table on index.html. There would be button at the end of row to access the poject (resume or edit details).

*/

const addProjectForm = document.querySelector("form");

const currentProjectNameDisplay = document.getElementById('current-project-name')
const currentRow = document.getElementById('current-row-display');
const subtractBtn = document.getElementById('subtract-btn');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const projectDisplay = document.getElementById('all-projects-display');


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