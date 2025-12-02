import AllContacts from "./Components/AllContacts.js";
import EmergencyCard from "./Components/EmergencyCard.js";
import FavoritesCard from "./Components/FavoritesCard.js";
import NavBar from "./Components/NavBar.js";
import Register from "./Components/Register.js";
import StatsCard from "./Components/StatsCard.js";
import {
  getUserProfile,
  recalculateUserStats,
} from "./utilities/userProfile.functions.js";
function App() {
  var isRegistered = JSON.parse(localStorage.getItem("isRegistered"));

  if (!isRegistered) {
    return Register();
  } else {
    var userProfile = getUserProfile();
    userProfile = recalculateUserStats(userProfile);
    return `
    <div className="App">
      <nav class="navbar navbar-expand-lg py-4">${NavBar()}</nav>
      <main class="py-5 bg-gray-100">
        <header>
          <div class="container">
            <div class="row row-cols-1 row-cols-md-3 gy-3 gy-md-0" id="stats-cards">${StatsCard(
              {
                totalContacts: userProfile.contacts.length,
                totalFavorites: userProfile.totalFavorites,
                totalEmergency: userProfile.totalEmergency,
              }
            )}</div>
          </div>
        </header>
        <section class="py-5">
          <div class="container">
            <div class="row">
              
             ${AllContacts(userProfile)}
              <div class="col-12 col-md-4" id="favorites-emergency">
                ${FavoritesCard({
                  totalFavorites: userProfile.totalFavorites,
                  contacts: userProfile.contacts,
                })}
                ${EmergencyCard({
                  totalEmergency: userProfile.totalEmergency,
                  contacts: userProfile.contacts,
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;
  }
}

export default App;
