function FavoritesCard({ totalFavorites, contacts }) {
  var content = "";
  if (totalFavorites > 0) {
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].isFavorite) {
        content += `
              <div class="d-flex align-items-center justify-content-between mb-3">
                  <div class="d-flex align-items-center gap-4">
                    <div
                      class="icon-container icon-container-md text-white bg-orange-500 d-flex align-items-center justify-content-center gap-3"
                    >
                      <span class="fw-bold fs-5">${contacts[i].fullName.charAt(
                        0
                      )}</span>
                    </div>
                    <div>
                      <h5 class="fw-bold mb-0">${contacts[i].fullName}</h5>
                      <p class="mb-0 text-muted small-p">${
                        contacts[i].phoneNumber
                      }</p>
                    </div>
                  </div>
                  <div
                    class="icon-container icon-container-sm bg-green-100 color-green-600"
                  >
                    <i class="fa-solid fa-phone"></i>
                  </div>
              </div>
          `;
      }
    }
  }
  return `
   <div class="card shadow-md rounded-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-4">
          <div
            class="icon-container icon-container-md text-white bg-orange-500 d-flex align-items-center justify-content-center gap-3"
          >
            <i class="fa-solid fa-star"></i>
          </div>
          <div>
            <h5 class="fw-bold mb-0">Favorites</h5>
            <p class="mb-0 text-muted small-p">
              Quick access to starred contacts
            </p>
          </div>
        </div>
      </div>

      <div class="card-footer">
        ${
          totalFavorites === 0
            ? `
        <p class="mb-0 text-muted small-p text-center p-3">No favorites yet</p>
        `
            : `
          ${content}

        `
        }
      </div>
    </div>
    `;
}

export default FavoritesCard;
