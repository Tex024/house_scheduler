// Define people and jobs
const people = ["Jack", "Ester", "Sam", "Marta"];
const weeklyJobs = [
    "Apparecchiare + Svuotare lavastoviglie",
    "Sparecchiare + Spazzare",
    "Pattumiera",
    "Carta Igienica + Pulizia Casa"
];
const weekendJobs = ["Lavatrice", "Spesa", "Stendere", "Piegare cose stese"];

// Simple utility to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    let arrCopy = array.slice(); // Create a copy of the array
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]; // Swap elements
    }
    return arrCopy;
}

// Function to assign jobs ensuring no one gets the same job as last week
function assignJobs(people, jobs) {
    // Shuffle both people and jobs arrays
    let shuffledPeople = shuffleArray(people);
    let shuffledJobs = shuffleArray(jobs);
    
    // Return a mapping of people to jobs
    return shuffledPeople.map((person, index) => ({
        person: person,
        job: shuffledJobs[index]
    }));
}

// Function to rotate kitchen schedule for the next 7 days
function assignKitchenSchedule(people) {
    let schedule = [];
    for (let i = 0; i < 7; i++) {
        let person = people[i % people.length]; // Rotate over the 4 people
        schedule.push({
            day: `Day ${i + 1}`,
            person: person
        });
    }
    return schedule;
}

// Populate weekly jobs
function populateWeeklyJobs() {
    const weeklyAssignments = assignJobs(people, weeklyJobs);
    const weekList = document.getElementById("current-week-list");
    
    weeklyAssignments.forEach(assignment => {
        let listItem = document.createElement("li");
        listItem.textContent = `${assignment.person}: ${assignment.job}`;
        weekList.appendChild(listItem);
    });
}

// Populate weekend jobs
function populateWeekendJobs() {
    const weekendAssignments = assignJobs(people, weekendJobs);
    const weekendList = document.getElementById("current-weekend-list");
    
    weekendAssignments.forEach(assignment => {
        let listItem = document.createElement("li");
        listItem.textContent = `${assignment.person}: ${assignment.job}`;
        weekendList.appendChild(listItem);
    });
}

// Populate kitchen schedule for the next 7 days
function populateKitchenSchedule() {
    const kitchenAssignments = assignKitchenSchedule(people);
    const kitchenList = document.getElementById("daily-kitchen-list");
    
    kitchenAssignments.forEach(assignment => {
        let listItem = document.createElement("li");
        listItem.textContent = `${assignment.day}: ${assignment.person}`;
        kitchenList.appendChild(listItem);
    });
}

// Initialize the page content
function initPage() {
    populateWeeklyJobs();
    populateWeekendJobs();
    populateKitchenSchedule();
}

// Run the initialization function when the page loads
window.onload = initPage;
