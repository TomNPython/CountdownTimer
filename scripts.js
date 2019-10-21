let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const audio = document.querySelector('audio');

function timer(seconds) {
    clearInterval(countdown)

    const now = Date.now()
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        if(secondsLeft === 0) {
            timerDisplay.classList.add('active')
            audio.play()
        }

        if (secondsLeft < 0) {
            clearInterval(countdown)
            return
        }

        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor(seconds / 60)
    const remainderMinutes = minutes % 60
    const remainderSeconds = seconds % 60
    const display = `${hours >= 0 ? hours + ':' : ''}${hours > 0 ? remainderMinutes : minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    document.title = display
    timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours()
    const adjustedHour = hour > 12 ? hour - 12 : hour
    const tag = hour > 11 ? 'PM' : 'AM'
    const minutes = end.getMinutes()
    endTime.textContent = `Timer Ends at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}${tag}`
}

function startTimer() {
    timerDisplay.classList.remove('active')
    const seconds = parseInt(this.dataset.time);
    timer(seconds)
}

function pauseTimer() {
    pause = !pause;
    console.log(pause)
}


buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    timerDisplay.classList.remove('active')
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60)
    this.reset
})