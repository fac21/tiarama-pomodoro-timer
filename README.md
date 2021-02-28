# Timerama! Click [here](https://fac21.github.io/tiarama-pomodoro-timer/) to get started
![Alarm Bunny](https://media.giphy.com/media/dxazgU2qkP9zctSjUx/giphy.gif)

## An interactive pomodoro timer written and designed by me for [FAC](https://www.foundersandcoders.com/)21 week 4.

> I would like to start off by saying that what I am most proud of in this project is the pun "split() my time", with the two time inputs seemingly being split into an array.  
> I make a lot of terrible puns, but this one is actually half decent and that is such an achievement for me :sparkler:

### Task: Create a [pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) timer with the following features: 
- A “work” timer that counts down to zero (usually 25 minutes) :white_check_mark:
- A second “break” timer that counts down to zero (usually 5 minutes) :white_check_mark:
- Buttons to start a session, pause the timer, or cancel the session and restart :white_check_mark:
- Customisable lengths of time for work/break :white_check_mark:
- Play an alarm sound to make it obvious the time is up :white_check_mark:

### My customisations:
- A circle animation gives a visual representation of how much time is left on the current timer. The animation switches between two colours :tada:
- A mute button to toggle the alarm sound. The button will play the sound sample on "unmute" click, and will end all playing alarm sounds on "mute" click :tada:
- Custom time input fields become un-editable once timer has been activated, regardless of timer pause state. Values reset to zero and become editable on reset button click :tada:
- The page is not really responsive, but is also formatted to work on mobile :tada:

### Unresolved issues:
- If timer finishes whilst tab is not in view, upon re-opening the tab the circle animation will move in a bizarre way as it changes to correct position :x:
- On some mobile browsers a slight line appears in circle animation where the two halves of the circle meet :x:

___

## Solution time!

**A “work” timer that counts down to zero (usually 25 minutes)**  

- Creating two variables, in one I stored the initial time in minutes and stored the time in seconds in another:  
```javascript
let workMins = 25   
let currentWorkSecs = workMins*60
```
- A setInterval() function counts down the current seconds on each tick, and resets the value when reaching zero:
```javascript
setInterval(function() {
  if (currentWorkSecs >= 0) {
    currentWorkSecs--
  } else {
    currentWorkSecs = workMins*60
  } 
}, 1000)
```
___
**A second “break” timer that counts down to zero (usually 5 minutes)**  

- I added another two variables with the same purpose as the first two, and added another if statement in the function to switch to the break timer when the work timer has reached zero:
```javascript
let workMins = 25 
let breakMins = 5
let currentWorkSecs = workMins*60
let currentBreakSecs = breakMins*60

setInterval(function() {
  if (currentWorkSecs >= 0) {
    currentWorkSecs--
  } else {
      if (currentBreakSecs >= 0) {
        currentBreakSecs--
    } else {
      currentWorkSecs = workMins*60
      currentBreakSecs = breakMins*60
  } 
}, 1000)
```
___
**Button to start a session or pause the timer**

- I created a variable with a boolean value that started as "true". Since my setInterval() function runs constantly from page load, I added another if statement that only runs the code whilst the boolean === false. A play/pause button in the HTML toggles the boolean value when clicked, causing it to allow my setInterval() code to run when not in a paused state:

```html
<button onclick="playPause()" id="timer-start-button"></button>
```

```javascript
let isPaused = true

function playPause() {
  if (isPaused) {
    isPaused = false
  } else {
    isPaused = true
  }
}

setInterval(function() {
  if (!isPaused) {
    if (currentWorkSecs >= 0) {
      currentWorkSecs--
    } else {
      if (currentBreakSecs >= 0) {
        currentBreakSecs--
      } else {
        currentWorkSecs = workMins*60
        currentBreakSecs = breakMins*60
    }
  }
}, 1000)
```
___
**Button to cancel the session and restart**

- This button simply resets all the values to what they would be on page load:

```html
<button onclick="reset()" id="timer-reset-button"></button>
```

```javascript
function reset() {
    isPaused = true
    currentWorkSecs = workMins*60
    currentBreakSecs = workMins*60
}
```
___
**Customisable lengths of time for work/break**

This is where stuff starts to get tricky:
- Create two HTML input tags that will be used to collect and store the value for the timers (I used a text input with a regex that only allows numbers, as I found the number input wasn't quite what I wanted for a simple aesthetic):

```html
<input type="text" id="input-worktime" placeholder="00" maxlength="2" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
<input type="text" id="input-breaktime" placeholder="00" maxlength="2" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
```

```javascript
const worktimeInput = document.getElementById("input-worktime")
const breaktimeInput = document.getElementById("input-breaktime")
```

- Add a boolean variable and an if statement to my playPause() function that stores the input to my timer values and disables altering of the input fields, but only if it is the first time the button is pressed after page load (or after reset):

```javascript
let initial = true

function playPause() {
    if (worktimeInput.value !== "" && breaktimeInput.value !== "") {
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
        } else {
            isPaused = true
        }
    }
}

function reset() {
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
}
```
___

**Play an alarm sound to make it obvious the time is up**

- Add a .play() method within the setInterval() if statements that run when either timer reaches 0. Simple :hamster:

___

## My customisations:

-These are too complicated for me to list step by step on this readme, but my code is annotated so feel free to take a look at that for an idea of what's happening.

-I will say that the most difficult (and fun) part by far was the circle animation that consits of four semi circles, two pink and two blue, with varying z indexes.
I animated them by finding the current seconds as a percentage value of the input seconds, and changing the rotate(deg) by the same percentage of 360, then simply altering their background colours when switching between each timer type:

```javascript
const progressStationArr = document.querySelectorAll(".bar")
const progressAniOne = document.getElementById("progress-one")
const progressAniTwo = document.getElementById("progress-two")

setInterval(function() {
    if (!isPaused) {
        if (currentWorkSecs === 0 || currentBreakSecs === 0) {
            if (alarmIsOn) {
                alarm.currentTime = 0
                alarm.play()
            }
        }
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
```

