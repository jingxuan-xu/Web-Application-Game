var express = require("express");
var fileHandler = require("./fileHandler");
var analysis = require("./analysis");
var path = require('path'); 

var app = express();

// server listening on port:
const port = 8882;
// server storing data in file: (server dynamically determines absolute path)
const fileName = path.join(__dirname) + "/data.json";

// Part C: support GET and POST
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(port, function() {
    console.log(`Server is UP! Load http://localhost:${port}/.`);
})

app.get("/", function(req, res) {
    console.log("/");
    res.send("Welcome to my game server!!! :)");
})

// 5 routes in addition to main one //
app.get("/test", function(req, res) {
    console.log("/test");
    res.send(`Up and running! Data storage in ${fileName}. Try: GET /getHistory | GET /getLevel | POST /saveGame | GET /deleteGames`);
})

app.get("/getHistory", function(req, res) {
    console.log("/getHistory");
    res.sendFile(fileName);
})

app.get("/getLevel", function(req, res) {
    console.log("/getLevel");
    var level = req.query.level;
    var data = fileHandler.getData(fileName);
    res.send(data.filter(item => item["level"] === level));
})

app.post("/saveGame", function(req, res) {
    console.log("/saveGame");
    var data = req.body.data;
    fileHandler.saveData(fileName, {
        "user1": data["user1"],
        "user2": data["user2"],
        "level": data["level"],
        "time": data["time"],
        "winner": data["winner"]
    });
    res.send('success!');
})

app.get("/deleteGames", function(req, res) {
    console.log("/deleteGames");
    fileHandler.deleteData(fileName);
    res.send('success!');
})

// 4 analysis functions
app.get("/getBestTime", function(req, res) {
    console.log("/getBestTime");
    var data = fileHandler.getData(fileName);
    res.send(analysis.getBestTime(data).toString());
})

app.get("/getAvgTime", function(req, res) {
    console.log("/getAvgTime");
    var data = fileHandler.getData(fileName);
    res.send(analysis.getAvgTime(data).toString());
})

app.get("/mostWinsPlayer", function(req, res) {
    console.log("/mostWinsPlayer");
    var data = fileHandler.getData(fileName);
    res.send(analysis.mostWinsPlayer(data).toString());
});

app.get("/bestWinPlayer", function(req, res) {
    console.log("/bestWinPlayer");
    var data = fileHandler.getData(fileName);
    res.send(analysis.bestWinPlayer(data).toString());
});