import {days} from './days.js'
import {nameDay} from './days.js'

const monthNow = document.querySelector('.monthNow');
const massMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
monthNow.innerHTML = massMonths[new Date().getMonth()];
let newDate = new Date();

const elemDay = document.querySelectorAll('.day')[0].getAttribute('data-date').slice(0,4);

document.querySelector('.navigate__arows_right').addEventListener('click',() => {
    let nextMonday = newDate.setDate(newDate.getDate() + 7);
    days(nextMonday);
    nameDay();
    year();
    nowMonth();
    monthFuture();
});

document.querySelector('.navigate__arows_left').addEventListener('click',() => {
    let formerMonday =  newDate.setDate(newDate.getDate() - 7);
    days(formerMonday);
    nameDay();
    year();
    nowMonth();
    monthFuture();
});

document.querySelector('.navigate_today').addEventListener('click',() => {
    days(new Date());
    newDate = new Date()
    nameDay();
    year();
    nowMonth();
    nowMonth();
    monthFuture();
});

year();
nowMonth();
function year() {
    const elemYear = document.querySelectorAll('.day')[0].getAttribute('data-date').slice(0,4);
    document.querySelector('.year').innerHTML = elemYear;
}

function nowMonth() {
    const elemMonth = document.querySelectorAll('.day')[0].getAttribute('data-date').slice(5);
    document.querySelector('.monthNow').innerHTML = massMonths[+elemMonth];
}

function monthFuture () {
    const futureMonth = document.querySelectorAll('.day')[6].getAttribute('data-date').slice(5);
    const nowMonth = document.querySelectorAll('.day')[0].getAttribute('data-date').slice(5);
    if (+futureMonth !== +nowMonth) {
        document.querySelector('.mounthFutuar').innerHTML = massMonths[+futureMonth];
    } else {
        document.querySelector('.mounthFutuar').innerHTML = '';
    }
}

