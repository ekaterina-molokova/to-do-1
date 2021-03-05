// Переменные
    // окно "добавить новое дело"
const newTaskPopup = document.querySelector(".popup_new-task");
const eventPreviewPopup = document.querySelector(".popup-event-preview");
const newTaskFormElement = newTaskPopup.querySelector(".popup__new-task-form");
const openNewTaskPopupButton = document.querySelector(".header__add-button");
const closeNewTaskPopupButton = newTaskPopup.querySelector(".popup__close-button");
const closeEventPreviewPopupButton = eventPreviewPopup.querySelector(".popup__close-button_event-preview");

const topicInput = newTaskFormElement.querySelector(".popup__topic");
const descriptionInput = newTaskFormElement.querySelector(".popup__description");
const dateInput = newTaskFormElement.querySelector(".popup__date");
const monthInput = newTaskFormElement.querySelector(".popup__month");
const yearInput = newTaskFormElement.querySelector(".popup__year");
const timeInput = newTaskFormElement.querySelector(".popup__time");
const colorInput = newTaskFormElement.querySelector(".popup__color");
const colorPseudoInput = newTaskFormElement.querySelector(".popup__pseudo-input");
const deleteEventPreviewButton = document.querySelector(".popup-event-preview__delete-button");
const deleteDetailedCardButton = document.querySelector(".task-cards__delete-button");

const createNewTaskButton = newTaskFormElement.querySelector(".popup__add-button");

    // экран 1 (список дел)
const taskCardMonthView = document.querySelector(".task-cards");
const monthTaskList = taskCardMonthView.querySelector(".task-cards__container");


    // экран 2 (список дел)
const taskCardDayView = document.querySelector(".task-cards_selected-day");
const dayTaskList = taskCardDayView.querySelector(".task-cards__container");
const dayTaskDetails = taskCardDayView.querySelector(".task-cards__details");

    // переменные дней-дат
const currentMonth = document.querySelector(".current-month");
const dayDatesList = document.querySelectorAll(".calendar__date");

const dataTasksArray = [];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Функции

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function closeNewTaskPopup(newTaskPopup) {
    closePopup(newTaskPopup);
    newTaskFormElement.reset();
}

colorInput.onchange = function() {
    colorPseudoInput.style.backgroundColor = colorInput.value;
}

deleteEventPreviewButton.addEventListener("click", function(evt) {
    const targetElement = event.target;
    const targetItem = targetElement.closest(".popup-container");
    targetItem.remove();
    closePopup(eventPreviewPopup);
    const detailedCard = document.querySelector(".task-cards__card_selected-day");
    detailedCard.remove();
});

deleteDetailedCardButton.addEventListener("click", function(evt) {
    const targetElement = event.target;
    const targetItem = targetElement.closest(".task-cards__card_selected-day");
    targetItem.remove();
});

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


const hashCode = (data) => {
    return [...data.split("")].reduce((hash, char) => {
        const charCode = char.charCodeAt(0)
        const code = ((hash<<3) - hash * 2)+charCode;
        return +code & +code;
    }, 0).toString()
}

// Шаг 1
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

// Шаг 2
// функция собирает массив плашек-тасков
function getHTMLArrayOfPlates(rawTasksArr) {
    const arrayOfHTMLPlates = rawTasksArr.map((rawTaskObj) => {
        console.log(rawTaskObj);
        return generatePlate(rawTaskObj);
    })

    return arrayOfHTMLPlates;
}

// Шаг 3
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

function getPrettyTime(time) {
    if (time < 10) {
        return `0${time}`
    } else {
        return time;
    }
}


// Шаг 4, сортировка, фильтрация, пока никак не используется
function filterTasks(arr) {
    console.log(arr);

    const newArr = arr.filter(item => {
        console.log(item);

        return true;
    })

    return newArr;
}

// Шаг 5
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




// на полях

// зашли в форму, заполнили, делаем сабмит (попали в общую функцию, из которой будут запускаться нижние пункты)
// дальнейшая очередность действий
// 1) Свести инпуты в объект-таск, объект-таск закинуть в массив тасков
    // итого на этом шаге у нас есть "правильный" массив js объектов с тасками
// 2) Выбросить этот массив в верстку
    // 2.1) при выбросе в верстку ты его отсортируешь и отфильтруешь в хронологическом порядке
        // фильтр нужен при заливе по конкретной дате (дела конкретного дня) 
    // 2.2) Этот массив надо промапить и получить массив хтмл элементов (плашек), готовых к выбросу в верстку 
        // 2.2.1) нужна функция, которая собирает плашку + навешивает листенеры по ходу дела этот элемент обрастает листенерами (иконка удаления, иконка комплита + нажатие на плашку, которое выводит нам превью плашки)
    // выбрасываешь его в верстку

// Эти элементы будут на плашке "дела текущего месяца"

// При нажатии на дату у нас открывается маленькое окошко с делами "текущего дня"
// у нас уже есть объект из пункта 2 выше
// делаем его копию и обрезаем его filter-ом так, чтобы в нем были только те таски, которые имеют нужную дату
// высыпаем это в верстку при открытии (таким образом мы свяжем дату и дела конкретного дня)
// скорее всего придется сверять дату на которую нажал (может быть она станет "фильтром")

// Кидаю так же скрин, чтобы ты понимал, что такое "дела текущего месяца" и "дела текущего дня"

// дату формируем так: 
    // let a = new Date(год, месяц, день, час, минута)
// час и минуту берем как value.split(':')

