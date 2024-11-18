// Array of people living in the house
const people = ["Jack", "Ester", "Sam", "Marta"];

// Jobs for the week
const weeklyJobs = [
    "Apparecchiare + Svuotare lavastoviglie", 
    "Sparecchiare + Spazzare", 
    "Pattumiera", 
    "Carta Igienica + Pulizia Casa"
];

// Jobs for the weekend
const weekendJobs = [
    "Lavatrice", 
    "Spesa", 
    "Stendere", 
    "Piegare cose stese"
];

// Get the current week number in the year (1 to 52/53)
function getCurrentWeekNumber() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
}

// Function to rotate jobs based on the current week number
function rotateJobs(jobs, weekNumber) {
    const rotationIndex = weekNumber % jobs.length; // Rotating index
    return [...jobs.slice(rotationIndex), ...jobs.slice(0, rotationIndex)]; // Rotate jobs array
}

// Function to assign jobs to people based on the rotated jobs
function assignJobs(jobs, people, weekNumber) {
    const rotatedJobs = rotateJobs(jobs, weekNumber);
    let assignments = [];
    for (let i = 0; i < people.length; i++) {
        assignments.push(`${people[i]}: ${rotatedJobs[i]}`);
    }
    return assignments;
}

// Kitchen schedule rotation (rotates daily based on the week number)
function getKitchenSchedule(people, weekNumber) {
    let schedule = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        const personIndex = (weekNumber + i) % people.length; // Rotate based on the current day and week number
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        schedule.push(`${day.toLocaleDateString(undefined, options)}: ${people[personIndex]}`);
    }
    return schedule;
}

// Get the current week number
// const currentWeekNumber = getCurrentWeekNumber();
const currentWeekNumber = 1

// Assign weekly and weekend jobs based on the current week number
const weeklyJobAssignments = assignJobs(weeklyJobs, people, currentWeekNumber);
const weekendJobAssignments = assignJobs(weekendJobs, people, currentWeekNumber);

// Generate the kitchen schedule
const kitchenSchedule = getKitchenSchedule(people, currentWeekNumber);

// Populate the UI with the assignments
function populateList(listId, items) {
    const ul = document.getElementById(listId);
    ul.innerHTML = ''; // Clear any existing content
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

// Populate the job lists on the webpage
window.onload = function () {
    populateList("current-week-list", weeklyJobAssignments);
    populateList("current-weekend-list", weekendJobAssignments);
    populateList("daily-kitchen-list", kitchenSchedule);
};
