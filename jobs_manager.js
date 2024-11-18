// Function to load JSON data
async function loadJobs() {
    const response = await fetch('jobs.json');
    const data = await response.json();
    return data;
}

// Function to populate weekly and weekend jobs
function populateJobs(sectionId, jobData) {
    const section = document.getElementById(sectionId);
    const list = section.querySelector('ul');
    list.innerHTML = ''; // Clear existing content

    for (const [person, job] of Object.entries(jobData)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${person}:</strong> ${job}`;
        list.appendChild(listItem);
    }
}

// Function to check and update weeks if time has passed
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

// Function to generate random weekly and weekend jobs
function generateNextWeek(startDate) {
    const people = ["Jack", "Ester", "Sam", "Marta"];
    const weeklyJobs = [
        "Apparecchiare + Svuotare lavastoviglie",
        "Sparecchiare + Spazzare",
        "Pattumiera",
        "Carta Igienica + Pulizia Casa"
    ];
    const weekendJobs = [
        "Lavatrice",
        "Spesa",
        "Stendere",
        "Piegare cose stese"
    ];

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const weeklyShuffled = shuffle([...weeklyJobs]);
    const weekendShuffled = shuffle([...weekendJobs]);

    const weeklyAssignments = {};
    const weekendAssignments = {};
    people.forEach((person, index) => {
        weeklyAssignments[person] = weeklyShuffled[index];
        weekendAssignments[person] = weekendShuffled[index];
    });

    const nextStartDate = new Date(startDate);
    nextStartDate.setDate(startDate.getDate() + 7);

    return {
        startDate: nextStartDate.toISOString().split('T')[0],
        weeklyJobs: weeklyAssignments,
        weekendJobs: weekendAssignments
    };
}

// Main logic
async function main() {
    let data = await loadJobs();

    // Check and update weeks if needed
    data = checkAndUpdateWeeks(data);

    // Populate sections with updated data
    populateJobs('current-week', data.currentWeek.weeklyJobs);
    populateJobs('current-weekend', data.currentWeek.weekendJobs);
}

// Run the script
main();
