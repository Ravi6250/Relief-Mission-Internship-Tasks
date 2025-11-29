let startTime, updatedTime, difference, tInterval;
let running = false;

function startTimer() {
    if(!running){
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Add leading zeros
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    document.getElementById("display").innerHTML = hours + ":" + minutes + ":" + seconds;
}

function recordLap() {
    if(running) {
        let lapTime = document.getElementById("display").innerHTML;
        let li = document.createElement("li");
        li.innerText = lapTime;
        document.getElementById("laps").appendChild(li);
    }
}