//  step tracker using Device Motion API
let step =0;
let lastAceleration = null;
const stepThreshold = 1.5; // Adjust for sensitivity
const stepCount = document.getElementById("step-count");
const resetSteps = document.getElementById("reset-steps");

// aba chai device motion api support bako xa ki nai check 
if ("DeviceMotionEvent" in window) {
  window.addEventListener("devicemotion", (event) => {
    const acceleration = event.accelerationIncludingGravity;

    if  (acceleration && lastAcceleration) {
        const deltaX = acceleration.x - lastAcceleration.x;
        const deltaY = acceleration.y - lastAcceleration.y;
        const deltaZ = acceleration.z - lastAcceleration.z;
         
        // aba chai overall acceleration ko change calculte 
        const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

            if (delta > stepThreshold) {
                step++;
                stepCount.textContent = stepThreshold;
            }
       }
       // aba chai last lo acceleration update
    lastAcceleration ={
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z

    };
  });
} else {
    alert("Device Motion API is not supported on your device.");
}

 //reset button 
 resetSteps.addEventListener("click", () => {
    steps = 0;
    stepCount.textContent = steps;


 });
 //Water intake tracker
 let waterConsumed = 0;
 constwaterGoal = document.getElementById("water-goal");
 const waterTotal = document.getElementById("water-taotal");
 const logwater = document.getElementById("log-water");

 logwater.addEventListener("click", () => {
    waterConsumed += 0.25; //Increment by 250ml
    waterTotal.textContent = waterConsumed.toFixed(2);
    const goal = parseFloat(waterGol.value || 0);
    if (goal > 0 && waterConusmed >= gaol) {
        alert("Congratulations! Ypu have met your water intake goal for today!");
    }
    });


 // medicine reminder
 const medicineTime = document.getElemnetById("medicine-time");
 const setReminder = document .getElementById("set-remineder");

 setReminder.addEventListener("click", () => {
    const reminderTime = medicineTime.value;
    if (!reminderTime) {
        alert("Please set a valid time.");
        return;
    }
   
    const now = new Date();
    const [hours, minutes] =
    reminderTime.split(":").map(Number);
     const reminderDate = new Date();
     reminderDate.setHours(hours, minutes, 0, 0);

      if (reminderDate < now) {
        alert("Reminder time is in the past. Please select a future time.");
        return;
      }
   
      const timeout = reminderDate - now;
      setTimeout(() => {
        showNotification("Medicine Reminder", "It's time to take your medicine!");
      },timeout);

      alert(Reminder set for ${reminderTime});
    });
    //Notification Functionality
    function showNotification(title, body) {
        if ("Notification" in window && Notification.permission ==="granted") {
            new Notification(title, { body, icon: "icon.png"});

        }
    });
} 
else
 {

    alert(${title}: ${body});
 }
}
//request notification permission on page load
if ("Notification" in window) {
    Notification.requestPermission();

}
      

    

