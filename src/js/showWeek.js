import { getShowedMonday } from './storage.js';
import { showEvents } from './showEvents.js';
import './redLine.scss';

function showWeek() {
  const days = document.querySelector('.days');
  days.innerHTML = '';
  let weekday = getShowedMonday();
  const arrDaysElems = [];
  const arrMonthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const arrNamesWeekdays = ['Mon', 'Tue', 'Wen', 'Tuh', 'Fri', 'Sat', 'Sun'];
  const headerWeek = document.querySelector('.week');
  const titleHeader = document.querySelector('.navigate__MonthAndYear');
  let headerWeekHTML = '';
  let titleHeaderText = '';
  let oldYear = '';
  let oldMonth = '';
  const currentDate = new Date();
  for (let i = 0; i < 7; i++) {
    const valueDateForAttribute = weekday.getDate() < 10 ? `0${weekday.getDate()}` : weekday.getDate();
    const day = document.createElement('div');
    if (i === 0) {
      oldYear = weekday.getFullYear();
      oldMonth = weekday.getMonth();
    }
    if (i === 6) {
      oldMonth = oldMonth !== weekday.getMonth() ? arrMonthes[oldMonth] : '';
      oldYear = oldYear !== weekday.getFullYear() ? ` ${oldYear}` : '';
      titleHeaderText = `${oldMonth}${oldYear}${oldMonth ? ' - ' : ''}${arrMonthes[weekday.getMonth()]} ${weekday.getFullYear()}`;
    }
    const markedDay = new Date(weekday);
    const isToday = markedDay.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0);
    headerWeekHTML
            += `<div class="day">
                <span class="day_nameDay">${arrNamesWeekdays[i]}</span>
                <div class="day_numberDay ${isToday ? 'today' : ''}">${valueDateForAttribute}</div>
                <div class="LittleBorder"></div>
            </div>`;
    day.classList.add('column-day');
    const date = `${weekday.getFullYear()}-${weekday.getMonth() + 1}-${valueDateForAttribute}`;
    day.setAttribute('data-date', date);
    weekday = getNextDate(weekday);
    arrDaysElems.push(day);
  }
  titleHeader.textContent = titleHeaderText;
  headerWeek.innerHTML = headerWeekHTML;
  days.append(...arrDaysElems);
  showEvents();
}

function getNextDate(day) {
  const dateInMs = day.getTime();

  return new Date(dateInMs + (24 * 60 * 60 * 1000));
}

export { showWeek };
