let elRegisterForm = document.querySelector(".register-form")

elRegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        newusername:e.target.newusername.value,
        newpassword:e.target.newpassword.value
    }
    elRegisterForm.children[5].innerHTML = ` 
    <img class="scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading-white" width="35" height="35">
    `
    localStorage.setItem("registeredUser", JSON.stringify(data))
    setTimeout(() =>location.pathname = "./index.html",800);  
})
