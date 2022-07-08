let form = document.getElementById('log');

form.addEventListener('mousemove', (e) => {

  let x = (window.innerWidth / 2 - e.pageX) / 30;
  let y = (window.innerHeight / 2 - e.pageY) / 30;

  form.style.transform = 'rotateX(' + x * 0.6 + 'deg) rotateY(' + y * 0.6 + 'deg)'

});

form.addEventListener('mouseleave', function () {

  form.style.transform = 'rotateX(0deg) rotateY(0deg)';


});

const showPassword = document.querySelector('#show-pass');
const showPassword2 = document.querySelector('#show-pass2');
const password = document.querySelector('#pas');
const password2 = document.querySelector('#pas2');

showPassword.addEventListener('click', function (e) {
  if(password.type === 'password'){
    password.setAttribute('type', 'text');
    this.classList.add('fa-eye-slash');
    this.classList.remove('fa-eye')
  } else{
    password.setAttribute('type','password');
    this.classList.add('fa-eye');
    this.classList.remove('fa-eye-slash')
  }
});

showPassword2.addEventListener('click', function (e) {
  if(password2.type === 'password'){
    password2.setAttribute('type', 'text');
    this.classList.add('fa-eye-slash');
    this.classList.remove('fa-eye')
  } else{
    password2.setAttribute('type','password');
    this.classList.add('fa-eye');
    this.classList.remove('fa-eye-slash')
  }
});