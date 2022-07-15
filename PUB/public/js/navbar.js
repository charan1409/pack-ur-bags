const navProfile = document.querySelector(".navprofile");
const submenu = document.querySelector(".sub-menu");
const down = document.querySelector("#down");

navProfile.addEventListener("click", () => {
    down.classList.toggle("bx-chevron-up");
    submenu.classList.toggle("show");
})

submenu.addEventListener('mouseleave', () => {
    if (submenu.classList.contains("show")) {
        down.classList.remove("bx-chevron-up")
        submenu.classList.remove('show')
    }
})

window.addEventListener('scroll', () => {
    if (submenu.classList.contains("show")) {
        down.classList.remove("bx-chevron-up")
        submenu.classList.remove('show', window.scrollY > 0)
    }
    return false;
})

// window.addEventListener('mouseup', () => {
//     if (submenu.classList.contains("show")) {
//         down.classList.toggle("bx-chevron-up")
//         submenu.classList.toggle('show', window.scrollY > 0)
//     }
//     return false;
// })