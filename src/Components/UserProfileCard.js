import {
  getUserProfile,
  openUserModal,
} from "../utilities/userProfile.functions.js";

function UserProfileCard(avatar) {
  console.log(avatar);
  window.openUserModal = openUserModal;

  return `
     <a class="nav-profile-pic text-decoration-none cursor-pointer" onclick="openUserModal()">
         
          <img src="./assets/images/avatar-4.jpg" class="rounded-circle" alt="user" id="userNavImage"/>
        
        </a>
    
    `;
}

export default UserProfileCard;
