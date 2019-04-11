function appFunction() {
    var x = document.getElementById("mydiv");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
document.getElementById("popupContent").innerHTML = "it works";

}