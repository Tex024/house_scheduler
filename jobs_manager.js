// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

// Generate weekly and weekend jobs for this week
function generateWeeklyAndWeekendJobs(weekSeed, previousJobs) {
    const people = ["Jack", "Ester", "Sam", "Marta"];
    const weeklyJobs = ["Apparecchiare + Svuotare lavastoviglie", "Sparecchiare + Spazzare", "Pattumiera", "Carta Igienica + Pulizia Casa"];
    const weekendJobs = ["Lavatrice", "Spesa", "Stendere", "Piegare cose stese"];

    // Shuffle weekly and weekend jobs randomly
    const shuffledWeeklyJobs = shuffleArray([...weeklyJobs]);
    const shuffledWeekendJobs = shuffleArray([...weekendJobs]);

    // Assign jobs for the week, ensuring no repeat jobs for each person
    const weeklyJobAssignments = {};
    const weekendJobAssignments = {};

    people.forEach((person, index) => {
        let assignedWeeklyJob = shuffledWeeklyJobs[index];
        let assignedWeekendJob = shuffledWeekendJobs[index];

        // Ensure that a person doesn't repeat the same job from last week
        // If the job is the same as the previous week, swap with another random job
        while (previousJobs.weeklyJobs[person] === assignedWeeklyJob) {
            assignedWeeklyJob = shuffledWeeklyJobs[(index + 1) % shuffledWeeklyJobs.length];
        }

        while (previousJobs.weekendJobs[person] === assignedWeekendJob) {
            assignedWeekendJob = shuffledWeekendJobs[(index + 1) % shuffledWeekendJobs.length];
        }

        weeklyJobAssignments[person] = assignedWeeklyJob;
        weekendJobAssignments[person] = assignedWeekendJob;
    });

    return { weeklyJobAssignments, weekendJobAssignments };
}

// Generate daily kitchen schedule for the next 7 days
function generateKitchenSchedule() {
    const people = ["Jack", "Ester", "Sam", "Marta"];
    const kitchenSchedule = {};

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i); // Move to the next 7 days
        const formattedDate = date.toISOString().split("T")[0]; // Date in YYYY-MM-DD format
        kitchenSchedule[formattedDate] = people[i % people.length];
    }

    return kitchenSchedule;
}

// Populate jobs and kitchen data into the HTML
function populateJobsAndKitchen() {
    const currentWeek = new Date();
    const currentWeekNumber = Math.floor(currentWeek.getTime() / (1000 * 60 * 60 * 24 * 7)); // Calculate current week number based on date
    const previousWeekJobs = getPreviousWeekJobs(currentWeekNumber); // Get previous week's jobs (from storage or calculated)
    
    // Generate this week's jobs
    const { weeklyJobAssignments, weekendJobAssignments } = generateWeeklyAndWeekendJobs(currentWeekNumber, previousWeekJobs);

    // Generate the kitchen schedule for the next 7 days
    const kitchenSchedule = generateKitchenSchedule();

    // Populate the HTML with the data
    populateJobs("current-week-list", weeklyJobAssignments);
    populateJobs("current-weekend-list", weekendJobAssignments);
    populateKitchenSchedule("daily-kitchen-list", kitchenSchedule);
}

// Populate job lists
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

// Populate kitchen schedule
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

// This is a mock function to simulate getting previous week's jobs
// Ideally, you would retrieve this data from a database or local storage
function getPreviousWeekJobs(weekNumber) {
    // Mock data for the previous week
    return {
        weeklyJobs: {
            Jack: "Apparecchiare + Svuotare lavastoviglie",
            Ester: "Sparecchiare + Spazzare",
            Sam: "Pattumiera",
            Marta: "Carta Igienica + Pulizia Casa",
        },
        weekendJobs: {
            Jack: "Lavatrice",
            Ester: "Spesa",
            Sam: "Stendere",
            Marta: "Piegare cose stese",
        }
    };
}

// Run the script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    populateJobsAndKitchen();
});
