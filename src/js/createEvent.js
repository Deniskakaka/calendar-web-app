import { addEvent, updateEvent, getEventById } from './storage';
import { showEvents } from './showEvents';
import { validationIntersectionEvents } from './validationIntersectionEvents';
import './event.scss';

const btnSave = document.querySelector('.event__btn-save');

function createEvent() {
  btnSave.addEventListener('click', createObjectEvent);
}

function createObjectEvent(event) {
  event.preventDefault();
  const arrInputs = [...document.querySelectorAll('.popup input')];

  const invalidFields = arrInputs.filter((elem) => {
    if (!elem.classList.contains('event__color-picker')
            && !elem.value) {
      elem.classList.add('invalid');
      return elem;
    }
  });

  if (invalidFields.length > 0) return;

  const popup = document.querySelector('.popup');
  const { idEvent } = popup.dataset;

  const dataInputs = [...new FormData(popup)]
    .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});

  const eventStartTime = new Date(`${dataInputs.dateStart}T${dataInputs.timeStart}`);
  const eventEndTime = new Date(`${dataInputs.dateEnd}T${dataInputs.timeEnd}`);

  let newEvent = {};

  if (idEvent !== '') newEvent = getEventById(idEvent);

  if (newEvent.startDate - new Date() > (15 * 60 * 1000)) {
    alert('Вы не можете редактировать событие раньше чем за 15 мин до начала!!!!');
    return;
  }

  if (eventEndTime - eventStartTime > (6 * 60 * 60 * 1000)) {
    alert('Событие не может длиться дольше 6-ти часов!!!!');
    return;
  }

  if (validationIntersectionEvents(eventStartTime, eventEndTime, idEvent)) {
    alert('У Вас уже запланировано событие на это время!!!!');
    return;
  }

  newEvent.name = dataInputs.name;
  newEvent.startDate = eventStartTime;
  newEvent.endDate = eventEndTime;
  newEvent.description = document.querySelector('.event__description').value;
  newEvent.color = dataInputs.color;

  if (idEvent !== '') {
    updateEvent(idEvent, newEvent);
  } else {
    addEvent(newEvent);
  }

  document.querySelector('.popup-layer').classList.toggle('display-none');
  showEvents();
}

export { createEvent };
