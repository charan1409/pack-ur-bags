function myFunction() {
    console.log('resposive called');
    var x = document.getElementById("topnavbar");
    if (x.className === "topnav") {
      x.className += " active";
    } else {
      x.className = "topnav";
    }
  }