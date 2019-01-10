module.exports = (app) => {
    const products = require('./controllers/product.controller.js');

    // Create a new Product
    app.post('/products', products.create);

    // Retrieve all Products
    app.get('/products', products.findAll);

    // Retrieve a sing Product with productId
    app.get('/products/:productId', products.findOne);

    // Update a note with productId
    app.put('/products/:productId', app.update);

    // Delete a Note with productId
    app.delete('/products/:productId', app.delete);
};