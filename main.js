// 0. Importamos los objetos externos
import {Carrito } from "./carrito.js" 

// 1. Obtener los datos de la API.
// Nota: en este caso uso la carpeta local testAPI porque la pagina joblob no funciona.
let promProductos = await fetch("./testAPI/products.json");

// 2. Obtener lista de Productos
let productos = await promProductos.json();

// 4. Instanciar Carrito con la lista de productos
let carrito = new Carrito(productos);
tiendaProductos(carrito);



// 5. Generar la tienda de productos 
function tiendaProductos(carrito){
      const nodoGridProductos = document.querySelector('#grid-products');
      const nodoContentTotal = document.querySelector('#content-total');
      const nodoPrecioTotal = document.querySelector("#precio-total");
       const nodoProductosTotal = document.querySelector("#total-content-products");
     

      carrito.productos.forEach(function(product, index) {
            // create elements
            const nodoProduct = document.createElement('div');
            const nodoProductName = document.createElement("span");
            const nodoProductRef = document.createElement("span");
            // add content
            nodoProductName.innerText = carrito.productos[index]['title'];
            nodoProductRef.innerText =`Ref: ${ carrito.productos[index]['SKU']}`;
            // add style
            nodoProduct.classList.add("product", "padding-rows");
            nodoProductName.classList.add("product-name", "bold");
            nodoProductRef.classList.add("product-ref");
            // Insert in HTML
            nodoGridProductos.appendChild(nodoProduct);
            nodoProduct.appendChild(nodoProductName);
            nodoProduct.appendChild(nodoProductRef);   

            /*Quantity*/ 
            const nodoQty = document.createElement('div');
            const nodoButtonMinus = document.createElement('button');
            const nodoQtyBox = document.createElement('div');
            const nodoQtyValue =  document.createElement('div');
            const nodoButtonPlus = document.createElement('button');
             // add content
            nodoButtonMinus.innerText = '-';
            nodoQtyValue.innerText = carrito.productos[index]['quantity'];
            nodoButtonPlus.innerText = "+";
            nodoButtonPlus.innerText = "+";
            // añadimos un attributo personalizado data para asociarlo a la referencia del producto
            nodoButtonMinus.setAttribute("data-sku", carrito.productos[index]['SKU']); 
            nodoButtonPlus.setAttribute("data-sku", carrito.productos[index]['SKU']);
            //
            nodoQty.classList.add("qty", "padding-rows");
            nodoButtonMinus.classList.add("bttns-qty");
            nodoQtyBox.classList.add("qty-box");
            nodoButtonPlus.classList.add("bttns-qty");
    
            //
            nodoGridProductos.appendChild(nodoQty);
            nodoQty.appendChild(nodoButtonMinus);
            nodoQty.appendChild(nodoQtyBox);
            nodoQtyBox.appendChild(nodoQtyValue);
            nodoQty.appendChild(nodoButtonPlus);

            /*Unity*/
            const nodoUnity = document.createElement('div');
            // add
            nodoUnity.innerText =  carrito.productos[index]['price']+"€";
            nodoUnity.classList.add("unity", "padding-rows");
            nodoGridProductos.appendChild(nodoUnity);
            //ToDo: Cantidad de productos.

            /*Total*/
            const nodoTotal = document.createElement('div');
            nodoTotal.innerText= carrito.obtenerProductoPrecioTotal(carrito.productos[index]['SKU'])+"€";
            nodoTotal.classList.add("total", "padding-rows");
            nodoGridProductos.appendChild(nodoTotal);
            //ToDo: Actualizar valor total segun el valor de cantidad de productos      
            /* Product */

            /*Separator*/
            const nodoSeparator = document.createElement('div');
            nodoSeparator.classList.add("product-separator");
            nodoGridProductos.appendChild(nodoSeparator);
            
            // Eventos
            nodoButtonMinus.addEventListener('click',function(){
                  let sku = nodoButtonMinus.dataset.sku;
                  console.log(sku)
                  // Obtener cantidad del carrito
                  let unidades = carrito.obtenerUnidades(sku);
                  // Filtramos con el operador ternario para decrementar las unidades sin que se llegue a números negativos
                  unidades = (unidades > 0) ? unidades-1 : 0;  
                  // Actualizo el carrito
                  carrito.actualizarUnidades(sku, unidades);
                  // Actualizo el HTML
                  nodoQtyValue.innerText = unidades;
                  nodoTotal.innerText= carrito.obtenerProductoPrecioTotal(carrito.productos[index].SKU)+"€";
                  // Actualizo los productos añadidos al carrito en HTML
                  let carritoProducto = carrito.obtenerCarrito();
                  nodoProductosTotal.innerHTML = "";
                  console.log(carritoProducto.products);
                  for(const product of carritoProducto.products){
                        // Create html elements
                        const nodoProduct = document.createElement('div');
                        const nodoProductName = document.createElement('span');
                        const nodoTotalPrice = document.createElement('div');
                        // Class
                        nodoProduct.classList.add('total-products');
                        // Add text
                        nodoProductName.innerText = product.title; 
                        nodoTotalPrice.innerText = carrito.obtenerProductoPrecioTotal(product.SKU)+carritoProducto.currency;
                        // Insert HTML
                        nodoProductosTotal.appendChild(nodoProduct);
                        nodoProduct.appendChild(nodoProductName);
                        nodoProduct.appendChild(nodoTotalPrice);
                  }
                  // Actualizo el precio total del carrito en el HTML
                  nodoPrecioTotal.innerText = carritoProducto.total+carritoProducto.currency;
            }); 
            nodoButtonPlus.addEventListener('click',function(){
                  let sku = nodoButtonPlus.dataset.sku;
                  let unidades = carrito.obtenerUnidades(sku);
                  
                  // Actualizo el carrito
                  carrito.actualizarUnidades(sku, ++unidades);
                  // Actualizo el HTML
                  nodoQtyValue.innerText = unidades;
                  nodoTotal.innerText= carrito.obtenerProductoPrecioTotal(carrito.productos[index].SKU)+"€";
                  // Actualizo los productos añadidos al carrito en HTML
                  let carritoProducto = carrito.obtenerCarrito();
                  nodoProductosTotal.innerHTML = "";
                  console.log(carritoProducto.products);
                  for(const product of carritoProducto.products){
                        // Create html elements
                        const nodoProduct = document.createElement('div');
                        const nodoProductName = document.createElement('span');
                        const nodoTotalPrice = document.createElement('div');
                        // Class
                        nodoProduct.classList.add('total-products');
                        // Add text
                        nodoProductName.innerText = product.title; 
                        nodoTotalPrice.innerText = carrito.obtenerProductoPrecioTotal(product.SKU)+carritoProducto.currency;
                        // Insert HTML
                        nodoProductosTotal.appendChild(nodoProduct);
                        nodoProduct.appendChild(nodoProductName);
                        nodoProduct.appendChild(nodoTotalPrice);
                  }
                  // Actualizo el precio total del carrito en el HTML  
                  nodoPrecioTotal.innerText = carritoProducto.total+carritoProducto.currency;
            }); 
      });   
}