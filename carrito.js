
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
            producto["quantity"] = 1;
        }
    }

    actualizarUnidades(sku, unidades) {
        this.productos.find( function(producto) {
            if (producto["sku"] == sku){
                producto["quantity"] = unidades;
            }
        }
        )
    }

     obtenerInformacionProducto(sku) {
        this.productos.find(function(producto) {
            if(sku == producto["sku"]){
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
