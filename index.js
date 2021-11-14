// declaracion de variables
let cartList = [];  
let token = null;
let username = null;

let newProduct = {
    Name: "",
    Price: 0,
    Quantity: 1,
    Img: "",
    Category: ""
};


let productsList = [

    {
        Name: "Avocado",
        Price: 12.35,
        Quantity: 1,
        Img: "./assets/products/veg_fd_fgavcrdypk_z.jpg",
        Category: "Veggies"
    },

    {
        Name: "Banana",
        Price: 2.25,
        Quantity: 1,
        Img: "./assets/products/banana.jpg",
        Category: "Fruits"
    },

    {
        Name: "Blueberries",
        Price: 8.75,
        Quantity: 1,
        Img: "./assets/products/fru_pid_2210505_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Butternut Squash",
        Price: 0.59,
        Quantity: 1,
        Img: "./assets/products/fru_dmy_ea_31042_z.jpg",
        Category: "Veggies"
    },

    {
        Name: "Carrot",
        Price: 5.80,
        Quantity: 1,
        Img: "./assets/products/carrot.jpg",
        Category: "Veggies"
    },

    {
        Name: "Corn",
        Price: 4.30,
        Quantity: 1,
        Img: "./assets/products/corn.jpg",
        Category: "Veggies"
    },

    {
        Name: "Eggplant",
        Price: 6.47,
        Quantity: 1,
        Img: "./assets/products/egplnt_reg_z.jpg",
        Category: "Veggies"
    },

    {
        Name: "Grapes",
        Price: 0.58,
        Quantity: 1,
        Img: "./assets/products/fru_pid_2210734_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Kiwi",
        Price: 8.80,
        Quantity: 1,
        Img: "./assets/products/trp_kiwi_or_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Lemon",
        Price: 1.75,
        Quantity: 1,
        Img: "./assets/products/lemon.jpg",
        Category: "Fruits"
    },

    {
        Name: "Lettuce",
        Price: 2.60,
        Quantity: 1,
        Img: "./assets/products/lettuce.jpg",
        Category: "Veggies"
    },

    {
        Name: "Mango",
        Price: 7.63,
        Quantity: 1,
        Img: "./assets/products/trp_mango_tomat_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Melon",
        Price: 17.12,
        Quantity: 1,
        Img: "./assets/products/mln_hdw_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Onion",
        Price: 0.85,
        Quantity: 1,
        Img: "./assets/products/fru_dmy_ea_31031_z.jpg",
        Category: "Veggies"
    },

    {
        Name: "Orange",
        Price: 4.17,
        Quantity: 1,
        Img: "./assets/products/orng_navel_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Papaya",
        Price: 15.75,
        Quantity: 1,
        Img: "./assets/products/fru_pid_2210375_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Pear",
        Price: 0.75,
        Quantity: 1,
        Img: "./assets/products/fru_pid_2210850_z.jpg",
        Category: "Fruits"
    },

    {
        Name: "Pineapple",
        Price: 10.50,
        Quantity: 1,
        Img: "./assets/products/pineapple.jpg",
        Category: "Fruits"
    },


    {
        Name: "Potato",
        Price: 1.20,
        Quantity: 1,
        Img: "./assets/products/potato.jpg",
        Category: "Veggies"
    },

    {
        Name: "Radish",
        Price: 3.15,
        Quantity: 1,
        Img: "./assets/products/radish.jpg",
        Category: "Veggies"
    },

    {
        Name: "Red Apple",
        Price: 1.55,
        Quantity: 1,
        Img: "./assets/products/apple.jpg",
        Category: "Fruits"
    },

    {
        Name: "Red Pepper",
        Price: 2.69,
        Quantity: 1,
        Img: "./assets/products/pep_rdbell_z.jpg",
        Category: "Veggies"
    },

    {
        Name: "Tomatoes",
        Price: 2.23,
        Quantity: 1,
        Img: "./assets/products/tm_onthevine_z.jpg",
        Category: "Veggies"
    },  

    {
        Name: "Yellow Pepper",
        Price: 2.69,
        Quantity: 1,
        Img: "./assets/products/pep_yllwbell_z.jpg",
        Category: "Veggies"
    },  
];


// buscamos en el DOM
const checkoutButton = document.getElementById("checkoutButton");
const addToCartButtons = document.getElementsByClassName("products-btn");   // todos los botones con esta clase
const list = document.getElementById("cart-list");
const totalAmount = document.getElementById("total-items");
const checkoutConfirmation = document.getElementById("cart-message");
const usernameID = document.getElementById("username");
const logoutButton = document.getElementById("logout");
const logoutButtonMobile = document.getElementById("logoutMobile");
const filterButton = document.getElementById("select-filter");
const inputFilter = document.getElementById("input-filter");
const productsCardContainer = document.getElementById("products-card-container");  


// agregamos los escuchadores de eventos
document.addEventListener("DOMContentLoaded", loadLocal); 
document.addEventListener("click", removeFromCart); 
filterButton.addEventListener("change", filterProductsList);
inputFilter.addEventListener("Keyup change", searchProducts);
checkoutButton.addEventListener("click", proceedToCheckout);


/*-----------------
      FUNCIONES
-------------------*/

// funcion para renderizar la lista de productos:
function printProductsList(array) {
  
    productsCardContainer.innerHTML = `${array.map((value, index) =>
        `<div class="products-card" key = ${index}>                
            <h3 class = "products-card-title">${value.Name}</h3>   
            <h4 class = "products-category">${value.Category}</h4>                        
            <img class = "products-card-img" src="${value.Img}" alt="product">
            <h3 class = "products-card-price">$ ${(Math.round(value.Price*100)/100).toFixed(2)}</h3>                
            <div class = "products-input-container"> 
                <h3>Quantity: </h3>
                <input type="number" min = "1" value="1" class = "products-inputBox">
                <h3> /kg</h3>
            </div>    
            <button class="products-btn" id="products-btn" type = "submit">Add to cart</button>     
        </div>`        
    ).join("")}`; 

    for (let i = 0; i < addToCartButtons.length; i++) {
        let addButton = addToCartButtons[i];
        addButton.addEventListener("click", addToCart);
    }
}



// funcion para filtrar el listado de productos
function filterProductsList(e){
    
    const filterValue = e.target.value;    
    
    if(filterValue === "veggies"){
        veggiesList = productsList.filter(valor => valor.Category === "Veggies");
        printProductsList(veggiesList);
    }
     
    if(filterValue === "fruits"){
        fruitsList = productsList.filter(valor => valor.Category === "Fruits");
        printProductsList(fruitsList);
    }
      
    if(filterValue === "all"){        
        printProductsList(productsList);
    }         
}


// funcion para buscar productos con la barra de busqueda
function searchProducts(){
   
    const searchProduct = inputFilter.value.toUpperCase();
    const filteredList = productsList.filter(valor=>valor.Name.toUpperCase().includes(searchProduct));
    printProductsList(filteredList);
}


// funcion para agregar productos al carrito de compras
function addToCart(e) {

    e.preventDefault();  // evitamos de esta forma recargar la pagina al tocar el boton
    
    let cartItem = e.target.parentElement;
    let itemName = cartItem.getElementsByClassName("products-card-title")[0].innerText;              // obtengo nombre del producto
    let itemPrice = cartItem.getElementsByClassName("products-card-price")[0].innerText.slice(2);    // obtengo precio del producto
    let itemQuantity = cartItem.getElementsByClassName("products-inputBox")[0].value;                // obtengo cantidad del producto
    let itemImg = cartItem.getElementsByClassName("products-card-img")[0].src;                       // obtengo imagen del producto
    let itemCategory = cartItem.getElementsByClassName("products-category")[0].innerText;            // obtengo categoria del producto
    
    newProduct = {
        Name: itemName,
        Price: itemPrice,
        Quantity: itemQuantity, 
        Img: itemImg,
        Category: itemCategory      
    };    

    cartList.push(newProduct);         // aregamos un nuevo item al carrito        
    saveLocal(cartList);               // guardamos la lista en localStorage
    showTotalAmount(cartList);         // sumamos el precio de todos los items del carrito
    printCartList(cartList);           // llamamos a la funcion para renderizarlo en pantalla       
}


// funcion para borrar del carrito de compras
function removeFromCart(e) {

    // podemos acceder a la propiedad id de los elementos que estamos clickeando
    if (e.target.id === "trashButton") {
                     
        const indexItem = e.target.parentElement.parentElement.attributes.key.value;     // accedemos al atributo key del padre del boton      
            
        // Usamos el metodo de arrays Splice, pasamos por parametro el indice donde comenzamos a borrar 
        // elementos y la cantidad de elementos a eliminar
        cartList.splice(indexItem, 1); 
        showTotalAmount(cartList);          // sumamos el precio de todos los items del carrito que quedaron   
        saveLocal(cartList);                // guardamos la lista             
        printCartList(cartList);            // renderizamos la lista
    }
      
    // eliminamos TODO el contenido guardado en el carrito   
    if(e.target.id === "emptyCartButton"){ 
        cartList.splice(0, cartList.length);  
        checkoutConfirmation.innerText = "";     
        saveLocal(cartList);                
        showTotalAmount(cartList);                     
        printCartList(cartList);
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


// funcion para mostrar en pantalla el carrito de compras
function printCartList(myArray) {
    
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


// funcion para mostrar un mensaje indicando que la compra se realizo con exito
function proceedToCheckout() {    
    if (cartList.length > 0 && token != null) {
        checkoutConfirmation.innerText = "Your purchase was succesful !";
    }

    if (token == null){
        //alert("Please login with your account");
        showMessage("AccountError");
    }
}


// funcion para desloguearse
function logout() {
    
    console.log("deslogueando");
    removeLocal();  
    window.location.assign("./index.html");  
}


/*-----------------
    LOCAL STORAGE
-------------------*/

// funcion para guardar datos en localStorage
function saveLocal(myArray) {
 
    // localStorage solo puede guardar strings, para guardar arrays u objetos usamos JSON.stringify()    
    if(token !== null ){
        window.localStorage.setItem('cartList' + username, JSON.stringify(cartList));
    }
}

// funcion para cargar datos de localStorage
function loadLocal() {   
    

    if(localStorage.getItem('token') !== null){
        token = window.localStorage.getItem('token');
        logoutButton.addEventListener("click", logout); 
        logoutButtonMobile.addEventListener("click", logout);                     
    }  
    else {
        logoutButton.className = "hidden";
        logoutButtonMobile.className = "hidden";
    }

    if(localStorage.getItem('username') !== null){   
        username =  window.localStorage.getItem("username");  
        usernameID.innerText = username;            
    }    

    if(localStorage.getItem('cartList' + username) !== null && token !== null ){
        cartList = JSON.parse(window.localStorage.getItem('cartList' + username));
        printCartList(cartList);  
        showTotalAmount(cartList);
    }     
}


// funcion para borrar datos de localStorage
function removeLocal() {

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');  
}


/*------------
    Messages
-------------*/

const showMessage = (type) => {
 
    var toastMessage = document.getElementById(type);
    var toast = new bootstrap.Toast(toastMessage);    
    toast.show();    
}


// Renderizamos en el DOM el listado general de productos
printProductsList(productsList);