// Prevent future dates in date picker
let today = new Date().toISOString().split("T")[0];
document.getElementById("date").setAttribute("max", today);

document.getElementById("btn").addEventListener("click", function () {
  let input = document.getElementById("date").value;
  let result = document.getElementById("result");

  if (input === "") {
    result.style.display = "block";
    result.style.color = "red";           
    result.innerHTML = "⚠️ Please select your birth date.";
    return;
  }

  let birthDate = new Date(input);
  let today = new Date();

  // 🚨 Check if birth date is in the future
  if (birthDate > today) {
    result.style.display = "block";
    result.style.color = "red";
    result.innerHTML = "⚠️ You have not even been born yet!";
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust days and months if negative
  if (days < 0) {
    months--;
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  result.style.display = "block";
  result.style.color = "green";
  result.innerHTML = ` Your age is ${years} years, ${months} months, and ${days} days.`;
});
