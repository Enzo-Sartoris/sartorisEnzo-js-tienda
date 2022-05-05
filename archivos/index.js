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
    constructor(nombre, precio, iva){
        this.producto= nombre;
        this.precioSinIva = precio;
        this.iva = iva 
        this.precioConIva = precio*iva
    }
    

    sillas(){
        return "Si hay "+ this.producto+"su valor es $"+this.precioConIva
        
    }

    mesas(){
        return "Si hay "+ this.producto+"su valor es $"+this.precioConIva
    }
}
const sillaHermetica = new tienda("Sillas Hermeticas ",5000,1.21);
const totalSilla = sillaHermetica.precioConIva
const mesaHermetica = new tienda("Mesa Hermetica ",9000,1.21);
const totalMesa = mesaHermetica.precioConIva

let coloresSillas = ["rojo","marron","negra","blanca"]

console.log(sillaHermetica.sillas());

coloresSillas.push("amarilla")

console.log(coloresSillas);

console.log(mesaHermetica.mesas());


console.log("El total de la compra es $ ",totalSilla+totalMesa);
