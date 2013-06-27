

// Saves options to localStorage.
function save_options() {
  localStorage['server'] = jQuery('select#server').val();
  localStorage['email'] = jQuery('input#email').val();
  localStorage['password'] = jQuery('input#password').val();

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  jQuery('select#server').val(localStorage['server']);
  jQuery('input#email').val(localStorage['email']);
  jQuery('input#password').val(localStorage['password']);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);