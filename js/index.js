import App from "../src/App.js";

document.getElementById("root").innerHTML = App();

// var usersData = {
//   users: [
//     {
//       firstName: "Ahmed",
//       lastName: "Hassan",
//       email: "ahmed.hassan@example.com",
//       phoneNumber: "+201112223334",
//       totalFavorites: 1,
//       totalEmergency: 1,
//       contactsCount: 2,
//       contacts: [
//         {
//           firstName: "Mona",
//           lastName: "Adel",
//           email: "mona.adel@example.com",
//           phoneNumber: "+201556677889",
//           notes: "Work colleague from the IT department.",
//           isFavorite: true,
//           isEmergency: false,
//         },
//         {
//           firstName: "Omar",
//           lastName: "Sherif",
//           email: "omar.sherif@example.com",
//           phoneNumber: "+201998877665",
//           notes: "Old school friend.",
//           isFavorite: true,
//           isEmergency: true,
//         },
//       ],
//     },
//     {
//       firstName: "Sara",
//       lastName: "Mahmoud",
//       email: "sara.mahmoud@example.com",
//       phoneNumber: "+201223344556",
//       totalFavorites: 1,
//       totalEmergency: 1,
//       contacts: [
//         {
//           firstName: "Laila",
//           lastName: "Khaled",
//           email: "laila.khaled@example.com",
//           phoneNumber: "+201334455667",
//           notes: "Gym trainer.",
//           isFavorite: true,
//           isEmergency: true,
//         },
//         {
//           firstName: "Hany",
//           lastName: "Sami",
//           email: "hany.sami@example.com",
//           phoneNumber: "+201778899001",
//           notes: "Cousin.",
//           isFavorite: true,
//           isEmergency: true,
//         },
//       ],
//     },
//     {
//       firstName: "Youssef",
//       lastName: "Kamal",
//       email: "youssef.kamal@example.com",
//       phoneNumber: "+201665544332",
//       totalFavorites: 1,
//       totalEmergency: 1,
//       contacts: [
//         {
//           firstName: "Nour",
//           lastName: "Hassan",
//           email: "nour.hassan@example.com",
//           phoneNumber: "+201909080707",
//           notes: "University project teammate.",
//           isFavorite: false,
//           isEmergency: false,
//         },
//         {
//           firstName: "Tamer",
//           lastName: "Ragab",
//           email: "tamer.ragab@example.com",
//           phoneNumber: "+201600700800",
//           notes: "Neighbor.",
//           isFavorite: true,
//           isEmergency: true,
//         },
//       ],
//     },
//   ],
// };

// localStorage.setItem("userProfile", JSON.stringify(usersData.users[0]));

function getUserProfile() {
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  recalculateUserStats(userProfile);
  return userProfile;
}
function addNewContact(userProfile, newContact) {
  userProfile.contacts.push(newContact);
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

function removeContact(userProfile, contactIndex) {
  userProfile.contacts.splice(contactIndex, 1);
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

function recalculateUserStats(userProfile) {
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

function removeContactFromEmergencyList(userProfile, contactIndex) {
  userProfile.contacts[contactIndex].isEmergency = false;
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

function removeContactFromFavoriteList(userProfile, contactIndex) {
  userProfile.contacts[contactIndex].isFavorite = false;
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

function addContactToEmergencyList(userProfile, contactIndex) {
  userProfile.contacts[contactIndex].isEmergency = true;
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

function addContactToFavoriteList(userProfile, contactIndex) {
  userProfile.contacts[contactIndex].isFavorite = true;
  recalculateUserStats(userProfile);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  getUserContacts();
  return userProfile;
}

// recalculateUserStats(usersData.users[1]);
// console.log(usersData.users[1]);

var nameRegex = /^[a-zA-Z]{3,50}$/;
var emailRegex = /[a-z0-9A-Z_\.\+]+@[a-zA-Z.-]+/;
var phoneRegex = /01(0|1|2|5)\d{8}/;
