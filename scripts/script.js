import { notes } from "../data/defaultNotes.js";

window.onload = () => {
  initialize();
};

function initialize() {
  updateNotesList(notes);

  document
    .querySelector(".create-note-button")
    .addEventListener("click", addNote);

  document.addEventListener("click", actionButtonClick.bind(this));
}

function addNote() {
  const categorySelector = document.querySelector(".input-category");
  const noteNameInput = document.querySelector(".input-note-name");
  const noteContentInput = document.querySelector(".input-content");

  let newNote = {
    icon: getCategoryIcon(categorySelector.value),
    name: noteNameInput.value,
    created: dateFormatter(new Date()),
    category: categorySelector.value,
    state: "Active",
    content: noteContentInput.value,
    dates: parsingContentDates(noteContentInput.value),
  };

  notes.push(newNote);
  updateNotesList(notes);
  closeModal();
}

function actionButtonClick(event) {
  const target = event.target;
  if (target.classList.contains("note-btn")) {
    const action = target.dataset.action;
    const note = target.closest(".note");

    switch (action) {
      case "delete":
        notes.splice(note.dataset.listIndex, 1);
        updateNotesList(notes);
        break;
      case "archive":
        notes[note.dataset.listIndex].state = "archived";
        note.dataset.state = "archived";
        break;
      case "unarchive":
        notes[note.dataset.listIndex].state = "active";
        note.dataset.state = "active";
        break;
      case "edit":
        break;
    }
  } else if (target.classList.contains("note")) {
    document.querySelector(".inspector-note-name").innerHTML =
      notes[target.dataset.listIndex].name;
    document.querySelector(".inspector-note-date").innerHTML =
      notes[target.dataset.listIndex].created;
    document.querySelector(".inspector-note-category").innerHTML =
      notes[target.dataset.listIndex].category;
    document.querySelector(".inspector-note-content").innerHTML =
      notes[target.dataset.listIndex].content;
    document.querySelector(".inspector-note-type").innerHTML =
      notes[target.dataset.listIndex].state;

    document.querySelector(".notes-inspector").dataset.info = "note";
  }
}

function dateFormatter(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function parsingContentDates(content) {
  const datesArray = content.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
  return datesArray !== null ? datesArray : "";
}

function getCategoryIcon(category) {
  if (category === "Task") {
    return "fa-thumbtack";
  } else if (category === "Random Thought") {
    return "fa-brain";
  } else if (category === "Idea") {
    return "fa-lightbulb";
  }
}
