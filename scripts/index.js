// Переменные
    // окно "добавить новое дело"
const newTaskPopup = document.querySelector('.popup_new-task');
const openNewTaskPopupButton = document.querySelector('.header__add-button');
const closeNewTaskPopupButton = newTaskPopup.querySelector('.popup__close-button');

const newTaskFormElement = newTaskPopup.querySelector('.popup__new-task-form');
const topicInput = newTaskFormElement.querySelector('.popup__topic');
const descriptionInput = newTaskFormElement.querySelector('.popup__description');
const dateInput = newTaskFormElement.querySelector('.popup__date');
const monthInput = newTaskFormElement.querySelector('.popup__month');
const yearInput = newTaskFormElement.querySelector('.popup__year');
const timeInput = newTaskFormElement.querySelector('.popup__time');
const colorInput = newTaskFormElement.querySelector('.popup__color');
const colorPseudoInput = newTaskFormElement.querySelector('.popup__pseudo-input');

    // окно "превью выбранного дела"
const eventPreviewPopup = document.querySelector('.popup-event-preview');
const closeEventPreviewPopupButton = eventPreviewPopup.querySelector('.popup__close-button_event-preview');
const deleteEventPreviewButton = document.querySelector('.popup-event-preview__delete-button');
const completeEventPreviewPopupButton = eventPreviewPopup.querySelector(".task-cards__complete-button");

    // экран 1 ("список дел на месяц)
const taskCardMonthView = document.querySelector('.task-cards');
const monthTaskList = taskCardMonthView.querySelector('.task-cards__container');

    // экран 2 (список дел на конкретный день) (мини-модальное окно)
const taskCardDayView = document.querySelector('.task-cards_selected-day');
const dayTaskList = taskCardDayView.querySelector('.task-cards__container');
const dayTaskDetails = taskCardDayView.querySelector('.task-cards__details');

    // переключатели дат (активный день) + вернуться к делам на месяц
const currentMonth = document.querySelector('.current-month');
const dayDatesList = document.querySelectorAll('.calendar__date');

    // место хранение наших "заданий"
let dataTasksArray = [];
    // словарик с месяцами для подстановки
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



// Функции
    // открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
    // закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

    // смена цвета инпут-цвет в окне "создать новое задание"
colorInput.addEventListener('change', () => {
    colorPseudoInput.style.backgroundColor = colorInput.value;
})

//!
// заполняем модальное окно свежими данными
function fillEventPreviewPopupWithTaskData(popup, currentTaskPlate) {
    // popup data
    const popupTitle = popup.querySelector('.popup-event-preview__title');
    const popupDate = popup.querySelector('.popup-event-preview__preview-date');
    const popupTime = popup.querySelector('.popup-event-preview__preview-time');
    const popupDescription = popup.querySelector('.popup-event-preview__event-description');

    // current task plate data
    const currentTaskPlateTaskName = currentTaskPlate.querySelector('.task-cards__task');
    const currentTaskPlateTaskDate = currentTaskPlate.querySelector('.task-cards__date');
    const currentTaskPlateTaskTime = currentTaskPlate.querySelector('.task-cards__time');
    const currentTaskPlateTaskDetails = currentTaskPlate.querySelector('.hidden-description');

    // new data
    popupTitle.textContent = currentTaskPlateTaskName.textContent;
    popupDate.textContent = currentTaskPlateTaskDate.textContent;
    popupTime.textContent = currentTaskPlateTaskTime.textContent;
    popupDescription.textContent = currentTaskPlateTaskDetails.textContent;
}



// функция при старте программы создает массив в котором будут храниться таски, так же используется local storage
function init() {
    const s = localStorage.getItem('calendar_data') || '[]';
    dataTasksArray = JSON.parse(s);
}
init();

// сохраняем новые данные в массив тасков в виде нового объекта
function saveNewTaskToMemoryArray() {
    const newTaskInfo = {
        'title' : topicInput.value, 
        'description' : descriptionInput.value, 
        'dateObj' : new Date(`${yearInput.value}, ${monthInput.value}, ${dateInput.value}, ${timeInput.value}:00`),
        'hash': hashCode(`${yearInput.value}, ${monthInput.value}, ${dateInput.value}, ${timeInput.value}:00`),
        'isCompleted': false,
    }
    console.log(newTaskInfo);
    // сохраняем новые данные в массив тасков в виде нового объекта
    dataTasksArray.push(newTaskInfo);

    // переводим наш массив тасков в local storage
    localStorage.setItem('calendar_data', JSON.stringify(dataTasksArray))
}

    // создать уникальный хэш на основании даты для конкретного дела
const hashCode = (data) => {
    return [...data.split('')].reduce((hash, char) => {
        const charCode = char.charCodeAt(0)
        const code = ((hash<<3) - hash * 2)+charCode;
        return +code & +code;
    }, 0).toString()
}








// отрисовываем готовые плашки тасков, рендеринг
function renderTasksPlates(tasksArray) {

    // создадим массив HTML плашек включая новую из массива тасков
    return getHTMLArrayOfPlates(tasksArray);
}

// функция собирает массив HTML плашек-тасков
function getHTMLArrayOfPlates(rawTasksArr) {
    const arrayOfHTMLPlates = rawTasksArr.map((rawTaskObj) => {
        // console.log(rawTaskObj);
        return generatePlate(rawTaskObj);
    })

    return arrayOfHTMLPlates;
}

// заполняем HTML плашку инфой из массива тасков (под каждый таск)
function generatePlate({title, description, dateObj}) {
    const cardItemTemplate = document.querySelector('.template-task-card-big').content;
    const cardElement = cardItemTemplate.querySelector('.task-cards__card_selected-day').cloneNode(true);

    const taskTitle = cardElement.querySelector('.task-cards__task');
    const taskDate = cardElement.querySelector('.task-cards__date');
    const taskTime = cardElement.querySelector('.task-cards__time');
    const taskHiddenDescription = cardElement.querySelector('.hidden-description');

    console.dir(dateObj);

    //! дата превращается в строку, что грустно, приходится вновь ее переводить
    dateObj = new Date(dateObj);
    console.log(dateObj);

    taskTitle.textContent = title;
    taskDate.textContent = `${month[dateObj.getMonth()]} ${dateObj.getDate()}`;
    taskTime.textContent = `${getPrettyTime(dateObj.getHours())}:${getPrettyTime(dateObj.getMinutes())}`;
    taskHiddenDescription.textContent = description;

    // Слушатели
        // кнопка удаления на карточке
    const delButtonElem = cardElement.querySelector('.task-cards__delete-button');
    delButtonElem.addEventListener("click", function(event) {
        const targetElement = event.target;
        const targetItem = targetElement.closest(".task-cards__card_selected-day");
        targetItem.remove();
    });


        // открыть модальное окно "превью" при нажатии на view details
    const previewDetails = cardElement.querySelector('.task-cards__details');
    previewDetails.addEventListener('click', (event) => {
        const taskPlate = event.target.closest('.task-cards__card_selected-day');

        // заполняем попап при нажатии view details на плашке, модальное окно с данными плашки
        fillEventPreviewPopupWithTaskData(eventPreviewPopup, taskPlate);
    
        // открываем модальное окно "превью таска"
        openPopup(eventPreviewPopup);
    })
    

        // кнопка "комплит" на карточке
    const completeButtonElem = cardElement.querySelector('.task-cards__complete-button');

    completeButtonElem.addEventListener("click", function () {
        completeButtonElem.classList.toggle("task-cards__complete-button_active");
    });

    

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








    // сделать кликнутую дату активной (фон-кружочек)
function makeActiveDayOnCLick(currentDateCell) {
    const oldActiveDateCell = document.querySelector(".calendar__date_active");

    if (currentDateCell !== oldActiveDateCell && oldActiveDateCell) {
        oldActiveDateCell.classList.toggle("calendar__date_active");
    }

}

    // открыть модальное окно "дела для выбранного дня"
function openDetailedSheduleForActiveDay(day) {
    //! катино
    taskCardMonthView.setAttribute("style", "display: none");

    // подстановка числа в тайтл модального окна
    const currentDayNumber = taskCardDayView.querySelector(".current-day");
    currentDayNumber.textContent = day.textContent;

    day.classList.toggle("calendar__date_active");

    // фильтруем таски по конкретной дате
    const tasks = filterTasksByDate(day.textContent);

    // получаем таски в виде верстки (плашки), рендеринг
    const platesHtml = renderTasksPlates(tasks);

    // заливаем их в верстку
    updateDayPlate(platesHtml);

    // открытие самой модалки (экран 2)
    taskCardDayView.classList.add("popup_opened");
}

    // отфильтровать таски по конкретному дню
function filterTasksByDate(date){
    const dateStart = new Date(2021, 1, +date);
    const dateEnd = new Date(2021, 1, +date, 23, 59, 59);

    return dataTasksArray.filter(task => {
        const dateObj = typeof task.dateObj === 'string' ? new Date(task.dateObj) : task.dateObj
        return dateObj >= dateStart && dateObj <= dateEnd
    }).map(task => ({
        ...task,
        dateObj: typeof task.dateObj === 'string' ? new Date(task.dateObj) : task.dateObj
    }))
}

    // отфильтровать таски по конкретногому месяцу
    //! есть косяк с днями (не ясно сколько их, надо чинить)
function filterTasksByMonth(month){
    const dateStart = new Date(2021, +month);
    const dateEnd = new Date(2021, +month + 1);

    return dataTasksArray.filter(task => {
        const dateObj = typeof task.dateObj === 'string' ? new Date(task.dateObj) : task.dateObj
        return dateObj >= dateStart && dateObj <= dateEnd
    }).map(task => ({
        ...task,
        dateObj: typeof task.dateObj === 'string' ? new Date(task.dateObj) : task.dateObj
    }))
}

    // при выборе "месяца" показывается общий список дел
    // функция делает ТОЛЬКО отрисовку
function updateMonthPlate(plates) {
    monthTaskList.textContent = '';
    monthTaskList.append(...plates);
}

    // при выборе "конкретного дня в месяце" показывается список дел ПО ЭТОЙ ДАТЕ!
    // функция делает ТОЛЬКО отрисовку
function updateDayPlate(plates) {
    dayTaskList.textContent = '';
    dayTaskList.append(...plates);
}






// Слушатели
openNewTaskPopupButton.addEventListener("click", () => {
    openPopup(newTaskPopup);
});

closeNewTaskPopupButton.addEventListener("click", () => {
    newTaskFormElement.reset();
    closePopup(newTaskPopup);
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
    // сохраняем новые данные в массив тасков в виде нового объекта + делаем local storage из него
    saveNewTaskToMemoryArray();

    // Шаг 2
    // отрисовываем готовые плашки тасков, рендеринг
    renderTasksPlates(dataTasksArray);
    
    // Очищаем форму
    newTaskFormElement.reset();
    
    // Закрываем модальное окно
    closePopup(newTaskPopup);

    //! отрисовать дела на день, т.е запустить filterTasksByMonth или currentMonth.addEventListener
});

    // слушатель дней-дат 
dayDatesList.forEach(date => {
    date.addEventListener('click', (event) => {
        // выключаем старый кружок активности даты
        makeActiveDayOnCLick(event.target);

        // открываем мини-модальное окно с делами на выбранный день
        openDetailedSheduleForActiveDay(event.target);
    })
})


    // переключение между экраном 1 и экраном 2 (дела на месяц и дела на день)
currentMonth.addEventListener("click", () => {
    taskCardMonthView.setAttribute("style", "display: flex");
    const openedPopup = document.querySelector(".popup_opened");

    if (openedPopup) {
        openedPopup.classList.remove("popup_opened");
    }
    
    // фильтруем таски по месяцу
    const tasks = filterTasksByMonth(1);
    console.log(tasks);

    // получаем таски в виде верстки (плашки), рендеринг
    const plates = renderTasksPlates(tasks);

    // заливаем их в верстку
    updateMonthPlate(plates);

    // убираем активный кружочек с даты (все выключено)
    //! спотыкается при первом нажатии на месяц, надо засунуть в if
    const activeDateCell = document.querySelector(".calendar__date_active");
    if (activeDateCell) {
        activeDateCell.classList.toggle("calendar__date_active");
    }
});

dayTaskDetails.addEventListener("click", (event)=> {
    const taskPlate = event.target.closest('.task-cards__card_selected-day');

    // заполняем попап при нажатии view details на плашке, модальное окно с данными плашки
    fillEventPreviewPopupWithTaskData(eventPreviewPopup, taskPlate);

    // открываем модальное окно "превью таска"
    openPopup(eventPreviewPopup);
});

    // слушатель кнопок удаления (попап)
deleteEventPreviewButton.addEventListener("click", function(event) {
    // удаляем плашку-таск
    const targetElement = event.target.closest(".popup-container");
    // const targetItem = targetElement.closest(".popup-container");
    targetElement.remove();

    // закрываем попап
    closePopup(eventPreviewPopup);

    const detailedCard = document.querySelector(".task-cards__card_selected-day");
    detailedCard.remove();
});

completeEventPreviewPopupButton.addEventListener("click", function() {
    completeEventPreviewPopupButton.classList.toggle("task-cards__complete-button_active");
});





//! при первичной загрузке приложения не отрисовываются дела на месяц, надо кликнуть на день, потом на месяц снова
