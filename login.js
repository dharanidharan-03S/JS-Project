let emailInputElement=document.querySelector(".emailinput");
let passwordInputElement=document.querySelector(".passwordinput");
let signupButtonElement=document.querySelector(".signupbutton");
let emailNotFoundElement=document.querySelector(".emailnotfound")
let wrongPasswordElement=document.querySelector(".wrongpassword")
let usersDetailsArray=JSON.parse(localStorage.getItem("usersDetails"));


function passwordDecryption(password){
    let encryptedPassword="";
    for(let i=0;i<password.length;i++){
        if(password[i]==password[i].toUpperCase()){
            encryptedPassword+=String.fromCharCode(155-password.charCodeAt(i))
        }
        else if(password[i]==password[i].toLowerCase()){
            encryptedPassword+=String.fromCharCode(219-password.charCodeAt(i))
        }
        else{
            encryptedPassword+=password[i]
        }
    }
    return encryptedPassword;
}
let emailFound=false;
signupButtonElement.addEventListener("click",(event)=>{
    event.preventDefault()
    for(let user of usersDetailsArray){
        if(emailInputElement.value == user.email){
            emailFound=true;
            if(user.password===passwordDecryption(passwordInputElement.value)){
                localStorage.setItem("signIn",true)
                localStorage.setItem("emailId",emailInputElement.value);
                window.location.href="https://dharanidharans-9mzl75r7-8443.zcodecorp.in/HTML_CSS_DHARANIDHARAN/JS%20project/notes.html";
            }
            else{
                if(passwordInputElement.value===""){
                    wrongPasswordElement.textContent="Password is required";
                    wrongPasswordElement.classList.add("visibleclass");
                }
                else{
                    wrongPasswordElement.textContent="Incorrect password.Please try again";
                    wrongPasswordElement.classList.add("visibleclass");
                }
            }
        }
    }
    if(!emailFound){
        emailFound=false;
        emailNotFoundElement.textContent="Account not found.Please sign up first."
        emailNotFoundElement.classList.add("visibleclass");
    }
    if(emailInputElement.value==""){
        emailNotFoundElement.textContent="Email is required"
    }
})

emailInputElement.addEventListener("input",()=>{
    emailNotFoundElement.classList.remove("visibleclass");
})

passwordInputElement.addEventListener("input",()=>{
    wrongPasswordElement.classList.remove("visibleclass");
})