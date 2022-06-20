const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const createUser = (req, res) => {
    const { name, email, password } = req.body;

    //? leer archivo users.json -> agregar nuevo usuario
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/users.json')));
    const newUser = {
        id: uuidv4(),
        name: name,
        email: email,
        password: password,
        roles: {
            admin: false,
            user: true
        }
    };
    users.push(newUser);
    fs.writeFileSync(path.join(__dirname, '../api/users.json'), JSON.stringify(users));
    res.json(newUser);

}
const getUser = (req, res) => {
    //? leer archivo users.json
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/users.json')));
    console.log(users);

    res.json(users);
}

const getUserById = (req, res) => {
    const { id } = req.params;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/users.json')));
    const user = users.find(user => user.id === id);
    res.json(user);

}

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/users.json')));
        const user = await users.find(user => user.email === email && user.password === password);
        if (user) {
            console.log('login');
            res.status(200).json(user);
        } else {
            return res.status(404).json({  
                ok: false,
                msg: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al autenticar'
        });
    }
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/users.json')));
    const newUsers = users.filter(user => user.id !== id);
    fs.writeFileSync(path.join(__dirname, '../api/users.json'), JSON.stringify(newUsers));
    res.json(newUsers);
}


module.exports = { createUser, getUser, deleteUser, getUserById, loginUser };