

$(document).ready(function () {
    $("#email_error").hide();
    $("#password_error").hide();
    $("#show_password_id").click(function (event) {
        event.preventDefault();
    })
    $("#show_confirm_password_id").click(function (event) {
        event.preventDefault();
    })
});
$("#submit_id").click(function (event) {
    event.preventDefault();

    const userInput = {

        email: $("#signup_email").val(),
        password: $("#signup_password").val(),
        confirmpassword: $("#signup_confirm_password").val(),
    }
    if (userInput.password == userInput.confirmpassword) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText)
                )
            }
        }
        xhttp.open("POST", "http://localhost:3000/register", true);

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhttp.send(JSON.stringify(userInput));

    }
    else {

    }



})







// document.getElementById("signupform").addEventListener("submit", function (evt) {
//     evt.preventDefault();
//     const userdata = {
//         firstname: document.getElementById("firstname").value,
//         lastname: document.getElementById("lastname").value,
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value,
//         confirmpassword: document.getElementById("confirmpassword").value,
//         gender: document.querySelector('input[name="gender"]:checked').value,
//         dob: document.getElementById("dob").value,
//     }
//     //console.log(userdata);
//     var xhttp = new XMLHttpRequest();


//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {

//             console.log(this.responseText);

//         }
//     }
//     xhttp.open("POST", "http://localhost:3000/register", true);


//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(JSON.stringify(userdata));
// })