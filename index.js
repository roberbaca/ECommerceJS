let cartList = [];  // array de objetos para guardar los productos
let token = null;
let username = null;

// declaramos el objeto 
let newProduct = {
    Name: "",
    Price: 0,
    Quantity: 1,
    Img: ""
};


// buscamos en el DOM
const checkoutButton = document.getElementById("checkoutButton");
const emptyCartButton = document.getElementById("emptyCartButton");
const addToCartButtons = document.getElementsByClassName("products-btn");   // todos los botones con esta clase
const list = document.getElementById("cart-list");
const totalAmount = document.getElementById("total-items");
const checkoutConfirmation = document.getElementById("cart-message");
const usernameID = document.getElementById("username");
const logoutButton = document.getElementById("logout");

//usernameID.innerText = "Login";

// agregamos los escuchadores de eventos
document.addEventListener("DOMContentLoaded", loadLocal); 
document.addEventListener("click", removeFromCart); 


for (let i = 0; i < addToCartButtons.length; i++) {
    let addButton = addToCartButtons[i];
    addButton.addEventListener("click", addToCart);
}

checkoutButton.addEventListener("click", proceedToCheckout);
logoutButton.addEventListener("click", logout);



/*-----------------
      FUNCIONES
-------------------*/


// funcion para agregar productos a la lista
function addToCart(e) {

    e.preventDefault();                 // evitamos de esta forma recargar la pagina al tocar el boton
    
    let cartItem = e.target.parentElement;
    let itemName = cartItem.getElementsByClassName("products-card-title")[0].innerText;              // obtengo nombre del producto
    let itemPrice = cartItem.getElementsByClassName("products-card-price")[0].innerText.slice(2);    // obtengo precio del producto
    let itemQuantity = cartItem.getElementsByClassName("products-inputBox")[0].value;                // obtengo cantidad del producto
    let itemImg = cartItem.getElementsByClassName("products-card-img")[0].src;                       // obtengo imagen del producto
    
    console.log("se agrego un item");   
    console.log(itemName);
    console.log(itemPrice);
    console.log(itemQuantity);

    newProduct = {
        Name: itemName,
        Price: itemPrice,
        Quantity: itemQuantity, 
        Img: itemImg      
    };    

    cartList.push(newProduct);         // aregamos un nuevo item al carrito        
    saveLocal(cartList);               // guardamos la lista en localStorage
    showTotalAmount(cartList);         // sumamos el precio de todos los items del carrito
    printList(cartList);               // llamamos a la funcion para renderizarlo en pantalla

    console.log(cartList);    
}


// funcion para borrar productos del carrito
function removeFromCart(e) {

    // podemos acceder a la propiedad id de los elementos que estamos clickeando
    if (e.target.id === "trashButton") {

        console.log("se elimino un item");                 
        const indexItem = e.target.parentElement.parentElement.attributes.key.value;     // accedemos al atributo key del padre del boton      
            
        // Usamos el metodo de arrays Splice, pasamos por parametro el indice donde comenzamos a borrar 
        // elementos y la cantidad de elementos a eliminar
        cartList.splice(indexItem, 1); 
        showTotalAmount(cartList);          // sumamos el precio de todos los items del carrito que quedaron   
        saveLocal(cartList);                // guardamos la lista             
        printList(cartList);                // renderizamos la lista
    }
      
    // eliminamos TODO el contenido guardado en local storage       
    if(e.target.id === "emptyCartButton"){ 
        cartList.splice(0, cartList.length);  
        checkoutConfirmation.innerText = "";     
        //removeLocal();  
        showTotalAmount(cartList);                     
        printList(cartList);
    }        
}

// funcion para calcular el valor total a pagar
function showTotalAmount(){
    
    let total = 0;

    cartList.forEach(cart => {
        total += cart.Price * cart.Quantity;
    });

    if (cartList.length > 0){
        totalAmount.innerText = `Total: $ ${(Math.round(total *100)/100).toFixed(2)}`;
    }
    else {
        totalAmount.innerText = ``;
    }
}



// funcion para mostrar en pantalla la lista
function printList(myArray) {
    
    list.innerHTML = `${myArray.map((value, index) =>
        `<div class="cart-item" key = ${index}>                    
            <div class="item-img">
                <img src="${value.Img}" alt="product-photo">
            </div>
            <div class = "item-description">
                <h3>${value.Name}</h3>
            </div>                     
            <div class = "item-quantity">
                <h3>${value.Quantity} kg</h3>
            </div>    
            <div class = "item-price">                
                <h3>${(Math.round(value.Price * value.Quantity * 100) /100).toFixed(2)}</h3>
            </div>   
            <div class = "trashButtonContainer">
                <button class="trashButton" id = "trashButton" type = "submit"><i class='fas fa-trash'></i></button>   
            </div>            
        </div>   `        
    ).join("")}`; 
}

function clearList() {
    list.innerHTML = "";
    usernameID.innerText = "Login";
}


// funcion para indicar que la compra se realizo con exito
function proceedToCheckout() {    
    if (cartList.length > 0 && token != null) {
        checkoutConfirmation.innerText = "Your purchase was succesful !";
    }

    if (token == null){
        alert("Please login with your account");
    }
}


function logout() {
    
    console.log("deslogueando");
    removeLocal();  
    window.location.assign("./index.html");
    //showTotalAmount(cartList);                     
    //printList(cartList);
    //window.localStorage.setItem('token', null);
    //window.localStorage.setItem('username', null);     
    //loadLocal();
    //clearList();
    //console.log(token);
    //console.log(username);
}


/*-----------------
    LOCAL STORAGE
-------------------*/

function saveLocal(myArray) {
 
    // localStorage solo puede guardar strings, para guardar arrays u objetos usamos JSON.stringify()
    
    if(token !== null ){
        window.localStorage.setItem('cartList', JSON.stringify(cartList));
    }
}


function loadLocal() {
    
    //console.log("valor " + localStorage.getItem("username"));

    if(localStorage.getItem("token") !== null){
        token = window.localStorage.getItem('token');               
    }  else {
        //clearList();
        //usernameID.innerText = "Login";
    }

    if(localStorage.getItem("username") !== null){   
        username =  window.localStorage.getItem("username");  
        usernameID.innerText = username;            
    }    

    if(localStorage.getItem("cartList") !== null && token !== null ){
        cartList = JSON.parse(window.localStorage.getItem('cartList'));
        printList(cartList);  
        showTotalAmount(cartList);
    } else {
        //clearList();
    }     
   
    //usernameID.innerText = "Login";
    
}

function removeLocal() {
    // borramos el contenido del local storage
    window.localStorage.clear();
}

