var usersP = document.getElementById("usersP");
var table = document.getElementById("table")
var allUsers = ""
var allUsersObj = []
if(localStorage.length!==0 && localStorage.getItem("Users")!=="[]"){

    usersP.innerHTML = "All Users:"
    allUsers = localStorage.getItem("Users")//getting key from local storage
    allUsersObj = JSON.parse(allUsers)//parsing it to json object and storing in array

    //Loop for creating more rows in table
    for(var i = 0 ; i <= allUsersObj.length-1 ; i++){
        
        var row = table.insertRow()
        var cell = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var cell3 = row.insertCell(3)
        var button = document.createElement("BUTTON")
        var button1 = document.createElement("BUTTON")
        
        cell.className = "row"
        cell1.className = "row"
        cell2.className = "row"
        cell3.className = "row"
        
        cell.innerHTML = allUsersObj[i].fname
        cell1.innerHTML = allUsersObj[i].lname
        button.innerHTML = "Edit"
        button1.innerHTML = "Delete"

        cell2.appendChild(button)
        cell3.appendChild(button1)

        //providing individual ids to button by index
        var editname = "editbutton" + i
        var deletename = "deletebutton" + i
        button.setAttribute("id" , editname)
        button1.setAttribute("id" , deletename)
    
        //providing Bootstrap class attribute to delete button, because it looks good!
        button1.className = "btn btn-dark"

        //Using Bootstrap for opening modal for editing
        //So providing atrribute of bootstrap to button
        button.setAttribute("data-bs-toggle" , "modal")
        button.setAttribute("data-bs-target" , "#staticBackdrop")
        button.className = "btn btn-warning"

        button.addEventListener("click" , passValue)
        button1.addEventListener("click" , deleteFunction)

    }
}
else{
    usersP.innerHTML = "No Users in Database. Please Sign Up first!"
}

function editFunction(){
    var buttonId = this.id
    var i = buttonId.split("n").pop()
    //setting this in local storage for retrieving index of element on another page
    localStorage.setItem("EditItems" , i)
    //opening new window for editing
    var openWindow = window.open("editdetails.html","","width=400,height=400")
}

function deleteFunction(){
    //deleting the row from the array
    var buttonId = this.id
    var i = buttonId.split("n").pop()//spliting string into array from letter n and the using pop
    //to, which will delete the last part of array, but here we will store the last part of array
    //in our variable i which means the number will will act as index
    
    //Using perviously declared array allUsersObj here
    allUsersObj.splice(i,1)
    //deleting the previous values from local storage
    localStorage.removeItem("Users")
    //saving updated values in local storage
    localStorage.setItem("Users" , JSON.stringify(allUsersObj))
    //reloading page
    location.reload()
}

//function for getting value of id
var buttonIdpassValue//making global to use it in editData() function
function passValue(){
    buttonIdpassValue = this.id
    var i = buttonIdpassValue.split("n").pop()//spliting string into array from letter n and the using pop
    //to, which will delete the last part of array, but here we will store the last part of array
    //in our variable i which means the number will will act as index
    
    //showing this value in the email field of bootstrap modal
    var emailEditField = document.getElementById("emailEdit")
    
    var getEmailId = allUsersObj[i].email
    emailEditField.value = getEmailId
}

//code for editing details
//function for edit details
function editData(){
    var userDataJson = allUsersObj
    
    var userDataPosition = buttonIdpassValue.split("n").pop()//same as used in passValue() function

    var emailOfUser = document.getElementById("emailEdit").value; 
    var editfname = document.getElementById("fnameEdit")
    var editlname = document.getElementById("lnameEdit")
    var editpass = document.getElementById("passwordEdit")
    
    //deleting the values present at the index, which we want to edit
    //this will show null in array at that position
    delete userDataJson[userDataPosition]

    //storing new values with old email to this variable
    var updatedDetails = {"email":emailOfUser , "password":editpass.value , "fname":editfname.value , "lname":editlname.value}

    //storing the new values in array at the same position, in which we deleted in line 14, it will replace null
    userDataJson[userDataPosition] = updatedDetails
    
    //removing this to save it again with new array values
    localStorage.removeItem("Users")

    //saving it again with new values
    localStorage.setItem("Users" , JSON.stringify(userDataJson))

}