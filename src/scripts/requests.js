import { getRequests,  } from "./dataAccess.js";
import { deleteRequest } from "./dataAccess.js";
import { getClowns } from "./dataAccess.js";
import { saveCompletion } from "./dataAccess.js";
// import { applicationStateCopy} from "./dataAccess.js"


export const Requests = () => {
  const requests = getRequests();
  const clowns = getClowns()
  let html = `<ul>`;

  let listItems = requests.map((request) => {
    
    return `<li>${request.parentName} | ${request.date}
    <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(
            clown => { 
                return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
    }
    </select>
    <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`
  });

  html += listItems.join("");
  
  html += `</ul>`;
  return html;
};


const mainContainer = document.querySelector(".container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                clownId: clownId,
                date_created: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),

            }

             saveCompletion(completion)

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)
// mainContainer.addEventListener("change", (changeEvent) => {
//     let completionCopy = {...applicationStatecop }

//     if (completionCopy.completed === true) {
//         completionCopy.sort((current, next) => {
//             return current.completionCopy - next.completionCopy
//         })
//     }
// })