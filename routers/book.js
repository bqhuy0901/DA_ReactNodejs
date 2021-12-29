const { book } = require('../models');

module.exports = app => {

    const Books = require('../controlers/book_controlers.js')
    const router = require('express').Router();

    router.post('/', Books.create);

    router.get('/', Books.findAll);

    router.get('/category', Books.findAllCategory)

    router.get('/:id', Books.findOne)

    router.put('/:id', Books.update)

    router.delete("/:id", Books.delete)

    router.delete("/", Books.deleteAll)

    app.use("/api/Books", router)

}