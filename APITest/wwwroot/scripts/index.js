$(document).ready(function () {
    getData();
})

function getData() {
    $.ajax({
        type: "GET",
        url: "/ListAllPerson",
        cache: false,
        success: function (data) {
            const tBody = $("#tbAll");

            $(tBody).empty();

            $.each(data, function (key, item) {

                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.id))
                    .append($("<td></td>").text(item.name))
                    .append($("<td></td>").text(item.email))
                    .append($("<td></td>").text(item.phone))
                    .append(
                        $("<td></td>").append(
                            $('<button class="btn btn-primary" >Edit</button>').on("click", function () {
                                window.location.href = "/edit.html?id=" + item.id;

                            })
                        ))
             

                tr.appendTo(tBody);
            });

            tbAll = data;
        }
    });
}