import { notes } from "../data/defaultNotes.js";

window.onload = () => {
  initialize();
};

function initialize() {
  updateNotesList(notes);

  document
    .querySelector(".create-note-button")
    .addEventListener("click", addNote);
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
    state: "active",
    content: noteContentInput.value,
    dates: parsingContentDates(noteContentInput.value),
  };

  notes.push(newNote);
  updateNotesList(notes);
  closeModal();
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
