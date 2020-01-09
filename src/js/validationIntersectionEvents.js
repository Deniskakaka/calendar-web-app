import { getEventsLocal } from './storage.js';

function validationIntersectionEvents(eventStart, eventEnd, idEvent) {
  const existingEvent = getEventsLocal().find((event) => {
    if (idEvent !== '' && event.id === idEvent) return false;
    if (eventEnd <= event.startDate || eventStart >= event.endDate) return false;
    return true;
  });

  return existingEvent;
}

export { validationIntersectionEvents };
