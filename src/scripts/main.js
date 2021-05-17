import { buttonsTheClown } from "./buttonsTheClown.js";
import { fetchClowns, fetchCompletions, fetchRequests } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");

const render = () => {
  fetchRequests()
  .then(() => fetchClowns())
  .then(() => fetchCompletions())
  .then(() => {
    mainContainer.innerHTML = buttonsTheClown();
  });
};
render();


mainContainer.addEventListener("stateChanged", (event) => {
  console.log("State of data has changed. Regenerating HTML...");
  render();
});