// Function to load kitchen JSON data
async function loadKitchenData() {
    const response = await fetch('kitchen_manager.json');
    const data = await response.json();
    return data;
}

// Function to populate kitchen schedule
function populateKitchenSchedule(data) {
    const list = document.getElementById('daily-kitchen-list');
    list.innerHTML = ''; // Clear existing content

    for (const [date, person] of Object.entries(data.dailySchedule)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${date}:</strong> ${person}`;
        list.appendChild(listItem);
    }
}

// Main kitchen logic
async function kitchenManager() {
    const data = await loadKitchenData();
    populateKitchenSchedule(data);
}

// Run the kitchen script
kitchenManager();
