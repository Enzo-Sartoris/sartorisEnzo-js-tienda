/*let edad = prompt("coloque su edad")
while(edad<100){
    if(edad>15){
        alert("usted tiene permiso para comprar")
    }
    else if(edad<16){
        alert("usted no tiene permiso para comprar")
    }
    break   
}*/

class tienda {
    constructor(nombre, precio, iva) {
        this.producto = nombre;
        this.precioSinIva = precio;
        this.iva = iva;
        this.precioConIva = precio * iva;
    }

    sillas() {
        return "Si hay " + this.producto + "su valor es $" + this.precioConIva;
    }

    mesas() {
        return "Si hay " + this.producto + "su valor es $" + this.precioConIva;
    }
}
const sillaHermetica = new tienda("Sillas Hermeticas ", 5000, 1.21);
const totalSilla = sillaHermetica.precioConIva;
const mesaHermetica = new tienda("Mesa Hermetica ", 9000, 1.21);
const totalMesa = mesaHermetica.precioConIva;

let coloresSillas = ["rojo", "marron", "negra", "blanca"];

console.log(sillaHermetica.sillas());

coloresSillas.push("amarilla");

console.log(coloresSillas);

console.log(mesaHermetica.mesas());

console.log("El total de la compra es $ ", totalSilla + totalMesa);

const titulo = document.getElementById("titulo");
const textoInicio = document.getElementById("textoInicio");
const textoSecundario = document.getElementById("textoSecundario");

titulo.innerText = "Tienda Mia";
textoInicio.innerHTML = "Qué mejor que equipar tu casa comprando todo lo necesario de una sola vez. Nuestros sets están pensados, combinando los productos más buscados con la mejor propuesta de precio. Este set se compone de 4 Sillas Tolix con 1 color a elección.";
textoSecundario.innerHTML = "Mesa de 4 patas cromadas conificadas con tapa de 30 mm de espesor en color Peral. La medida de la mesa es de 1.35 x 0.85 mts. Ideal para cocinas o comedores de espacios reducidos. No tenes porque perder diseño o estilo, si no contas con un espacio amplio. Este modelo de mesa, permite combinar lo mejor del cromo con patas finamente conificadas, para darle estilo y personalidad.";

const img1 = document.querySelector("#imagen1");
const img2 = document.querySelector("#imagen2");
const img3 = document.querySelector("#imagen3");
const img4 = document.querySelector("#imagen4");
const img5 = document.querySelector("#imagen5");
const img6 = document.querySelector("#imagen6");

img1.src = "imagenes/silla-1.jpg";
img2.src = "imagenes/silla-2.jpg";
img3.src = "imagenes/silla-3.jpg";
img4.src = "imagenes/mesa1.jpg";
img5.src = "imagenes/mesa2.png";
img6.src = "imagenes/mesa3.jpeg";
