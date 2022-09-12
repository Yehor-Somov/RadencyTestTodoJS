import { notes } from "../data/defaultNotes.js";

window.onload = () => {
  initialize();
};

function initialize() {
  updateNotesList(notes);
}
