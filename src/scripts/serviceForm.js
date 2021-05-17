import { sendRequest } from "./dataAccess.js";

export const ServiceForm = () => {
    let html = 
    `

    <div class="field">
            <label class="label" for="Parents">Parents name</label>
            <input type="text" name="Parents" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childsName">Child(ren) name</label>
            <input type="text" name="childsName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="attendingAmount">Children attending</label>
            <input type="number" name="attendingAmount" class="input" />
        </div>
        <div class="field">
        <label class="label" for="address">Address name</label>
        <input type="text" name="address" class="input" />
    </div>
        <div class="field">
            <label class="label" for="date">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="length">Number of hours</label>
            <input type="number" name="bookingHours" class="input" />
        </div>
        <button class="button" id="submitRequest">Submit Request</button>

    `

    return html;
}


const mainContainer = document.querySelector(".container");

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "submitRequest") {
    // Get what the user typed into the form fields
    const userParentName = document.querySelector(
      "input[name='Parents']"
    ).value;
    const userChildsName = document.querySelector(
      "input[name='childsName']"
    ).value;
    const userAttendingAmount = document.querySelector(
      "input[name='attendingAmount']"
    ).value;
    const userAddress = document.querySelector(
      "input[name='address']"
    ).value;
    const userDate = document.querySelector(
      "input[name='serviceDate']"
    ).value;
    const userHoursNeeded = document.querySelector(
      "input[name='bookingHours']"
    ).value;

    // Make an object out of the user input
    const dataToSendToAPI = {
      parentName: userParentName,
      childsName: userChildsName,
      attendingAmount: userAttendingAmount,
      address: userAddress,
      date: userDate,
      hours: userHoursNeeded

    };

    // Send the data to the API for permanent storage
    sendRequest(dataToSendToAPI);
  }
});