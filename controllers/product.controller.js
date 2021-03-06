const Product = require('../product.model.js');

// Create new product
exports.create = (req, res) => {

    // request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a product document
    const product = new Product({
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // Save a product to the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something broke while creating the product"
            });
        });
};

// Retrieve all products from the database
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something broke while retrieving products"
            });
        });
};

// Find a single product by it's productId grabbed with query params
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: `Product not found with id ${req.params.productId}`
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Product not found with id ${req.params.productId}`
                });
            }
            return res.status(500).send({
                message: `Something went wrong retrieving product with id ${req.params.productId}`
            });
        });
};

// Update a product
exports.update = (req, res) => {

    // Validate req
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with req body
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true}) // true to return modified doc rather than original
    .then(product => {
        if (!product) {
            return res.status(404).send({
                message: `Product not found with id ${req.params.productId}`
            });
        }
        return res.send(product);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: `Product not found with id ${req.params.productId}`
            });
        }
        return res.status(500).send({
            message: `Something went wrong updating
             product with id ${req.params.productId}`
        });
    });
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: `Product not found with id ${req.params.productId}`
                });
            }
            return res.send({message: "Product deleted successfully!"});
        }).catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: `Product not found with id ${req.params.productId}`
                });
            }
            return res.status(500).send({
                message: `Could not delete product with id ${req.params.productId}`
            });
        });
}