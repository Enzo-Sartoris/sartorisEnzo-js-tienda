//* ALERT FUNCTION
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
//* PETICIONES 
const readCategories = () => {
    const categories = document.getElementById("categoriaProducto");
    const editCategories = document.getElementById("categoriaEditProducto");
    fetch('http://localhost:3000/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(categories.length > 0 || editCategories.length > 0){
            categories.innerHTML = "";
            editCategories.innerHTML = "";
        }
        data.forEach(element => {
            categories.innerHTML += `<option value="${element.name}">${element.name}</option>`;
            editCategories.innerHTML += `<option value="${element.name}">${element.name}</option>`;
        })
    })
}
const readProducts = () => {
    const products = document.getElementById("products");
    fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(products.length > 0){
            products.innerHTML = "";
        }
        console.log("soy readProducts",data);
        data.forEach(element => {
        if(element.img === ''){
            element.img = '../imagenes/default-image-620x600.jpg';
        }
        products.innerHTML += `
        <div class="col">
            <div class="card">
                <img class="img-product" src="${ element.img }" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${element.name}</p>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text">${element.categorie}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">  
                            <button id="btnEditar" type="button" class="btn btn-sm btn-outline-secondary dropdown-item" data-bs-toggle="modal" data-bs-target="#formEdit"
                            onclick="editProduct('${element.id}')"
                            >Editar</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addCarritoo('${element.id}')" >+ carrito</button>
                        </div>
                        <small class="text-muted">${element.price}$</small>
                    </div>
                    
                </div>
            </div>
        </div>`;
        
    })
    }) 
}
readProducts();
const editProduct = (id) => {
    readCategories();
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("idEdit").value = data.id;
        document.getElementById("nameEditProduct").value = data.name;
        document.getElementById("descriptionEditProducto").value = data.description;
        document.getElementById("priceEditProducto").value = data.price;
        document.getElementById("categoriaEditProducto").value = data.categorie;
        document.getElementById("imgEditProducto").value = data.img;
    })  
}

const addCarritoo = (id) => {

    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        alertFunction('error', 'error', `Debe iniciar sesion`);
        return
    }
    //? fetch by id
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        const item = {
            producto: data.name,
            precio: parseInt(data.price),
            cantidad: 1,
            id: data.id
        }
        addCarrito(item);
        alertFunction('success', 'success', `Se agrego al carrito`);
    })


}

const updateProduct = () => {
    const id = document.getElementById("idEdit").value; 
    const nameProducto = document.getElementById("nameEditProduct").value;
    const descriptionProducto = document.getElementById("descriptionEditProducto").value;
    const priceProducto = document.getElementById("priceEditProducto").value;
    const categoriaProducto = document.getElementById("categoriaEditProducto").value;
    const imgProducto = document.getElementById("imgEditProducto").value;
    if(nameProducto.trim() === '' || priceProducto.trim() === '' || descriptionProducto.trim() === '' || categoriaProducto.trim() === '' || imgProducto.trim() === ''){
        alertFunction('error', 'error', 'Todos los campos son obligatorios', null);
        return
    }
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameProducto,
            price: priceProducto,
            description: descriptionProducto,
            categorie: categoriaProducto,
            img: imgProducto
        })
    })
    .then(res => res.json())
    .then(data => {
        alertFunction('success', 'success', 'Producto creado', data);
        document.getElementById("nameEditProduct").value = "";
        document.getElementById("descriptionEditProducto").value = "";
        document.getElementById("priceEditProducto").value = "";
        document.getElementById("categoriaEditProducto").value = "";
        document.getElementById("imgEditProducto").value = "";
        // readProduct();
        console.log("soy edit product",data);
        setTimeout(() => {
            //? reload page
            readProducts();
            location.reload();
        }, 500);
    })
}
const createProduct = () => {
    const nameProducto = document.getElementById("nameProducto").value;
    const priceProducto = document.getElementById("priceProducto").value;
    const descriptionProducto = document.getElementById("descriptionProducto").value;
    const categoriaProducto = document.getElementById("categoriaProducto").value;
    const imgProducto = document.getElementById("imgProducto").value;
    if(nameProducto.trim() === '' || priceProducto.trim() === '' || descriptionProducto.trim() === '' || categoriaProducto.trim() === '' || imgProducto.trim() === ''){
        alertFunction('error', 'error', 'Todos los campos son obligatorios', null);
        return
    }
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameProducto,
            price: priceProducto,
            description: descriptionProducto,
            categorie: categoriaProducto,
            img: imgProducto
        })
    })
    .then(res => res.json())
    .then(data => {
        alertFunction('success', 'success', 'Producto creado', data);
        document.getElementById("nameProducto").value = "";
        document.getElementById("priceProducto").value = "";
        document.getElementById("descriptionProducto").value = "";
        document.getElementById("categoriaProducto").value = "";
        document.getElementById("imgProducto").value = "";
        // readProduct();
        console.log("soy createProduct",data);
        setTimeout(() => {
            //? reload page
            readProducts();
            location.reload();
        }, 500);
    })
}
const register = () => {
    const name = document.getElementById("nameRegister").value;
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passRegister").value;

    if(name.trim() === '' || email.trim() === '' || password.trim() === ''){
        alertFunction('error', 'error', 'Todos los campos son obligatorios', null);
        return
    }
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alertFunction('success', 'success', 'Usuario creado', data);
        document.getElementById("nameRegister").value = "";
        document.getElementById("emailRegister").value = "";
        document.getElementById("passRegister").value = "";
        // readProduct();
        console.log("soy register",data);
        setTimeout(() => {
            //? reload page
            location.reload();
        }, 500);

    })
    .catch(err => {
        alertFunction('error', 'error', 'Error al crear usuario', err);
    })

}
const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email.trim() === '' || password.trim() === ''){
        alertFunction('error', 'error', `Debe completar todos los campos`);
        return
    }
    console.log("soy login",email,password);
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("soy login",data);
        if(data.ok === false){
            alertFunction('error', 'error', `${data.msg}`);
            return
        }
        localStorage.setItem("user", JSON.stringify(data));
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";    
        const name = email.split("@")[0];
        alertFunction('login', 'success', `Bienvenido ${name}`);
        setTimeout(() => {
            readUser();
            //? reload page
            location.reload();
        }, 1000);
    })
    .catch(err => {
        alertFunction('error', 'error', 'Error al iniciar sesion', err);
    })
}

//* PARTE VIEJA

//? obj carrito
const addCarrito = (item) => {
    const carritoObj = JSON.parse(localStorage.getItem("carrito"));
    if(!carritoObj){
        localStorage.setItem("carrito", JSON.stringify([item]));
        return
    }
    //? carritoObj es un array, item existe en el carrito no se agrega
    const findItem = carritoObj.find(prop => prop.id === item.id);
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
        alertFunction('error', 'error', `No tienes productos en el carrito`);
    }
}

const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    alertFunction('logout', 'success', `Hasta pronto ${user.email}`);
    localStorage.removeItem("user");
    localStorage.removeItem("carrito");
    localStorage.removeItem("comprasRealizadas"); 

    readUser();
}

//# verificar sesion
const tagsAdmin = (show) => {
    if (show) {
        const verifyRole = document.getElementsByClassName("verify-role");
        for (let i = 0; i < verifyRole.length; i++) {
            verifyRole[i].style.display = "block";
        }
    }
    else{
        //? todos los tags q tengan por id -> verify-role
        const verifyRole = document.getElementsByClassName("verify-role");
        //? ocultar todos los tags q tengan por id -> verify-role
        for (let i = 0; i < verifyRole.length; i++) {
            verifyRole[i].classList.add("hiden");
        }
    }
}

const readUser = () => {
    const userBtn = document.getElementById("nameUser");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const btnEditar = document.getElementById("btnEditar");
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        userBtn.innerText = user.email
        loginBtn.classList.add("hiden"); 
        registerBtn.classList.add("hiden");
        userBtn.classList.remove("hiden");
        if (user.roles.admin === false) {
            const verifyRole = document.getElementsByClassName("verify-role");
            console.log("soy verify role",verifyRole);
            tagsAdmin(false);
        }else{
            tagsAdmin(true);
        }
    }else{
        tagsAdmin(false);
        loginBtn.classList.remove("hiden"); 
        registerBtn.classList.remove("hiden");
        userBtn.classList.add("hiden");
        
    }
}
readUser();

