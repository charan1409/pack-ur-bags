const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
  navToggler.classList.toggle("active");
  const nav = document.querySelector(".links");
  nav.classList.toggle("open");
  if (nav.classList.contains("open")) {
    nav.style.left = '-88px';
  } else {
    nav.style.left = '-8888px';
  }
});

// navProfile.addEventListener("click", () => {
//   const nav = document.querySelector(".sub-menu");
//   const down = document.querySelector("#down");
//   nav.classList.toggle("show");
//   down.classList.toggle("bx-chevron-up")
// })

// submenu.addEventListener('mouseleave',() =>{
//   if (submenu.classList.contains("show")) {
//     const down = document.querySelector("#down");
//     down.classList.remove("bx-chevron-up")
//     submenu.classList.remove('show', window.scrollY > 0)
//   }
// })

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.links');
  if (nav.classList.contains("open")) {
    navToggler.classList.toggle("active");
    nav.style.left = '-888px';
    nav.classList.remove('open', window.scrollY > 0)
  }
})

function show(id) {
  let x = document.getElementById(id);
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}


// REVIEW
var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});