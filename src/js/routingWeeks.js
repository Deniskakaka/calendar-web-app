import { getShowedMonday, setShowedMonday } from './storage.js';
import { showWeek } from './showWeek.js';
import './header.scss';
import './schedule.scss';

function routingWeeks() {
  const arowsRight = document.querySelector('.navigate__arows_right');
  arowsRight.addEventListener('click', moveWeek);
  const arowsLeft = document.querySelector('.navigate__arows_left');
  arowsLeft.addEventListener('click', moveWeek);
  const buttonToday = document.querySelector('.navigate_today');
  buttonToday.addEventListener('click', moveWeek);

  if (!getShowedMonday()) setShowedMonday(getLastMonday());
  showWeek();
  const SEVEN_DAYS = 24 * 60 * 60 * 1000 * 7;

  function moveWeek(event) {
    const showedMondayInMs = getShowedMonday().getTime();

    if (event.target.classList.contains('navigate__arows_right')) {
      setShowedMonday(new Date(showedMondayInMs + SEVEN_DAYS));
    }
    if (event.target.classList.contains('navigate__arows_left')) {
      setShowedMonday(new Date(showedMondayInMs - SEVEN_DAYS));
    }
    if (event.target.classList.contains('navigate_today')) {
      setShowedMonday(getLastMonday());
    }
    showWeek();
  }
}

function getLastMonday() {
  const date = new Date();

  return new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1));
}

export { routingWeeks };
