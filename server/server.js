const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "..")));
app.use(express.json());

app.post("/save", (req, res) => {
    const filePath = path.join(__dirname, "../data/gazeData.json");
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), err => {
        if (err) {
            console.error("Error writing file", err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
