// Переменные для хранения текущей даты на компьютере пользователя
const realDate = new Date();
const realYear = realDate.getFullYear();
const realMonth = realDate.getMonth();
const realToday = realDate.getDate();

// Переменные для отслеживания месяца, который пользователь СЕЙЧАС СМОТРИТ
let currentYear = realYear;
let currentMonth = realMonth;

function renderCalendar() {
    const calendarElement = document.getElementById('calendar');
    if (!calendarElement) return;

    // Названия месяцев
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Формируем шапку с кнопками-стрелочками
    let html = `
        <div class="calendar-header">
            <button class="calendar-btn" id="prevMonthBtn">&lt;</button>
            <span>${months[currentMonth]} ${currentYear}</span>
            <button class="calendar-btn" id="nextMonthBtn">&gt;</button>
        </div>
    `;
    
    html += '<div class="calendar-grid">';

    // Дни недели
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    dayNames.forEach(day => {
        html += `<div class="calendar-day-name">${day}</div>`;
    });

    // Определяем первый день просматриваемого месяца и количество дней в нем
    const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; 
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Пустые ячейки до первого дня месяца
    for (let i = 0; i < firstDayIndex; i++) {
        html += '<div class="calendar-day empty"></div>';
    }

    // Заполняем числами
    for (let day = 1; day <= totalDays; day++) {
        // Подсвечиваем «сегодня» только если пользователь смотрит реальный текущий месяц и год
        const isToday = (day === realToday && currentMonth === realMonth && currentYear === realYear) ? 'today' : '';
        html += `<div class="calendar-day ${isToday}">${day}</div>`;
    }

    html += '</div>';
    calendarElement.innerHTML = html;

    // Навешиваем события на только что созданные кнопки стрелочек
    document.getElementById('prevMonthBtn').addEventListener('click', changeMonthToPrevious);
    document.getElementById('nextMonthBtn').addEventListener('click', changeMonthToNext);
}

// Функция перехода на предыдущий месяц
function changeMonthToPrevious() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// Функция перехода на следующий месяц
function changeMonthToNext() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Запуск при первой загрузке страницы
document.addEventListener('DOMContentLoaded', renderCalendar);