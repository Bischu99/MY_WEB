// Aonload = function () {
//     const buttonLogin = document.getElementById("login");
//     const buttonLoginSelf = document.getElementById("loginSelf");
//     const modal = document.querySelector(".modal");
//     const overlay = document.querySelector(".overlay");
//     const content = document.querySelector(".content");

//     const openmodal = () => {
//         modal.classList.remove("hidden");
//     }

//     const closeModal = () => {
//         modal.classList.add("hidden");
//     }
//     buttonLogin.addEventListener("click",openmodal);
//     buttonLoginSelf.addEventListener("click",closeModal);
//     overlay.addEventListener("click",closeModal);
// }


const buttonLogin = document.getElementById("login");
const buttonLoginSelf = document.getElementById("loginSelf");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const content = document.querySelector(".content");

const openmodal = () => {
    modal.classList.remove("hidden");
}

const closeModal = () => {
    modal.classList.add("hidden");
}
buttonLogin.addEventListener("click",openmodal);
buttonLoginSelf.addEventListener("click",closeModal);
overlay.addEventListener("click",closeModal);