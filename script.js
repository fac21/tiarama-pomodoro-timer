// new CircleType(document.getElementById('worktime-animation-text'));
// new CircleType(document.getElementById('breaktime-animation-text'));

const worktimeInput = document.getElementById("input-worktime")
const breaktimeInput = document.getElementById("input-breaktime")
const timerStartButton = document.getElementById("timer-start-button")
const setMinutesButton = document.getElementById("set-minutes-button")

let workMins = 0
let breakMins = 0
let currentWorkSecs = 0
let currentBreakSecs = 0
let isPaused = true

setMinutesButton.addEventListener("click", function() {
    workMins = worktimeInput.value
    breakMins = breaktimeInput.value
    currentWorkSecs = workMins*60
    currentBreakSecs = breakMins*60
})
timerStartButton.addEventListener("click", function() {
    if (isPaused) {
        isPaused = false
    } else {
        isPaused = true
    }
})

setInterval(function() {
    if (!isPaused) {
        if (currentWorkSecs > 0) {
            currentWorkSecs--
            console.log(currentWorkSecs)
        } else {
            if (currentBreakSecs > 0) {
                currentBreakSecs--
                console.log(currentBreakSecs)
            } else {
                currentWorkSecs = workMins*60
                currentBreakSecs = breakMins*60
            }
        }
    }
}, 1000)