import { hideContent, showContent, monthToNumber } from './utils.js';

document.querySelector('#years').style.display = 'block';

const years = document.getElementById('years');
years.addEventListener('click', calendarHandler);

function calendarHandler(e) {
    if ((e.target.tagName === 'TD' || e.target.tagName === 'DIV') && e.target.innerText !== '') {
        const selectedYear = e.target.innerText;

        const yearCalendar = document.querySelector(`#year-${selectedYear}`);

        hideContent(years);
        showContent(yearCalendar);

        yearCalendar.addEventListener('click', getMonth);

        function getMonth(e) {
            if (e.target.tagName == 'CAPTION') {
                hideContent(yearCalendar);
                showContent(years);
            } else if ((e.target.tagName === 'TD' || e.target.tagName === 'DIV') && e.target.innerText !== '') {
                const selectedMonth = e.target.innerText;
                const monthCalendar = document.querySelector(`#month-${selectedYear}-${monthToNumber(selectedMonth)}`);

                showContent(monthCalendar);
                hideContent(yearCalendar);

                monthCalendar.addEventListener('click', (e) => {
                    if (e.target.tagName == 'CAPTION') {
                        hideContent(monthCalendar);
                        showContent(yearCalendar);
                    }
                });
            }
        }
    }
}
