//note: only use analysis with non empty database

function getBestTime(data) {
    return Math.min.apply(null, data.map(item => parseInt(item["time"])));
}

function getAvgTime(data) {
    var scores = data.map(item => parseInt(item["time"]));
    return (scores.reduce((a, b) => a + b, 0) / scores.length);
}

function bestWinPlayer(data) {
    var bestTime = getBestTime(data);
    return data.filter(item => parseInt(item["time"]) === bestTime).map(item => item["winner"])[0];
}

// note: can produce undesired outcomes in case equal # of games won
function mostWinsPlayer(data) { 
    var playerCount = getPlayerCount(data);
    return Object.keys(playerCount).reduce((a, b) => playerCount[a] > playerCount[b] ? a : b);
}

function getPlayerCount(data) {
    var players = data.map(item => item["winner"]);
    var count = {};
    players.forEach(function(player) {
        if (player in count) {
            count[player] += 1;
        } else {
            count[player] = 1;
        }
    });
    return count
}

module.exports = {
    getBestTime,
    getAvgTime,
    mostWinsPlayer,
    bestWinPlayer
}