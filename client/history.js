const SERVER_URL = "http://localhost:8882";

function httpGet(url) {
    const params = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json'
        }
    }
    return fetch(url, params)
}

window.onload = function() {
    var box = document.getElementById('data');
    var html = ''
    httpGet(SERVER_URL + "/getHistory").then(result => {
        result.text().then(data => {
            let parsedData = JSON.parse(data);
            for (let item of parsedData["items"]) {
                html += '<tr>'
                html += '<td style="text-align:center;">'+ item["user1"] +'</td>'
                html += '<td style="text-align:center;">'+ item["user2"] +'</td>'
                html += '<td style="text-align:center;">'+ item["level"] +'</td>'
                html += '<td style="text-align:center;">'+ item["time"] +'</td>'
                html += '<td style="text-align:center;">'+ item["winner"] +'</td>'
                html += '</tr>'
            }
            box.innerHTML = html;
        })
    })
}