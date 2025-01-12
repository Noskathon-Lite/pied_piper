// Step Tracker using Device Motion API
let step = 0;
let lastAcceleration = null;
const stepThreshold = 1.5; // Adjust for sensitivity
const stepCount = document.getElementById("step-count");
const resetSteps = document.getElementById("reset-steps");

// Check if Device Motion API is supported
if ("DeviceMotionEvent" in window) {
  window.addEventListener("devicemotion", (event) => {
    const acceleration = event.accelerationIncludingGravity;

    if (acceleration && lastAcceleration) {
      const deltaX = acceleration.x - lastAcceleration.x;
      const deltaY = acceleration.y - lastAcceleration.y;
      const deltaZ = acceleration.z - lastAcceleration.z;

      // Calculate overall acceleration change
      const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

      if (delta > stepThreshold) {
        step++;
        stepCount.textContent = step;
      }
    }
    // Update last acceleration
    lastAcceleration = {
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z,
    };
  });
} else {
  alert("Device Motion API is not supported on your device.");
}

// Reset button functionality
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
  waterConsumed += 0.25; // Increment by 250ml
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
    showNotification("Medicine Reminder", "It's time to take your medicine!");
  }, timeout);

  alert(`Reminder set for ${reminderTime}`);
});

// Notification Functionality
function showNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, icon: "icon.png" });
  } else {
    alert(`${title}: ${body}`);
  }
}

// Request notification permission on page load
if ("Notification" in window) {
  Notification.requestPermission();
}

// Water Gauge using Chart.js
const ctx = document.getElementById('watergauge').getContext('2d');
const waterGauge = new Chart(ctx, {
  type: 'gauge',
  data: {
    datasets: [
      {
        data: [50], // Initial value: 50%
        value: 50,
        backgroundColor: ['#3e95cd', '#ddd'], // Blue and gray
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    layout: {
      padding: {
        bottom: 10,
      },
    },
    needle: {
      radiusPercentage: 2,
      widthPercentage: 3.2,
      lengthPercentage: 80,
      color: 'black',
    },
    plugins: {
      datalabels: false,
    },
    cutoutPercentage: 80,
    rotation: Math.PI, // Half-circle
    circumference: Math.PI, // Half-circle
  },
});

const totalConsumed = 1.5; // Replace this dynamically
const dailyGoal = 3; // Replace dynamically
const percentage = Math.round((totalConsumed / dailyGoal) * 100);
waterGauge.data.datasets[0].data = [percentage];
waterGauge.update();
