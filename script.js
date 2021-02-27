// new CircleType(document.getElementById('worktime-animation-text'));
// new CircleType(document.getElementById('breaktime-animation-text'));

const worktimeInput = document.getElementById("input-worktime")
const breaktimeInput = document.getElementById("input-breaktime")
const timerStartButton = document.getElementById("timer-start-button")
const setMinutesButton = document.getElementById("set-minutes-button")
const timerResetButton = document.getElementById("timer-reset-button")

const timeRemainingText = document.getElementById("time-remaining")

const progressStationArr = document.querySelectorAll(".bar")
const progressAniOne = document.getElementById("progress-one")
const progressAniTwo = document.getElementById("progress-two")


let isPaused = true
let initial = true

let workMins = 0
let breakMins = 0
let currentWorkSecs = 0
let currentBreakSecs = 0
let currentWorkAnalogueSecs = () => {
    let secs = Math.max(currentWorkSecs%60, 0)
    if (secs < 10) {
        return `0` + `${secs}`
    }
    return `${secs}`
}
let currentWorkAnalogueMins = () => {
    let mins = Math.max(Math.floor(currentWorkSecs/60), 0)
    if (mins < 10) {
        return `0` + `${mins}`
    }
    return `${mins}`
}
let currentBreakAnalogueSecs = () => {
    let secs = Math.max(currentBreakSecs%60, 0)
    if (secs < 10) {
        return `0` + `${secs}`
    }
    return `${secs}`
}
let currentBreakAnalogueMins = () => {
    let mins = Math.max(Math.floor(currentBreakSecs/60), 0)
    if (mins < 10) {
        return `0` + `${mins}`
    }
    return `${mins}`
}

function playPause() {
    const playIcon = document.getElementById("play-icon")
    const pauseIcon = document.getElementById("pause-icon")
    if (worktimeInput.value !== "" && breaktimeInput.value !== "") {
        if (initial) {
            workMins = worktimeInput.value
            breakMins = breaktimeInput.value
            currentWorkSecs = workMins*60
            currentBreakSecs = breakMins*60
            initial = false
        }
        if (isPaused) {
            isPaused = false
            playIcon.style.display = "none"
            pauseIcon.style.display = "block"
        } else {
            isPaused = true
            playIcon.style.display = "block"
            pauseIcon.style.display = "none"
        }
    }
}

function reset() {
    const playIcon = document.getElementById("play-icon")
    const pauseIcon = document.getElementById("pause-icon")
    playIcon.style.display = "block"
    pauseIcon.style.display = "none"
    worktimeInput.value = ""
    breaktimeInput.value = ""
    initial = true
    isPaused = true
    workMins = 0
    breakMins = 0
    currentWorkSecs = 0
    currentBreakSecs = 0
    progressAniOne.style.transform = `rotate(0deg)`
    progressAniTwo.style.transform = `rotate(0deg)`
    timeRemainingText.innerHTML = `00:00`
}

setInterval(function() {
    if (!isPaused) {
        if (currentWorkSecs == workMins*60) {
            progressStationArr[0].style.background = "#ffe5d9"
            progressStationArr[1].style.background = "#ffe5d9"
            progressAniTwo.style.background = "#264653"
            progressAniOne.style.background = "#264653"
            progressAniOne.style.transform = `rotate(0deg)`
            progressAniTwo.style.transform = `rotate(-180deg)`
        }
        if (currentWorkSecs >= 0) {
            let rotatePercentWork = Math.floor(360 - ((currentWorkSecs/(workMins*30)) * 180))
            progressAniOne.style.transform = `rotate(${Math.min(rotatePercentWork, 180)}deg)`
            progressAniTwo.style.transform = `rotate(${Math.max(rotatePercentWork-180, 0)}deg)`
            timeRemainingText.innerHTML = `${currentWorkAnalogueMins()}:${currentWorkAnalogueSecs()}`
            currentWorkSecs--
        } else {
            if (currentBreakSecs == breakMins*60) {
                progressStationArr[0].style.background = "#264653"
                progressStationArr[1].style.background = "#264653"
                progressAniTwo.style.background = "#ffe5d9"
                progressAniOne.style.background = "#ffe5d9"
                progressAniOne.style.transform = `rotate(0deg)`
                progressAniTwo.style.transform = `rotate(-180deg)`
            }
            if (currentBreakSecs >= 0) {
                let rotatePercentBreak = Math.floor(360 - ((currentBreakSecs/(breakMins*30)) * 180))
                progressAniOne.style.transform = `rotate(${Math.min(rotatePercentBreak, 180)}deg)`
                progressAniTwo.style.transform = `rotate(${Math.max(rotatePercentBreak-180, 0)}deg)`
                timeRemainingText.innerHTML = `${currentBreakAnalogueMins()}:${currentBreakAnalogueSecs()}`
                currentBreakSecs--
            } else {
                currentWorkSecs = workMins*60
                currentBreakSecs = breakMins*60
            }
        }
    }
}, 1000)