function email_onblur() {
    var userName = document.getElementById("email");
    if (userName.value.length > 0) {
        if (validateEmail(userName.value) == false) {
            lblUserNameMessage.style.display = "block";
            lblUserNameMessage.innerText = "Invalid email address.";
        } else {
            lblUserNameMessage.style.display = "none";
        }
    }
    else {
        lblUserNameMessage.style.display = "block";
        lblUserNameMessage.innerText = "Please enter a valid email address.";
    }
}

function password_onblur() {
    var password = document.getElementById("password");
    if (password.value.length > 0) {
        lblPasswordMessage.style.display = "none";
        lblUserNameMessage.innerText = "";
    }
    else {
        lblPasswordMessage.style.display = "block";
        lblPasswordMessage.innerText = "This field is required.";
    }
}

function validateForm() {

    var valid = true;

    var userName = document.getElementById("email");
    var password = document.getElementById("password");

    if (userName.value.length < 1) {
        lblUserNameMessage.style.display = "block";
        lblUserNameMessage.innerText = "Please enter a valid email address.";
        valid = false;
    } else {
        if (ValidateEmailAddress(userName.value) == false) {
            lblUserNameMessage.style.display = "block";
            lblUserNameMessage.innerText = "Invalid email address.";
            valid = false;
        }
    }

    if (password.value.length < 1) {
        lblPasswordMessage.style.display = "block";
        lblPasswordMessage.innerText = "This field is required.";
        valid = false;
    }

    return valid;
}