var fs = require("fs");

function getData(fileName) {
    var contentAsString = fs.readFileSync(fileName, "utf8");
    return JSON.parse(contentAsString)["items"];
}

function saveData(fileName, game) {
    var curr = getData(fileName);
    curr.push(game);
    var currJSON = JSON.stringify({"items": curr});
    try {
        var status = fs.writeFileSync(fileName, currJSON);
        console.log("SAVED!");
    } catch (error) {
        console.log(err);
    }
}

function deleteData(fileName) {
    try {
        var status = fs.writeFileSync(fileName, JSON.stringify({"items": []}));
        console.log("DONE!");
    } catch (error) {
        console.log(err);
    }
}

module.exports = { 
    getData,
    saveData,
    deleteData
};