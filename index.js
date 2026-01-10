// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlEl = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    } else {
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
    }
}

// Calculator Logic
const dateInput = document.getElementById("date");
dateInput.max = new Date().toISOString().split("T")[0];

document.getElementById("btn").addEventListener("click", () => {
    const inputVal = dateInput.value;
    const resultSection = document.getElementById("result-section");
    
    if (!inputVal) {
        alert("Please select your birth date.");
        return;
    }

    const birthDate = new Date(inputVal);
    const today = new Date();

    let y = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let d = today.getDate() - birthDate.getDate();

    if (d < 0) {
        m--;
        d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (m < 0) {
        y--;
        m += 12;
    }

    // Update UI
    document.getElementById("years").textContent = y;
    document.getElementById("months").textContent = m;
    document.getElementById("days").textContent = d;

    // Day of Birth
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById("msg-day").textContent = days[birthDate.getDay()];

    // Next Birthday
    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today > nextBday) nextBday.setFullYear(today.getFullYear() + 1);
    
    const oneDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil((nextBday - today) / oneDay);
    
    document.getElementById("msg-next-bday").textContent = 
        daysLeft === 0 ? "Today is your Birthday!" : `${daysLeft} days left`;

    resultSection.classList.remove("hidden");
});