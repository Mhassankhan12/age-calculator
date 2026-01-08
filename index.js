// Set max date to today
const dateInput = document.getElementById("date");
dateInput.max = new Date().toISOString().split("T")[0];

document.getElementById("btn").addEventListener("click", calculateAge);

function calculateAge() {
    let inputDate = dateInput.value;
    
    // UI Elements
    const resultContainer = document.getElementById("result-container");
    const extraInfo = document.getElementById("extra-info");
    const yearsDisplay = document.getElementById("years");
    const monthsDisplay = document.getElementById("months");
    const daysDisplay = document.getElementById("days");
    const msgDay = document.getElementById("msg-day");
    const msgBday = document.getElementById("msg-bday");

    if (!inputDate) {
        alert("Please select your birth date first!");
        return;
    }

    let birthDate = new Date(inputDate);
    let today = new Date();

    let y = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let d = today.getDate() - birthDate.getDate();

    // Adjust for negative months/days
    if (d < 0) {
        m--;
        d += getDaysInMonth(today.getFullYear(), today.getMonth());
    }
    if (m < 0) {
        y--;
        m += 12;
    }

    // --- FEATURE 1: Display Age ---
    yearsDisplay.textContent = y;
    monthsDisplay.textContent = m;
    daysDisplay.textContent = d;
    
    // Show containers
    resultContainer.style.display = "flex";
    extraInfo.style.display = "block";

    // --- FEATURE 2: Day of Birth ---
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = daysOfWeek[birthDate.getDay()];
    msgDay.innerHTML = `You were born on a <span>${dayName}</span>.`;

    // --- FEATURE 3: Days until Next Birthday ---
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    // If birthday has passed this year, look at next year
    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const oneDay = 24 * 60 * 60 * 1000;
    let daysLeft = Math.ceil((nextBirthday - today) / oneDay);
    
    if (daysLeft === 365 || daysLeft === 0) {
        msgBday.innerHTML = "🎉 Happy Birthday! It's today! 🎂";
    } else {
        msgBday.innerHTML = `Your next birthday is in <span>${daysLeft} days</span>.`;
    }
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}