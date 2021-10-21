function saveData(){
    var fname = document.getElementById("fname")
    var lname = document.getElementById("lname")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var arr = []
    var arrJson = {}
    var arrStr = ""
    if(localStorage.getItem("Users")!==null){
        arrStr = localStorage.getItem("Users")
        arr = JSON.parse(arrStr)
        var checkEmail = false
        
        //filter will act here as for loop
        var emailExists = arr.filter(function(item){
            if(item.email === email.value){
                checkEmail = true
            }
            else{
                checkEmail = false
            }
        })
        if(checkEmail){
            alert("Email already exists!")
        }
        else{
            var newJson = {"email":email.value , "password":password.value , "fname":fname.value , "lname":lname.value}
            arr.push(newJson)
            localStorage.removeItem("Users")
            localStorage.setItem("Users" , JSON.stringify(arr))
            alert("Details Saved!")
        }
    }
    else{
        arrJson = {"email":email.value , "password":password.value , "fname":fname.value , "lname":lname.value}
        arr.push(arrJson)
        localStorage.setItem("Users" , JSON.stringify(arr))
        alert("Details Saved!")
    }
}