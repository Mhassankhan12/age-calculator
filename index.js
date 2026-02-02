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

// ==========================================
// REAL-TIME CLOCK & DATE
// ==========================================
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', { 
        hour12: false, hour: '2-digit', minute: '2-digit' 
    }); // Simplified for aesthetic
    
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' 
    });
}
setInterval(updateClock, 1000);
updateClock();

// ==========================================
// CALCULATOR ENGINE
// ==========================================
const dateInput = document.getElementById("date");
dateInput.max = new Date().toISOString().split("T")[0];

document.getElementById("btn").addEventListener("click", calculateAge);

function calculateAge() {
    const inputVal = dateInput.value;
    const resultSection = document.getElementById("result-section");
    const shareBtn = document.getElementById("share-btn");
    
    if (!inputVal) {
        alert("Please select your birth date first!");
        return;
    }

    const birthDate = new Date(inputVal);
    const today = new Date();

    // 1. Basic Age (Years, Months, Days)
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

    // 2. Zodiac Sign
    const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);
    
    // 3. Next Birthday Countdown
    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today > nextBday) nextBday.setFullYear(today.getFullYear() + 1);
    
    const oneDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil((nextBday - today) / oneDay);
    const nextBdayMsg = daysLeft === 0 ? "Happy Birthday!" : `${daysLeft} days left`;
    const nextBdayDay = daysLeft === 0 ? "Enjoy your day!" : nextBday.toLocaleDateString('en-US', { weekday: 'long' });

    // 4. Detailed Life Stats
    const diffTime = Math.abs(today - birthDate);
    const totalWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (1000 * 60));

    // UPDATE UI
    animateValue("years", y);
    animateValue("months", m);
    animateValue("days", d);
    
    document.getElementById("zodiac-sign").textContent = zodiac;
    document.getElementById("msg-next-bday").textContent = nextBdayMsg;
    document.getElementById("msg-day").textContent = nextBdayDay;
    
    document.getElementById("total-weeks").textContent = totalWeeks.toLocaleString();
    document.getElementById("total-hours").textContent = totalHours.toLocaleString();
    document.getElementById("total-minutes").textContent = totalMinutes.toLocaleString();

    resultSection.classList.remove("hidden");
    shareBtn.classList.remove("hidden");
}

function getZodiacSign(day, month) {
    const zodiacs = [
      { sign: "Capricorn", end: 19 }, { sign: "Aquarius", end: 18 }, { sign: "Pisces", end: 20 },
      { sign: "Aries", end: 19 }, { sign: "Taurus", end: 20 }, { sign: "Gemini", end: 20 },
      { sign: "Cancer", end: 22 }, { sign: "Leo", end: 22 }, { sign: "Virgo", end: 22 },
      { sign: "Libra", end: 22 }, { sign: "Scorpio", end: 21 }, { sign: "Sagittarius", end: 21 },
      { sign: "Capricorn", end: 31 }
    ];
    // Adjust month to be 0-indexed for array access if needed, currently logic handles 1-12
    // If day <= end date of that month's slot, it's that sign. Else it's the next one.
    // Simplifying:
    if (day <= zodiacs[month-1].end) return zodiacs[month-1].sign;
    else return zodiacs[month % 12].sign; // Handle Dec -> Jan transition
}

// Animation helper
function animateValue(id, value) {
    const obj = document.getElementById(id);
    let start = 0;
    const end = value;
    const duration = 1000;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Share Functionality (Copy to clipboard)
document.getElementById('share-btn').addEventListener('click', () => {
    const age = `${document.getElementById('years').innerText} Years`;
    const nextBday = document.getElementById('msg-next-bday').innerText;
    const text = `I am ${age} old! My next birthday is in ${nextBday}. Calculated via dynamic AgeCalc.`;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = document.getElementById('share-btn').innerHTML;
        document.getElementById('share-btn').innerText = "Copied!";
        setTimeout(() => document.getElementById('share-btn').innerHTML = originalText, 2000);
    });
});

// PWA Logic (Preserved)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => console.log(err));
  });
}