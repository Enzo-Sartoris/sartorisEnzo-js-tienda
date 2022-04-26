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





class tienda{
    constructor(nombre, precio, iva,){
        this.producto= nombre;
        this.precioSinIva = precio;
        this.iva = iva 
        this.precioConIva = precio*iva
    }

    sillas(){
        return "si hay "+ this.producto+"su valor es $"+this.precioConIva
    }
    
}
const sillaHermeticas = new tienda("Sillas Hermeticas ",5000,1.21);


console.log(sillaHermeticas.sillas());

