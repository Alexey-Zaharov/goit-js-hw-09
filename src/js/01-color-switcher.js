const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const changeColorArea = document.querySelector('body');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.disabled = true;

function colorChanger() {
  intervalId = setInterval(
    () => (changeColorArea.style.backgroundColor = getRandomHexColor()),
    1000
  );
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopColorChanger() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', colorChanger);
stopBtn.addEventListener('click', stopColorChanger);
