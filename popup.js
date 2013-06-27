jQuery('document').ready(function ($) {
  $('button.test').click(function () {
    var xhr = new XMLHttpRequest();
    var params = "email="+localStorage['email']+"&pass="+localStorage['password']+"&navigator=Netscape&hostname="+localStorage['server']+"&javascript=false&post_back=false";
    xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
    xhr.open("POST", 'http://juno.astroempires.com/account.aspx', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", params.length);
    xhr.send(params);
  })
})

function handleStateChange() {
  if (this.readyState == this.DONE) {
    if (this.status == 200) {
      // success!
      credits = /<a id='credits'.*?([0-9,]+).*?<\/a>/ig.exec(this.responseText);
      jQuery('div.credits').html('Credits: ' + credits[1]);

      //console.log(this.response);
      return;
    }
    // something went wrong
    console.log(this.status);
  }
}
