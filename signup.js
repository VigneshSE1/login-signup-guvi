

$(document).ready(function () {
    $("#email_error").hide();
    $("#password_error").hide();

    $("#show_password_id").click(function (event) {
        event.preventDefault();
        var type = $("#signup_password").attr("type");
        if (type == "password") {
            $("#signup_password").attr("type", "text");
            $("#signup_confirm_password").attr("type", "text");
        } else {
            $("#signup_password").attr("type", "password");
            $("#signup_confirm_password").attr("type", "password");
        }

    })
});
$("#submit_id").click(function (event) {
    event.preventDefault();

    const userInput = {
        firstname: $("#signup_firstname_id").val(),
        lastname: $("#signup_lastname_id").val(),
        email: $("#signup_email").val(),
        password: $("#signup_password").val(),
        confirmpassword: $("#signup_confirm_password").val(),
        dob: $("#dob_id").val(),
        gender: $("input[name = 'gender']:checked").val()
    }
    if (userInput.password == userInput.confirmpassword) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText)
                console.log(result);
                if (result.message == "emailExist") {
                    $("#email_error").show();
                }
                else {
                    window.location = "file:///D:/Capstone/login-signup/login.html"
                }

            }
        }
        xhttp.open("POST", "http://localhost:3000/register", true);

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhttp.send(JSON.stringify(userInput));

    }
    else {
        $("#password_error").show();
    }



})

