let elExitAdmin = document.querySelector(".exit-admin")
let elStudentInfo = document.querySelector(".students-info")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elStudentList = document.querySelector(".student-tbody")
let elAddStudent = document.querySelector(".add-student")
let elSearchStudent = document.querySelector(".search-student")

let elAdminName = document.querySelector(".adminName").textContent = JSON.parse(localStorage.getItem("user")).username

let student = JSON.parse(localStorage.getItem("student")) || []



// Log Aut part  start

elExitAdmin.addEventListener("click",function(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.remove("w-[700px]")
    elModalInner.classList.add("w-[500px]")
    elModalInner.classList.remove("h-[500px]")
    elModalInner.classList.add("h-[300px]")
    elModalInner.innerHTML = `
        <p class="mx-[50px] mt-[100px] font-montserrat font-semibold text-[18px]">Are you sure you want to exit the admin panel?</p>
        <div class="flex items-center gap-[10px] p-5 mt-[100px]">
            <button onclick="handleLoginExitBtn()"class="login-aut-btn w-[49%] p-3 block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-lg">YES</button>
            <button onclick="handleLoginCancleBtn()"class="w-[49%] p-3 block mx-auto py-[6px] bg-green-500 text-white text-[20px] text-center font-bold rounded-lg">Cancel</button>
        </div>
        `
})
function handleLoginCancleBtn(){
    elModalWrapper.classList.add("scale-0")
    setTimeout(() => {
        elModalInner.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/loading-white.png" alt="loading-white" width="20" height="20">`
    }, 700);
}
function handleLoginExitBtn(){
    elLoginAutBtn = document.querySelector(".login-aut-btn")
    elLoginAutBtn.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/loading-white.png" alt="loading-white" width="20" height="20">`
    setTimeout(()=>{
        location.pathname = "./index.html"
    },1000);
}
// Log Aut part end



elStudentInfo.addEventListener("click",function(){
    elStudentInfo.children[0].classList.add("hidden")
    elStudentInfo.children[1].classList.add("hidden")
    elStudentInfo.innerHTML = `
        <img src="./images/loading-white.png" alt="loading-white" width="25" height="25">`
    setTimeout(() =>{
        elStudentInfo.innerHTML = `hech narsa yo'q 😜`
    },800);
})
// add part start 
elAddStudent.addEventListener("click",function(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
         <form class="add-student-form p-[41px]" autocomplete="off">
                <label class="block mb-[24px] cursor-pointer">
                    <input type="file" class="add-choose-input hidden" required>
                    <img class="add-choose-img mx-auto w-[250px] h-[150px] p-2 rounded-md" src="./images/person.svg" alt="person img" width="250" height="100">
                </label>
                <div class="flex justify-between">
                    <div class="w-[49%] space-y-4">
                        <input name="yourName" placeholder="Enter Your Name..." class="outline-none focus:shadow-md focus:shadow-gray-600 py-[13px] rounded-md pl-2   w-full cursor-pointer"></input>
                        <input type="text" class="outline-none focus:shadow-md focus:shadow-gray-600 py-3 rounded-md pl-2   w-full cursor-pointer" required name="yourEmal" placeholder="Enter Your Email...">
                    </div>
                    <div class="w-[49%] space-y-4">
                        <input name="yourPhoneNumber" placeholder="Enter Your Phone Number..." type="tel" class="outline-none focus:shadow-md focus:shadow-gray-600 py-[13px] rounded-md pl-2   w-full cursor-pointer"></input>
                        <input class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2   w-full" type="tel" name="yourEnrollNumber" placeholder="Enter Enroll Number...">
                    </div>
                </div>
                    <input type="date" class="w-[200px] mt-[10px] block mx-auto outline-none focus:shadow-md focus:shadow-gray-600 py-3 rounded-md px-2   cursor-pointer" required name="yourData" placeholder="Enter Your Email...">
                <button type="submit" class="w-full mt-[30px] py-[8px] bg-white text-yellow-400 text-[20px] text-center font-semibold rounded-lg">ADD STUDENT</button>
        </form>  
    `
    let elCHooseInput = document.querySelector(".add-choose-input")
    let elCHooseImg = document.querySelector(".add-choose-img")
    let elStudentForm = document.querySelector(".add-student-form")

    elCHooseInput.addEventListener("change", function(e){
        elCHooseImg.src = URL.createObjectURL(e.target.files[0])
        elCHooseImg.classList.remove("rounded-md")
        elCHooseImg.classList.add("rounded-[20px]")        
    })
    elStudentForm.addEventListener("submit",function(e){
        e.preventDefault()
        const data  = {
            id: student.length ? student[student.length -1].id + 1 : 1,
            img:elCHooseImg.src,
            name:e.target.yourName.value,
            email:e.target.yourEmal.value,
            phone:e.target.yourPhoneNumber.value,
            enrollnumber:e.target.yourEnrollNumber.value,
            dataAdmission:e.target.yourData.value,
        }
        e.target.lastElementChild.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading-yellow.png" alt="loading-yellow" width="35">`
        setTimeout(()=>{
            e.target.lastElementChild.innerHTML = "ADD STUDENT"
            student.push(data)
            elModalWrapper.classList.add("scale-0")
            localStorage.setItem("student", JSON.stringify(student))    
            renderStudent(student)
       },1000)
    })
})
// add part end 

// modal hide start 
elModalWrapper.addEventListener("click",(e) => {
    if(e.target.id == "wrapper") {
        elModalWrapper.classList.add("scale-0")
        setTimeout(() => {
            elModalInner.className = "modal-inner w-[700px] h-[500px] bg-yellow-400 absolute top-0 bottom-0 right-0 left-0 m-auto rounded-lg"; 
        }, 800);
    }
});
// modal hide start 

// render student start 
function renderStudent(arr){ 
    arr.innerHTML = null ;
    elStudentList.innerHTML = null;
    arr.forEach(item =>{
            let elStudentRaw = document.createElement("tr")
            elStudentRaw.className = "bg-white"
            elStudentRaw.innerHTML = `
                <td class="rounded-tl-md rounded-bl-md p-4">
                    <img class="rounded-md" src="${item.img}" alt="student-image" width="65" height="65">
                </td>
                <td>
                    <p class="text-[12px] leading-[14px] text-[#A6A6A6] text-black "">${item.name}</p>
                </td>
                <td> 
                    <a class="inline-block font-montserrat font-regular text-[14px] leading-[17px]" href="mailto:${item.email}">${item.email}</a>
                </td>
                <td>
                    <a class="inline-block font-montserrat font-regular text-[14px] leading-[17px]" href="tel:+${item.phone}">+${item.phone}</a>
                </td>
                <td>
                   <a class="inline-block font-montserrat font-regular text-[14px] leading-[17px]" href="tel:+${item.enrollnumber}">${item.enrollnumber}</a>
                </td>
                <td>
                    <p class="inline-block font-montserrat font-regular text-[14px] leading-[17px]">${item.dataAdmission}</p>
                </td>
                <td class="rounded-tr-md rounded-br-md">
                <div>
                    <button class="more-btn hover:scale-[1.4] duration-300 mr-[15px]">
                        <img src="./images/more.svg" width="20" height="5">
                    </button>
                     <button onclick="handleEditBtn(${item.id})" class="hover:scale-[1.4] duration-300  mr-[15px]">
                        <img src="./images/edit.svg" width="20" height="20">
                    </button>
                     <button onclick="handleDeleteBtn(${item.id})" class="hover:scale-[1.4] duration-300">
                        <img src="./images/garbage.svg" width="18" height="18">
                    </button>
                   
                </div>
                </td>
            `
            elStudentList.appendChild(elStudentRaw)
    })
    let elMoreBtn = document.querySelector(".more-btn")

    // more btn part 
    elMoreBtn.addEventListener("click",function(e){
        elMoreBtn.innerHTML = `
        <img src="./images/loading-yellow.png" alt="loading-yellow" width="20" height="20">`
        setTimeout(() =>{
            location.pathname = "./info.html"
        },800);
    })
    // more btn end 
}

// render student end
renderStudent(student)


// edit part start 
function handleEditBtn (id){
    elModalWrapper.classList.remove("scale-0")
    const findedObj = student.find(item => item.id == id)
    elModalInner.innerHTML = `
    <form class="edit-student-form p-[41px]" autocomplete="off">
        <label class="block mb-[24px] cursor-pointer">
            <input type="file" class="edit-choose-input hidden" required>
            <img class="edit-choose-img mx-auto w-[250px] h-[150px] p-2 rounded-md" src="${findedObj.img}" alt="person img" width="250" height="100">
        </label>
        <div class="flex justify-between">
            <div class="w-[49%] space-y-4">
                <input value="${findedObj.name}" name="yourName" placeholder="Enter Your Name..." class="outline-none focus:shadow-md focus:shadow-gray-600 py-[13px] rounded-md pl-2 w-full cursor-pointer">
                <input value="${findedObj.email}" type="text" class="outline-none focus:shadow-md focus:shadow-gray-600 py-3 rounded-md pl-2 w-full cursor-pointer" required name="yourEmal" placeholder="Enter Your Email...">
            </div>
            <div class="w-[49%] space-y-4">
                <input value="${findedObj.phone}" name="yourPhoneNumber" placeholder="Enter Your Phone Number..." type="tel" class="outline-none focus:shadow-md focus:shadow-gray-600 py-[13px] rounded-md pl-2 w-full cursor-pointer">
                <input value="${findedObj.enrollnumber}" class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2   w-full" type="tel" name="yourEnrollNumber" placeholder="Enter Enroll Number...">
            </div>
        </div>
        <input value="${findedObj.dataAdmission}" type="date" class="w-[200px] mt-[10px] block mx-auto outline-none focus:shadow-md focus:shadow-gray-600 py-3 rounded-md px-2 cursor-pointer" required name="yourData" placeholder="Enter Your Email...">
        <button type="submit" class="edit-btn w-full mt-[30px] py-[8px] bg-white text-yellow-400 text-[20px] text-center font-semibold rounded-lg">EDIT STUDENT</button>
    </form>
    `
    let elEditStudentForm = document.querySelector(".edit-student-form")
    let elEditChooseInput = document.querySelector(".edit-choose-input")
    let elEditChooseImg = document.querySelector(".edit-choose-img")

    elEditChooseInput.addEventListener("change",function(e){
        elEditChooseImg.src = URL.createObjectURL(e.target.files[0])
    })
    elEditStudentForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let elEditBtn = document.querySelector(".edit-btn");
        elEditBtn.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/loading-yellow.png" alt="loading-yellow" width="20" height="20">`;
    
        setTimeout(() => {
            // Edit qilingan qiymatlarni yangilash
            findedObj.img = elEditChooseImg.src;
            findedObj.name = e.target.yourName.value;
            findedObj.email = e.target.yourEmal.value;
            findedObj.phone = e.target.yourPhoneNumber.value;
            findedObj.enrollnumber = e.target.yourEnrollNumber.value;
            findedObj.dataAdmission = e.target.yourData.value;
    
            elModalWrapper.classList.add("scale-0");
            localStorage.setItem("student", JSON.stringify(student));
            renderStudent(student);
    
        }, 800);
    });
    
}
// edit part end 

// delete part start 

function handleDeleteBtn(id){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.remove("w-[700px]")
    elModalInner.classList.add("w-[500px]")
    elModalInner.classList.remove("h-[500px]")
    elModalInner.classList.add("h-[200px]")

    elModalInner.innerHTML = `
    <p class="mx-[50px] mt-[50px] font-montserrat font-semibold text-[18px]">Are you sure you want to delete the student?</p>
    <div class="flex items-center gap-[10px] p-5 mt-3">
            <button onclick="handleInfoDeleteBtn(${id})" class="delete-btn w-[49%] p-3 block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-lg">Delete</button>
            <button onclick="handleInfoCancleBtn()" class="w-[49%] p-3 block mx-auto py-[6px] bg-green-500 text-white text-[20px] text-center font-bold rounded-lg">Cancel</button>
     </div>
    `
    // elModalInner.innerHTML = `
    //     `
}
function handleInfoCancleBtn(){
    elModalWrapper.classList.add("scale-0")
    setTimeout(() => {
        elModalInner.innerHTML = "modal-inner w-[700px] h-[500px] bg-yellow-400 absolute top-0 bottom-0 right-0 left-0 m-auto rounded-lg"
    }, 700);
}
function handleInfoDeleteBtn(id){
    let elDeleteBtn = document.querySelector(".delete-btn")
    const deleteIndex = student.findIndex(item => item.id == id)
    const findedObj = student.find(item => item.id == id)

    elDeleteBtn.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/loading-white.png" alt="loading-white" width="20" height="20">`
    setTimeout(()=>{
        handleInfoCancleBtn()
        student.splice(deleteIndex, 1)
        renderStudent(student,findedObj)
        localStorage.setItem("student", JSON.stringify(student))
    },1000);
}

// delete part end 


// sort button part 

function handleSortBtnInfo(){
    student.sort((a, b) => a.name.localeCompare(b.name));
    renderStudent(student)
}
// sort button part 

// search student part
elSearchStudent.addEventListener("input", function(e) {
    const searchValue = e.target.value.toLowerCase(); 
    const filtreStudent = student.filter(item => item.name.toLowerCase().includes(searchValue)); 
    renderStudent(filtreStudent)
});
// search student part 
