const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginSlider = document.querySelector("label.login");
const registerSlider = document.querySelector("label.register");
const registerLink = document.querySelector("form .register-link a");

// LOGIN
const emailInput = document.getElementById("input-email");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("login-btn");

// REGISTER
const nameInputRegister = document.getElementById("register-name");
const lastNameInputRegister = document.getElementById("register-lastName");
const ageInputRegister = document.getElementById("register-age");
const emailInputRegister = document.getElementById("register-email");
const passwordInputRegister = document.getElementById("register-password");
const newPasswordInputRegister = document.getElementById("register-newPassword");
const registerBtn = document.getElementById("register-btn");

const baseURL = "https://back-sandbox.herokuapp.com/api";


/*------------
    Slider
-------------*/

registerSlider.onclick = (()=>{
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});

loginSlider.onclick = (()=>{
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});

registerLink.onclick = (()=>{
    registerBtn.click();
    return false;
});



/*------------
    Login
-------------*/

const onLogin = async (e) => {

    e.preventDefault();

    const body = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        
        const response = await fetch(baseURL + "/auth/login", {

            headers: {
                "Content-Type" : "application/json",
            },
            method: "POST",                 
            body: JSON.stringify(body)
        });

        const json = await response.json();
        const token = json.token;
        console.log(token);        
        
        // Validamos la respuesta del back
        if (response.status === 200){ 
            window.localStorage.setItem('token', token);
            onGetUser(token);            
        }
        // Email o contrase??a incorrectos
        else { 
            showMessage("ErrorMessage");
        }

    } catch(error) {
        alert("Login Error: " + error);
    }
}


// Obtenemos los datos del usuario
const onGetUser = async (token) => {   

    try {        
        const response = await fetch(baseURL + "/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`                
            }              
        });

        const json = await response.json();
        window.localStorage.setItem('username', json.data.name);     
        onRedirect();                   

    } catch(error) {
        alert("User info error: " + error);
    }
}


/*------------
    Register
-------------*/

const onRegister = async (e) => {

    e.preventDefault();

    // validamos contrase??a para continar con el fetch
    if (passwordInputRegister.value === newPasswordInputRegister.value){

        const payload = {
            email: emailInputRegister.value,
            password: passwordInputRegister.value,
            name: nameInputRegister.value,
            lastName: lastNameInputRegister.value,
            age: Number(ageInputRegister.value),
        };
    
        try {
            
            const response = await fetch(baseURL + "/auth/register", {
                method: "POST",      
                headers: {
                    "Content-Type" : "application/json",
                },
    
                body: JSON.stringify(payload)
            });
    
            const json = await response.json();        
            console.log(json);     
            
            // Validamos la respuesta del back
            if (response.status != 500){ 
                showMessage("successMessage");
                emailInputRegister.value = "";
                passwordInputRegister.value = "";
                newPasswordInputRegister.value = "";
                nameInputRegister.value = "";
                lastNameInputRegister.value = "";
                ageInputRegister.value = ""; 
                console.log("registracion exitosa");
            }

            else if (response.status === 500){
                showMessage("ErrorMessage2");
                emailInputRegister.value = "";
                passwordInputRegister.value = "";
                newPasswordInputRegister.value = "";
                nameInputRegister.value = "";
                lastNameInputRegister.value = "";
                ageInputRegister.value = ""; 
                console.log("algo salio mal");
            } 
    
        } catch(error) {
            alert("Register Error: " + error);
        }                   
    }  
}


// Recargamos la pagina
const onRedirect = () => {
    window.location.assign("../index.html");
}



/*------------
    Messages
-------------*/

const showMessage = (type) => {
 
    var toastMessage = document.getElementById(type);
    var toast = new bootstrap.Toast(toastMessage);    
    toast.show();    
}


/*--------------
    Listeners
---------------*/

loginBtn.addEventListener("click", onLogin);
registerBtn.addEventListener("click", onRegister);

