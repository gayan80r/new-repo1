$(document).ready(function () {
  loadItems();

  $("#itemForm").on("submit", function (e) {
    e.preventDefault();
    let id = $("#itemId").val();
    let name = $("#name").val();
    let description = $("#description").val();
    let action = id ? "update" : "create";

    $.ajax({
      url: "api.php",
      type: "POST",
      data: { action, id, name, description },
      success: function (response) {
        console.log(response);
        let result = JSON.parse(response);
        if (result.success) {
          $("#itemForm")[0].reset();
          $("#itemId").val("");
          loadItems();
        } else {
          alert("Error: " + result.error);
        }
      },
    });
    // console.log("1");
  });

  function loadItems() {
    $.ajax({
      url: "api.php",
      type: "POST",
      data: { action: "read" },
      success: function (response) {
        let items = JSON.parse(response);
        console.log(items);
        let rows = "";
        items.forEach((item) => {
          rows += `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.description}</td>
                            <td>
                                <button class="btn btn-info btn-edit" data-id="${item.id}" data-name="${item.name}" data-description="${item.description}">Edit</button>
                                <button class="btn btn-danger btn-delete" data-id="${item.id}">Delete</button>
                            </td>
                        </tr>
                    `;
        });
        $("#itemsTable").html(rows);
      },
    });
  }

  $(document).on("click", ".btn-edit", function () {
    let id = $(this).data("id");
    let name = $(this).data("name");
    let description = $(this).data("description");
    $("#itemId").val(id);
    $("#name").val(name);
    $("#description").val(description);
  });

  $(document).on("click", ".btn-delete", function () {
    if (confirm("Are you sure you want to delete this item?")) {
      let id = $(this).data("id");
      $.ajax({
        url: "api.php",
        type: "POST",
        data: { action: "delete", id },
        success: function (response) {
          let result = JSON.parse(response);
          if (result.success) {
            loadItems();
          } else {
            alert("Error: " + result.error);
          }
        },
      });
    }
  });
});
