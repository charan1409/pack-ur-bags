let form = document.getElementById('log');

form.addEventListener('mousemove', (e) => {

  let x = (window.innerWidth / 2 - e.pageX) / 12;
  let y = (window.innerHeight / 2 - e.pageY) / 12;

  form.style.transform = 'rotateX(' + x*0.6 + 'deg) rotateY(' + y*0.6 + 'deg)'

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