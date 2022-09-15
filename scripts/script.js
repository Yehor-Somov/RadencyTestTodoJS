import { notes } from "../data/defaultNotes.js";

let editableNoteIndex = null;

window.onload = () => {
  initialize();
};

function initialize() {
  updateNotesList(notes);
  updateSummary(notes);

  document
    .querySelector(".create-note-button")
    .addEventListener("click", addNote);

  document
    .querySelector(".edit-note-button")
    .addEventListener("click", editNote);

  document.addEventListener("click", actionButtonClick.bind(this));
}

function addNote() {
  const categorySelector = document.querySelector(".input-category");
  const noteNameInput = document.querySelector(".input-note-name");
  const noteContentInput = document.querySelector(".input-content");

  if (noteNameInput.value && noteContentInput.value) {
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
  } else {
    const errorLabel = document.querySelector(".error-label");
    errorLabel.style.display = "block";
    errorLabel.innerHTML = "Note can't be with empty values";
  }
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
        notes[note.dataset.listIndex].state = "Archived";
        note.dataset.state = "archived";
        updateSummary(notes);
        break;
      case "unarchive":
        notes[note.dataset.listIndex].state = "Active";
        note.dataset.state = "active";
        updateSummary(notes);
        break;
      case "edit":
        editNoteModal(note.dataset.listIndex);
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
  const datesArray = content.match(/\d{1,2}([\/.-])\d{1,2}\1\d{2,4}/g);
  return datesArray !== null ? datesArray : "";
}

function getCategoryIcon(category) {
  return categories.filter((item) => item.name === category)[0].icon;
}

function editNoteModal(index) {
  document.querySelector(".input-category").value = notes[index].category;
  document.querySelector(".input-content").value = notes[index].content;
  document.querySelector(".input-note-name").value = notes[index].name;
  document.querySelector(".modal-content").dataset.modalType = "edit-note";

  editableNoteIndex = index;
  openModal();
}

function editNote() {
  const categorySelector = document.querySelector(".input-category");
  const noteNameInput = document.querySelector(".input-note-name");
  const noteContentInput = document.querySelector(".input-content");

  notes[editableNoteIndex].category = categorySelector.value;
  notes[editableNoteIndex].name = noteNameInput.value;
  notes[editableNoteIndex].content = noteContentInput.value;
  notes[editableNoteIndex].dates = parsingContentDates(noteContentInput.value);

  updateNotesList(notes);
  closeModal();
}
