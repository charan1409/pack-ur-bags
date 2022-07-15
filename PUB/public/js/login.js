let form = document.getElementById('log');

form.addEventListener('mousemove', (e) => {

  let x = (window.innerWidth / 2 - e.pageX) / 30;
  let y = (window.innerHeight / 2 - e.pageY) / 30;

  form.style.transform = 'rotateX(' + x * 0.6 + 'deg) rotateY(' + y * 0.6 + 'deg)'

});

form.addEventListener('mouseleave', function () {
  form.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

function showPassword(id1, id2) {
  const showpassword = document.getElementById(id1);
  const password = document.getElementById(id2);
  if (password.type === 'password') {
    password.setAttribute('type', 'text');
    showpassword.classList.add('fa-eye-slash');
    showpassword.classList.remove('fa-eye')
  } else {
    password.setAttribute('type', 'password');
    showpassword.classList.add('fa-eye');
    showpassword.classList.remove('fa-eye-slash')
  }
}

const errorCloseBtn = document.getElementById('error-close-btn');
errorCloseBtn.addEventListener('click',()=>{
  const errorBlock = document.getElementById('error-block');
    errorBlock.style.display = 'none';
})

function loginValidation() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('pas').value;
  if (!username || !password) {
    const errorMsg = document.getElementById('error-msg');
    const errorBlock = document.getElementById('error-block');
    errorBlock.style.display = 'grid';
    errorMsg.innerHTML = 'Please fill in all the fields';
    return false;
  } else {
    return true;
  }
}

function registerValidation() {
  const username = document.getElementById('sname').value;
  const mail = document.getElementById('smail').value;
  const password1 = document.getElementById('pas').value;
  const password2 = document.getElementById('pas2').value;
  console.log(password1 + " " + password2);
  if (!username || !mail || !password1 || !password2) {
    const errorMsg = document.getElementById('error-msg');
    const errorBlock = document.getElementById('error-block');
    errorBlock.style.display = 'grid';
    errorMsg.innerHTML = 'Please fill in all the fields';
    return false;
  } else if(password1 != password2){
    const errorMsg = document.getElementById('error-msg');
    const errorBlock = document.getElementById('error-block');
    errorBlock.style.display = 'grid';
    errorMsg.innerHTML = 'Please check your passwords';
    return false;
  } else if(password1.length < 6){
    const errorMsg = document.getElementById('error-msg');
    const errorBlock = document.getElementById('error-block');
    errorBlock.style.display = 'grid';
    errorMsg.innerHTML = 'password must have atleast 6 characters';
    return false;
  } else {
    return true;
  }
}