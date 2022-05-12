let edad = prompt("coloque su edad")
while(edad<100){
    if(edad>15){
        alert("usted tiene permiso para comprar")
    }
    else if(edad<16){
        alert("usted no tiene permiso para comprar")
    }
    break   
}

class tienda {
    constructor(nombre, precio, iva) {
        this.producto = nombre;
        this.precioSinIva = precio;
        this.iva = iva;
        this.precioConIva = precio * iva;
    }
    item(){
        return {
            producto: this.producto,
            precio: this.precioConIva
        }
    }

    sillas() {
        return "Si hay " + this.producto + "y su valor es $" + this.precioConIva;
    }
    mesas() {
        return "Si hay " + this.producto + "y su valor es $" + this.precioConIva;
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


titulo.innerText = "Tienda Mia";
textoInicio.innerHTML = "Qué mejor que equipar tu casa comprando todo lo necesario de una sola vez. Nuestros sets están pensados, combinando los productos más buscados con la mejor propuesta de precio. Este set se compone de 3 Sillas Hermeticas con 1 color a elección.";

const img1 = document.querySelector("#imagen1");
const img2 = document.querySelector("#imagen2");
const img3 = document.querySelector("#imagen3");


img1.src = "imagenes/silla-1.jpg";
img2.src = "imagenes/silla-2.jpg";
img3.src = "imagenes/silla-3.jpg";


//items carrito
const obj = []

const clickView = (desc) => {
    if (desc.includes("silla")) {
        let number = desc.split("-"); //numero de la silla 
        switch (number[1]) {
            case "1":
                let silla1 = new tienda("Silla Hermetica 1 ", 5000, 1.21);
                return alert(silla1.sillas());
            case "2":
                let silla2 = new tienda("Silla Hermetica 2 ", 6000, 1.21);
                return alert(silla2.sillas());
            case "3":
                let silla3 = new tienda("Silla Hermetica 3 ", 7000, 1.21); 
                return alert(silla3.sillas());
            default:
                console.log("no se encontro la silla")
                return
        }
        
    }
}


const clickHere = (desc) => {
    if (desc.includes("silla")) {
        let number = desc.split("-"); //numero de la silla 
        switch (number[1]) {
            case "1":
                let silla1 = new tienda("Silla Hermetica 1 ", 5000, 1.21);
                obj.push(silla1.item());
                return alert(`Se agrego a su carrito ${silla1.producto}`);
            case "2":
                let silla2 = new tienda("Silla Hermetica 2 ", 6000, 1.21);
                obj.push(silla2.item());
                return alert(`Se agrego a su carrito ${silla2.producto}`);
            case "3":
                let silla3 = new tienda("Silla Hermetica 3 ", 7000, 1.21); 
                obj.push(silla3.item());
                return alert(`Se agrego a su carrito ${silla3.producto}`);
            default:
                console.log("no se encontro la silla")
                return
        }
        
    }
}

const tagName = document.getElementById("carritoContainer");

const clickCarrito = () => {
    if(obj.length > 0){
        tagName.innerHTML = "";
        obj.map(item => {
            const div = document.createElement("div");
            div.innerHTML = `<h2>${item.producto}</h2>
            <p>${item.precio}</p>`;
            tagName.appendChild(div);
        })
        
        const hr = document.createElement("hr");
        tagName.appendChild(hr);
        const total = document.createElement("div");
        total.innerHTML = `<p>Total: ${obj.reduce((total, item) => total + item.precio, 0)}</p>`;
        tagName.appendChild(total);
    }
}



