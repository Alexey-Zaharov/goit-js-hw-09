import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedData = {};
const startBtn = document.querySelector('button');
const dayTimer = document.querySelector('.value[data-days]');
const hoursTimer = document.querySelector('.value[data-hours]');
const minutesTimer = document.querySelector('.value[data-minutes]');
const secondsTimer = document.querySelector('.value[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedData = selectedDates[0];
  },
  onChange(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function dataToShow() {
  startBtn.disabled = true;
  const timer = setInterval(() => {
    const startTime = Date.now();
    const deltaTime = selectedData - startTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    if (deltaTime < 1000) {
      clearInterval(timer);
      return;
    }

    dayTimer.textContent = days;
    hoursTimer.textContent = hours;
    minutesTimer.textContent = minutes;
    secondsTimer.textContent = seconds;
  }, 1000);
}

startBtn.disabled = true;

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', dataToShow);

// function dataToShow() {
//   startBtn.disabled = true;
//   let deltaTime = selectedData - options.defaultDate;
//   const timer = setInterval(() => {
//     const { days, hours, minutes, seconds } = convertMs(deltaTime);
//     if (deltaTime <= 0) {
//       clearInterval(timer);
//       return;
//     }
//     deltaTime -= 1000;

//     dayTimer.textContent = days;
//     hoursTimer.textContent = hours;
//     minutesTimer.textContent = minutes;
//     secondsTimer.textContent = seconds;
//   }, 1000);
// }
