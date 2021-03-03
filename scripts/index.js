const newTaskPopup = document.querySelector(".popup_new-task");
const addButton = document.querySelector(".header__add-button");

function openNewTaskPopup (newTaskPopup) {
    newTaskPopup.classList.add("popup_opened");
}

addButton.addEventListener("click", () => {
    openNewTaskPopup(newTaskPopup)
});