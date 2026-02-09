
/*
 * Clase constructora dinámica de los productos del HTML
 */
export class TiendaHTML {
      #gridProductos;
      #contentTotal;
      #precioTotal;
      #productosTotal;

      constructor(carrito){
            this.carrito = carrito;
            this.#gridProductos = document.querySelector('#grid-products');
            this.#contentTotal = document.querySelector('#content-total');
            this.#precioTotal = document.querySelector("#precio-total");
            this.#productosTotal = document.querySelector("#content-total-products");
      }

      actualizarUnidadesCarrito(sku, operador){
            // Obtener las unidades del carrito
            let unidades = this.carrito.obtenerUnidades(sku);
            // Actualizamos las unidades
            unidades += operador;
            if(unidades<0) unidades = 0;
            // Actualizo el carrito
            this.carrito.actualizarUnidades(sku, unidades);
            return unidades;
      }

      actualizarProductosHTML(){
            let carritoProducto = this.carrito.obtenerCarrito();
            this.#productosTotal.innerHTML = "";
            
            for(const product of carritoProducto.products){
                  // Create html elements
                  const nodoProduct = document.createElement('div');
                  const nodoProductName = document.createElement('span');
                  const nodoTotalPrice = document.createElement('div');
                  // Class
                  nodoProduct.classList.add('total-products');
                  // Add text
                  nodoProductName.innerText = product.title; 
                  nodoTotalPrice.innerText = this.carrito.obtenerProductoPrecioTotal(product.SKU)+carritoProducto.currency;
                  // Insert HTML
                  this.#productosTotal.appendChild(nodoProduct);
                  nodoProduct.appendChild(nodoProductName);
                  nodoProduct.appendChild(nodoTotalPrice);
            }
            // Actualizo el precio total del carrito en el HTML  
            this.#precioTotal.innerText = carritoProducto.total+carritoProducto.currency;
      }

      crearTienda(){
            this.carrito.productos.forEach((product, index)=> { //uso arrow function para pasar el contexto de la clase. Sinó no podria acceder a las propiedades de esta misma.
            // create elements
            const nodoProduct = document.createElement('div');
            const nodoProductName = document.createElement("span");
            const nodoProductRef = document.createElement("span");
            // add content
            nodoProductName.innerText = this.carrito.productos[index]['title'];
            nodoProductRef.innerText =`Ref: ${ this.carrito.productos[index]['SKU']}`;
            // add style
            nodoProduct.classList.add("product", "padding-rows");
            nodoProductName.classList.add("product-name", "bold");
            nodoProductRef.classList.add("product-ref");
            // Insert in HTML
            this.#gridProductos.appendChild(nodoProduct);
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
            nodoQtyValue.innerText = this.carrito.productos[index]['quantity'];
            nodoButtonPlus.innerText = "+";
            nodoButtonPlus.innerText = "+";
            // añadimos un attributo personalizado data para asociarlo a la referencia del producto
            nodoButtonMinus.setAttribute("data-sku", this.carrito.productos[index]['SKU']); 
            nodoButtonPlus.setAttribute("data-sku", this.carrito.productos[index]['SKU']);
            //
            nodoQty.classList.add("qty", "padding-rows");
            nodoButtonMinus.classList.add("bttns-qty");
            nodoQtyBox.classList.add("qty-box");
            nodoButtonPlus.classList.add("bttns-qty");
    
            //
            this.#gridProductos.appendChild(nodoQty);
            nodoQty.appendChild(nodoButtonMinus);
            nodoQty.appendChild(nodoQtyBox);
            nodoQtyBox.appendChild(nodoQtyValue);
            nodoQty.appendChild(nodoButtonPlus);

            /*Unity*/
            const nodoUnity = document.createElement('div');
            // add
            nodoUnity.innerText =  this.carrito.productos[index]['price']+"€";
            nodoUnity.classList.add("unity", "padding-rows");
            this.#gridProductos.appendChild(nodoUnity);
            //ToDo: Cantidad de productos.

            /*Total*/
            const nodoTotal = document.createElement('div');
            nodoTotal.innerText= this.carrito.obtenerProductoPrecioTotal(this.carrito.productos[index]['SKU'])+"€";
            nodoTotal.classList.add("total", "padding-rows");
            this.#gridProductos.appendChild(nodoTotal);
            //ToDo: Actualizar valor total segun el valor de cantidad de productos      
            /* Product */

            /*Separator*/
            const nodoSeparator = document.createElement('div');
            nodoSeparator.classList.add("product-separator");
            this.#gridProductos.appendChild(nodoSeparator);
            
            // Eventos
            nodoButtonMinus.addEventListener('click',(event)=>{
                  // Obtener la referencia del producto
                  let sku = nodoButtonMinus.dataset.sku;
                   // Actualizo Unidades del Carrito
                  let unidades = this.actualizarUnidadesCarrito(sku,-1)
                  // Actualizo el HTML
                  nodoQtyValue.innerText = unidades;
                  nodoTotal.innerText= this.carrito.obtenerProductoPrecioTotal(this.carrito.productos[index].SKU)+"€";
                  // Actualizo los productos añadidos al carrito en HTML
                  this.actualizarProductosHTML();
            }); 

            nodoButtonPlus.addEventListener('click',(event)=>{
                  // Obtener la referencia del producto
                  let sku = nodoButtonPlus.dataset.sku;
                   // Actualizo Unidades del Carrito
                  let unidades = this.actualizarUnidadesCarrito(sku,1)
                  console.log(unidades);
                  // Actualizo el HTML
                  nodoQtyValue.innerText = unidades;
                  nodoTotal.innerText= this.carrito.obtenerProductoPrecioTotal(this.carrito.productos[index].SKU)+"€";
                  // Actualizo los productos añadidos al carrito en HTML
                  this.actualizarProductosHTML();
            }); 
      }); 
      }
}   