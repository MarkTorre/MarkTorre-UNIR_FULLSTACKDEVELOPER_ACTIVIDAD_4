/**
 * Clase para gestionar un carrito de la compra en una tienda online.
 * Almacena la cantidad de productos y contabiliza los productos que
 * se quieren comprar.
 */
export class Carrito {
     constructor(productos){
        this.productos = productos.products;
        this.currency = productos.currency;
        this.#inicializarUnidades()
    }

    #inicializarUnidades(){
        // Añade el parametro quantity a cada producto
        for(let producto of this.productos) {
            producto.quantity = 0;
        }
    }

    #buscarProducto(sku){
        // Busca el producto de la lista de productos almacenada
        for(let producto of this.productos) {
            if(producto.SKU === sku){
                return producto;
            } 
        }
    }

    actualizarUnidades(sku, unidades) {
        let producto = this.#buscarProducto(sku);
        producto.quantity = unidades;
    }

    obtenerUnidades(sku){
        let producto = this.#buscarProducto(sku);
        return Number(producto.quantity);
    }

    obtenerProductoPrecioTotal(sku){
        let producto = this.#buscarProducto(sku);
        let total = producto.quantity*producto.price;
        // Para no mostra decimales en caso de 0;
        total = total>0 ? total.toFixed(2) : 0;
        return total;
    }

     obtenerInformacionProducto(sku) {
        let producto = this.#buscarProducto(sku);
        return {
            "sku": producto.SKU,
            "quantity":producto.quantity 
        }
    }

    obtenerCarrito(){
      // Filtramos solo los productos que se han añadido al carrito. Es decir quantity > 0
      let productos = this.productos.filter( function(producto) {
            if(producto.quantity>0) {
                return producto;
            }
        }
      )
      // Obtenemos el precio total de los productos añadidos al carrito.
      let total = 0;
      for(let producto of this.productos) {
        total += Number(this.obtenerProductoPrecioTotal(producto.SKU));       
      }
      // Para no mostra decimales en caso de 0;
      total = total>0 ? total.toFixed(2) : 0;

      return {
         "total": total,
         "currency": this.currency,
         "products" : productos
        }
    }
}
