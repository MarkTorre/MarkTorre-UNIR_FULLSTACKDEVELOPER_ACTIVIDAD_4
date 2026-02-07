
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
}
