let gazeData = [];
let calibrationClicks = 0;
const totalClicksNeeded = 9;

window.onload = function () {
  setupCalibrationDots();

  webgazer.setRegression("ridge")
    .showVideoPreview(false)
    .showPredictionPoints(false)
    .showFaceOverlay(false)
    .showFaceFeedbackBox(false)
    .begin();
};

function setupCalibrationDots() {
  const dots = document.querySelectorAll(".cal-dot");
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      calibrationClicks++;
      webgazer.recordScreenPosition(dot.offsetLeft, dot.offsetTop, "click");
      dot.style.background = "green";
      dot.style.pointerEvents = "none";

      if (calibrationClicks >= totalClicksNeeded) {
        document.getElementById("calibration").remove();
        startGazeCollection();
      }
    });
  });
}

function startGazeCollection() {
  webgazer.setGazeListener((data, elapsedTime) => {
    if (!data) return;
    gazeData.push({ x: data.x, y: data.y, t: elapsedTime });
  });

  setTimeout(() => {
    webgazer.end();
    sendData();
  }, 15000); // track for 15s
}

function sendData() {
  fetch("https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gazeData)
  })
  .then(res => alert(res.ok ? "Data saved!" : "Save failed."))
  .catch(err => console.error("Error sending gaze data:", err));
}
