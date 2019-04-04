

function addItem() {
    const item = {
        Name: $("#name").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val()
    };
    if (validateInsert()) {

        $.ajax({
            type: "POST",
            accepts: "application/json",
            url: "/CreatePerson",
            contentType: "application/json",
            data: JSON.stringify(item),
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Something went wrong!");
            },
            success: function (result) {
                alert("Sucess!!!");
                window.location.href = "/index.html";
            }
        });


    }

}

function validateInsert() {
    if ($("#name").val() == "") {
        alert("Please insert name.");
        $("#name").focus();
        return false;
    } else if ($("#email").val() == "") {
        alert("Please insert the e-mail.");
        $("#email").focus();
        return false;
    } else if ($("#phone").val() == "") {
        alert("Please insert the phone number.");
        $("#phone").focus();
        return false;
    }
    return true;
}
