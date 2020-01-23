var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

var reservations = [
    {
        name: "george",
        phone: "845-654-3452",
        email: "george@neverfunny.com",
        uniqueID:1
    } ,
    {
        name: "casey",
        phone: "845-652-3752",
        email: "casey@neverfunny.com",
        uniqueID:2
    }  
]

var waitingList = [
    {
        name: "kali",
        phone: "845-652-3752",
        email: "kali@neverfunny.com",
        uniqueID:3
    }
];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waiting", function(req, res) {
    return res.json(waitingList);
});

app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
    if(reservations.length < 5){
        reservations.push(newReservation);
    }else{
        waitingList.push(newReservation)
    } 
     res.json(newReservation);
  });