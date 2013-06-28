jQuery('document').ready(function ($) {
  // Populate values from local storage.
  printValues();
  // Update values when button is clicked.
  $('button.test').click(function () {
    getAeValue('http://juno.astroempires.com/account.aspx');
  })
})

function getAeValue(url) {
  xhr = new XMLHttpRequest();
  var params = "email="+localStorage['email']+"&pass="+localStorage['password']+"&navigator=Netscape&hostname="+localStorage['server']+"&javascript=false&post_back=false";
  xhr.onreadystatechange = ajaxResponse;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Content-length", params.length);
  xhr.send(params);   
}

function ajaxResponse() {
  if (this.readyState == this.DONE) {
    // Everything went ok.
    if (this.status == 200) {
      // Check if we have been asked to login.
      if (this.responseText.match(/<title>Login.*?<\/title>/i)) {
        console.log('Login required');
      }
      else {
        processAeValue(this.responseText);
      }
    }
    else {
      console.log('Status: ' + this.status);
    }
  }  
}

function processAeValue(response) {
  if ((credits = /<a id='credits'.*?([0-9,]+).*?<\/a>/ig.exec(response)) && (credits.length > 0)) {
    localStorage['credits'] = credits[1];
  }
  if ((income = /<td>[\s]*<b>Empire Income<\/b>[\s]*<\/td>[\s]*<td>([0-9,]+)/ig.exec(response)) && (income.length > 0)) {
    localStorage['income'] = income[1];
  }
  // Update the local storage to the ui.
  printValues();
}

function printValues() {
  jQuery('div.credits-value').html(localStorage['credits']);
  jQuery('div.income-value').html(localStorage['income'] + ' per hour');
}
