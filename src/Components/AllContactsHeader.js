function AllContactsHeader(totalContacts) {
  return `
     <article>
                  <h3 class="text-capitalize fw-bold mb-0">all contacts</h3>
                  <p class="text-muted mb-0">
                    Manage and organize your ${totalContacts} contact${
    totalContacts <= 1 ? "" : "s"
  }
                  </p>
                </article>
    `;
}

export default AllContactsHeader;
