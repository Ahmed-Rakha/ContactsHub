import { validateInput } from "../utilities/input.validation.js";

function Register() {
  var isValid = false;
  localStorage.setItem("isRegistered", "false");
  function onInput(element) {
    isValid = validateInput(element.id, element.value.trim());
  }

  function onRegister() {
    if (isValid) {
      var newUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        avatar: "",
        totalFavorites: 0,
        totalEmergency: 0,
        contactsCount: 0,
        contacts: [],
      };
      localStorage.setItem("userProfile", JSON.stringify(newUser));
      localStorage.setItem("isRegistered", "true");
      window.location.href = "./index.html";
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
  window.onRegister = onRegister;
  return `
      <div class="register-form-container bg-gray-200">
      <div
        class="container d-flex align-items-center justify-content-center gap-4"
      >
        <div class="d-flex align-items-center gap-3">
          <div class="icon-container icon-container-lg bg-violet-500">
            <i class="fa-solid fa-address-book text-white fs-3"></i>
          </div>
          <div class="logo-text-container">
            <h1 class="brand-color mb-0 fs-3 fw-bold">
              <span>Contact<span class="color-violet-600">Hub</span></span>
            </h1>
            <p class="text-muted mb-0">Smart Contact Manager</p>
          </div>
        </div>
        <form
          action="#"
          class="register-form contact-form shadow-lg w-75 p-4 rounded-2 bg-white"
        >
          <h3 class="fw-bold text-center mb-5 mt-2 text-capitalize">
            Register Now to Manage Your Contacts
          </h3>
          <input
            class="form-control mb-3 p-3"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            oninput="onInput(this)"

          />
          <p id="register-form-input-first-name-error" class="text-danger"></p>
          <input
            class="form-control mb-3 p-3"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            oninput="onInput(this)"

          />
          <p id="register-form-input-last-name-error" class="text-danger"></p>
          <input
            class="form-control mb-3 p-3"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            oninput="onInput(this)"

          />
          <p id="register-form-input-email-error" class="text-danger"></p>
          <input
            class="form-control mb-3 p-3"
            type="tel"
            name="phone"
            id="phoneNumber"
            placeholder="Phone Number"
            oninput="onInput(this)"

          />
          <p id="register-form-input-phone-error" class="text-danger"></p>
          <button
            id="register-form-btn"
            type="button"
            class="btn btn-brand-color w-100 p-3 fs-4 fw-bold"
            onclick="onRegister()"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>  
    `;
}

export default Register;
