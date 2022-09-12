document.querySelector(".notes-types").addEventListener("change", () => {
  const option = document.querySelector(".notes-types").value;
  document.querySelector(".notes-list").dataset.option = option;
});
