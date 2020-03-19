function ShowSuccessMessage_OSS(message) {
    // Get the snackbar DIV
    var x = document.getElementById("divMessageSnackBar_OSS");

    // add the content 
    x.innerText = message;

    // Add the "show" class to DIV
    x.className = "show";

    // After 5 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2500);
}

function ShowErrorMessage_OSS(message) {
    // Get the snackbar DIV
    var x = document.getElementById("divErrorMessageBar_OSS");
    var c = document.getElementById("spanErrorMessageBarContent_OSS");
    
    // add the content 
    c.innerText = message;
    
    // Add the "show" class to DIV
    x.className = "show"; 
}

function CloseErrorMessageBar_OSS() {
    var x = document.getElementById("divErrorMessageBar_OSS");
    //x.className = x.className.replace("show", "");
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function ValidateEmailAddress_OSS(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
