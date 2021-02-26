// new CircleType(document.getElementById('worktime-animation-text'));
// new CircleType(document.getElementById('breaktime-animation-text'));

const worktimeInput = document.getElementById("input-worktime")
const breaktimeInput = document.getElementById("input-breaktime")
const timerStartButton = document.getElementById("timer-start-button")
const setMinutesButton = document.getElementById("set-minutes-button")
const timerResetButton = document.getElementById("timer-reset-button")

const progressAniOne = document.getElementById("progress-one")
const progressAniTwo = document.getElementById("progress-two")

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

timerResetButton.addEventListener("click", function() {
    isPaused = true
    workMins = 0
    breakMins = 0
})

setInterval(function() {
    if (!isPaused) {
        if (currentWorkSecs > 0) {
            let rotatePercentWork = Math.round(360 - ((currentWorkSecs/(workMins*30)) * 180))
            progressAniOne.style.transform = `rotate(${Math.min(rotatePercentWork, 180)}deg)`
            progressAniTwo.style.transform = `rotate(${Math.max(rotatePercentWork-180, 0)}deg)`
            console.log(rotatePercentWork)
            currentWorkSecs--
            // console.log(currentWorkSecs)
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