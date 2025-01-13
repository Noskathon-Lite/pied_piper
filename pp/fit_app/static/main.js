// Date and Time
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
updateDateTime();
setInterval(updateDateTime, 1000);

// Step Tracker
let step = 0;
let lastAcceleration = null;
const stepThreshold = 1.5;
const stepCountDisplay = document.getElementById("step-count");
const resetStepsButton = document.getElementById("reset-steps");
const stepProgress = document.querySelector(".step-progress");

function showStepNotification() {
  if (Notification.permission === "granted") {
    new Notification("Step Count", {
      body:` You've taken a step! Total: ${step} steps.`,
      icon: "/path/to/your/step-icon.png", // Replace with your icon path
    });
  }
}

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
        stepCountDisplay.textContent = step;
        const progressPercentage = Math.min((step / 1000) * 100, 100);
        stepProgress.style.width = `${progressPercentage}%`;

        if (Notification.permission !== "granted") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              showStepNotification();
            }
          });
        } else {
          showStepNotification();
        }
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

resetStepsButton.addEventListener("click", () => {
  step = 0;
  stepCountDisplay.textContent = step;
  stepProgress.style.width = "0%";
});

// Water Intake
let waterConsumed = 0;
let waterGoal = 0;
const waterGoalInput = document.getElementById("water-goal");
const waterTotalDisplay = document.getElementById("water-total");
const waterGoalDisplay = document.getElementById("water-goal-display");
const logWaterButton = document.getElementById("log-water");
const waterFill = document.querySelector(".water-fill");
const setWaterGoalButton = document.getElementById("set-water-goal");

function showWaterGoalNotification() {
  if (Notification.permission === "granted") {
    new Notification("Water Intake Goal Reached!", {
      body: "Congratulations! You've met your water intake goal!",
      icon: "/path/to/your/water-icon.png", // Replace with your icon path
    });
  }
}

setWaterGoalButton.addEventListener("click", () => {
  waterGoal = parseFloat(waterGoalInput.value) || 0;
  waterGoalDisplay.textContent = waterGoal.toFixed(1);
  updateWaterProgress();
});

logWaterButton.addEventListener("click", () => {
  waterConsumed += 0.25;
  waterTotalDisplay.textContent = `${waterConsumed.toFixed(
    1
  )} L / ${waterGoal.toFixed(1)} L`;
  updateWaterProgress();
  if (waterGoal > 0 && waterConsumed >= waterGoal) {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showWaterGoalNotification();
        }
      });
    } else {
      showWaterGoalNotification();
    }
  }
});

function updateWaterProgress() {
  if (waterGoal === 0) {
    waterFill.style.width = "0%";
    return;
  }
  const percentage = Math.min((waterConsumed / waterGoal) * 100, 100);
  waterFill.style.width = `${percentage}%`;
}

// Medicine Reminder
const medicineTimeInput = document.getElementById("medicine-time");
const setReminderButton = document.getElementById("set-reminder");
const medicineRemindersList = document.getElementById(
  "medicine-reminders-list"
);
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

function showMedicineNotification(time) {
  if (Notification.permission === "granted") {
    new Notification("Medicine Reminder", {
      body: `It's time to take your medicine! (${time})`,
      icon: "/path/to/your/medicine-icon.png", // Replace with your icon path
    });
  }
}

function renderReminders() {
  medicineRemindersList.innerHTML = "";
  reminders.forEach((reminder, index) => {
    const reminderElement = document.createElement("p");
    reminderElement.innerHTML = `Reminder set for ${reminder.time} <button class="delete-reminder" data-index="${index}"><i class="fas fa-trash"></i></button>`;
    medicineRemindersList.appendChild(reminderElement);
  });
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

setReminderButton.addEventListener("click", () => {
  const reminderTime = medicineTimeInput.value;
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

  const reminder = { time: reminderTime, timeout: reminderDate - now };
  reminders.push(reminder);
  renderReminders();

  setTimeout(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showMedicineNotification(reminderTime);
        }
      });
    } else {
      showMedicineNotification(reminderTime);
    }
    reminders = reminders.filter((r) => r !== reminder);
    renderReminders();
  }, reminder.timeout);
});

medicineRemindersList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    const index = event.target.parentNode.dataset.index;
    reminders.splice(index, 1);
    renderReminders();
  }
});

renderReminders();