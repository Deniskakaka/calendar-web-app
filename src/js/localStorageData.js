function updateStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

function getItemStorage(key) {
    return JSON.parse(localStorage.getItem(key), reviver);
};

function reviver(key, value) {
    if (['createDate', 'startDate', 'endDate'].includes(key)) {
        return new Date(value);
    }

    return value;
};

function setShowedMonday(showedMonday) {
    updateStorage('showedMonday', showedMonday);
};

function getShowedMonday() {
    if (getItemStorage('showedMonday')) {
        return new Date(getItemStorage('showedMonday'));
    }
    return getItemStorage('showedMonday');
};

function getEventsLocal() {
    return getItemStorage('listEvents') || [];
};

function addEventLocal(event) {
    const listEvents = getEventsLocal();
    listEvents.push({
        id: event.id,
        name: event.name,
        createDate: new Date(),
        startDate: event.startDate,
        endDate: event.endDate,
        description: event.description,
        color: event.color,
    });
    updateStorage('listEvents', listEvents);
};

function getEventByIdLocal(idEvent) {
    return getEventsLocal().find(({ id }) => id === idEvent);
};

function deleteEventLocal(idEvent) {
    const listEvents = getEventsLocal();
    let indexEvent = undefined;
    listEvents.find(({ id }, index) => {
        if (id === idEvent) {
            indexEvent = index;
            return true;
        }
    });
    listEvents.splice(indexEvent, 1);

    updateStorage('listEvents', listEvents);
};

export { getEventsLocal, getEventByIdLocal, addEventLocal, deleteEventLocal, getShowedMonday, setShowedMonday };
