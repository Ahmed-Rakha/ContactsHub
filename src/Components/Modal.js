import { validateInput } from "../utilities/input.validation.js";
import {
  getUserProfile,
  saveContact,
} from "../utilities/userProfile.functions.js";

function Modal() {
  var isValid = false;
  function onInput(element) {
    console.log(element.id, element.value);
    if (element.id === "contactImg") return;
    if (element.id === "contactNotes") return;
    if (element.id === "contactGroup") return;
    if (element.id === "contactAddress") return;

    isValid = validateInput(element.id, element.value.trim());
  }
  function onSaveContact() {
    if (isValid) {
      var newContact = {
        fullName: contactFullName.value,
        email: contactEmail.value,
        phoneNumber: contactPhoneNumber.value,
        address: contactAddress.value,
        group: contactGroup.value,
        notes: contactNotes.value,
        isFavorite: checkFavorite.checked,
        isEmergency: checkEmergency.checked,
      };

      var modalForm = document.getElementById("modalForm");
      var modalEl = document.getElementById("exampleModal");
      var modal = bootstrap.Modal.getInstance(modalEl);
      saveContact(newContact);
      modalForm.reset();
      modal.hide();

      Swal.fire({
        title: "Success!",
        text: "Contact added successfully.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill the form correctly.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
  window.onInput = onInput;
  window.onSaveContact = onSaveContact;
  return `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Contact</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="modalForm">
        <div class="text-center mb-3">
          <div class="circle-form-icon">
          <i class="fa-solid fa-user"></i>
          </div>
          <input oninput="onInput(this)" type="file" id="contactImg"/>
        </div>
        
         <div class="mb-3">
          <label class=form-label mb-2">Full Name <span class="text-danger mb-2">*</span></label>
          <input  oninput="onInput(this)" id="contactFullName" type="text" placeholder="Enter Full Name" class="form-control"/>
          <p id="register-form-input-first-name-error" class="text-danger"></p>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2">Phone Number <span class="text-danger mb-2">*</span></label>
          <input  oninput="onInput(this)" id="contactPhoneNumber" type="text" placeholder="e.g., 01012345678" class="form-control"/>
          <p id="register-form-input-phone-error" class="text-danger"></p>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2">Email Address</label>
          <input  oninput="onInput(this)" id="contactEmail" type="email" placeholder="name@example.com" class="form-control"/>
          <p id="register-form-input-email-error" class="text-danger"></p>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2 mb-2">Address</label>
          <input  oninput="onInput(this)" id="contactAddress" type="text" placeholder="Enter address" class="form-control"/>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2">Group</label>
           <select class="form-control" id="contactGroup" onchange="onInput(this)">
            <option value="friends">Friends</option>
            <option value="family">Family</option>
          </select>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2">Notes</label>
          <input  oninput="onInput(this)" id="contactNotes" type="textarea" placeholder="Add notes about this contact" class="form-control"/>
         </div>
        <div class="d-flex gap-3 mb-3">
        <div>
         <input type="checkbox" class="form-check-input" id="checkFavorite"/>
          <label for="checkFavorite" class="form-check-label"> <i class="fa-solid fa-star color-amber-400"></i> <span>Favorite</span> </label>
        </div>
        <div>
          <input type="checkbox" class="form-check-input" id="checkEmergency"/>
          <label for="checkEmergency" class="form-check-label"> <i class="fa-solid fa-heart-pulse color-red-600"></i><span>Emergency</span> </label>
        </div>
        </div>
        </form>
      

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="onSaveContact()">Save changes</button>
      </div>
    </div>
  </div>
</div>
    `;
}

export default Modal;
