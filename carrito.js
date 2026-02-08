
export class Carrito {
     constructor(productos){
        this.productos = productos["products"];
        this.total = 0;
        this.currency = productos["currency"];
        this.#initProductos()
    }

    #initProductos(){
        // Añade el parametro quantity a cada producto
        for(let producto of this.productos) {
            producto.quantity = 0;
        }
    }

  

    actualizarUnidades(sku, unidades) {
        for(let producto of this.productos) {
            if(producto.SKU === sku){
                producto.quantity = unidades;
            } 
        }
    }

    obtenerUnidades(sku){
         for(let producto of this.productos) {
            if(producto.SKU === sku){
                return producto.quantity;
            } 
        }
    }

    obtenerProductoPrecioTotal(sku){
        for(let producto of this.productos) {
            if(producto.SKU === sku){
                let total = producto.quantity*producto.price;
                return total.toFixed(2);
            } 
        }
    }

     obtenerInformacionProducto(sku) {
        this.productos.find(function(producto) {
            if(sku == producto["SKU"]){
                return {
                    "sku": producto["sku"],
                    "quantity":producto["quantity"] 
                }
            }
        }
        )
    }

    obtenerCarrito(){
      // Devuelve información de los productos añadidos al carrito
      // Además del total calculado de todos los productos
      // Filtramos solo los productos que se han añadido al carrito. Es decir qty > 0
    
      let productos = this.productos.filter( function(producto) {
            if(producto["quantity"]>0) {
                return producto;
            }
        }
      )

      return {
         "total": this.total,
         "currency": this.currency,
         "products" : productos
        }
    }
}
