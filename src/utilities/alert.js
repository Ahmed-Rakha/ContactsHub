export function fireAlert({ type, message }) {
  Swal.fire({
    title: type.toLowerCase() === "error" ? "Error!" : "Success!",
    icon: type.toLowerCase() === "error" ? "error" : "success",
    text: message,
    confirmButtonText: "Ok",
  });
}
