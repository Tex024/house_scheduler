// Household members sorted alphabetically
const members = ["Ester", "Jack", "Marta", "Sam"];

// Weekly jobs and weekend jobs
const weeklyJobs = [
    "Apparecchiare + Svuotare lavastoviglie",
    "Sparecchiare + Spazzare",
    "Pattumiera",
    "Carta Igienica + Pulizia Casa"
];
const weekendJobs = ["Lavatrice", "Spesa", "Stendere", "Piegare cose stese"];

// Function to get the current week number
function getWeekNumber() {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
    return Math.floor(numberOfDays / 7); // Returns current week number
}

// Function to rotate jobs based on week number
function rotateArray(arr, weekNumber) {
    let rotatedArr = arr.slice();
    let rotateBy = weekNumber % arr.length; // Calculate the shift based on the week number
    return rotatedArr.slice(rotateBy).concat(rotatedArr.slice(0, rotateBy));
}

// Function to assign weekly and weekend jobs
function assignJobs() {
    const weekNumber = getWeekNumber();

    // Rotate jobs and assign to members
    const rotatedWeeklyJobs = rotateArray(weeklyJobs, weekNumber);
    const rotatedWeekendJobs = rotateArray(weekendJobs, weekNumber);

    // Assign weekly jobs
    const currentWeekList = document.getElementById('current-week-list');
    members.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = `${member}: ${rotatedWeeklyJobs[index]}`;
        currentWeekList.appendChild(li);
    });

    // Assign weekend jobs
    const currentWeekendList = document.getElementById('current-weekend-list');
    members.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = `${member}: ${rotatedWeekendJobs[index]}`;
        currentWeekendList.appendChild(li);
    });
}

// Function to assign kitchen schedule for the next 7 days
function assignKitchenSchedule() {
    const today = new Date();
    const kitchenList = document.getElementById('daily-kitchen-list');

    const weekNumber = getWeekNumber(); // Ensure rotation starts from the current week

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);

        const li = document.createElement('li');
        const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
        const member = members[(weekNumber + i) % members.length]; // Rotate members based on the day

        li.textContent = `${dayOfWeek}: ${member}`;
        kitchenList.appendChild(li);
    }
}

// Initialize the assignments when the page loads
document.addEventListener('DOMContentLoaded', () => {
    assignJobs();
    assignKitchenSchedule();
});
