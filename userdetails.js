$(document).ready(function () {
    $("#edit_User_Form").hide();
});

$("#edit_details").click(function () {
    $("#edit_User_Form").show();
})

var user = {
    email: "console@gmail.com"
}

function userdetails() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.message == "success") {
                var inp = result.data[0];
                uirender(inp);
            }

        }
    }
    xhttp.open("GET", "http://localhost:3000/userdetails", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(user));
}

function uirender(userdata) {
    $("#userinfo_firstname").text(userdata.firstname);
    $("#userinfo_lastname").text(userdata.lastname);
    $("#userinfo_dob").text(userdata.dob);
    $("#userinfo_gender").text(userdata.gender);
}

$("#submit_edit_form").click("submit", function (event) {
    event.preventDefault();

    var userinfo = {
        firstname: $("#edit_firstname_id").val(),
        lastname: $("#edit_lastname_id").val(),
        dob: $("#edit_dob_id").val(),
        gender: $("input[name = 'edit_gender']:checked").val()
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.message == "success") {
                var inp = result.data[0];
                uirender(inp);
            }

        }
    }
    xhttp.open("POST", "http://localhost:3000/edituserdetails", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(userinfo));


})