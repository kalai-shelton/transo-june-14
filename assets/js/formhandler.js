window.addEventListener("DOMContentLoaded", function() {    
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");

  let parameters = new URLSearchParams(window.location.search);
  //const urlParams = new URL(
      //  "https://transo.in/?utm_source=google&utm_medium=cpc&utm_campaign=FreightShipmentCargo-BMM_TrackMonitor&gclid=EAIaIQobChMI8dPwxpzt6gIVxNeWCh3vwA6NEAAYASAAEgIOqPD_BwE  "
      //);
  
  function success() {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Thanks! Contact form is submitted successfully.";
 
    var utm=parameters.get("utm_source");
      var med=parameters.get("utm_medium");
     
      if (parameters.has("gclid")) {
        var clickid= parameters.get("gclid");
      }
       else  if (parameters.has("li_fat_id")) {
        var clickid= parameters.get("li_fat_id");
      }
      else  if (parameters.has("fbclid")) {
        var clickid= parameters.get("fbclid");
      }
      else{
        clickid = "null"
      }

    document.getElementById('utmSrc').value=utm;
   document.getElementById('utmCamp').value=med;
   document.getElementById('clickId').value=clickid;

   
   console.log(utm);
    console.log(med);
    console.log(clickid);
    
 }

  function error() {
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
//var url="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  
  //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
      
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

