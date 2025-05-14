let gazeData = [];

window.onload = async function () {
    webgazer.setRegression("ridge") // choose regression
        .setGazeListener((data, elapsedTime) => {
            if (data == null) return;

            gazeData.push({
                x: data.x,
                y: data.y,
                t: elapsedTime
            });
        })
        .begin();

    // Optionally hide the video and face overlay
    webgazer.showVideo(false).showFaceOverlay(false).showFaceFeedbackBox(false);

    // Stop after N seconds (e.g. 15 seconds)
    setTimeout(() => {
        webgazer.end(); // Stop tracking
        sendData();
    }, 15000);
};

function sendData() {
    fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gazeData),
    })
        .then(res => {
            if (res.ok) {
                alert("Data saved successfully.");
            } else {
                alert("Data failed to save.");
            }
        })
        .catch(err => {
            console.error("Error saving data:", err);
        });
}
