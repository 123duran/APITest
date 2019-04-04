$(document).ready(function () {
    getData();
})


function getData() {
    var params = new window.URLSearchParams(window.location.search);
    id = params.get('id');
    if (id === null) {
        window.location.href = "/index.html";
    } else {
        $.ajax({
            type: "GET",
            url: "/ListById/" + id,
            cache: false, error: function (jqXHR, textStatus, errorThrown) {
                window.location.href = "/index.html";
            },
            success: function (data) {
                if (data.id === null) {
                    window.location.href = "/index.html";
                } else {
                    $("#name").val(data.name);
                    $("#phone").val(data.phone);
                    $("#email").val(data.email);
                    $("#ID").val(data.id);
                }
            }
        });

    }
}

function validateEdit() {
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

function updateItem() {
    const item = {
        Name: $("#name").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        Id: $("#ID").val()
    };
    if (validateEdit()) {
        $.ajax({
            url: "/UpdatePerson/" + $("#ID").val(),
            type: "PUT",
            accepts: "application/json",
            contentType: "application/json",
            data: JSON.stringify(item),
            success: function (result) {
                alert("Sucess!");
                window.location.href = "/index.html";
            }
        });
    }

}

function deleteItem(id) {
    var result = confirm("Do want to delete?");
    if (result) {
        id = $("#ID").val();
        $.ajax({
            url: "/DeletePerson/" + id,
            type: "DELETE",
            success: function (result) {
                alert("Sucess!");
                window.location.href = "/index.html";
            }
        });
    }


}