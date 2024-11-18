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

// Function to create a pseudo-random order based on a fixed seed
function seededShuffle(array, seed) {
    let shuffled = array.slice(); // Copy the array
    let random = seed; // Use the seed for randomness

    for (let i = shuffled.length - 1; i > 0; i--) {
        random = (random * 9301 + 49297) % 233280; // Simple pseudo-random number generator
        const j = Math.floor((random / 233280) * (i + 1)); // Random index based on seed
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }

    return shuffled;
}

const testDate = new Date('2024-08-05');
console.log(testDate)

// Seed based on the current week number for the year (ensures a different order each week)
const currentWeekNumber = testDate.getFullYear() * 100 + Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));

// Shuffle the jobs based on the current week number
const weeklyAssignments = seededShuffle(weeklyJobs, currentWeekNumber);
const weekendAssignments = seededShuffle(weekendJobs, currentWeekNumber);

// Assign jobs to people based on shuffled jobs
function assignJobs(jobs, people) {
    let assignments = [];
    for (let i = 0; i < people.length; i++) {
        assignments.push(`${people[i]}: ${jobs[i]}`);
    }
    return assignments;
}

// Assign weekly and weekend jobs
const weeklyJobAssignments = assignJobs(weeklyAssignments, people);
const weekendJobAssignments = assignJobs(weekendAssignments, people);

// Kitchen schedule rotation (rotates daily)
function getKitchenSchedule(people) {
    let schedule = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        const personIndex = (currentWeekNumber + i) % people.length; // Rotate based on the current day
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        schedule.push(`${day.toLocaleDateString(undefined, options)}: ${people[personIndex]}`);
    }
    return schedule;
}

const kitchenSchedule = getKitchenSchedule(people);

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
