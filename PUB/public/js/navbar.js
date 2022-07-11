const navProfile = document.querySelector(".navprofile");
const submenu = document.querySelector(".sub-menu");

navProfile.addEventListener("click", () => {
    const nav = document.querySelector(".sub-menu");
    const down = document.querySelector("#down");
    nav.classList.toggle("show");
    down.classList.toggle("bx-chevron-up")
})

submenu.addEventListener('mouseleave', () => {
    if (submenu.classList.contains("show")) {
        const down = document.querySelector("#down");
        down.classList.remove("bx-chevron-up")
        submenu.classList.remove('show', window.scrollY > 0)
    }
})

window.addEventListener('scroll', () => {
    const navp = document.querySelector(".sub-menu");
    if (navp.classList.contains("show")) {
      const down = document.querySelector("#down");
      down.classList.remove("bx-chevron-up")
      navp.classList.remove('show', window.scrollY > 0)
    }
  })