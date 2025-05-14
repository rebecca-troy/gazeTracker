// Collect gaze data
let gazeData = [];
webgazer.setGazeListener(function(data, elapsedTime) {
  if (data == null) return; // Skip if no data

  // Save gaze data (x, y coordinates and timestamp)
  gazeData.push({
    x: data.x,
    y: data.y,
    time: elapsedTime
  });
}).begin();

// Send data to the Replit server every 10 seconds
setInterval(() => {
  if (gazeData.length > 0) {
    fetch("https://gaze-server.username.repl.co/save", {  // Replace with your Replit URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gazeData)  // Send collected gaze data
    })
    .then(response => response.text())
    .then(msg => console.log("Saved:", msg))
    .catch(err => console.error("Error saving data:", err));

    gazeData = [];  // Reset the gaze data after sending
  }
}, 10000);  // Send data every 10 seconds
