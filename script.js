let gazeData = [];

window.onload = function () {
    webgazer.setRegression("ridge")
        .setGazeListener((data, elapsedTime) => {
            if (!data) return;
            gazeData.push({ x: data.x, y: data.y, t: elapsedTime });
        })
        .begin();

    webgazer.showVideo(false).showFaceOverlay(false).showFaceFeedbackBox(false);

    // Stop tracking and send data after 15 seconds
    setTimeout(() => {
        webgazer.end();
        sendData();
    }, 15000);
};

function sendData() {
    fetch("https://your-replit-url/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gazeData)
    })
    .then(res => alert(res.ok ? "Data saved!" : "Save failed."))
    .catch(err => console.error("Error sending gaze data:", err));
}
