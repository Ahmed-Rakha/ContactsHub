function ConfirmDeletionContactDialog() {
  return `
 <template id="confirm-deletion-contact-dialog">
      <swal-title> Delete Contact?</swal-title>
      <swal-html class="swal-html">Are you sure you want to delete dfs? This action cannot be undone.</swal-html>
      <swal-icon type="warning" color="#F8BB86"></swal-icon>
      <swal-button type="confirm" color="red"> Yes, delete it! </swal-button>
      <swal-button type="cancel"> Cancel </swal-button>
      <swal-param name="allowEscapeKey" value="false" />
      <swal-param name="customClass" value='{ "popup": "my-popup" }' />
      <swal-function-param name="didOpen" value="popup => console.log(popup)" />
</template>
    `;
}

export default ConfirmDeletionContactDialog;
