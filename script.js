// Get our HTML elements
const monthDisplay = document.getElementById('month-display');
const calendarGrid = document.getElementById('calendar-grid');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');

// Keep track of the current date we are viewing
let currentDate = new Date();
// Set the time to the middle of the day to avoid timezone issues
currentDate.setHours(12, 0, 0, 0);

// This is where we will store events.
// In a real app, this would come from a database.
const events = {}; // Example: { '2025-09-15': [{ title: 'My Birthday', color: 'green' }] }

// Function to render the calendar
function renderCalendar() {
    // Set the month and year in the header
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    // Clear the previous calendar grid
    calendarGrid.innerHTML = '';

    // Calculate the first day of the month and last day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon, ...

    // Add blank days for the first week
    for (let i = 0; i < startDayOfWeek; i++) {
        const blankDay = document.createElement('div');
        calendarGrid.appendChild(blankDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;
        
        // Highlight today's date
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayCell.classList.add('today');
        }
        
        // Add a click listener to add events
        const dateString = `${year}-${month + 1}-${day}`;
        dayCell.addEventListener('click', () => addEvent(dateString));

        // Display existing events
        if (events[dateString]) {
            events[dateString].forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.textContent = event.title;
                eventDiv.style.backgroundColor = event.color;
                dayCell.appendChild(eventDiv);
            });
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

// Function to add an event (this is where customization starts!)
function addEvent(dateString) {
    const eventTitle = prompt("Enter event title:");
    if (!eventTitle) return; // User canceled

    const eventColor = prompt("Enter a color (e.g., red, blue, #ffcc00):", "blue");
    if (!eventColor) return; // User canceled

    if (!events[dateString]) {
        events[dateString] = [];
    }
    
    events[dateString].push({ title: eventTitle, color: eventColor });
    
    // Re-render the calendar to show the new event
    renderCalendar();
}


// Event listeners for month navigation
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});


// Initial render
renderCalendar();
