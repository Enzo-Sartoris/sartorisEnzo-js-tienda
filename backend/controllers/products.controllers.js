const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const createProduct = async (req, res) => {
    
    const { name, price, description, img, categorie } = req.body;
    try {

        if (!name || !price || !description || !img || !categorie) {
            return res.status(400).json({
                ok: false,
                msg: 'Faltan datos'
            })   
        }
        const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/categories.json')));
        if (categories.find(item=> item.name === categorie)) {
            //? valido que la categoria exista
            const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/products.json')));
            const newProduct = {
                id: uuidv4(),
                name,
                price,
                description,
                img,
                categorie,
            }
            products.push(newProduct);
            fs.writeFileSync(path.join(__dirname, '../api/products.json'), JSON.stringify(products));
            res.status(200).json({
                ok: true,
                msg: 'Producto creado',
                product: newProduct
            })
        }

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al crear el producto'
        });
    }

}

const getProducts = async (req, res) => {

    try {
        const products = await JSON.parse(fs.readFileSync(path.join(__dirname, '../api/products.json')));
        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los productos'
        });
    }

}
const getProductById = async (req, res) => {

    const { id } = req.params;
    try {
        const products = await JSON.parse(fs.readFileSync(path.join(__dirname, '../api/products.json')));
        const product = products.find(item=> item.id === id);
        //? si no existe el producto
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            })
        }
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error al obtener el producto'
        });
    }

}
const deleteProduct = async (req, res) => {}
const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { name, price, description, img, categorie } = req.body;
    try {
        const products = await JSON.parse(fs.readFileSync(path.join(__dirname, '../api/products.json')));
        const product = products.find(item=> item.id === id);
        //? si no existe el producto
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            })
        }
        const newProduct = {
            id,
            name,
            price,
            description,
            img,
            categorie,
        }
        products.splice(products.indexOf(product), 1, newProduct);
        fs.writeFileSync(path.join(__dirname, '../api/products.json'), JSON.stringify(products));
        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado',
            product: newProduct
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error al actualizar el producto'
        });
    }

}

module.exports = { createProduct, getProducts, deleteProduct, getProductById, updateProduct }