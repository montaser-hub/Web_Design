// Function to delete an event
function deleteEvent() {
  let btn = document.getElementById("deleteBtn");
  let id = btn.getAttribute("data-id");

  axios
    .delete("/events/delete/" + id)
    .then((res) => {
      console.log(res.data);
      alert("Event was deleted");
      window.location.href = "/events";
    })
    .catch((err) => {
      console.log(err);
    });
}

// Function to preview the uploaded image
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      let image = document.getElementById("imagePlaceholder");
      image.style.display = "block";
      image.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}
