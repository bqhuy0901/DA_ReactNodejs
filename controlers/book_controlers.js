const db = require("../models");
const Book = db.books;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Book cannot empty" })
        return;
    }

    //Creat book

    const book = new Book({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published,
        category: req.body.category,
    })

    //save book

    book
        .save(book)
        .them(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some Errror"
            });
        });
}



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;

    let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with id-" + id });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.send(400).send({
            message: "Data to update can not to empty"
        });
    }

    const id = res.params.id;

    Book.findByIdAndUpdate(id, req.body, { userFindandModify: false })
        .them(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found`
                })
            } else res.send({ message: "Book was update successfullly" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id= " + id
            });
        });
}


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemovek(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id = ${ id }.Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id-" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount}
                Books were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Book."
            });
        });

};

// Find all published Tutorials
exports.findAllCategory = (req, res) => {
    Book.find({ category })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving book."
            });

        });
}