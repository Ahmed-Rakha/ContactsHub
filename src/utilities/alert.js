export function fireAlert({ type, title = "", message }) {
  Swal.fire({
    title: title,
    icon: type.toLowerCase() === "error" ? "error" : "success",
    text: message,
    confirmButtonText: "Ok",
  });
}
