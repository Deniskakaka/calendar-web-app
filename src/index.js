import { getEventsList, updateStorage } from './js/storage.js';
import { addContentSidebar } from './js/createSidebar.js';
import { showPopupWindow } from './js/showPopupWindow.js';
import { createEvent } from './js/createEvent.js';
import { routingWeeks } from './js/routingWeeks.js';
import { deleteObjectEvent } from './js/deleteEvent.js';
import { showWeek } from './js/showWeek.js';
import { showEvents } from './js/showEvents.js';
import './index.scss';
addContentSidebar();
showPopupWindow();
createEvent();
routingWeeks();
deleteObjectEvent();

document.addEventListener('DOMContentLoaded', () => {
    getEventsList()
        .then(listEvents => {
            updateStorage('listEvents', listEvents);
            showEvents();
        })
        .catch(err => {
            console.log(err);
            updateStorage('listEvents', []);
        });
});

window.addEventListener('storage', onStorageChange);

function onStorageChange() {
    showWeek();
};
