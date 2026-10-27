localStorage.setItem("signIn",false)
let nameInputElement=document.querySelector(".nameinput");
let emailInputElement=document.querySelector(".emailinput");
let passwordInputElement=document.querySelector(".passwordinput");
let confirmPasswordInputElement=document.querySelector(".confirmpasswordinput");
let signupButtonElement=document.querySelector(".signupbutton");

let invalidEmailElement=document.querySelector(".invalidemail");
let invalideNameElement=document.querySelector(".invalidname");
let invalidePasswordElement=document.querySelector(".invalidpassword");
let invalidConfirmPasswordElement=document.querySelector(".invalidconfirmpassword");


let usersDetailsArray=[];
if(localStorage.getItem("usersDetails")==null){
    localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
}
usersDetailsArray=JSON.parse(localStorage.getItem("usersDetails"));

function ObjectCreator(name,email,password,signin){
    this.name=name;
    this.email=email;
    this.password=password;
    this.notes=[];
}

function passwordEncryption(password){
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


let valid=true;
let email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let upperCase=/[A-Z]/;
let lowercase=/[a-z]/;
let number=/[0-9]/;
let specialCharacter=/[^A-za-z0-9\s]/;
let nosapces=/^\S+$/;
signupButtonElement.addEventListener("click",(event)=>{
    event.preventDefault()
    if(nameInputElement.value===""){
        invalideNameElement.classList.add("visibleclass");
        return;
    }
    for(let user of usersDetailsArray){
        if(user.email==emailInputElement.value){
            valid=false;
            break
        }
    }
    if(!valid){
        valid=true;
        invalidEmailElement.textContent="Email already exits"
        invalidEmailElement.classList.add("visibleclass");
        return; 
    }
    if(emailInputElement.value==""){
        invalidEmailElement.classList.add("visibleclass");
        return;
    }
    if(!email.test(emailInputElement.value)){
        invalidEmailElement.textContent="Invalid Email"
        invalidEmailElement.classList.add("visibleclass");
        return; 
    }
    if(passwordInputElement.value===""){
        invalidePasswordElement.classList.add("visibleclass");
        return;
    }
    else if(passwordInputElement.value.length<8){
        invalidePasswordElement.textContent="Use atleast 8 characters"
        invalidePasswordElement.classList.add("visibleclass");
        return; 
    }
    else if(!upperCase.test(passwordInputElement.value)){
        invalidePasswordElement.textContent="Add atleast 1 uppercase letter"
        invalidePasswordElement.classList.add("visibleclass");
        return;
    }
    else if(!lowercase.test(passwordInputElement.value)){
        invalidePasswordElement.textContent="Add atleast 1 lowercase letter"
        invalidePasswordElement.classList.add("visibleclass");
        return;
    }
    else if(!number.test(passwordInputElement.value)){
        invalidePasswordElement.textContent="Add atleast 1 number"
        invalidePasswordElement.classList.add("visibleclass");
        return;
    }
    else if(!specialCharacter.test(passwordInputElement.value)){
        invalidePasswordElement.textContent="Add atleast 1 Special character"
        invalidePasswordElement.classList.add("visibleclass");
        return;
    }
    else if(!nosapces.test(passwordInputElement.value)){
        invalidePasswordElement.textContent="Password must not contain spaces"
        invalidePasswordElement.classList.add("visibleclass");
        return;
    }
    if(confirmPasswordInputElement.value===""){
        invalidConfirmPasswordElement.classList.add("visibleclass");
        return;
    }

    if(passwordInputElement.value==confirmPasswordInputElement.value){
        password=passwordEncryption(passwordInputElement.value);
        invalidEmailElement.textContent="";
        let userDetailsObject=new ObjectCreator(nameInputElement.value,emailInputElement.value,password);
        console.log(userDetailsObject);
        usersDetailsArray.push(userDetailsObject);
        localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
        window.location.href="https://dharanidharans-9mzl75r7-8443.zcodecorp.in/HTML_CSS_DHARANIDHARAN/JS%20project/login.html";
    }
    else{
        alert("Password do not match")
    }
})

nameInputElement.addEventListener("input",()=>invalideNameElement.classList.remove("visibleclass"))
emailInputElement.addEventListener("input",()=>invalidEmailElement.classList.remove("visibleclass"))
passwordInputElement.addEventListener("input",()=>invalidePasswordElement.classList.remove("visibleclass"))
confirmPasswordInputElement.addEventListener("input",()=>invalidConfirmPasswordElement.classList.remove("visibleclass"))







