$(document).ready(function () {
    $("#email_error").hide();
    $("#login_password_error").hide();
    $("#show_password_id").click(function (event) {
        event.preventDefault();
        var type = $("#login_password").attr("type");
        if (type == "password") {
            $("#login_password").attr("type", "text");
        } else {
            $("#login_password").attr("type", "password");
        }

    })
});

$("#submit_id").click(function (event) {
    event.preventDefault();

    const loginInput = {

        email: $("#login_email").val(),
        password: $("#login_password").val(),

    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText)
            console.log(result);
            if (result.messsage == "emailNotExist") {
                $("#email_error").show();
            } else if (result.messsage == "loginSuccess") {

                console.log("login");
            } else if (result.messsage == "loginNotSuccess") {
                $("#login_password_error").show();
            }
        }
    }
    xhttp.open("POST", "http://localhost:3000/login", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(loginInput));


})
