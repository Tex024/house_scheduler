// Household members
const members = ["Jack", "Ester", "Sam", "Marta"];

// Weekly jobs and weekend jobs
const weeklyJobs = [
    "Apparecchiare + Svuotare lavastoviglie",
    "Sparecchiare + Spazzare",
    "Pattumiera",
    "Carta Igienica + Pulizia Casa"
];
const weekendJobs = ["Lavatrice", "Spesa", "Stendere", "Piegare cose stese"];

// Function to generate a pseudo-random seed based on the current week number
function getWeekSeed() {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
    return Math.floor(numberOfDays / 7); // Returns current week number
}

// Simple function for shuffling arrays (deterministic based on seed)
function seededShuffle(array, seed) {
    let result = array.slice();
    let m = result.length, t, i;

    // Shuffle algorithm with seed
    while (m) {
        i = Math.floor(seed % m--); 
        seed = Math.floor(seed / m + 1); // Update seed
        t = result[m];
        result[m] = result[i];
        result[i] = t;
    }

    return result;
}

// Function to assign weekly and weekend jobs
function assignJobs() {
    const seed = getWeekSeed();

    // Shuffle jobs with the seed to ensure consistency
    const shuffledWeeklyJobs = seededShuffle(weeklyJobs, seed);
    const shuffledWeekendJobs = seededShuffle(weekendJobs, seed + 1); // Different seed for weekend jobs
    const shuffledMembers = seededShuffle(members, seed + 2); // Shuffle members with another seed for rotation

    // Assign jobs for current week
    const currentWeekList = document.getElementById('current-week-list');
    shuffledMembers.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = `${member}: ${shuffledWeeklyJobs[index]}`;
        currentWeekList.appendChild(li);
    });

    // Assign jobs for current weekend
    const currentWeekendList = document.getElementById('current-weekend-list');
    shuffledMembers.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = `${member}: ${shuffledWeekendJobs[index]}`;
        currentWeekendList.appendChild(li);
    });
}

// Function to assign kitchen schedule for the next 7 days
function assignKitchenSchedule() {
    const today = new Date();
    const kitchenList = document.getElementById('daily-kitchen-list');

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);

        const li = document.createElement('li');
        const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
        const member = members[(getWeekSeed() + i) % members.length]; // Rotate members based on the day

        li.textContent = `${dayOfWeek}: ${member}`;
        kitchenList.appendChild(li);
    }
}

// Initialize the assignments when the page loads
document.addEventListener('DOMContentLoaded', () => {
    assignJobs();
    assignKitchenSchedule();
});
