// Function to load JSON data
async function loadJobs() {
    const response = await fetch('jobs.json');
    const data = await response.json();
    return data;
}

// Function to populate the page with job data
function populateWeek(sectionId, weekData) {
    const section = document.getElementById(sectionId);
    const list = section.querySelector('ul');
    list.innerHTML = ''; // Clear existing content

    for (const [person, jobs] of Object.entries(weekData.jobs)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${person}:</strong> Easy: ${jobs.easy}, Difficult: ${jobs.difficult}`;
        list.appendChild(listItem);
    }
}

// Function to update weeks if time has passed
function checkAndUpdateWeeks(data) {
    const currentDate = new Date();
    const currentWeekDate = new Date(data.currentWeek.startDate);
    const nextWeekDate = new Date(data.nextWeek.startDate);

    if (currentDate >= nextWeekDate) {
        // Replace current week with next week
        data.currentWeek = data.nextWeek;

        // Generate new random jobs for next week
        data.nextWeek = generateNextWeek(currentWeekDate);
    }

    return data;
}

// Function to generate random jobs for the next week
function generateNextWeek(startDate) {
    const people = ["Jack", "Ester", "Sam", "Marta"];
    const easyJobs = ["Dusting", "Watering plants", "Vacuuming", "Folding clothes", "Sweeping", "Wiping windows", "Tidying shelves", "Dusting lamps"];
    const difficultJobs = ["Cleaning the garage", "Cooking", "Mowing the lawn", "Deep cleaning the bathroom", "Fixing the shed", "Organizing the pantry", "Raking leaves", "Washing curtains"];

    const newJobs = {};
    people.forEach(person => {
        const easyJob = easyJobs[Math.floor(Math.random() * easyJobs.length)];
        const difficultJob = difficultJobs[Math.floor(Math.random() * difficultJobs.length)];
        newJobs[person] = { easy: easyJob, difficult: difficultJob };
    });

    const nextStartDate = new Date(startDate);
    nextStartDate.setDate(startDate.getDate() + 7);

    return {
        startDate: nextStartDate.toISOString().split('T')[0],
        jobs: newJobs
    };
}

// Main logic
async function main() {
    let data = await loadJobs();

    // Check and update weeks if needed
    data = checkAndUpdateWeeks(data);

    // Populate sections with updated data
    populateWeek('current-week', data.currentWeek);
    populateWeek('next-week', data.nextWeek);
}

// Run the script
main();
