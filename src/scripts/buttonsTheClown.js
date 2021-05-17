
import { ServiceForm } from "./serviceForm.js";
import { Requests } from "./requests.js";

export const buttonsTheClown = () => {
    return `
          <h1>Buttons & Lollipop The Clowns</h1>
          <section class="serviceForm">
          ${ServiceForm()}
          </section>
        
        
          <section class="serviceRequests">
        
          <h2>Service Requests</h2>
          ${Requests()}
  
          </section>
          `;
  };
        

