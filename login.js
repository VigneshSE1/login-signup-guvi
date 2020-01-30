$(document).ready(function () {
    $("#email_error").hide();
    $("#login_password_error").hide();
    $("#show_password_id").click(function (event) {
        event.preventDefault();
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
            console.log(JSON.parse(this.responseText)
            )
        }
    }
    xhttp.open("POST", "http://localhost:3000/login", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(loginInput));


})
