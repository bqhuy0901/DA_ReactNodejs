module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        price: Number,
        description: String,
        published: String,
        category: String,
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Book = mongoose.model("books", schema);
    return Book;
};