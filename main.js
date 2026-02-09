// 0. Importamos los objetos externos
import {Carrito } from "./carrito.js" 
import {TiendaHTML} from "./tienda.js"

// 1. Obtener los datos de la API.
// Nota: En caso de que la página jsonblob no funcione usar la carpeta local testAPI
const URL = "./testAPI/products.json";
//const URL= 'https://jsonblob.com/api/jsonBlob/019c41ba-69ab-7e82-a7ae-990cf4b77f6d';
const promProductos = await fetch(URL);

// 2. Obtener lista de Productos
const productos = await promProductos.json();

// 3. Instanciar Carrito con la lista de productos
let carrito = new Carrito(productos);
 
// 4. Crear la tienda de productos HTML con la clase TiendaHTML
let tienda = new TiendaHTML(carrito);
tienda.crearTienda();
