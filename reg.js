const form = document.getElementById("studentform");
const studenttable = document.getElementById("studenttable");
const addbutton = document.getElementById("addstudentbtn");
const reset = document.getElementById("resetstudentbtn");

let studentArray = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];
//returns empty array if there is no input
//if students is set by localstorage then returns the array with objects of entered student info

let editIndex = null;
//for editing the student info,

studentinfo();

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("studentname").value;
    const id = document.getElementById("studentid").value;
    const email = document.getElementById("studentemail").value;
    const contact = document.getElementById("studentcontact").value;

    const student = { name, id, email, contact};//object of the student info

    if(editIndex===null){//editIndex value remains null, it changes only when editbtn is clicked
        studentArray.push(student);
    }else{
        /*when editbtn is clicked the student info at that index get populated in input fields 
        and editIndex value is updated with that index number, now as the editIndex is not null
        the student info at studentArray[editIndex] will be updated with the info that is edited*/
        studentArray[editIndex]=student;
        editIndex = null;//once the edit is done the value of editIndex is updated to null
        addbutton.textContent="Add Student";
        reset.style.display="none";
    }
    localStorage.setItem("students", JSON.stringify(studentArray));
    /*as localstorage only allows to store string values, the student object valuse are converted to string by using JSON.stringify */
    form.reset();
    studentinfo();

})

reset.addEventListener("click",()=>{
    editIndex = null;
    form.reset();
    addbutton.textContent = "Add Student";
    reset.style.display = "none";
    location.reload();
})// after the editbtn event resetbtn appears on screen and when clicked it resets the form and the display is set to none;

function studentinfo(){
    studenttable.innerHTML="";
    studentArray.forEach((student, index)=>{
        const row = document.createElement("tr");
        row.innerHTML=`
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td class="actiontbtns">
            <button class="editbtn" onclick="editstudent(${index})">Edit</button>
            <button class="deletebtn" onclick="deletestudent(${index})">Delete</button>
        </td>
        `;
        studenttable.appendChild(row);//for every student object entered the innerHtml of row gets pushed into the studettable div in index.html
    });
}

editstudent=function(index){

    const student = studentArray[index];
    document.getElementById("studentname").value = student.name;
    document.getElementById("studentid").value = student.id;
    document.getElementById("studentemail").value = student.email;
    document.getElementById("studentcontact").value = student.contact;
    editIndex=index;

    addbutton.textContent="Update";
    reset.style.display="inline-block"//prior clicking editbtn, resetbtn display is set to none in html,after editbtn click event it appears on screen

}

deletestudent=function(index){
    studentArray.splice(index,1);
    /*deletebtn click event removes the student object at the index of deletestudent(at line 58)*/
    localStorage.setItem("students", JSON.stringify(studentArray));//studentArray is updated
    studentinfo();//displays the studentinfo in the table
    location.reload();
}