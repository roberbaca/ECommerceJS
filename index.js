let cartList = [];  // array de objetos para guardar los productos

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

// agregamos los escuchadores de eventos
document.addEventListener("DOMContentLoaded", loadLocal); 
document.addEventListener("click", removeFromCart); 

for (let i = 0; i < addToCartButtons.length; i++) {
    let addButton = addToCartButtons[i];
    addButton.addEventListener("click", addToCart);
}

checkoutButton.addEventListener("click", proceedToCheckout);




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
        removeLocal();  
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
        totalAmount.innerText = `Total: $ ${Math.round(total *100)/100}`;
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
                <h3>${value.Price * value.Quantity}</h3>
            </div>   
            <div class = "trashButtonContainer">
                <button class="trashButton" id = "trashButton" type = "submit"><i class='fas fa-trash'></i></button>   
            </div>            
        </div>   `        
    ).join("")}`; 
}


// funcion para indicar que la compra se realizo con exito
function proceedToCheckout() {    
    if (cartList.length > 0) {
        checkoutConfirmation.innerText = "Your purchase was succesful !";
    }
}


/*-----------------
    LOCAL STORAGE
-------------------*/

function saveLocal(myArray) {
 
    // localStorage solo puede guardar strings, para guardar arrays u objetos usamos JSON.stringify()
    window.localStorage.setItem('cartList', JSON.stringify(cartList));
}


function loadLocal() {
    if(localStorage.getItem("cartList") !== null){
        cartList = JSON.parse(window.localStorage.getItem('cartList'));
        printList(cartList);                 
    }           
}

function removeLocal() {
    // borramos el contenido del local storage
    window.localStorage.clear();
}


