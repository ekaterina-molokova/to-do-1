// Переменные
    // окно "добавить новое дело"
const newTaskPopup = document.querySelector(".popup_new-task");
const openNewTaskPopupButton = document.querySelector(".header__add-button");
const closeNewTaskPopupButton = newTaskPopup.querySelector(".popup__close-button");

const newTaskFormElement = newTaskPopup.querySelector(".popup__new-task-form");
const topicInput = newTaskFormElement.querySelector(".popup__topic");
const descriptionInput = newTaskFormElement.querySelector(".popup__description");
const dateInput = newTaskFormElement.querySelector(".popup__date");
const monthInput = newTaskFormElement.querySelector(".popup__month");
const yearInput = newTaskFormElement.querySelector(".popup__year");
const timeInput = newTaskFormElement.querySelector(".popup__time");
const colorInput = newTaskFormElement.querySelector(".popup__color");
const colorPseudoInput = newTaskFormElement.querySelector(".popup__pseudo-input");
const createNewTaskButton = newTaskFormElement.querySelector(".popup__add-button");

    // кнопки complete и delete
const deleteDetailedCardButton = document.querySelector(".task-cards__delete-button");
const completeButtons = document.querySelectorAll(".task-cards__complete-button");

    // окно "превью текущего дела"
const eventPreviewPopup = document.querySelector(".popup-event-preview");
const closeEventPreviewPopupButton = eventPreviewPopup.querySelector(".popup__close-button_event-preview");
const deleteEventPreviewButton = document.querySelector(".popup-event-preview__delete-button");

    // экран 1 (список дел на месяц)
const taskCardMonthView = document.querySelector(".task-cards");
const monthTaskList = taskCardMonthView.querySelector(".task-cards__container");

    // экран 2 (список дел на конкретный день) (мини-модальное окно)
const taskCardDayView = document.querySelector(".task-cards_selected-day");
const dayTaskList = taskCardDayView.querySelector(".task-cards__container");
const dayTaskDetails = taskCardDayView.querySelector(".task-cards__details");

    // переключатели дат (активный день) + вернуться к делам на месяц
const currentMonth = document.querySelector(".current-month");
const dayDatesList = document.querySelectorAll(".calendar__date");

    // место хранение наших "дел"
const dataTasksArray = [];
    // словарик
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Функции
    // открыть попап
function openPopup(popup) {
    popup.classList.add("popup_opened");
}
    // закрыть попап
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}
    // закрыть попап "добавить новое дело"
function closeNewTaskPopup(newTaskPopup) {
    closePopup(newTaskPopup);
    newTaskFormElement.reset();
}

    // смена цвета инпут-цвет
colorInput.onchange = function() {
    colorPseudoInput.style.backgroundColor = colorInput.value;
}

//!
// заполняем модальное окно свежими данными
function fillEventPreviewPopupWithTaskData(popup, currentTaskPlate) {
    // popup data
    const popupTitle = popup.querySelector('.popup-event-preview__title');
    const popupDate = popup.querySelector('.popup-event-preview__preview-date');
    const popupTime = popup.querySelector('.popup-event-preview__preview-time');
    const popupDescription = popup.querySelector('.popup-event-preview__event-description');

    // current task plate data
    const currentTaskPlateTaskName = currentTaskPlate.querySelector(".task-cards__task");
    const currentTaskPlateTaskDate = currentTaskPlate.querySelector(".task-cards__date");
    const currentTaskPlateTaskTime = currentTaskPlate.querySelector(".task-cards__time");
    const currentTaskPlateTaskDetails = currentTaskPlate.querySelector(".hidden-description");

    // new data
    popupTitle.textContent = currentTaskPlateTaskName.textContent;
    popupDate.textContent = currentTaskPlateTaskDate.textContent;
    popupTime.textContent = currentTaskPlateTaskTime.textContent;
    popupDescription.textContent = currentTaskPlateTaskDetails.textContent;
}

    // создать уникальный хэш
const hashCode = (data) => {
    return [...data.split("")].reduce((hash, char) => {
        const charCode = char.charCodeAt(0)
        const code = ((hash<<3) - hash * 2)+charCode;
        return +code & +code;
    }, 0).toString()
}

// сохраняем новые данные в массив тасков в виде нового объекта
function saveNewTaskToMemoryArray() {
    const newTaskInfo = {
        'title' : topicInput.value, 
        'description' : descriptionInput.value, 
        'dateObj' : new Date(`${yearInput.value}, ${monthInput.value}, ${dateInput.value}, ${timeInput.value}:00`),
        'hash': hashCode(`${yearInput.value}, ${monthInput.value}, ${dateInput.value}, ${timeInput.value}:00`),
    }
    console.log(newTaskInfo);
    // сохраняем новые данные в массив тасков в виде нового объекта
    dataTasksArray.push(newTaskInfo);
}

// функция собирает массив плашек-тасков
function getHTMLArrayOfPlates(rawTasksArr) {
    const arrayOfHTMLPlates = rawTasksArr.map((rawTaskObj) => {
        console.log(rawTaskObj);
        return generatePlate(rawTaskObj);
    })

    return arrayOfHTMLPlates;
}

// заполняем html плашку инфой из массива тасков
function generatePlate({title, description, dateObj}) {

    // эта функция будет наполняться ивент-листенерами
    const cardItemTemplate = document.querySelector('.template-task-card-min').content;
    const cardElement = cardItemTemplate.querySelector('.task-cards__card').cloneNode(true);

    const taskTitle = cardElement.querySelector('.task-cards__task');
    const taskDate = cardElement.querySelector('.task-cards__date');
    const taskTime = cardElement.querySelector('.task-cards__time');
    const taskHiddenDescription = cardElement.querySelector('.hidden-description');

    console.log(dateObj);
    taskTitle.textContent = title;
    taskDate.textContent = `${month[dateObj.getMonth()]} ${dateObj.getDate()}`;
    taskTime.textContent = `${getPrettyTime(dateObj.getHours())}:${getPrettyTime(dateObj.getMinutes())}`;
    taskHiddenDescription.textContent = description;
    

    return cardElement;
}
    // предоставление часов и минут в красивом виде
function getPrettyTime(time) {
    if (time < 10) {
        return `0${time}`
    } else {
        return time;
    }
}


// сортировка, фильтрация, пока никак не используется!
function filterTasks(arr) {
    console.log(arr);

    const newArr = arr.filter(item => {
        console.log(item);

        return true;
    })

    return newArr;
}

// отрисовываем готовые плашки тасков, рендеринг
function renderTasksPlates(tasksArray) {

    // запуск фильтрации
    // пока этот шаг бесполезен
    const filteredArrayOfTasks = filterTasks(tasksArray);
    console.log(filteredArrayOfTasks);

    // создадим массив HTML плашек включая новую из массива тасков
    const arrayOfHTMLPlates = getHTMLArrayOfPlates(filteredArrayOfTasks);

    
    monthTaskList.textContent = '';
    monthTaskList.append(...arrayOfHTMLPlates);
}

    // сделать кликнутую дату активной (фон-кружочек)
function makeActiveDayOnCLick(currentDateCell) {
    const oldActiveDateCell = document.querySelector(".calendar__date_active");

    currentDateCell.classList.toggle("calendar__date_active");

    if (currentDateCell !== oldActiveDateCell && oldActiveDateCell) {
        oldActiveDateCell.classList.toggle("calendar__date_active");
    }
}

    // открыть модальное окно "дела для выбранного дня"
function openDetailedSheduleForActiveDay(day) {

    // подстановка числа в тайтл модального окна
    const currentDayNumber = taskCardDayView.querySelector(".current-day");
    currentDayNumber.textContent = day.textContent;

    // открытие самой модалки (экран 2)
    taskCardDayView.classList.add("popup_opened")
}



// Слушатели

openNewTaskPopupButton.addEventListener("click", () => {
    openPopup(newTaskPopup);
});

closeNewTaskPopupButton.addEventListener("click", () => {
    closeNewTaskPopup(newTaskPopup);
});

closeEventPreviewPopupButton.addEventListener("click", () => {
    closePopup(eventPreviewPopup);
});

colorInput.addEventListener("input", function () {
    colorPseudoInput.style.backgroundColor = colorInput.value;
});

//!
    // слушатель сабмит кнопки формы "добавить новое дело"
newTaskFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Шаг 1
    // сохраняем новые данные в массив тасков в виде нового объекта
    saveNewTaskToMemoryArray();

    // Шаг 2
    // отрисовываем готовые плашки тасков, рендеринг
    renderTasksPlates(dataTasksArray);
    
    // Закрываем модальное окно
    closeNewTaskPopup(newTaskPopup);
});

    // дни-даты, при клике кружок
dayDatesList.forEach(date => {
    date.addEventListener('click', (event) => {
        makeActiveDayOnCLick(event.target);

        openDetailedSheduleForActiveDay(event.target);
    })
})


    // переключение между экраном 1 и экраном 2
currentMonth.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
        openedPopup.classList.remove("popup_opened");
    }

    const activeDateCell = document.querySelector(".calendar__date_active");
    activeDateCell.classList.toggle("calendar__date_active");
});

dayTaskDetails.addEventListener("click", (event)=> {
    const taskPlate = event.target.closest('.task-cards__card_selected-day');
    fillEventPreviewPopupWithTaskData(eventPreviewPopup, taskPlate);

    openPopup(eventPreviewPopup);
});

    // слушатель кнопок удаления (попап)
deleteEventPreviewButton.addEventListener("click", function(evt) {
    const targetElement = event.target;
    const targetItem = targetElement.closest(".popup-container");
    targetItem.remove();
    closePopup(eventPreviewPopup);
    const detailedCard = document.querySelector(".task-cards__card_selected-day");
    detailedCard.remove();
});

    // слушатель кнопок удаления (на карточке)
deleteDetailedCardButton.addEventListener("click", function(evt) {
    const targetElement = event.target;
    const targetItem = targetElement.closest(".task-cards__card_selected-day");
    targetItem.remove();
});

    // слушатель комплит-кнопок
completeButtons.forEach((button) => {
    button.addEventListener("click", function () {
        button.classList.toggle("task-cards__complete-button_active");
    });
});