// Seeded random number generator
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Shuffle array using a seed
function shuffleArray(array, seed) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(seededRandom(seed + i) * (i + 1));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

// Get the week number of the year
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / (24 * 60 * 60 * 1000);
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Generate weekly and weekend jobs based on the seed
function generateWeeklyJobs(weekSeed) {
    const people = ["Jack", "Ester", "Sam", "Marta"];
    const weeklyJobs = [
        "Apparecchiare + Svuotare lavastoviglie",
        "Sparecchiare + Spazzare",
        "Pattumiera",
        "Carta Igienica + Pulizia Casa",
    ];
    const weekendJobs = [
        "Lavatrice",
        "Spesa",
        "Stendere",
        "Piegare cose stese",
    ];

    // Shuffle jobs randomly with the given seed
    const weeklyAssignments = shuffleArray(weeklyJobs, weekSeed);
    const weekendAssignments = shuffleArray(weekendJobs, weekSeed + 1000);

    // Assign jobs to people
    const weeklyJobAssignments = {};
    const weekendJobAssignments = {};

    people.forEach((person, index) => {
        weeklyJobAssignments[person] = weeklyAssignments[index];
        weekendJobAssignments[person] = weekendAssignments[index];
    });

    return { weeklyJobAssignments, weekendJobAssignments };
}

// Generate daily kitchen schedule based on the seed
function generateKitchenSchedule(daySeed) {
    const people = ["Jack", "Ester", "Sam", "Marta"];
    const schedule = {};

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i); // Next 7 days
        const formattedDate = date.toISOString().split("T")[0];
        schedule[formattedDate] = people[i % people.length];
    }

    return schedule;
}

// Populate weekly and weekend jobs into respective lists
function populateJobs(listId, jobs) {
    const list = document.getElementById(listId);
    if (!list) return;

    list.innerHTML = ""; // Clear existing content

    for (const person in jobs) {
        const listItem = document.createElement("li");
        listItem.textContent = `${person}: ${jobs[person]}`;
        list.appendChild(listItem);
    }
}

// Populate daily kitchen schedule into the list
function populateKitchenSchedule(listId, schedule) {
    const list = document.getElementById(listId);
    if (!list) return;

    list.innerHTML = ""; // Clear existing content

    for (const [date, person] of Object.entries(schedule)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${date}: ${person}`;
        list.appendChild(listItem);
    }
}

// Populate all sections
function populateJobsAndKitchen() {
    const today = new Date();
    const currentWeekSeed = today.getFullYear() * 100 + getWeekNumber(today); // e.g., "202447"
    
    // Generate jobs for current week
    const { weeklyJobAssignments, weekendJobAssignments } = generateWeeklyJobs(currentWeekSeed);
    const kitchenSchedule = generateKitchenSchedule(currentWeekSeed);

    // Populate weekly jobs
    populateJobs("current-week-list", weeklyJobAssignments);

    // Populate weekend jobs
    populateJobs("current-weekend-list", weekendJobAssignments);

    // Populate kitchen schedule
    populateKitchenSchedule("daily-kitchen-list", kitchenSchedule);
}

// Run the script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    populateJobsAndKitchen();
});
