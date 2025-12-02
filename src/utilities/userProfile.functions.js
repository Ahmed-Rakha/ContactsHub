import ContactsList from "../Components/ContactsList.js";
import StatsCard from "../Components/StatsCard.js";
import EmergencyCard from "../Components/EmergencyCard.js";
import FavoritesCard from "../Components/FavoritesCard.js";
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

export function addContactToEmergencyList(userProfile, contactIndex) {
  userProfile.contacts[contactIndex].isEmergency = true;
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

export function addContactToFavoriteList(userProfile, contactIndex) {
  userProfile.contacts[contactIndex].isFavorite = true;
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
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
    console.log(favoritesEmergencyCardElement);
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

  return userProfile;
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
