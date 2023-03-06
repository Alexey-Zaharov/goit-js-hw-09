const inputData = document.querySelectorAll('input');
const button = document.querySelector('button');
let delay = 0;
let step = 0;
let amount = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function promiseCaller() {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

button.addEventListener('click', evt => {
  evt.preventDefault();
  delay = Number(inputData[0].value);
  step = Number(inputData[1].value);
  amount = Number(inputData[2].value);
  promiseCaller();
});
