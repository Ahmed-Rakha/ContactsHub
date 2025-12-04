import ContactsList from "../Components/ContactsList.js";
import StatsCard from "../Components/StatsCard.js";
import EmergencyCard from "../Components/EmergencyCard.js";
import FavoritesCard from "../Components/FavoritesCard.js";
import AllContactsHeader from "../Components/AllContactsHeader.js";
export function getUserProfile() {
  return JSON.parse(localStorage.getItem("userProfile"));
}
export function saveContact(newContact) {
  var userProfile = getUserProfile();
  userProfile.contacts.push(newContact);
  updateUserProfile(userProfile);
  return userProfile;
}

export function removeContact(contactIndex) {
  var userProfile = getUserProfile();
  userProfile.contacts.splice(contactIndex, 1);
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

  if (contactListElement) {
    contactListElement.innerHTML = ContactsList(userProfile);
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
