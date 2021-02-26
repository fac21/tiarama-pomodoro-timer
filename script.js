// new CircleType(document.getElementById('worktime-animation-text'));
// new CircleType(document.getElementById('breaktime-animation-text'));

const worktimeInput = document.getElementById("input-worktime")
const breaktimeInput = document.getElementById("input-breaktime")
const timerStartButton = document.getElementById("timer-start-button")

let workMins = 0
let breakMins = 0

timerStartButton.addEventListener("click", function() {
    workMins = worktimeInput.value
    breakMins = breaktimeInput.value
    let currentWorkSecs = workMins*60
    let currentBreakSecs = breakMins*60
    setInterval(function() {
        if (currentWorkSecs > 0) {
            currentWorkSecs--
            console.log(currentWorkSecs)
        } else {
            if (currentBreakSecs > 0) {
                currentBreakSecs--
                console.log(currentBreakSecs)
            } else {
                currentWorkSecs = workMins*60 - 1
                currentBreakSecs = breakMins*60
            }
        }
    }, 1000)
})