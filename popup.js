jQuery('document').ready(function ($) {
  // Populate values from local storage.
  printValues();
  // Update values when button is clicked.
  $('button.test').click(function () {
    aeGetData();
  })
})

function ajaxRequest(url, type, params) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = ajaxResponse;
  xhr.open(type, url, true);
  // No post parameters exist, this may be a simple GET.
  if (null === params) {
    xhr.send();
  }
  else {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
} 

function aeLogin() {
  var params = "email="+localStorage['email']+"&pass="+localStorage['password']+"&navigator=Netscape&hostname="+localStorage['server']+"&javascript=false&post_back=false";
  ajaxRequest('http://juno.astroempires.com/login.aspx', 'POST', params);
}

function aeGetData() {
  ajaxRequest('http://juno.astroempires.com/account.aspx', 'GET');
}

function ajaxResponse() {
  if (this.readyState == this.DONE) {
    // Everything went ok.
    if (this.status == 200) {
      // Check if we have been asked to login.
      if (this.responseText.match(/<title>Login.*?<\/title>/i)) {
        console.log('Login required');
        aeLogin();
        aeGetData();
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
  if ((fleetSize = /<td>[\s]*<b>Fleet Size<\/b>[\s]*<\/td>[\s]*<td>([0-9,]+)/ig.exec(response)) && (fleetSize.length > 0)) {
    localStorage['fleetSize'] = fleetSize[1];
  }
  if ((technology = /<td>[\s]*<b>Technology<\/b>[\s]*<\/td>[\s]*<td>([0-9,]+)/ig.exec(response)) && (technology.length > 0)) {
    localStorage['technology'] = technology[1];
  }
  // Update the local storage to the ui.
  printValues();
}

function printValues() {
  jQuery('div.credits-value').html(localStorage['credits']);
  jQuery('div.income-value').html(localStorage['income'] + ' per hour');
  jQuery('div.fleetsize-value').html(localStorage['fleetSize']);
  jQuery('div.technology-value').html(localStorage['technology']);
}
