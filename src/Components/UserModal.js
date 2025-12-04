import {
  getUserProfile,
  onChangeUserImg,
  onEditUserProfile,
  openUserModal,
} from "../utilities/userProfile.functions.js";

function UserModal() {
  var avatar = getUserProfile().avatar;
  window.openUserModal = openUserModal;
  window.onEditUserProfile = onEditUserProfile;
  window.onChangeUserImg = onChangeUserImg;
  return `
<!-- Modal -->
<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalTitle">User Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <form>
        <div class="text-center mb-3">
            <div class="circle-form-icon">
            
                
                <img src="${
                  avatar ? avatar : "./assets/images/avatar-4.jpg"
                }" alt="avatar" id="userImage"  />
            </div>
            <div class="text-center mt-3">
                <label for="userImg" class="bg-gray-300 p-2 rounded-3 cursor-pointer">
                <span> <i class="fa-solid fa-camera me-1"></i> Change Photo </span>
                </label>
                <input onchange="onChangeUserImg(this.files[0])" type="file" id="userImg" hidden disabled/>
            </div>
        </div>
        <div class="mb-3">
            <label for="userFirstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="userFirstName" placeholder="Enter First Name"  disabled>
        </div>
         <div class="mb-3">
            <label for="userLastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="userLastName" placeholder="Enter Last Name" disabled>
        </div>
        <div class="mb-3">
            <label for="userEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="userEmail" placeholder="Enter Email" disabled>
        </div>
        <div class="mb-3">
            <label for="userPhoneNumber" class="form-label">Phone Number</label>
            <input type="text" class="form-control" id="userPhoneNumber" placeholder="Enter Phone Number" disabled>
        </div>
      </form>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="onEditUserProfile()" data-mode="edit" id="editUserProfileBtn">Edit Profile</button>
      </div>
    </div>
  </div>
</div>
    `;
}

export default UserModal;
