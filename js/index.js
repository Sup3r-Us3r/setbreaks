// APPLY OVERFLOW HIDDEN IN BODY
document.body.style.overflow = 'hidden';

// INIT MUSIC DATA AND SETTINGS
const audio = new Audio(); 
audio.src = 'https://raw.githubusercontent.com/Sup3r-Us3r/setbreaks/master/assets/sound.mp3';
audio.load();
audio.volume = localStorage.getItem('setVolume') || 1;
document.querySelector('.rangeVolume input').value = audio.volume * 100;
audio.muted = localStorage.getItem('setMuted') || false;
const iconVol = [...document.querySelectorAll('.container__soundVolume .soundControl i')];
if (localStorage.getItem('setMuted') === 'true') {
  iconVol[0].style.display = 'none';
  iconVol[1].style.display = 'block';
  audio.muted = true;
} else {
  iconVol[0].style.display = 'block';
  iconVol[1].style.display = 'none';
  audio.muted = false;
}

// FIND ELEMENTS
const container = document.querySelector('.container__pauseAlert');
const containerDefineBreaks = document.querySelector('.container__defineBreaks');
const pauseAlert = document.querySelector('.alert__pauseAlert');
const btnSave = document.querySelector('.saveBreaks__pauseAlert button');
const pauseNumber = [...document.querySelectorAll('.time__pauseAlert')];
const containerToast = document.querySelector('.container__toast');
const toast = document.querySelector('.toastEnd');
const fiveMinAdvance = document.querySelector('#fiveMin');
const threeMinAdvance = document.querySelector('#threeMin');
const containerSoundVolume = document.querySelector('.container__soundVolume');

// FUNCTION FOR PLAY OR PAUSE MUSIC
function playOrPauseMusic() {
  containerSoundVolume.addEventListener('mouseover', () => document.querySelector('.rangeVolume').style.display = 'flex');
  containerSoundVolume.addEventListener('mouseout', () => document.querySelector('.rangeVolume').style.display = 'none');

  const iconVol = [...containerSoundVolume.querySelectorAll('.soundControl i')];

  iconVol.forEach(elem => {
    elem.addEventListener('click', () => {
      if (elem.dataset.vol === 'up') {
        iconVol[0].style.display = 'none';
        iconVol[1].style.display = 'block';
        audio.muted = true;
        return localStorage.setItem('setMuted', true);
      } else {
        iconVol[0].style.display = 'block';
        iconVol[1].style.display = 'none';
        audio.muted = false;
        return localStorage.setItem('setMuted', false);
      }
    });
  });

  return audioFunctions = {
    play: () => {
      audio.loop = true;

      const audioPromise = audio.play();

      if (audioPromise !== undefined) {
        audioPromise
          .then(() => audio.play())
          .catch(err => err);
      }
    },
    pause: () => audio.pause(),
  }
}

// FUNCTION FOR HANDLE SOUND VOLUME
function handleSoundVolume() {      
  containerSoundVolume.addEventListener('input', e => {
    audio.volume = e.target.value / 100;

    return localStorage.setItem('setVolume', audio.volume);
  });
  containerSoundVolume.addEventListener('change', e => {
    audio.volume = e.target.value / 100

    return localStorage.setItem('setVolume', audio.volume);
  });
}

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

// FUNCTION FOR PREVENT EMPTY PAUSE FIELDS
function preventEmptyPauseFields() {
  const inputs = [...document.querySelectorAll('.time__pauseAlert input')];

  let empty;

  inputs.forEach(input => {
    if (input.value === '') {
      containerDefineBreaks.classList.add('fieldEmpty');
      setTimeout(() => containerDefineBreaks.classList.remove('fieldEmpty'), 230);
      input.addEventListener('input', event => {
        event.target.value !== '' ? input.style.background = '' : input.style.background = '#d83d3d';
      });
      input.style.background = '#d83d3d';
      empty = true;
    }
  });

  return empty ? true : false;
}

// FUNCTION FOR WARN IN ADVANCE
function warnInAdvance() {
  const pauses = JSON.parse(localStorage.getItem('pauseAlert'));

  if (pauses !== null) {
    const today = new Date();

    const subMinutes = dateFns.subMinutes;

    const userDefinedDate = {
      pause1: new Date(today.getFullYear(), today.getMonth(), today.getDate(), transformTime(pauses.pause1).hour, transformTime(pauses.pause1).minutes, 0),
      pause2: new Date(today.getFullYear(), today.getMonth(), today.getDate(), transformTime(pauses.pause2).hour, transformTime(pauses.pause2).minutes, 0),
      pause3: new Date(today.getFullYear(), today.getMonth(), today.getDate(), transformTime(pauses.pause3).hour, transformTime(pauses.pause3).minutes, 0),
    }

    const pausesInAdvance = {
      pause1: () => {
        const newDate = fiveMinAdvance.checked ? subMinutes(userDefinedDate.pause1, 5) : subMinutes(userDefinedDate.pause1, 3);

        return {
          hour: String(newDate.getHours()),
          minutes: String(newDate.getMinutes()),
        }
      },
      pause2: () => {
        const newDate = fiveMinAdvance.checked ? subMinutes(userDefinedDate.pause2, 5) : subMinutes(userDefinedDate.pause2, 3);

        return {
          hour: String(newDate.getHours()),
          minutes: String(newDate.getMinutes()),
        }
      },
      pause3: () => {
        const newDate = fiveMinAdvance.checked ? subMinutes(userDefinedDate.pause3, 5) : subMinutes(userDefinedDate.pause3, 3);

        return {
          hour: String(newDate.getHours()),
          minutes: String(newDate.getMinutes()),
        }
      },
    }

    return localStorage.setItem('pauseAlertInAdvance', JSON.stringify({
      pause1: `${pausesInAdvance.pause1().hour}:${pausesInAdvance.pause1().minutes}`,
      pause2: `${pausesInAdvance.pause2().hour}:${pausesInAdvance.pause2().minutes}`,
      pause3: `${pausesInAdvance.pause3().hour}:${pausesInAdvance.pause3().minutes}`,
    }));
  }
}

// FUNCTION GET Advance VALUE
function getAdvanceValue() {
  const valueChecked = JSON.parse(localStorage.getItem('getAdvanceValue'));

  valueChecked.getAdvanceValue === 5 ? fiveMinAdvance.checked = true : threeMinAdvance.checked = true;
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

    getAdvanceValue();
    warnInAdvance();
  }
}

// FUNCTION FOR SAVE PAUSES
function saveBreaks() {
  btnSave.disabled = true;

  if (preventEmptyPauseFields()) {
    btnSave.disabled = false;
    return false;
  }

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

  localStorage.setItem('getAdvanceValue', JSON.stringify({
    getAdvanceValue: fiveMinAdvance.checked ? 5 : 3,
  }));

  return localStorage.setItem('pauseAlert', JSON.stringify(pauses));
}

// FUNCTION FOR SHOW POPUP
function popupAlert() {
  container.classList.add('hide__pauseAlert');

  const pauses = JSON.parse(localStorage.getItem('pauseAlertInAdvance'));
  // const pausesOriginal = JSON.parse(localStorage.getItem('pauseAlert'));

  const newPausesFormatted = {
    pause1: () => {
      return {
        hour: Number(pauses.pause1.split(':')[0]),
        minutes: Number(pauses.pause1.split(':')[1]),
      }
    },
    pause2: () => {
      return {
        hour: Number(pauses.pause2.split(':')[0]),
        minutes: Number(pauses.pause2.split(':')[1]),
      }
    },
    pause3: () => {
      return {
        hour: Number(pauses.pause3.split(':')[0]),
        minutes: Number(pauses.pause3.split(':')[1]),
      }
    },
  }

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
      }

      if (date.getHours() === newPausesFormatted.pause1().hour && date.getMinutes() === newPausesFormatted.pause1().minutes) {
        // SETTINGS MUSIC
        containerSoundVolume.style.display = 'none';
        if (localStorage.getItem('playMusic') === 'true') {
        } else {
          playOrPauseMusic().play();
          localStorage.setItem('playMusic', 'true');
        }

        // SETTINGS FOR REDIRECT
        if (localStorage.getItem('redirectPause1') === 'true') {
          display.show();
          pauseAlert.innerText = 'PAUSA 10 MIN';
          return;
        } else {
          localStorage.setItem('redirectPause1', 'true');
          display.show();
          pauseAlert.innerText = 'PAUSA 10 MIN';
          if (!document.hasFocus()) {
            window.open(`${window.location.href}`);
          }
          return;
        }
      } else {
        containerDefineBreaks.classList.remove('hide__pauseAlert');
        container.classList.add('hide__pauseAlert');
        localStorage.removeItem('redirectPause1');
        localStorage.removeItem('playMusic');
        playOrPauseMusic().pause();
        containerSoundVolume.style.display = 'flex';
      }

      if (date.getHours() === newPausesFormatted.pause2().hour && date.getMinutes() === newPausesFormatted.pause2().minutes) {
        // SETTINGS MUSIC
        containerSoundVolume.style.display = 'none';
        if (localStorage.getItem('playMusic') === 'true') {
        } else {
          playOrPauseMusic().play();
          localStorage.setItem('playMusic', 'true');
        }

        // SETTINGS FOR REDIRECT
        if (localStorage.getItem('redirectPause2') === 'true') {
          display.show();
          pauseAlert.innerText = 'PAUSA 20 MIN';
          return;
        } else {
          localStorage.setItem('redirectPause2', 'true');
          display.show();
          pauseAlert.innerText = 'PAUSA 20 MIN';
          if (!document.hasFocus()) {
            window.open(`${window.location.href}`);
          }
          return;
        }
      } else {
        containerDefineBreaks.classList.remove('hide__pauseAlert');
        container.classList.add('hide__pauseAlert');
        localStorage.removeItem('redirectPause2');
        localStorage.removeItem('playMusic');
        playOrPauseMusic().pause();
        containerSoundVolume.style.display = 'flex';
      }

      if (date.getHours() === newPausesFormatted.pause3().hour && date.getMinutes() === newPausesFormatted.pause3().minutes) {
        // SETTINGS MUSIC
        containerSoundVolume.style.display = 'none';
        if (localStorage.getItem('playMusic') === 'true') {
        } else {
          playOrPauseMusic().play();
          localStorage.setItem('playMusic', 'true');
        }

        // SETTINGS FOR REDIRECT
        if (localStorage.getItem('redirectPause3') === 'true') {
          display.show();
          pauseAlert.innerText = 'PAUSA 10 MIN';
        } else {
          localStorage.setItem('redirectPause3', 'true');
          display.show();
          pauseAlert.innerText = 'PAUSA 10 MIN';
          if (!document.hasFocus()) {
            window.open(`${window.location.href}`);
          }
        }
      } else {
        containerDefineBreaks.classList.remove('hide__pauseAlert');
        container.classList.add('hide__pauseAlert');
        localStorage.removeItem('redirectPause3');
        localStorage.removeItem('playMusic');
        playOrPauseMusic().pause();
        containerSoundVolume.style.display = 'flex';
      }
    }, 1000);
  }
}

// CALL FUNCTIONS
handleSoundVolume();
handleLimitDigits();
getBreaks();
popupAlert();

// BUTTON FOR CALL FUNCTION: saveBreaks
btnSave.addEventListener('click', saveBreaks);
