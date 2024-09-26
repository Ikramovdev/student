let elExit = document.querySelector(".exit-info")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

let student = JSON.parse(localStorage.getItem("student")) || []

let elAdminName = document.querySelector(".adminName").textContent = JSON.parse(localStorage.getItem("user")).username
let elInfoName = document.querySelector(".admininfoName").textContent = JSON.parse(localStorage.getItem("user")).username

function renderInfo(arr){
    arr.map(item => {
        let elStudentModal = document.createElement("div")
        elStudentModal.className = "flex justify-between p-5"
        elStudentModal.innerHTML = `
            <div class="flex items-center gap-[51px]">
                <img class="mt-0" src="${item.img}" width="210" height="220">
                <div class="mt-[50px] flex flex-col gap-[15px]">
                    <div class="flex flex-col">
                        <span class="font-montserrat font-bold text-[12px] leading-[15px] text-[#ACACAC;]">Name</span>
                        <p class="font-montserrat font-regular text-[16px] leading-[20px] text-black">${item.name}</p>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-montserrat font-bold text-[12px] leading-[15px] text-[#ACACAC;]">Email</span>
                        <p class="font-montserrat font-regular text-[16px] leading-[20px] text-black">${item.email}</p>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-montserrat font-bold text-[12px] leading-[15px] text-[#ACACAC;]">Phone</span>
                        <p class="font-montserrat font-regular text-[16px] leading-[20px] text-black">+${item.phone}</p>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-montserrat font-bold text-[12px] leading-[15px] text-[#ACACAC;]">admission</span>
                        <p class="font-montserrat font-regular text-[16px] leading-[20px] text-black">${item.dataAdmission}</p>
                    </div>
                </div>
            </div>
            <img class="mt-0" src="./images/info-arrow-img.svg" width="12" height="183">
        `
        elModalInner.appendChild(elStudentModal)
    });
}

renderInfo(student)

// exit admin part 

elExit.addEventListener("click",function(){
    elExit.children[0].classList.add("hidden")
    elExit.innerHTML = `
        <img src="./images/loading-yellow.png" alt="loading-yellow" width="30">`
    setTimeout(() =>{
         location.pathname = "./admin.html"
    },800);
})

// exit admin end 
