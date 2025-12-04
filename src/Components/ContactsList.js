import {
  toggleEmergency,
  toggleFavorite,
  removeContact,
} from "../utilities/userProfile.functions.js";

import { getRandomColor } from "../utilities/generate.random.color.js";
function ContactsList(contacts) {
  var content = "";
  window.toggleEmergency = toggleEmergency;
  window.toggleFavorite = toggleFavorite;
  window.removeContact = removeContact;
  if (contacts.length > 0) {
    for (var i = 0; i < contacts.length; i++) {
      console.log(contacts[i]);
      console.log(contacts[i].imageURL);
      content += `
      
      
                  <div class="card custom-shadow rounded-4 mb-3">
                    <div class="card-body">
                      <div class="d-flex align-items-center gap-4">
                        <div style="background-color: ${getRandomColor()};"
                          class="icon-container icon-container-lg  d-flex align-items-center justify-content-center gap-3 position-relative overflow-hidden"
                        >

                          ${
                            contacts[i].imageURL
                              ? `<img src="${contacts[i].imageURL}" alt="contact image" id="contact-image">`
                              : `<span class="fw-bold fs-4">${contacts[
                                  i
                                ].fullName
                                  .charAt(0)
                                  .toUpperCase()}</span>`
                          }
                          ${
                            !contacts[i].isFavorite
                              ? ""
                              : ` <span class="position-absolute top-0 end-0 custom-circle-icon bg-amber-400">
                          <i class="fa-solid fa-star"></i>
                          </span>
                          `
                          }
                         
                        ${
                          !contacts[i].isEmergency
                            ? ""
                            : `
                          <span class="position-absolute bottom-0 end-0 custom-circle-icon bg-red-600">
                          <i class="fa-solid fa-heart-pulse"></i>
                          </span>
                          `
                        }
                        </div>
                        <div class="contact-name-phone">
                          <h4 class="fw-bold mb-1 text-capitalize">${
                            contacts[i].fullName
                          }</h4>
                          <p class="mb-0">
                            <span
                              class="fw-bold icon-container icon-container-sm bg-indigo-300"
                              ><i class="fa-solid fa-phone"></i
                            ></span>
                            <span class="text-muted">${
                              contacts[i].phoneNumber
                            }</span>
                          </p>
                        </div>
                      </div>
                       ${
                         !contacts[i].email
                           ? ""
                           : `<div class="mt-3">
                        <span
                          class="fw-bold icon-container icon-container-sm bg-purple-100 color-purple-600 me-1"
                          ><i class="fa-solid fa-envelope"></i
                        ></span>
                        <span class="text-muted small-p"
                          >${contacts[i].email}</span
                        >
                      </div>`
                       }
                      ${
                        !contacts[i].address
                          ? ""
                          : `<div class="my-2">
                        <span
                          class="fw-bold icon-container icon-container-sm bg-green-200 color-green-600 me-1"
                          ><i class="fa-solid fa-location-dot"></i
                        ></span>
                        <span class="text-muted small-p">${contacts[i].address}</span>
                      </div>`
                      }
                      <div class="card-badges">
                        <span
                          class="fw-bold bg-green-200 color-green-600 text-capitalize rounded-2 px-3 py-1 me-3"
                          >${contacts[i].group}</span
                        >
                        ${
                          !contacts[i].isEmergency
                            ? ""
                            : `
                        <span
                          class="fw-bold bg-red-100 color-red-600 text-capitalize rounded-2 px-3 py-1 me-3"
                          ><i class="fa-solid fa-heart-pulse"></i
                          >Emergency</span
                        >
                        `
                        }
                      </div>
                    </div>
                    <div class="card-footer py-3">
                      <div
                        class="d-flex align-items-center justify-content-between gap-3"
                      >
                        <div>
                          <a href="tel:${contacts[i].phoneNumber}"
                            ><span
                              class="icon-container icon-container-sm  bg-green-200 color-green-600 me-2"
                              ><i class="fa-solid fa-phone"></i></span
                          ></a>
                          <a href="mailto:${contacts[i].email}"
                            ><span
                              class="icon-container icon-container-sm  bg-purple-100 color-purple-600"
                              ><i class="fa-solid fa-envelope"></i></span
                          ></a>
                        </div>
                        <div class="card-controls">
                          <span onclick="toggleFavorite(${i})"
                            ><i
                              class="fa-solid fa-star icon-container icon-container-sm me-3 ${
                                contacts[i].isFavorite
                                  ? "bg-yellow-100 color-amber-500"
                                  : "bg-transparent color-gray-800"
                              }"
                            ></i
                          ></span>
                          <span onclick="toggleEmergency(${i})"
                            ><i
                              class="fa-solid fa-heart-pulse icon-container icon-container-sm  me-3 ${
                                contacts[i].isEmergency
                                  ? "bg-red-100 color-red-600"
                                  : "bg-transparent color-gray-800"
                              }"
                            ></i
                          ></span>
                          <span
                            ><i class="fa-solid fa-pen-to-square me-3"></i
                          ></span>
                          <span onclick="removeContact(${i})"><i class="fa-solid fa-trash"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
               
      
      `;
    }
  }
  return `

${
  contacts.length === 0
    ? `<div class="text-muted text-center fw-bold mt-5">
     <div class="icon-container icon-container-lg bg-gray-300">
        <i class="fa-solid fa-address-book text-white fs-3"></i>
    </div>
    <p class="mb-0 my-2 fw-light" >No contacts found</p>
    <p class="mb-0 mt-1 color-gray-400 medium-p fw-light">Click "Add Contact" to get started</p>
    
    </div>`
    : `
    <div class="mt-4">
    ${content}
 </div>

                `
}
  
  `;
}

export default ContactsList;
