import { searchContacts } from "../utilities/userProfile.functions.js";

function ContactsSearchBar() {
  window.searchContacts = searchContacts;
  return `
     <form class="mt-3">
                  <div class="input-group position-relative">
                    <input
                      type="search"
                      class="form-control py-3 ps-5 rounded-4"
                      placeholder="Search by name, phone, or email..."
                      aria-label="Search"
                      aria-describedby="button-addon2"
                      oninput="searchContacts(this.value)"
                    />
                    <i
                      class="fa-solid fa-magnifying-glass position-absolute"
                    ></i>
                  </div>
                </form>
    `;
}

export default ContactsSearchBar;
