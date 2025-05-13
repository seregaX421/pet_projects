const min = document.getElementById('min');
const sec = document.getElementById('sec');
const hours = document.getElementById('hours');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const circle = document.querySelector('.main-circle');
const body = document.querySelector('body');
let currentHours = Number(hours.textContent);
let currentMin = Number(sec.textContent);
let currentSec = Number(sec.textContent);
let interval;

hours.addEventListener('mouseenter', () => {
    hours.addEventListener('wheel', (event) => {
        let delta = event.deltaY / (1000000000000**10);

        if (delta > 0) {
            currentHours = (currentHours + 1) % 24;
        } else if (delta < 0 && 0 < Number(hours.textContent)) {
            currentHours = (currentHours - 1) % 24;
        }

        hours.textContent = String(currentHours).padStart(2, '0');
        event.preventDefault();
    });
});

min.addEventListener('mouseenter', () => {
    min.addEventListener('wheel', (event) => {
        let delta = event.deltaY / (1000000000000**10);

        if (delta > 0) {
            currentMin++;

            if (currentMin == 60) {
                currentMin = 0;
                currentHours++;
                hours.textContent = String(currentHours).padStart(2, '0');
            }
        } else if (delta < 0 && 0 < Number(min.textContent)) {
            currentMin = (currentMin - 1) % 60;
        }

        min.textContent = String(currentMin).padStart(2, '0');
        event.preventDefault();
    });
});

sec.addEventListener('mouseenter', () => {
    sec.addEventListener('wheel', (event) => {
        let delta = event.deltaY / (1000000000000**10);

        if (delta > 0) {
            currentSec++;

            if (currentSec == 60) {
                currentSec = 0;
                currentMin++;
                min.textContent = String(currentMin).padStart(2, '0');
            }
        } else if (delta < 0 && 0 < Number(sec.textContent)) {
            currentSec = (currentSec - 1) % 60;
        }

        sec.textContent = String(currentSec).padStart(2, '0');
        event.preventDefault();
    });
});

startBtn.addEventListener('click', () => {
    let timerHours = Number(document.getElementById('hours').textContent);
    let timerMin = Number(document.getElementById('min').textContent);
    let timerSec = Number(document.getElementById('sec').textContent);

    interval = setInterval(() => {
        if (timerHours == 0 && timerMin == 0 && timerSec == 0) {
            clearInterval(interval);
            circle.classList.remove('animation');
            body.classList.remove('animation');
        } else {
            if (timerSec === 0) {
                if (timerMin === 0) {
                    if (timerHours > 0) {
                        timerHours--;
                        timerMin = 59;
                    }
                } else {
                    timerMin--;
                }
                timerSec = 59;
            } else {
                timerSec--;
            }
    
            hours.textContent = String(timerHours).padStart(2, '0');
            min.textContent = String(timerMin).padStart(2, '0');
            sec.textContent = String(timerSec).padStart(2, '0');
            circle.classList.add('animation');
            body.classList.add('animation');
        }
    }, 1000);
});

pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    circle.classList.remove('animation');
    body.classList.remove('animation');
})

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    circle.classList.remove('animation');
    body.classList.remove('animation');
    hours.textContent = '00';
    min.textContent = '00';
    sec.textContent = '00';
})