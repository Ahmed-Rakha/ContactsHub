import { getRandomColor } from "../utilities/generate.random.color.js";
function EmergencyCard({ totalEmergency, contacts }) {
  var content = "";

  if (totalEmergency > 0) {
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].isEmergency) {
        content += `
         <div class="d-flex align-items-center justify-content-between mb-3 ">
          <div class="d-flex align-items-center gap-4">
            <div style="background-color: ${getRandomColor()};"
              class="icon-container icon-container-md text-white  d-flex align-items-center justify-content-center gap-3"
            >
              <span class="fw-bold fs-5">${contacts[i].fullName
                .charAt(0)
                .toUpperCase()}</span>
            </div>
            <div>
              <h5 class="fw-bold mb-0 text-capitalize">${
                contacts[i].fullName
              }</h5>
              <p class="mb-0 text-muted small-p">${contacts[i].phoneNumber}</p>
            </div>
          </div>
          <div
            class="icon-container icon-container-sm bg-red-100 color-red-600"
          >
           <a href="tel:${
             contacts[i].phoneNumber
           }" class="text-decoration-none bg-red-100 color-red-600"><i class="fa-solid fa-phone"></i></a> 
          </div>
        </div>
        `;
      }
    }
  }
  return `
   <div class="card shadow-md rounded-4 mt-4 overflow-hidden ">
      <div class="card-body bg-red-50">
        <div class="d-flex align-items-center gap-4">
          <div
            class="icon-container icon-container-md text-white bg-red-500 d-flex align-items-center justify-content-center gap-3"
          >
            <i class="fa-solid fa-heart-pulse"></i>
          </div>
          <div>
            <h5 class="fw-bold mb-0">Emergency</h5>
            <p class="mb-0 text-muted small-p">
              Important contacts for urgent calls
            </p>
          </div>
        </div>
      </div>

      <div class="card-footer">
        ${
          totalEmergency === 0
            ? `
        <p class="mb-0 text-muted small-p text-center p-3">
          No emergency contacts yet
        </p>
        `
            : `
        ${content}
        `
        }
      </div>
    </div>
  `;
}

export default EmergencyCard;
