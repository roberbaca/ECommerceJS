const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginSlider = document.querySelector("label.login");
const registerSlider = document.querySelector("label.register");
const registerLink = document.querySelector("form .register-link a");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const emailInput = document.getElementById("input-email");
const passwordInput = document.getElementById("input-password");

const baseURL = "https://back-sandbox.herokuapp.com/api";
//let token = null;


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

const onLogin = async () => {

    const body = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        
        const response = await fetch(baseURL + "/auth/login", {
            method: "POST",      
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        });

        const json = await response.json();
        const token = json.token;
        console.log(token);
        
        
        if (response.status !== 200){ 
            throw new Error("Incorrect email or password");
        }else {
            window.localStorage.setItem('token', json.token);
            onGetUser(token);
            
        }

    } catch(error) {
        alert("Login Error" + error);
    }
}


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
        alert("Get user info error" + error);
    }
}



const onRedirect = () => {
    window.location.assign("../index.html");
}

loginBtn.addEventListener("click", onLogin);