const modalWindow = document.querySelector(".modal");
const addNoteButton = document.querySelector(".add-note-button");
const closeModalButton = document.querySelector(".close-modal-button");

function updateNotesList(notes) {
  const notesList = document.querySelector(".notes-list");
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    let noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.dataset.state = note.state;
    noteElement.dataset.listIndex = index;

    noteElement.innerHTML = `<div class="note-icon">
                                    <i class="fa-solid ${note.icon} fa-xl"></i>
                                </div>
                                <p class="note-name note-list-info-field">${note.name}</p>
                                <p class="note-date-created note-list-info-field">${note.created}</p>
                                <p class="note-category note-list-info-field">${note.category}</p>
                                <p class="note-content note-list-info-field">${note.content}</p>
                                <p class="note-context-dates note-list-info-field">${note.dates}</p>
                                <div class="note-toolbar">
                                    <div class="edit-button note-btn" data-action="edit">
                                        <i class="fa-solid fa-pen"></i>
                                    </div>
                                    <div class="archive-button note-btn" data-action="archive">
                                        <i class="fa-solid fa-box-archive"></i>
                                    </div>
                                    <div class="unarchive-button note-btn" data-action="unarchive">
                                        <i class="fa-solid fa-box-open"></i>
                                    </div>
                                    <div class="delete-button note-btn" data-action="delete">
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </div>`;
    notesList.append(noteElement);
  });
}

document.querySelector(".notes-types").addEventListener("change", () => {
  const option = document.querySelector(".notes-types").value;
  document.querySelector(".notes-list").dataset.option = option;
});

addNoteButton.addEventListener("click", () => {
  document.querySelector(".modal-content").dataset.modalType = "new-note";
  openModal();
});

closeModalButton.addEventListener("click", closeModal);

function openModal() {
  modalWindow.classList.add("modal-active");
}

function closeModal() {
  modalWindow.classList.remove("modal-active");
  document.querySelector(".input-category").value = "Task";
  document.querySelector(".input-note-name").value = "";
  document.querySelector(".input-content").value = "";
}
