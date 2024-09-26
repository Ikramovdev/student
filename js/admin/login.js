let elLoginForm = document.querySelector(".login-form")

elLoginForm.children[5] = "./register.html"

let registeredUser = JSON.parse(localStorage.getItem("registeredUser"))



elLoginForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username:e.target.username.value,
        password:e.target.password.value
    }
    elLoginForm.children[6].innerHTML = ` 
    <img class="scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading-white" width="35" height="35">
    `
    if(registeredUser){
        if(registeredUser.newusername == data.username && registeredUser.newpassword == data.password){
            localStorage.setItem("user",JSON.stringify(data))
            setTimeout(() =>location.pathname = "./admin.html",800);
        }
        else{
            setTimeout(() =>{
                elLoginForm.children[6].innerHTML = ` 
                <img class="scale-[1.4] mx-auto" src="./images/error.svg" alt="error" width="30" height="30">
                `
            },800);
            setTimeout(() =>{
                elLoginForm.children[6].innerHTML = `SIGN UP`
            },1600);
            
        }
    }
    else{
        if(data.username == "ikramovdev" && data.password == "123"){
            localStorage.setItem("user",JSON.stringify(data))
            setTimeout(() =>location.pathname = "./admin.html",800);
        }
        else{
            setTimeout(() =>{
                elLoginForm.children[6].innerHTML = ` 
                <img class="scale-[1.4] mx-auto" src="./images/error.svg" alt="error" width="30" height="30">
                `
            },800);
            setTimeout(() =>{
                elLoginForm.children[6].innerHTML = `SIGN UP`
            },1600);
        }  
    }
})