import { fireAlert } from "../utilities/alert.js";
import {
  validateInput,
  validateUploadedImg,
} from "../utilities/input.validation.js";
import {
  getUserProfile,
  saveContact,
  getBlobUrl,
  closeModal,
  editContact,
} from "../utilities/userProfile.functions.js";

function ContactModal() {
  var isValid = false;
  var imageURL = null;
  var validationMessage = "";
  function onInput(element) {
    console.log(element.id, element.value);
    if (element.id === "contactImg") return;
    if (element.id === "contactNotes") return;
    if (element.id === "contactGroup") return;
    if (element.id === "contactAddress") return;

    var validation = validateInput(element.id, element.value.trim());
    isValid = validation.validationStatus;
    validationMessage = validation.validationMessage;
  }

  function onSelectImg(element) {
    var file = element.files[0];
    if (file) {
      var imgValidation = validateUploadedImg(file);
      fireAlert(imgValidation);
      if (imgValidation.type === "success") {
        imageURL = getBlobUrl(file);
      }
    }
    var contactImageModalElement =
      document.getElementById("contactModalAvatar");
    var modalIconAvatar = document.getElementById("modalAvatarIcon");
    modalIconAvatar.classList.add("d-none");
    contactImageModalElement.classList.remove("d-none");
    contactImageModalElement.src = imageURL;
  }
  function onSaveContact() {
    var modalMode = document.getElementById("modalMode").value;
    var contactIndex = document.getElementById("modalContactIndex").value;
    if (modalMode === "add") {
      if (modalForm.reportValidity() && isValid) {
        var newContact = {
          fullName: contactFullName.value,
          email: contactEmail.value,
          phoneNumber: contactPhoneNumber.value,
          address: contactAddress.value,
          group: contactGroup.value,
          notes: contactNotes.value,
          isFavorite: checkFavorite.checked,
          isEmergency: checkEmergency.checked,
          imageURL: imageURL,
        };

        // check duplicate phone number
        var userProfile = getUserProfile();
        var isDuplicate = userProfile.contacts.some(
          (p) => p.phoneNumber === newContact.phoneNumber
        );
        if (isDuplicate) {
          fireAlert({
            type: "error",
            title: "Duplicate Phone Number",
            message: "A contact with this phone number already exists.",
          });
          return;
        }

        saveContact(newContact);
        modalForm.reset();
        closeModal();
        fireAlert({ type: "success", message: "Contact saved successfully" });
      } else {
        if (!contactFullName.value) {
          fireAlert({
            type: "error",
            title: "Missing Name",
            message: validationMessage || "Please enter a full name!",
          });
        } else if (
          contactFullName.value &&
          !isValid &&
          validationMessage.includes("Name")
        ) {
          fireAlert({
            type: "error",
            title: "Invalid Name",
            message: validationMessage || "Please enter a valid full name!",
          });
        } else if (!contactPhoneNumber.value) {
          fireAlert({
            type: "error",
            title: "Missing Phone",
            message: validationMessage || "Please enter a phone number!",
          });
        } else if (
          contactPhoneNumber.value &&
          !isValid &&
          validationMessage.includes("phone")
        ) {
          fireAlert({
            type: "error",
            title: "Invalid Phone",
            message: validationMessage || "Please enter a valid phone number!",
          });
        } else {
          fireAlert({
            type: "error",
            title: "Invalid Input",
            message: validationMessage || "Please check your input values!",
          });
        }
      }
    } else if (modalMode === "edit") {
      editContact(contactIndex, {
        fullName: contactFullName.value,
        email: contactEmail.value,
        phoneNumber: contactPhoneNumber.value,
        address: contactAddress.value,
        group: contactGroup.value,
        notes: contactNotes.value,
        isFavorite: checkFavorite.checked,
        isEmergency: checkEmergency.checked,
        imageURL: imageURL,
      });
      modalForm.reset();
      closeModal();
      fireAlert({ type: "success", message: "Contact updated successfully" });
    }
  }
  window.onInput = onInput;
  window.onSaveContact = onSaveContact;
  window.onSelectImg = onSelectImg;
  return `
   
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">Add New Contact</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="modalForm">
         <input type="hidden" id="modalMode" />
         <input type="hidden" id="modalContactIndex" />
        <div class="text-center mb-3">
          <div class="circle-form-icon">
          
              <i class="fa-solid fa-user" id="modalAvatarIcon"></i>
            <img src="" alt="avatar" id="contactModalAvatar" class="d-none" />
          
          </div>
          <div class="text-center mt-3">
            <label for="contactImg" class="bg-gray-300 p-2 rounded-3 cursor-pointer">
              <span> <i class="fa-solid fa-camera me-1"></i> Change Photo </span>
            </label>
             <input onchange="onSelectImg(this)" type="file" id="contactImg" hidden/>
          </div>
        </div>
        
         <div class="mb-3">
          <label class=form-label mb-2">Full Name <span class="text-danger mb-2">*</span></label>
          <input  oninput="onInput(this)" id="contactFullName" type="text" placeholder="Enter Full Name" class="form-control" required/>
          <p id="register-form-input-first-name-error" class="text-danger"></p>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2">Phone Number <span class="text-danger mb-2">*</span></label>
          <input  oninput="onInput(this)" id="contactPhoneNumber" type="text" placeholder="e.g., 01012345678" class="form-control" required/>
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
           <option value="" selected >Select Group</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="others">Others</option>
          </select>
         </div>
          <div  class="mb-3">
          <label class=form-label mb-2">Notes</label>
          <textarea id="contactNotes" class="form-control" oninput="onInput(this)" placeholder="Add notes"></textarea>         </div>
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

export default ContactModal;
