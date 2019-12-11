const massNameDay = ["Mon", "Tue", "Wen", "Tuh", "Fri", "Sat", "Sun"];

function getMonday(startDate) {
    const date = new Date(startDate);
    return new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1));
};

export function days(date) {
    let monday = getMonday(date);
    let encrimentDay = 0;
    let weekHtml = '';
    for (let i = 0; i < 7; i++) {
        weekHtml += `<div class="day" data-date="${monday.getFullYear()}-${monday.getMonth()}">
                        <span class="day_nameDay"></span>
                        <div class="day_numberDay">${new Date(monday.setDate(monday.getDate() + encrimentDay)).getDate()}</div>
                        <div class="LittleBorder"></div>
                    </div>`;
        encrimentDay = 1;
    };

    document.querySelector(".week").innerHTML = weekHtml;
};

export function nameDay() {
    let day = document.querySelectorAll('.day_nameDay');
    for (let i = 0; i < day.length; i++) {
        day[i].innerHTML = massNameDay[i];
    }
};

days(new Date());

export function today() {
    const numberDay = document.querySelectorAll('.day_numberDay');
    const dayToday = new Date().getDate();
    const monthToday = new Date().getMonth();
    const day = document.querySelectorAll('.day');
    const yearToday = new Date().getFullYear();
    for (let i = 0; i < numberDay.length; i++) {
        if (+numberDay[i].innerHTML === +dayToday
            && +day[i].getAttribute('data-date').slice(5) === +monthToday
            && +day[i].getAttribute('data-date').slice(0, 4) === +yearToday) {
            numberDay[i].classList.add('today');
        }
    }
};

today();