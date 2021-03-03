const newTaskPopup = document.querySelector(".popup_new-task");
const newTaskForm = newTaskPopup.querySelector(".popup__new-task-form");
const addButton = document.querySelector(".header__add-button");
const topicInput = newTaskPopup.querySelector(".popup__topic");
const descriptionInput = newTaskPopup.querySelector(".popup__description");
const dateInput = newTaskPopup.querySelector(".popup__date");
const monthInput = newTaskPopup.querySelector(".popup__month");
const yearInput = newTaskPopup.querySelector(".popup__year");
const timeInput = newTaskPopup.querySelector(".popup__time");
const colorInput = newTaskPopup.querySelector(".popup__color");
const taskCardMonthView = document.querySelector(".task-cards");
const taskCardDayView = document.querySelector(".task-cards_selected-day");
const cardTaskMonthView = taskCardMonthView.querySelector(".task-cards__task");
const cardTaskDayView = taskCardDayView.querySelector(".task-cards__task");
const cardDateMonthView = taskCardMonthView.querySelector(".task-cards__date");
const cardDateDayView = taskCardDayView.querySelector(".task-cards__date");
const cardTimeMonthView = taskCardMonthView.querySelector(".task-cards__time");
const cardTimeDayView = taskCardDayView.querySelector(".task-cards__time");

function openNewTaskPopup (newTaskPopup) {
    newTaskPopup.classList.add("popup_opened");
    document.addEventListener("keydown", closeViaEsc);
}

function closeNewTaskPopup (newTaskPopup) {
    newTaskPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeViaEsc);
    topicInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    timeInput.value = "";
    colorInput.value = "#E3B65B";
}

function closeViaEsc (evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        openedPopup.classList.remove("popup_opened");
    }
}

newTaskPopup.addEventListener("click", function (evt){
        if(evt.target.classList.contains("popup")) {
            closeNewTaskPopup (newTaskPopup);
        }
    });

function submitNewTaskPopup (evt) {
    evt.preventDefault();
    cardTaskMonthView.textContent = topicInput.value;
    cardTaskDayView.textContent = topicInput.value;
    cardDateMonthView.textContent = dateInput.value + " " + monthInput.value;
    cardDateDayView.textContent = dateInput.value + " " + monthInput.value;
    cardTimeMonthView.textContent = timeInput.value;
    cardTimeDayView.textContent = timeInput.value;
    closeNewTaskPopup(newTaskPopup);

addButton.addEventListener("click", () => {
    openNewTaskPopup(newTaskPopup)
});

newTaskForm.addEventListener("submit", submitNewTaskPopup);
