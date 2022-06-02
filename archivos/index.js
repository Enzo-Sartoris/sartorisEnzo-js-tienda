// const Swal = require('sweetalert2/dist/sweetalert2.js');

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

// console.log("El total de la compra es $ ", totalSilla + totalMesa);

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

const perfilFunc = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("perfilTitle").innerText = `Perfil de ${user.email}`;

    const comprasUser = JSON.parse(localStorage.getItem("comprasRealizadas"));
        //? crear lista de compras
        const divPerfil = document.getElementById("bodyPerfil")
        comprasUser?.map(item => {
            //? titulo
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="row p-3 m-1 border rounded">
                <div class="col-md-9">
                    <div class="">
                    <p>Fecha: ${item.fecha}</p>
                    <p>Total: ${item.total}</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <button onclick="" class="btn btn-outline-danger btn-sm">Remove</button>
                </div>
                </div>   
            `;
            divPerfil.appendChild(div);
        })
}

const clickHere = (desc) => {
    //? si hay local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        alertFunction('error', 'error', `Por favor inicie sesion`);
        return
    }    
    //?
    if (desc.includes("silla")) {
        let number = desc.split("-"); //numero de la silla 
        switch (number[1]) {
            case "1":
                let silla1 = new tienda("Silla Hermetica 1 ", 5000, 1.21);
                addCarrito(silla1.item());
                alertFunction('success', 'success', `${silla1.producto}`);
                return 
            case "2":
                let silla2 = new tienda("Silla Hermetica 2 ", 6000, 1.21);
                addCarrito(silla2.item());
                alertFunction('success', 'success', `${silla2.producto}`);
                return 
            case "3":
                let silla3 = new tienda("Silla Hermetica 3 ", 7000, 1.21); 
                addCarrito(silla3.item());
                alertFunction('success', 'success', `${silla3.producto}`);
                return
            default:
                console.log("no se encontro la silla")
                return
        }
        
    }
}
const finalizarCompra = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        alertFunction('error', 'error', `Por favor inicie sesion`);
        return
    }
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if(!carrito){
        alertFunction('error', 'error', `No hay productos en el carrito`);
        return
    }
    //? carrito es el objeto completo de la compra y total es el total de la compra
    const total = carrito.reduce((acum, prop) => acum + prop.precio, 0);
    const objCompra = {
        fecha: new Date(),
        compra: carrito,
        total: total
    }
    alertFunction('compra', 'success', `Total a pagar: $ ${total}`, objCompra);
    localStorage.removeItem("carrito");
    //? elminar divs
    const divCarrito = document.getElementById("carritoContainer");
    divCarrito.innerHTML = "";
}

//? remove carrito
const handleRemove = (item) => {
    //? eliminar del local storage
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    if(item.cantidad > 1){
        const objNuevo = carrito.map(prop => {
            if(prop.producto === item.producto){
                let precioUnitario = prop.precio / item.cantidad;
                prop.precio -= precioUnitario;
                prop.cantidad -= 1;
            }
            return prop;
        })
        localStorage.setItem("carrito", JSON.stringify(objNuevo));
        clickCarrito();
        alertFunction('success', 'success', `se removio un producto`);
        return
    }
    const objNuevo = carrito.filter(prop => prop.producto !== item.producto);
    localStorage.setItem("carrito", JSON.stringify(objNuevo));
    alertFunction('success', 'success', `se a removido ${item.producto}`);
    clickCarrito();
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
            div.onclick = ()=> handleRemove(item);
            tagName.appendChild(div);
        })
        const hr = document.createElement("hr");
        tagName.appendChild(hr);
        const total = document.createElement("div");
        total.innerHTML = `<p>Total: ${carritoObj.reduce((total, item) => total + item.precio, 0)}</p>`;
        tagName.appendChild(total);
    }
    else{
        alertFunction('error', 'error', `No tienes productos ne el carrito`);
    }
}

const alertFunction = (method, type, message, objeto) => {
    if (method === 'login' || method === 'error' || method === 'logout' || method === 'success') {
        return Swal.fire({
            toast: true,
            title: message,
            icon: type,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
            confirmButtonColor: '#3085d6',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }
    else{
        return Swal.fire({
            title: message,
            text: 'Estas seguro?',
            icon: type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then(function(result) {
            if (result.value) {
                const comprasRealizadas = JSON.parse(localStorage.getItem("comprasRealizadas"));
                if(!comprasRealizadas){
                    const comprasRealizadas = [];
                    comprasRealizadas.push(objeto);
                    localStorage.setItem("comprasRealizadas", JSON.stringify(comprasRealizadas));
                }
                else{
                    comprasRealizadas.push(objeto);
                    localStorage.setItem("comprasRealizadas", JSON.stringify(comprasRealizadas));
                }
                Swal.fire(
                    'Se a realizado la compra'
                )
            }
        })
    }
}

const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email.trim() === '' || password.trim() === ''){
        alertFunction('error', 'error', `Debe completar todos los campos`);
        return
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
    //? alert  
    const name = email.split("@")[0];
    alertFunction('login', 'success', `Bienvenido ${name}`);
    
}
const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    alertFunction('logout', 'success', `Hasta pronto ${user.email}`);
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

//? fetch api https://api.artic.edu/api/v1/artworks
const getArtworks = () => {
    const url = 'https://api.artic.edu/api/v1/artworks';
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        const dataArr = data.data;
        dataArr.map(item => {
            const div = document.createElement("div");
            let imagenUrl = ''
            if (item.image_id === null || item.image_id === undefined) {
                imagenUrl = '../imagenes/default-image-620x600.jpg'
            }
            else{
                imagenUrl = `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
            }
            div.innerHTML = `
                <div class="col">
                <div class="card h-100">
                    <img src="${imagenUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.inscriptions}</p>
                    </div>
                </div>
                </div>
            `;
            div.onclick = ()=> handleClick(item);
            document.getElementById("artworks").appendChild(div);
        })
    })
    .catch(error => console.log(error))
}
getArtworks();