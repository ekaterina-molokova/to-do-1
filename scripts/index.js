// Переменные
    // окно "добавить новое дело"
const newTaskPopup = document.querySelector(".popup_new-task");
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


// Функции
    // открыть модальное окно "добавить новое дело"
function openNewTaskPopup(newTaskPopup) {
    newTaskPopup.classList.add("popup_opened");
    document.addEventListener("keydown", closeViaEsc);
}

    // закрыть модальное окно "добавить новое дело"
function closeNewTaskPopup(newTaskPopup) {
    newTaskPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeViaEsc);
    newTaskFormElement.reset();
    // colorInput.value = "#E3B65B";
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

    cardTaskNameMonth.textContent = topicInput.value;
    dayTaskName.textContent = topicInput.value;
    monthTaskDate.textContent = dateInput.value + " " + monthInput.value;
    dayTaskDate.textContent = dateInput.value + " " + monthInput.value;
    monthTaskTime.textContent = timeInput.value;
    dayTaskTime.textContent = timeInput.value;

    // затем это выкидывается в верстку (сейчас это заменяет нашу карточку, которая по умолчанию висит (болванка) )
    closeNewTaskPopup(newTaskPopup);
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
    // слушатель сабмит кнопки формы "добавить новое дело"
newTaskFormElement.addEventListener("submit", submitNewTaskPopup);
