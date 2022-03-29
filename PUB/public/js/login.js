let form = document.getElementById('log');

form.addEventListener('mousemove', (e) => {

  let x = (window.innerWidth / 2 - e.pageX) / 12;
  let y = (window.innerHeight / 2 - e.pageY) / 12;

  form.style.transform = 'rotateX(' + x * 0.6 + 'deg) rotateY(' + y * 0.6 + 'deg)'

});

form.addEventListener('mouseleave', function () {

  form.style.transform = 'rotateX(0deg) rotateY(0deg)';


});

function login() {
  let x = document.getElementById("login");
  let y = document.getElementById("register");
  let z = document.getElementById("stat-btn")

  x.style.left = "0";
  y.style.left = "600px";
  z.style.left = "40px";
}

function register() {
  let x = document.getElementById("login");
  let y = document.getElementById("register");
  let z = document.getElementById("stat-btn")

  x.style.left = "-600px";
  y.style.left = "0";
  z.style.left = "270px";
}

function validate_email() {
  let email = document.getElementById("email").value;
  let log = document.getElementById("login");
  let pas = document.getElementById("pas").value;
  if (email == '') {
    alert("please enter ur email")
    log.action = ""
    return false
  }
  if (email.includes("@")) {
    console.log('Every Thing Fine')
    if (pas == '') {
      alert("please enter ur password")
      log.action = ""
    }
    return true
  }
  alert("bad email")
  log.action = ""

  return false
}

// function validation() {
//   let name = document.getElementById("sname").value;
//   let mail = document.getElementById("smail").value;
//   let pass = document.getElementById("spass").value;
//   let pass2 = document.getElementById("spass2").value;
//   let log = document.getElementById("register");


//   if (mail == '') {
//     alert("please enter ur name");
//     log.action = ""
//     return true
//   }

//   if (mail == '') {
//     alert("please enter ur email");    
//     return false
//   }

//   if (mail.includes("@")) {
//     console.log('Every Thing Fine');
//     if (pass == '') {
//       alert("please enter ur password for creating");
//       log.action = "register"
//     }
//     if (pass !== pass2){
//       alert("Please re-enter correct password");
//     }
//     return true
//   }

//   alert("bad email")
//     log.action = "register"


// }

// function validate(){
//   let a = document.getElementById('spass').value
//   let b = document.getElementById('spass2').value

//   let mail = document.getElementById("smail").value;
//   if (!(mail.includes("@"))) {
//     alert("bad email")

//   }


  // if (a != b){
  //   alert('Please re-enter the same password');
  //   return false;
  //   // document.getElementById("login").action = "";
  // }
// }