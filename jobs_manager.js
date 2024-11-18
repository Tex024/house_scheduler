// Define people and jobs
const people = ["Jack", "Ester", "Sam", "Marta"];
const weeklyJobs = [
    "Apparecchiare + Svuotare lavastoviglie",
    "Sparecchiare + Spazzare",
    "Pattumiera",
    "Carta Igienica + Pulizia Casa"
];
const weekendJobs = ["Lavatrice", "Spesa", "Stendere", "Piegare cose stese"];

// Get the current week number and year
function getCurrentWeek() {
    const currentDate = new Date();
    const oneJan = new Date(currentDate.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
    const year = currentDate.getFullYear();
    return { weekNumber, year };
}

// Pseudo-random generator using a fixed seed (linear congruential generator)
function seedRandom(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;
    return function() {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

// Shuffle using a consistent random generator
function shuffleArrayWithSeed(array, seed) {
    const random = seedRandom(seed);
    let arrCopy = array.slice(); // Create a copy of the array
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]; // Swap elements
    }
    return arrCopy;
}

// Function to assign jobs ensuring a different job each week using rotation
function assignJobsWithSeed(people, jobs, seed) {
    let shuffledPeople = shuffleArrayWithSeed(people, seed);
    let shuffledJobs = shuffleArrayWithSeed(jobs, seed);
    
    // Return a mapping of people to jobs
    return shuffledPeople.map((person, index) => ({
        person: person,
        job: shuffledJobs[index]
    }));
}

// Function to rotate kitchen schedule for the next 7 days
function assignKitchenSchedule(people, seed) {
    let schedule = [];
    let shuffledPeople = shuffleArrayWithSeed(people, seed);
    for (let i = 0; i < 7; i++) {
        let person = shuffledPeople[i % shuffledPeople.length]; // Rotate over the 4 people
        schedule.push({
            day: `Day ${i + 1}`,
            person: person
        });
    }
    return schedule;
}

// Populate weekly jobs
function populateWeeklyJobs(seed) {
    const weeklyAssignments = assignJobsWithSeed(people, weeklyJobs, seed);
    const weekList = document.getElementById("current-week-list");
    
    weeklyAssignments.forEach(assignment => {
        let listItem = document.createElement("li");
        listItem.textContent = `${assignment.person}: ${assignment.job}`;
        weekList.appendChild(listItem);
    });
}

// Populate weekend jobs
function populateWeekendJobs(seed) {
    const weekendAssignments = assignJobsWithSeed(people, weekendJobs, seed);
    const weekendList = document.getElementById("current-weekend-list");
    
    weekendAssignments.forEach(assignment => {
        let listItem = document.createElement("li");
        listItem.textContent = `${assignment.person}: ${assignment.job}`;
        weekendList.appendChild(listItem);
    });
}

// Populate kitchen schedule for the next 7 days
function populateKitchenSchedule(seed) {
    const kitchenAssignments = assignKitchenSchedule(people, seed);
    const kitchenList = document.getElementById("daily-kitchen-list");
    
    kitchenAssignments.forEach(assignment => {
        let listItem = document.createElement("li");
        listItem.textContent = `${assignment.day}: ${assignment.person}`;
        kitchenList.appendChild(listItem);
    });
}

// Initialize the page content
function initPage() {
    const { weekNumber, year } = getCurrentWeek();
    const seed = year * 100 + weekNumber;  // Create a seed from the year and week number
    
    populateWeeklyJobs(seed);
    populateWeekendJobs(seed);
    populateKitchenSchedule(seed);
}

// Run the initialization function when the page loads
window.onload = initPage;
