// Переменные
    // окно "добавить новое дело"
const newTaskPopup = document.querySelector(".popup_new-task");
const eventPreviewPopup = document.querySelector(".popup-event-preview");
const newTaskFormElement = newTaskPopup.querySelector(".popup__new-task-form");
const openNewTaskPopupButton = document.querySelector(".header__add-button");
const topicInput = newTaskFormElement.querySelector(".popup__topic");
const descriptionInput = newTaskFormElement.querySelector(".popup__description");
const dateInput = newTaskFormElement.querySelector(".popup__date");
const monthInput = newTaskFormElement.querySelector(".popup__month");
const yearInput = newTaskFormElement.querySelector(".popup__year");
const timeInput = newTaskFormElement.querySelector(".popup__time");
const colorInput = newTaskFormElement.querySelector(".popup__color");
const createNewTaskButton = newTaskFormElement.querySelector(".popup__add-button");

    // экран 1 (список дел)
const taskCardMonthView = document.querySelector(".task-cards");
const monthTaskList = taskCardMonthView.querySelector(".task-cards__container");
// const monthCard надо сделать так, чтобы все 3 переменные ниже искались не в taskCardMonthView, а в конкретной карточке (записка для себя, пока не реализовывать), могут быть проблемы
// так же эти 3 переменные можно вообще закинуть в функцию, которая их генерирует
const monthTaskName = taskCardMonthView.querySelector(".task-cards__task");
const monthTaskDate = taskCardMonthView.querySelector(".task-cards__date");
const monthTaskTime = taskCardMonthView.querySelector(".task-cards__time");

    // экран 2 (список дел)
const taskCardDayView = document.querySelector(".task-cards_selected-day");
const dayTaskList = taskCardDayView.querySelector(".task-cards__container");
const dayTaskName = taskCardDayView.querySelector(".task-cards__task");
const dayTaskDate = taskCardDayView.querySelector(".task-cards__date");
const dayTaskTime = taskCardDayView.querySelector(".task-cards__time");
const dayTaskDetails = taskCardDayView.querySelector(".task-cards__details");

    // переменные дней-дат
const currentMonth = document.querySelector(".current-month");
const dayDatesList = document.querySelectorAll(".calendar__date");

// Функции
    // открыть модальное окно "добавить новое дело"
function openNewTaskPopup(newTaskPopup) {
    newTaskPopup.classList.add("popup_opened");
    document.addEventListener("keydown", closeViaEsc);
}

// открыть модальное окно "развернутая карточка с деталями"
function openEventPreviewPopup(eventPreviewPopup) {
    eventPreviewPopup.classList.add("popup_opened");
    document.addEventListener("keydown", closeViaEsc);
}

    // закрыть модальное окно "добавить новое дело"
function closeNewTaskPopup(newTaskPopup) {
    newTaskPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeViaEsc);
    newTaskFormElement.reset();
}

// закрыть модальное окно "развернутая карточка с деталями"
function closeEventPreviewPopup(eventPreviewPopup) {
    eventPreviewPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeViaEsc);
}

    // закрытие модального окна по кнопке escape
function closeViaEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        openedPopup.classList.remove("popup_opened");
    }
}

    // опубликовать картчоку нового дела
function submitNewTaskPopup(evt) {
    evt.preventDefault();

    // желательно перейти в функцию, которая генерирует эти самые картчоки из template-ов
    // в не собирается все это:

    monthTaskName.textContent = topicInput.value;
    dayTaskName.textContent = topicInput.value;
    monthTaskDate.textContent = dateInput.value + " " + monthInput.value;
    dayTaskDate.textContent = dateInput.value + " " + monthInput.value;
    monthTaskTime.textContent = timeInput.value;
    dayTaskTime.textContent = timeInput.value;

    // затем это выкидывается в верстку (сейчас это заменяет нашу карточку, которая по умолчанию висит (болванка) )
    closeNewTaskPopup(newTaskPopup);
}

// Никита
    // сделать кликнутую дату активной (фон-кружочек)
function makeActiveDayOnCLick(cell) {
    // если у тебя нету ни одной выбранной даты при старте, то у тебя ломается скрипт, т.к тут Null ловится, надо по другому проверять через if
    const oldActiveCell = document.querySelector(".calendar__date_active");
    oldActiveCell.classList.toggle("calendar__date_active");

    cell.classList.toggle("calendar__date_active");
}

function openDetailedSheduleForActiveDay(day) {

    // подстановка числа в тайтл модального окна
    const currentDayNumber = taskCardDayView.querySelector(".current-day");
    currentDayNumber.textContent = day.textContent;

    // октрытие модалки
    taskCardDayView.classList.add("popup_opened")
}

// Слушатели
    // кнопка открытия модального окна "добавить новое дело"
openNewTaskPopupButton.addEventListener("click", () => {
    openNewTaskPopup(newTaskPopup)
});

newTaskPopup.addEventListener("click", function (evt){
    if(evt.target.classList.contains("popup")) {
        closeNewTaskPopup (newTaskPopup);
    }
});

eventPreviewPopup.addEventListener("click", function (evt){
    if(evt.target.classList.contains("popup")) {
        closeEventPreviewPopup(eventPreviewPopup);
    }
    });

    // слушатель сабмит кнопки формы "добавить новое дело"
newTaskFormElement.addEventListener("submit", submitNewTaskPopup);

    // дни-даты, при клике кружок
dayDatesList.forEach(date => {
    date.addEventListener('click', (event) => {
        makeActiveDayOnCLick(event.target);

        openDetailedSheduleForActiveDay(event.target);
    });
});

dayTaskDetails.addEventListener("click", ()=> {
    openEventPreviewPopup(eventPreviewPopup);
});

currentMonth.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
        openedPopup.classList.remove("popup_opened");
    }
});