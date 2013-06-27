jQuery('document').ready(function ($) {
  // Populate values from local storage.
  printValues();
  // Update values when button is clicked.
  $('button.test').click(function () {
    getAeValue('http://juno.astroempires.com/account.aspx');
  })
})

function getAeValue(url) {
  var xhr = new XMLHttpRequest();
  var params = "email="+localStorage['email']+"&pass="+localStorage['password']+"&navigator=Netscape&hostname="+localStorage['server']+"&javascript=false&post_back=false";
  xhr.onreadystatechange = function () {
    if (xhr.readyState == xhr.DONE) {
      if (xhr.status == 200) {
        processAeValue(url, xhr.responseText);
      }
      else {
        alert('Something went wrong.');
      }
    }
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Content-length", params.length);
  xhr.send(params);   
}

function processAeValue(url, response) {
  if (url == 'http://juno.astroempires.com/account.aspx') {
    credits = /<a id='credits'.*?([0-9,]+).*?<\/a>/ig.exec(response);
    income = /<td>[\s]*<b>Empire Income<\/b>[\s]*<\/td>[\s]*<td>([0-9,]+)/ig.exec(response);
    localStorage['credits'] = credits[1];
    localStorage['income'] = income[1];
  }
  // Update the local storage to the ui.
  printValues();
}

function printValues() {
  jQuery('div.credits-value').html(localStorage['credits']);
  jQuery('div.income-value').html(localStorage['income'] + ' per hour');
}
