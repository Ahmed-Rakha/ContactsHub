import ContactsList from "../Components/ContactsList.js";
import StatsCard from "../Components/StatsCard.js";
import EmergencyCard from "../Components/EmergencyCard.js";
import FavoritesCard from "../Components/FavoritesCard.js";
import AllContactsHeader from "../Components/AllContactsHeader.js";
import { fireAlert } from "./alert.js";
import UserProfileCard from "../Components/UserProfileCard.js";
export function getUserProfile() {
  return JSON.parse(localStorage.getItem("userProfile"));
}

export function addNewContact() {
  openContactModal();
  document.getElementById("modalTitle").innerText = "Add New Contact";
  document.getElementById("modalForm").reset();
  document.getElementById("modalMode").value = "add";
  document.getElementById("modalAvatarIcon").classList.remove("d-none");
  document.getElementById("contactModalAvatar").classList.add("d-none");
}
export function saveContact(newContact) {
  var userProfile = getUserProfile();
  userProfile.contacts.push(newContact);
  updateUserProfile(userProfile);
  return userProfile;
}

export async function showConfirmationDeletionDialog(contactIndex) {
  var template = document.getElementById("confirm-deletion-contact-dialog");
  var swalHtml = template.content.querySelector(".swal-html");
  swalHtml.innerHTML = `Are you sure you want to delete ${
    getUserProfile().contacts[contactIndex].fullName
  }? This action cannot be undone.`;
  var { isConfirmed, isDismissed } = await Swal.fire({
    template: "#confirm-deletion-contact-dialog",
  });
  if (isConfirmed) {
    removeContact(contactIndex);
    fireAlert({
      type: "success",
      title: "Deleted!",
      message: "Contact deleted successfully!",
    });
  }
}
export function removeContact(contactIndex) {
  var userProfile = getUserProfile();
  userProfile.contacts.splice(contactIndex, 1);
  updateUserProfile(userProfile);
  return userProfile;
}

export function onEditContact(contactIndex) {
  console.log(contactIndex);
  openContactModal();
  var contact = getUserProfile().contacts[contactIndex];
  document.getElementById("modalTitle").innerText = "Edit Contact";
  document.getElementById("contactFullName").value = contact.fullName;
  document.getElementById("contactPhoneNumber").value = contact.phoneNumber;
  document.getElementById("contactEmail").value = contact.email;
  document.getElementById("contactAddress").value = contact.address;
  document.getElementById("contactGroup").value = contact.group;
  document.getElementById("contactNotes").value = contact.notes;
  document.getElementById("checkFavorite").checked = contact.isFavorite;
  document.getElementById("checkEmergency").checked = contact.isEmergency;
  document.getElementById("contactModalAvatar").src = contact.imageURL;
  document.getElementById("modalMode").value = "edit";
  document.getElementById("modalContactIndex").value = contactIndex;
}

export function editContact(contactIndex, newContact) {
  var userProfile = getUserProfile();
  userProfile.contacts.splice(contactIndex, 1, newContact);
  updateUserProfile(userProfile);
  return userProfile;
}

export function recalculateUserStats(userProfile) {
  var favoriteCount = 0;
  var emergencyCount = 0;
  var contactList = userProfile.contacts;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].isFavorite) favoriteCount++;
    if (contactList[i].isEmergency) emergencyCount++;
  }
  userProfile.totalFavorites = favoriteCount;
  userProfile.totalEmergency = emergencyCount;
  userProfile.contactsCount = contactList.length;
  return userProfile;
}

export function toggleEmergency(contactIndex) {
  const userProfile = getUserProfile();
  const contact = userProfile.contacts[contactIndex];
  contact.isEmergency = !contact.isEmergency;
  updateUserProfile(userProfile);
  return userProfile;
}

export function toggleFavorite(contactIndex) {
  const userProfile = getUserProfile();
  const contact = userProfile.contacts[contactIndex];
  contact.isFavorite = !contact.isFavorite;
  updateUserProfile(userProfile);
  return userProfile;
}

// helper functions

function updateUserProfile(userProfile) {
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  var contactListElement = document.getElementById("contacts-list");
  var statsCardsElement = document.getElementById("stats-cards");
  var favoritesEmergencyCardElement = document.getElementById(
    "favorites-emergency"
  );
  var allContactsHeaderElement = document.getElementById("allContactsHeader");
  var userProfileElement = document.getElementById("userProfileEl");

  if (contactListElement) {
    contactListElement.innerHTML = ContactsList(userProfile.contacts);
  }

  if (statsCardsElement) {
    statsCardsElement.innerHTML = StatsCard({
      totalContacts: userProfile.contacts.length,
      totalFavorites: userProfile.totalFavorites,
      totalEmergency: userProfile.totalEmergency,
    });
  }

  if (favoritesEmergencyCardElement) {
    favoritesEmergencyCardElement.innerHTML =
      FavoritesCard({
        totalFavorites: userProfile.totalFavorites,
        contacts: userProfile.contacts,
      }) +
      EmergencyCard({
        totalEmergency: userProfile.totalEmergency,
        contacts: userProfile.contacts,
      });
  }
  if (allContactsHeaderElement) {
    allContactsHeaderElement.innerHTML = AllContactsHeader(
      userProfile.contacts.length
    );
  }

  if (userProfileElement) {
    console.log(userProfileElement);
    userProfileElement.innerHTML = UserProfileCard(userProfile.avatar);
  }
  return userProfile;
}

export function getBlobUrl(file) {
  return URL.createObjectURL(file);
}

export function searchContacts(val) {
  var userProfile = getUserProfile();
  var contacts = userProfile.contacts;
  var contactListElement = document.getElementById("contacts-list");

  if (!val) {
    contactListElement.innerHTML = ContactsList(contacts);
    return;
  }
  var searchResults = [];
  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].fullName.toLowerCase().includes(val.toLowerCase()) ||
      contacts[i].phoneNumber.toLowerCase().includes(val.toLowerCase()) ||
      contacts[i].email.toLowerCase().includes(val.toLowerCase())
    ) {
      searchResults.push(contacts[i]);
    }
  }
  contactListElement.innerHTML = ContactsList(searchResults);
}

function openContactModal() {
  var modalEl = document.getElementById("exampleModal");
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

export function closeModal() {
  var modalEl = document.getElementById("exampleModal");
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.hide();
}

export function checkFiredElement(el) {
  console.log(el.dataset.firedElement);
}

export function openUserModal() {
  var modalEl = document.getElementById("userModal");
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
  onOpenUserModal();
}

export function onOpenUserModal() {
  var userProfile = getUserProfile();
  document.getElementById("userFirstName").value = userProfile.firstName;
  document.getElementById("userLastName").value = userProfile.lastName;
  document.getElementById("userEmail").value = userProfile.email;
  document.getElementById("userPhoneNumber").value = userProfile.phoneNumber;
}

export function onEditUserProfile() {
  var userProfile = getUserProfile();
  var btn = document.getElementById("editUserProfileBtn");
  var mode = btn.dataset.mode;
  if (mode === "edit") {
    setDisabled(false);
    btn.innerText = "Save Profile";
    btn.dataset.mode = "save";
  } else if (mode === "save") {
    userProfile.firstName = document.getElementById("userFirstName").value;
    userProfile.lastName = document.getElementById("userLastName").value;
    userProfile.email = document.getElementById("userEmail").value;
    userProfile.phoneNumber = document.getElementById("userPhoneNumber").value;
    updateUserProfile(userProfile);
    setDisabled(true);
    btn.innerText = "Edit Profile";
    btn.dataset.mode = "edit";
    fireAlert({
      type: "success",
      message: "Profile updated successfully",
    });
    updateUserProfile(userProfile);
  }
}

export function onChangeUserImg(file) {
  var userProfile = getUserProfile();
  userProfile.avatar = getBlobUrl(file);
  console.log(document.getElementById("userImage"));
  document.getElementById("userImage").src = userProfile.avatar;
}
// helper Function

function setDisabled(disabled) {
  var fields = [
    "userFirstName",
    "userLastName",
    "userEmail",
    "userPhoneNumber",
    "userImg",
  ];
  for (var i = 0; i < fields.length; i++) {
    document.getElementById(fields[i]).disabled = disabled;
  }
}
