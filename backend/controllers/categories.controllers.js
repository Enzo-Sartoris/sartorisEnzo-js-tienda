const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const getCategories = async (req, res) => {
    
    const categories = await JSON.parse(fs.readFileSync(path.join(__dirname, '../api/categories.json')));
    res.status(200).json(categories);

}

module.exports = { getCategories }
