const navProfile = document.querySelector(".navprofile");
const submenu = document.querySelector(".sub-menu");
const down = document.querySelector("#down");

navProfile.addEventListener("click", () => {
    console.log('called 1 time');
    submenu.classList.toggle("show");
    down.classList.toggle("bx-chevron-up");
})

submenu.addEventListener('mouseleave', () => {
    if (submenu.classList.contains("show")) {
        down.classList.remove("bx-chevron-up")
        submenu.classList.remove('show', window.scrollY > 0)
    }
})

window.addEventListener('scroll', () => {
    if (submenu.classList.contains("show")) {
        down.classList.remove("bx-chevron-up")
        submenu.classList.remove('show', window.scrollY > 0)
    }
})

window.addEventListener('mouseup', () => {
    if (submenu.classList.contains("show")) {
        down.classList.remove("bx-chevron-up")
        submenu.classList.remove('show', window.scrollY > 0)
    }
})