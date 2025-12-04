export function validateInput(id, value) {
  if (id === "contactFullName") {
    id = "firstName";
  } else if (id === "contactEmail") {
    id = "email";
  } else if (id === "contactPhoneNumber") {
    id = "phoneNumber";
  }
  //   My Rules
  const rules = {
    firstName: {
      regex: /^[a-zA-Z\s-]{3,50}$/,
      errorId: "register-form-input-first-name-error",
      message: "Invalid name. It should be 3 or more characters long.",
    },
    lastName: {
      regex: /^[a-zA-Z\s-]{3,50}$/,
      errorId: "register-form-input-last-name-error",
      message: "Invalid name. It should be 3 or more characters long.",
    },
    contactFullName: {
      regex: /^[a-zA-Z\s-]{3,50}$/,
      errorId: "register-form-input-last-name-error",
      message: "Invalid name. It should be 3 or more characters long.",
    },
    email: {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
      errorId: "register-form-input-email-error",
      message: "Invalid email address.",
    },
    phoneNumber: {
      regex: /^01(0|1|2|5)\d{8}$/,
      errorId: "register-form-input-phone-error",
      message: "Invalid phone number.",
    },
  };

  if (!rules[id]) return; // Return if I didn't set rules for this input

  var { regex, errorId, message } = rules[id];
  var errorElement = document.getElementById(errorId);

  var isValid = regex.test(value);

  errorElement.textContent = isValid ? "" : message;

  return isValid;
}

export function validateUploadedImg(file) {
  var actualType = file.type.toLowerCase();
  var actualSize = file.size;
  var allowedSize = 2 * 1024 * 1024;
  var allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (actualSize > allowedSize) {
    return {
      type: "error",
      message: "Image size should be less than 2MB.",
    };
  }
  if (!allowedTypes.includes(actualType)) {
    return {
      type: "error",
      message: "Image type should be jpeg, png, gif, or webp.",
    };
  }

  return {
    type: "success",
    message: "Image uploaded successfully.",
  };
}
