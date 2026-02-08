// 0. Importamos los objetos externos
import {Carrito } from "./carrito.js" 

// 1. Obtener los datos de la API.
// Nota: en este caso uso la carpeta local testAPI porque la pagina joblob no funciona.
let promProductos = await fetch("./testAPI/products.json");

// 2. Generar lista de Productos
// 3. Instanciar Carrito con la lista de productos

let productos = await promProductos.json()

let carrito = new Carrito(productos) 

function tiendaProductos(Carrito){
     // Genera los prodctos de la tienda 
}
// 4. 
function addProduct(id){
      const nodoGridProductos = document.querySelector('#grid-products');
      console.log(nodoGridProductos);

      /* Product */
      const nodoProduct = document.createElement('div');
      const nodoProductName = document.createElement("span");
      const nodoProductRef = document.createElement("span");

      nodoProduct.classList.add("product", "padding-rows");
      nodoProductName.classList.add("product-name", "bold");
      nodoProductRef.classList.add("product-ref");
      
      console.log(nodoGridProductos)
      nodoGridProductos.appendChild(nodoProduct);
      nodoProduct.appendChild(nodoProductName);
      nodoProduct.appendChild(nodoProductRef);
      
      /*Quantity*/ 
      const nodoQty = document.createElement('div');
      const nodoButtonMinus = document.createElement('button');
      const nodoQtyBox = document.createElement('div');
      const nodoQtyValue =  document.createElement('div');
      const nodoButtonPlus = document.createElement('button');

      nodoQty.classList.add("product", "padding-rows");
      nodoButtonMinus.classList.add("bttns-qty");
      nodoQtyBox.classList.add("qty-box");
      nodoButtonPlus.classList.add("bttns-qty");

      nodoGridProductos.appendChild(nodoQty);
      nodoQty.appendChild(nodoButtonMinus);
      nodoQty.appendChild(nodoQtyBox);
      nodoQtyBox.appendChild(nodoQtyValue);
      nodoQty.appendChild(nodoButtonMinus);
      
      //nodoButtonMinus.addEventListener('click',); // ToDo: decrementar cantidades
      //nodoButtonPlus.addEventListener('click',);  // ToDo: Incrementar cantidades
      
      /*Unity*/
      const nodoUnity = document.createElement('div');
      nodoUnity.classList.add("unity", "padding-rows");
      nodoGridProductos.appendChild(nodoUnity);
      //ToDo: Cantidad de productos.

      /*Total*/
      const nodoTotal = document.createElement('div');
      nodoTotal.classList.add("total", "padding-rows");
      nodoGridProductos.appendChild(nodoTotal);
      //ToDo: Actualizar valor total segun el valor de cantidad de productos

      /*Separator*/
      const nodoSeparator = document.createElement('div');
      nodoSeparator.classList.add("product-separator");
      nodoGridProductos.appendChild(nodoSeparator);
}
addProduct(1);
addProduct(1);
/*
  <div class="product padding-rows"> 
        <span class="product-name bold"> IFhone 13 Pro</span>
        <span class="product-ref"> Ref: 0K3QOSOV4V</span>
  </div>

  <div class="qty padding-rows"> 
        <button class="bttns-qty">-</button>
        <div id="qty-box">
            <div>3</div>
        </div>
        <button class="bttns-qty">+</button>
  </div>

  <div class="unity padding-rows">938,99€</div>
  <div class="total padding-rows">2816,97€</div>
  <div id="product-separator"></div>
*/