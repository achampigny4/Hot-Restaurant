// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const reservations = require("./data/tableData")
const waitlist = require("./data/waitlistData");
const reservedTables = require("./data/tableData");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/reserve.html"));
});

app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/tables.html"));
});


// api Routes

app.get("/api/reservations", (req, res) => {
    return res.json(reservations);
});

app.get("/api/waitlist", (req, res) => {
    return res.json(waitlist);
});

app.post("/api/reservations", (req, res) => {

    const reservation = req.body;
    let reserveSuccess;

    // Conditional for table vs. reservations
    if (reservedTables.length > 5) {
        waitlist.push(reservation);
        reserveSuccess = false;
    } else {
        reservedTables.push(reservation);
        reserveSuccess = true;
    };

    res.send({ reserveSuccess });

})



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

