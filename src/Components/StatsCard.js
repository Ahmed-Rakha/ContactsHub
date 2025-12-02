function StatsCard({ totalContacts, totalFavorites, totalEmergency }) {
  var content = "";
  var statsConfig = [
    {
      icon: "fa-solid fa-users",
      number: totalContacts,
      title: "Total",
    },
    { icon: "fa-solid fa-star", number: totalFavorites, title: "Favorites" },
    {
      icon: "fa-solid fa-heart-pulse",
      number: totalEmergency,
      title: "Emergency",
    },
  ];

  for (var i = 0; i < statsConfig.length; i++) {
    content += `
     <div class="col">
      <div class="inner">
        <div class="card custom-shadow rounded-4">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="icon-container icon-container-md bg-stats-card-icon-${
              i + 1
            }">
              <i class="${statsConfig[i].icon} text-white"></i>
            </div>
            <div>
              <p class="mb-0 text-muted text-uppercase">
                ${statsConfig[i].title}
              </p>
              <h5 class="fw-bold mb-0">${statsConfig[i].number}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  return content;
}

export default StatsCard;
