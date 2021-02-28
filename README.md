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
