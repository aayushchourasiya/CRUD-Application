var emailField = document.getElementById("emailEdit")
var userDataPosition = localStorage.getItem("EditItems")
var userData = localStorage.getItem("Users")
var userDataJson = JSON.parse(userData)
var emailOfUser = userDataJson[userDataPosition].email
emailField.value = emailOfUser

function editData(){
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

    //removing this because we don't want it to present everytime in localstorage
    localStorage.removeItem("EditItems")
    
    //removing this to save it again with new array values
    localStorage.removeItem("Users")

    //saving it again with new values
    localStorage.setItem("Users" , JSON.stringify(userDataJson))

    //refreshing the homepage, with new values
    

    //closing window after editing is finished
    window.close()
}