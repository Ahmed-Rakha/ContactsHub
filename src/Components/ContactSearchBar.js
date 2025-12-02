function ContactsSearchBar() {
  return `
     <form class="mt-3">
                  <div class="input-group position-relative">
                    <input
                      type="text"
                      class="form-control py-3 ps-5 rounded-4"
                      placeholder="Search by name, phone, or email..."
                      aria-label="Search"
                      aria-describedby="button-addon2"
                    />
                    <i
                      class="fa-solid fa-magnifying-glass position-absolute"
                    ></i>
                  </div>
                </form>
    `;
}

export default ContactsSearchBar;
