let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');


window.onscroll = () => {
  searchBtn.classList.remove('fa-times');
  searchBar.classList.remove('active');

}


searchBtn.addEventListener('click', () => {
  searchBtn.classList.toggle('fa-times');
  searchBar.classList.toggle('active');
});

function show(id) {
  let x = document.getElementById(id);
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

// function valid(){
//   let a = document.getElementById('dd');
//   let b = document.getElementById('ad');
//   console.log("called");
//   if((Date.parse(b))<(Date.parse(a))){
//     alert("invalid date");
//   } else{
//     console.log(a,b);
//   }
// }



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