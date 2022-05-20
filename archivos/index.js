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
            precio: this.precioConIva,
            cantidad: 1
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

//? obj carrito
const addCarrito = (item) => {
    const carritoObj = JSON.parse(localStorage.getItem("carrito"));
    if(!carritoObj){
        localStorage.setItem("carrito", JSON.stringify([item]));
        return
    }
    //? carritoObj es un array, item existe en el carrito no se agrega
    const findItem = carritoObj.find(prop => prop.producto === item.producto);
    if(findItem){
        const a = item.precio *= findItem.cantidad + 1;
        const objNuevo = carritoObj.map(prop => {
            if(prop.producto === item.producto){
                prop.precio = a;
                prop.cantidad += 1;
            }
            return prop;
        })
        localStorage.setItem("carrito", JSON.stringify(objNuevo));
    }
    else{
        carritoObj.push(item);
        localStorage.setItem("carrito", JSON.stringify(carritoObj));
    }
}
//? readCarrito


//?
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
    //? si hay local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        return alert("Por favor inicie sesion");
    }    
    //?
    if (desc.includes("silla")) {
        let number = desc.split("-"); //numero de la silla 
        switch (number[1]) {
            case "1":
                let silla1 = new tienda("Silla Hermetica 1 ", 5000, 1.21);
                obj.push(silla1.item());
                addCarrito(silla1.item());
                return alert(`Se agrego a su carrito ${silla1.producto}`);
            case "2":
                let silla2 = new tienda("Silla Hermetica 2 ", 6000, 1.21);
                obj.push(silla2.item());
                addCarrito(silla2.item());
                return alert(`Se agrego a su carrito ${silla2.producto}`);
            case "3":
                let silla3 = new tienda("Silla Hermetica 3 ", 7000, 1.21); 
                obj.push(silla3.item());
                addCarrito(silla3.item());
                return alert(`Se agrego a su carrito ${silla3.producto}`);
            default:
                console.log("no se encontro la silla")
                return
        }
        
    }
}
const finalizarCompra = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        return alert("Por favor inicie sesion");
    }
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if(!carrito){
        return alert("No hay productos en su carrito");
    }
    const total = carrito.reduce((acum, prop) => acum + prop.precio, 0);
    alert(`El total de su compra es ${total}`);
    localStorage.removeItem("carrito");
    //? elminar divs
    const divCarrito = document.getElementById("carritoContainer");
    divCarrito.innerHTML = "";
}

//? remove carrito
const handleRemove = () => {
    console.log();
}

const tagName = document.getElementById("carritoContainer");
const clickCarrito = () => {
    const carritoObj = JSON.parse(localStorage.getItem("carrito"));
    if(carritoObj){
        tagName.innerHTML = "";
        carritoObj.map(item => {
            //? titulo
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="row p-3 m-1 border rounded">
                <div class="col-md-9">
                    <div class="">
                    <p>Producto: ${item.producto}</p>
                    <p>Precio: ${item.precio}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <button onclick="" class="btn btn-outline-danger btn-sm">Remove</button>
                </div>
                </div>   
            `;
            tagName.appendChild(div);
        })
        const hr = document.createElement("hr");
        tagName.appendChild(hr);
        const total = document.createElement("div");
        total.innerHTML = `<p>Total: ${carritoObj.reduce((total, item) => total + item.precio, 0)}</p>`;
        tagName.appendChild(total);
    }
}

const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email.trim() === '' || password.trim() === ''){
        return alert("Por favor ingrese su email y contraseña");
    }
    const obj = {
        email,
        password
    }
    console.log(obj);
    localStorage.setItem("user", JSON.stringify(obj));
    readUser();
    //? borrar inputs 
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}
const logout = () => {
    localStorage.removeItem("user");
    readUser();
}

//# verificar sesion
const readUser = () => {
    const userBtn = document.getElementById("nameUser");
    const loginBtn = document.getElementById("loginBtn");
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        userBtn.innerText = user.email
        loginBtn.classList.add("hiden"); 
        userBtn.classList.remove("hiden");
    }else{
        loginBtn.classList.remove("hiden"); 
        userBtn.classList.add("hiden");
    }
}
readUser();