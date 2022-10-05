const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let intervalId;
let startTime = 0;
let elapsedTime = 0;
let paused = true;
let hrs = 0;
let mins = 0; 
let secs = 0;
let millis = 0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1);
    }
});

pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    millis = 0;
    timeDisplay.textContent = "00:00:00:000"
});

function updateTime(){
    elapsedTime = Date.now() - startTime;
    millis = elapsedTime % 1000;
    secs = Math.round(elapsedTime/1000) % 60;
    mins = Math.round(elapsedTime/(1000 * 60)) % 60;
    hrs = Math.round(elapsedTime/(1000 * 60 * 60));

    millis = padMillis(millis);
    hrs = pad(hrs);
    mins = pad(mins);
    secs = pad(secs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${millis}`;
    
    function pad(unit){
        return ("0" + unit).length > 2 ? unit : ("0" + unit);
    }

    function padMillis(unit){
        if(("" + unit).length == 1) 
            return "00" + unit;
        else if(("" + unit).length == 2) 
            return "0" + unit;
        else 
            return unit;
    }
}