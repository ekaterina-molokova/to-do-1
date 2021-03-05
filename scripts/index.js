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

    // объект, который хранит дела
let templateDataObj = {
    'title': '',
    'description': '',
    'date': '',
    'time': '',
}

const dataTasks = [];

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

// входная функция после нажатия кнопки ADD в форме
function submitNewTask(evt) {
    evt.preventDefault();

    const newTaskInfo = {
        'title' : topicInput.value, 
        'description' : descriptionInput.value, 
        'date' : dateInput.value,
        'time' : timeInput.value,
    }
    // сохраняем новые данные в массив тасков в виде нового объекта
    dataTasks.push(newTaskInfo);

    // фильтруем массив dataTasks с помощью filter
    // filterTasks(dataTasks);

    // создадим массив плашек включая новую из отсортированного массива
    const arrayOfTasksHtml = dataTasks.map(data => {
        return generateHTMLPlate(data);
    })
    
    // закидываем в верстку плашки в правильном порядке
    // костыль
    monthTaskList.textContent = '';
    monthTaskList.append(...arrayOfTasksHtml);
    
    
    closeNewTaskPopup(newTaskPopup);
}

// заполняем плашку инфой из массива тасков
function generateHTMLPlate({title, description, date, time}) {
    // эта функция будет наполняться ивент-листенерами
    const cardItemTemplate = document.querySelector('.template-task-card-min').content;
    const cardElement = cardItemTemplate.querySelector('.task-cards__card').cloneNode(true);

    const taskTitle = cardElement.querySelector('.task-cards__task');
    const taskDate = cardElement.querySelector('.task-cards__date');
    const taskTime = cardElement.querySelector('.task-cards__time');
    const taskHiddenDescription = cardElement.querySelector('.hidden-description');

    taskTitle.textContent = title;
    taskDate.textContent = date;
    taskTime.textContent = time;
    taskHiddenDescription.textContent = description;

    return cardElement;
}

function filterTasks(arr) {
    arr.filter(item => {
        console.log(item);
    })
}





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

    // открытие самой модалки (экран 2)
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
newTaskFormElement.addEventListener("submit", (event) => {
    submitNewTask(event);
});

    // дни-даты, при клике кружок
dayDatesList.forEach(date => {
    date.addEventListener('click', (event) => {
        makeActiveDayOnCLick(event.target);

        openDetailedSheduleForActiveDay(event.target);
    })
})


// Временно закоментировал Катины листенеры, конфликтуют..

// dayTaskDetails.addEventListener("click", ()=> {
//     openEventPreviewPopup(eventPreviewPopup);
// });

// currentMonth.addEventListener("click", () => {
//     const openedPopup = document.querySelector(".popup_opened");
//     if (openedPopup) {
//         openedPopup.classList.remove("popup_opened");
//     }
// });






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

