

// buttons & inputs
const worktimeInput = document.getElementById("input-worktime")
const breaktimeInput = document.getElementById("input-breaktime")
const timerStartButton = document.getElementById("timer-start-button")
const setMinutesButton = document.getElementById("set-minutes-button")
const timerResetButton = document.getElementById("timer-reset-button")

// analogue display
const timeRemainingText = document.getElementById("time-remaining")

// timer circle animation
const progressStationArr = document.querySelectorAll(".bar")
const progressAniOne = document.getElementById("progress-one")
const progressAniTwo = document.getElementById("progress-two")

// alarm sound
const alarm = new Audio("singing-bowl.wav")
let alarmIsOn = true

// starting boolean values
let isPaused = true
let initial = true

// empty values to store time inputs & counters
let workMins = 0
let breakMins = 0
let currentWorkSecs = 0
let currentBreakSecs = 0

// functions for string analogue display of time remaining, including extra "0" when number < 10
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

// alarm sound and icon toggle button
function alarmOnOff() {
    const alarmOn = document.getElementById("alarm-icon-on")
    const alarmOff = document.getElementById("alarm-icon-off")
    if (alarmIsOn) {
        alarm.currentTime = 99
        alarmIsOn = false
        alarmOn.style.display = "none"
        alarmOff.style.display = "block"
    } else {
        alarm.currentTime = 0
        alarm.play()
        alarmIsOn = true
        alarmOn.style.display = "block"
        alarmOff.style.display = "none"
    }
}

// play/pause button & boolean value toggle
function playPause() {
    const playIcon = document.getElementById("play-icon")
    const pauseIcon = document.getElementById("pause-icon")
    if (worktimeInput.value !== "" && breaktimeInput.value !== "") {
        // stores initial values when first pressed after page load or after timer reset, disallows change of input fields
        if (initial) {
            workMins = worktimeInput.value
            breakMins = breaktimeInput.value
            currentWorkSecs = workMins*60
            currentBreakSecs = breakMins*60
            initial = false
            worktimeInput.disabled = true
            breaktimeInput.disabled = true
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

// stops time and resets all values on reset button press
function reset() {
    const playIcon = document.getElementById("play-icon")
    const pauseIcon = document.getElementById("pause-icon")
    playIcon.style.display = "block"
    pauseIcon.style.display = "none"
    worktimeInput.disabled = false
    breaktimeInput.disabled = false
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

// base counter for function, is always running and checks isPaused boolean value for code execution
setInterval(function() {
    if (!isPaused) {
        // plays alarm sound on either timer reaching 0
        if (currentWorkSecs === 0 || currentBreakSecs === 0) {
            if (alarmIsOn) {
                alarm.currentTime = 0
                alarm.play()
            }
        }
        // sets timer circle animation to initial values, to ensure it is displayed correctly when 1st timer plays again after 2nd timer reaches 0
        if (currentWorkSecs == workMins*60) {
            progressStationArr[0].style.background = "#ffe5d9"
            progressStationArr[1].style.background = "#ffe5d9"
            progressAniTwo.style.background = "#264653"
            progressAniOne.style.background = "#264653"
            progressAniOne.style.transform = `rotate(0deg)`
            progressAniTwo.style.transform = `rotate(-180deg)`
        }
        // 1st timer seconds-- whilst >= 0, adjust analogue and animation displays
        if (currentWorkSecs >= 0) {
            let rotatePercentWork = Math.floor(360 - ((currentWorkSecs/(workMins*30)) * 180))
            progressAniOne.style.transform = `rotate(${Math.min(rotatePercentWork, 180)}deg)`
            progressAniTwo.style.transform = `rotate(${Math.max(rotatePercentWork-180, 0)}deg)`
            timeRemainingText.innerHTML = `${currentWorkAnalogueMins()}:${currentWorkAnalogueSecs()}`
            currentWorkSecs--
        } else {
            // changes colors & position of circle timer animation to be correct for display of 2nd countdown timer
            if (currentBreakSecs == breakMins*60) {
                progressStationArr[0].style.background = "#264653"
                progressStationArr[1].style.background = "#264653"
                progressAniTwo.style.background = "#ffe5d9"
                progressAniOne.style.background = "#ffe5d9"
                progressAniOne.style.transform = `rotate(0deg)`
                progressAniTwo.style.transform = `rotate(-180deg)`
            }
            // 2nd timer seconds-- whilst >= 0, adjust analogue and animation displays
            if (currentBreakSecs >= 0) {
                let rotatePercentBreak = Math.floor(360 - ((currentBreakSecs/(breakMins*30)) * 180))
                progressAniOne.style.transform = `rotate(${Math.min(rotatePercentBreak, 180)}deg)`
                progressAniTwo.style.transform = `rotate(${Math.max(rotatePercentBreak-180, 0)}deg)`
                timeRemainingText.innerHTML = `${currentBreakAnalogueMins()}:${currentBreakAnalogueSecs()}`
                currentBreakSecs--
            // resets timer values to initial time input values, calling execution of this function's first code block on next interval
            } else {
                currentWorkSecs = workMins*60
                currentBreakSecs = breakMins*60
            }
        }
    }
}, 1000)