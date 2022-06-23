
var user = 1;
var level = 1;
// get level
var userInput1 = ''
var userInput2 = ''
// time
var totalTime = 0;

const SERVER_URL = "http://localhost:8882";

function httpPost(url, data) {
    const params = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ "data": data })
    }
    return fetch(url, params)
}

// create
function createListItemAccordingToTheUserInput(){

    var li = document.createElement("li")
    var userInput = document.getElementById("newItem").value
    
    if (userInput ===''){
        alert ("You must write something!")
    }else{
        level = document.getElementById("level").value;
        var max = 10;
        if(level == '1') {
            max = 10;
        }
        if(level == '2') {
            max = 19;
        }
        if(level == '3') {
            max = 29;
        }
        if(userInput > max) {
            alert ("The input value cannot exceed " + max);
            return;
        }
        //var text = document.createTextNode(userInput)
        var str = 'jack';
        if(user == 2) {
            str = 'mary';
            userInput2 = userInput;
            console.log(userInput2 + '--' + userInput1)
            if(parseInt(userInput2) < parseInt(userInput1) + 1 || parseInt(userInput2) > parseInt(userInput1) + 3) {
                alert('The input value does not meet the rules')
                return;
            }
        } else {
            userInput1 = userInput
            console.log(userInput2 + '--' + userInput1)
            if(parseInt(userInput1) < parseInt(userInput2) + 1 || parseInt(userInput1) > parseInt(userInput2) + 3) {
                alert('The input value does not meet the rules')
                return;
            }
        }
        li.innerHTML = str + ': ' + userInput;
        document.getElementById("newItem").value = ""
        // win
        
        if(parseInt(userInput) == max) {
            clearInterval(timer)
            alert("You Win!");
            var data = {"user1": "jack", "user2": "mary", "level": level, "time": totalTime, "winner": str};
            httpPost(SERVER_URL + "/saveGame", data).then(result => {
                console.log(result);
            })
        }

        return li;
    }
    return null
}

function addNewElement(){

    var li = createListItemAccordingToTheUserInput()
    if (li !== null){
        document.getElementById("itemsList").appendChild(li)
        if(user == 1) {
            user = 2;
        } else {
            user = 1;
        }
    }
}

// change leve
function levelChange() {
    document.getElementById("itemsList").innerHTML = ''
    time()
}
// timer
var timer;
function time() {
    timer = setInterval(function() {
        totalTime++;
    }, 1000)
}
time()

// page loaded
window.onload = function() {
    // click
    var btn = document.getElementById('addBtn');
    btn.onclick = function() {
        addNewElement()
    }

    // change
    var btnLevel = document.getElementById('level');
    btnLevel.onChange = function() {
        levelChange()
    }

    // mouseover
    var head = document.getElementsByClassName('header')[0];
    head.onmouseover = function() {
        this.style.background = '#000'
    }
    
    // mouseout
    head.onmouseout = function() {
        this.style.background = 'lightskyblue'
    }

}
