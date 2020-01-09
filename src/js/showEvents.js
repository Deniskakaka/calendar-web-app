import { getEventsLocal } from './storage';
import { showEditPopup } from './showPopupWindow';

function showEvents() {
  const days = [...document.querySelectorAll('.column-day')];
  const listEvents = getEventsLocal();
  days.map((day) => {
    const weekDay = new Date(day.dataset.date);
    weekDay.setHours(0, 0, 0, 0);
    const currentDay = new Date();

    const listEventsDay = listEvents.filter((event) => {
      const startDateEvent = new Date(event.startDate);
      const endDateEvent = new Date(event.endDate);
      startDateEvent.setHours(0, 0, 0, 0);
      endDateEvent.setHours(0, 0, 0, 0);
      const isEqualStartDate = weekDay.getTime() === startDateEvent.getTime();
      const isEqualEndDate = weekDay.getTime() === endDateEvent.getTime();
      const isAllDayEvent = weekDay > startDateEvent && weekDay < endDateEvent;

      return isEqualStartDate || isEqualEndDate || isAllDayEvent;
    });
    day.innerHTML = '';

    if (weekDay.setHours(0, 0, 0, 0) === currentDay.setHours(0, 0, 0, 0)) {
      const timeLine = document.createElement('div');
      timeLine.classList.add('redLine');
      day.append(timeLine);

      showCurrentTime(new Date(), timeLine);
      setInterval(() => {
        showCurrentTime(new Date(), timeLine);
      }, 60000);
    }

    day.append(...getListEventsHTML(listEventsDay, weekDay));
  });
}

function showCurrentTime(currentDate, timeLine) {
  const hour = currentDate.getHours() * 60 + currentDate.getMinutes();
  const heightOneMinute = 42 / 60;
  timeLine.style.top = `${hour * heightOneMinute}px`;
}

function getListEventsHTML(arrEvents, weekDay) {
  if (arrEvents.length === 0) return '';

  return arrEvents.map((elem) => {
    const event = document.createElement('div');
    event.setAttribute('data-id-event', elem.id);
    event.classList.add('day-event');
    event.style.backgroundColor = elem.color;
    event.addEventListener('click', showEditPopup);

    const title = document.createElement('div');
    title.classList.add('day-event__title');
    title.textContent = elem.name;

    const timeElem = document.createElement('span');

    const dateElem = document.createElement('div');
    const startYear = elem.startDate.getFullYear();
    const startMonth = elem.startDate.getMonth();
    const startDate = elem.startDate.getDate();
    dateElem.textContent = `${startDate}/${startMonth + 1}/${startYear}`;

    const startHours = elem.startDate.getHours();
    const startMinutes = elem.startDate.getMinutes();
    const endHours = elem.endDate.getHours();
    const endMinutes = elem.endDate.getMinutes();

    const startHoursText = startHours < 10 ? `0${startHours}` : startHours;
    const startMinutesText = startMinutes < 10 ? `0${startMinutes}` : startMinutes;
    const endHoursText = endHours < 10 ? `0${endHours}` : endHours;
    const endMinutesText = endMinutes < 10 ? `0${endMinutes}` : endMinutes;
    timeElem.textContent = `${startHoursText}:${startMinutesText} - ${endHoursText}:${endMinutesText}`;

    const valueMinuteMoveY = 42 / 60;
    let startPointY = 0;

    if (elem.startDate.getTime() > weekDay.getTime()) {
      startPointY = valueMinuteMoveY * ((startHours * 60) + startMinutes);
    }

    event.style.top = `${startPointY}px`;

    let diffMinutes = 1;
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (elem.endDate - weekDay < ONE_DAY) {
      diffMinutes = (elem.endDate - elem.startDate) / (1000 * 60);
    } else {
      diffMinutes = ((weekDay.getTime() + ONE_DAY) - elem.startDate.getTime()) / (1000 * 60);
    }

    if (elem.startDate < weekDay) {
      diffMinutes = (elem.endDate - weekDay) / (1000 * 60);
    }

    if (elem.startDate < weekDay && elem.endDate > (weekDay.getTime() + ONE_DAY)) {
      diffMinutes = ONE_DAY / (1000 * 60);
    }

    event.style.height = `${valueMinuteMoveY * diffMinutes}px`;

    event.append(title, timeElem, dateElem);
    return event;
  });
}

export { showEvents 