/* https://www.youtube.com/watch?v=rGtNYW_DK44 */

let cartList = [];  // array de objetos para guardar los productos

// buscamos en el DOM
const checkoutButton = document.getElementById("checkoutButton");
const addToCartButtons = document.getElementsByClassName("products-btn");   // todos los botones con esta clase
//const trashButtons = document.getElementsByClassName("trashButton");        // todos los botones con esta clase
//const trashButtons = document.getElementById("trashButton");        // todos los botones con esta clase
const list = document.getElementById("cart-list");

//const filterButton = document.getElementById("filterToDo");



// Agregamos los escuchadores de eventos
document.addEventListener("DOMContentLoaded", loadLocal); // cargamos la lista
document.addEventListener("click", removeFromCart); // cargamos la lista

for (let i = 0; i < addToCartButtons.length; i++) {
    let addButton = addToCartButtons[i];
    addButton.addEventListener("click", addToCart);
}

/*
for (let i = 0; i < trashButtons.length; i++) {
    let removeButton = trashButtons[i];
    removeButton.addEventListener("click", removeFromCart);
}
*/

checkoutButton.addEventListener("click", proceedToCheckout);



//filterButton.addEventListener("change", filterList);



let newProduct = {
    Name: "",
    Price: 0,
    Quantity: 1,
    Img: ""
};




// funcion para agregar productos a la lista
function addToCart(e) {

    e.preventDefault();                 // evitamos de esta forma recargar la pagina al tocar el boton
    
    let cartItem = e.target.parentElement;
    let itemName = cartItem.getElementsByClassName("products-card-title")[0].innerText;     // obtengo nombre del producto
    let itemPrice = cartItem.getElementsByClassName("products-card-price")[0].innerText;    // obtengo precio del producto
    let itemQuantity = cartItem.getElementsByClassName("products-inputBox")[0].value;       // obtengo cantidad del producto
    let itemImg = cartItem.getElementsByClassName("products-card-img")[0].src;              // obtengo imagen del producto
    
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

    cartList.push(newProduct);         // lo agregamos al carrito        
    saveLocal(cartList);               // Guardamos la lista
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
        saveLocal(cartList);  // Guardamos la lista             
        printList(cartList);  // Renderizamos la lista
    }
      
    // eliminamos TODO el contenido guardado en local storage       
    if(e.target.id === "clearAllButton"){ 
        cartList.splice(0, cartList.length);       
        removeLocal();              
        printList(cartList);
    }        
}


// funcion para filtrar el listado

/*
function filterList(e){

    const filterValue = e.target.value;
    console.log("buscando...");
    console.log(filterValue);

    const taskStatus = newTask.Status;
    
    if(filterValue === "completed"){
        completedList = toDolist.filter(valor => valor.Status === "completed");
        printList(completedList);
    }
     
    if(filterValue === "uncompleted"){
        uncompletedList = toDolist.filter(valor => valor.Status === "uncompleted");
        printList(uncompletedList);
    }
      
    if(filterValue === "all"){        
        printList(toDolist);
    } 
}

*/



// funcion para mostrar en pantalla la lista
function printList(myArray) {
    
    list.innerHTML = `${myArray.map((valor, index) =>
        `<div class="cart-item" key = ${index}>                    
            <div class="item-img">
                <img src="${valor.Img}" alt="product-photo">
            </div>
            <div class = "item-description">
                <h3>${valor.Name}</h3>
            </div>                     
            <div class = "item-quantity">
                <h3>x ${valor.Quantity} kg</h3>
            </div>    
            <div class = "item-price">
                <h3>${valor.Price}</h3>
            </div>   
            <div class = "trashButtonContainer">
                <button class="trashButton" id = "trashButton" type = "submit"><i class='fas fa-trash'></i></button>   
            </div> 
        </div>   `        
    ).join("")}` 
}


// funcion para indicar que la compra se realizo con exito
function proceedToCheckout() {
    alert("compra realizada con exito");
    console.log("compra realizada");
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


