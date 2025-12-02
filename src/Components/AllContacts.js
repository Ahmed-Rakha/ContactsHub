import AllContactsHeader from "./AllContactsHeader.js";
import ContactsSearchBar from "./ContactSearchBar.js";
import ContactsList from "./ContactsList.js";

function AllContacts(userProfile) {
  return `
    <div class="col-12 col-md-8 mb-4 mb-md-0">
                <div id="allContactsHeader">
                 ${AllContactsHeader(userProfile.contacts.length)}
                </div>
              
               ${ContactsSearchBar()}
               <div id="contacts-list">
                ${ContactsList(userProfile)}
               </div>
               
              </div>
    `;
}

export default AllContacts;
