// APPLY OVERFLOW HIDDEN IN BODY
document.body.style.overflow = 'hidden';

// FIND ELEMENTS
const container = document.querySelector('.container__pauseAlert');
const containerDefineBreaks = document.querySelector('.container__defineBreaks');
const pauseAlert = document.querySelector('.alert__pauseAlert');
const btnSave = document.querySelector('.saveBreaks__pauseAlert button');
const pauseNumber = [...document.querySelectorAll('.time__pauseAlert')];
const containerToast = document.querySelector('.container__toast');
const toast = document.querySelector('.toastEnd');

// FUNCTION FOR LIMIT DIGITS
function handleLimitDigits() {
  [...document.querySelectorAll('.time__pauseAlert input')].forEach(element => {
    element.addEventListener('input', event => {
      if (event.target.value.length > 2) {
        return event.target.value = event.target.value.slice(0, 2);
      }
    });
  });
}

// FUNCTION FOR GET PAUSES
function getBreaks() {
  const pauses = JSON.parse(localStorage.getItem('pauseAlert'));

  if (pauses !== null) {
    pauseNumber[0].children[1].value = pauses.pause1.split(':')[0];
    pauseNumber[0].children[3].value = pauses.pause1.split(':')[1];

    pauseNumber[1].children[1].value = pauses.pause2.split(':')[0];
    pauseNumber[1].children[3].value = pauses.pause2.split(':')[1];

    pauseNumber[2].children[1].value = pauses.pause3.split(':')[0];
    pauseNumber[2].children[3].value = pauses.pause3.split(':')[1];
  }
}

// FUNCTION FOR SAVE PAUSES
function saveBreaks() {
  btnSave.disabled = true;

  const pauses = {
    pause1: `${pauseNumber[0].children[1].value}:${pauseNumber[0].children[3].value}`,
    pause2: `${pauseNumber[1].children[1].value}:${pauseNumber[1].children[3].value}`,
    pause3: `${pauseNumber[2].children[1].value}:${pauseNumber[2].children[3].value}`,
  }

  containerToast.classList.remove('hide__toast');
  containerToast.classList.add('toastStart');

  setTimeout(() => {
    containerToast.classList.remove('toastStart');
    containerToast.classList.add('hide__toast');
    window.location.reload();
    btnSave.disabled = false;
  }, 4000);

  return localStorage.setItem('pauseAlert', JSON.stringify(pauses));
}

// FUNCTION FORM TRANSFORM INPUT IN HOUR
function transformTime(time) {
  const originalTime = time.split('');
  const firstNumber = originalTime[0] === '0' ? originalTime[1] : originalTime[0] + originalTime[1];
  const secondNumber = originalTime[3] === '0' ? originalTime[4] : originalTime[3] + originalTime[4];

  return {
    hour: Number(firstNumber),
    minutes: Number(secondNumber),
  };
}

// FUNCTION FOR SHOW POPUP
function popupAlert() {
  container.classList.add('hide__pauseAlert');

  const pauses = JSON.parse(localStorage.getItem('pauseAlert'));

  if (pauses !== null) {
    window.setInterval(() => {
      const date = new Date();

      const display = {
        show: () => {
          if (container.classList.contains('hide__pauseAlert')) {
            container.classList.remove('hide__pauseAlert');
            container.classList.add('show__pauseAlert');
            containerDefineBreaks.classList.add('hide__pauseAlert');
          }
        },
        hide: () => {
          if (container.classList.contains('show__pauseAlert')) {
            container.classList.remove('show__pauseAlert');
            container.classListr.add('hide__pauseAlet');
          }
        }
      }

      if (date.getHours() === transformTime(pauses.pause1).hour && date.getMinutes() === transformTime(pauses.pause1).minutes) {
        if (localStorage.getItem('redirectPause1') === 'true') {
          display.show();
          pauseAlert.innerText = 'PAUSA 10 MIN';
          return;
        } else {
          localStorage.setItem('redirectPause1', 'true');
          display.show();
          pauseAlert.innerText = 'PAUSA 10 MIN';
          window.open(`${window.location.href}`);
          return;
        }
      } else {
        containerDefineBreaks.classList.remove('hide__pauseAlert');
        container.classList.add('hide__pauseAlert');
        localStorage.removeItem('redirectPause1');
      }

      if (date.getHours() === transformTime(pauses.pause2).hour && date.getMinutes() === transformTime(pauses.pause2).minutes) {
        if (localStorage.getItem('redirectPause2') === 'true') {
          containerDefineBreaks.classList.add('hide__pauseAlert');
          display.show();
          pauseAlert.innerText = 'PAUSA 20 MIN';
          return;
        } else {
          containerDefineBreaks.classList.add('hide__pauseAlert');
          localStorage.setItem('redirectPause2', 'true');
          display.show();
          pauseAlert.innerText = 'PAUSA 20 MIN';
          window.open(`${window.location.href}`);
          return;
        }
      } else {
        containerDefineBreaks.classList.remove('hide__pauseAlert');
        container.classList.add('hide__pauseAlert');
        localStorage.removeItem('redirectPause2');
      }

      if (date.getHours() === transformTime(pauses.pause3).hour && date.getMinutes() === transformTime(pauses.pause3).minutes) {
        if (localStorage.getItem('redirectPause3') === 'true') {
          containerDefineBreaks.classList.add('hide__pauseAlert');
          display.show();
          pauseAlert.innerText = 'PAUSA 30 MIN';
        } else {
          localStorage.setItem('redirectPause3', 'true');
          containerDefineBreaks.classList.add('hide__pauseAlert');
          display.show();
          pauseAlert.innerText = 'PAUSA 3 MIN';
          window.open(`${window.location.href}`);
        }
      } else {
        containerDefineBreaks.classList.remove('hide__pauseAlert');
        container.classList.add('hide__pauseAlert');
        localStorage.removeItem('redirectPause3');
      }
    }, 1000);
  }
}

// CALL FUNCTIONS
handleLimitDigits();
getBreaks();
popupAlert();

// BUTTON FOR CALL FUNCTION: saveBreaks
btnSave.addEventListener('click', saveBreaks);
