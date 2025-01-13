// Step Tracker using Device Motion API
let step = 0;
let lastAcceleration = null;
const stepThreshold = 1.5;
const stepCount = document.getElementById("step-count");
const resetSteps = document.getElementById("reset-steps");

if ("DeviceMotionEvent" in window) {
  window.addEventListener("devicemotion", (event) => {
    const acceleration = event.accelerationIncludingGravity;

    if (acceleration && lastAcceleration) {
      const deltaX = acceleration.x - lastAcceleration.x;
      const deltaY = acceleration.y - lastAcceleration.y;
      const deltaZ = acceleration.z - lastAcceleration.z;

      const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

      if (delta > stepThreshold) {
        step++;
        stepCount.textContent = step;
      }
    }

    lastAcceleration = {
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z,
    };
  });
} else {
  alert("Device Motion API is not supported on your device.");
}

resetSteps.addEventListener("click", () => {
  step = 0;
  stepCount.textContent = step;
});

// Water Intake Tracker
let waterConsumed = 0;
const waterGoal = document.getElementById("water-goal");
const waterTotal = document.getElementById("water-total");
const logWater = document.getElementById("log-water");

logWater.addEventListener("click", () => {
  waterConsumed += 0.25;
  waterTotal.textContent = waterConsumed.toFixed(2);
  const goal = parseFloat(waterGoal.value || 0);
  if (goal > 0 && waterConsumed >= goal) {
    alert("Congratulations! You have met your water intake goal for today!");
  }
});

// Medicine Reminder
const medicineTime = document.getElementById("medicine-time");
const setReminder = document.getElementById("set-reminder");

setReminder.addEventListener("click", () => {
  const reminderTime = medicineTime.value;
  if (!reminderTime) {
    alert("Please set a valid time.");
    return;
  }

  const now = new Date();
  const [hours, minutes] = reminderTime.split(":").map(Number);
  const reminderDate = new Date();
  reminderDate.setHours(hours, minutes, 0, 0);

  if (reminderDate < now) {
    alert("Reminder time is in the past. Please select a future time.");
    return;
  }

  const timeout = reminderDate - now;
  setTimeout(() => {
    alert("It's time to take your medicine!");
  }, timeout);

  alert(`Reminder set for ${reminderTime}`);
});

// Update date and time every second
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  document.getElementById("current-date-time").textContent = now.toLocaleString(
    "en-US",
    options
  );
}

// Call the function immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);