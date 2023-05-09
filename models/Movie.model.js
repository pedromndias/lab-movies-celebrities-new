// require mongoose:
const mongoose = require("mongoose")

// Create Schema:
const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    // Create relation with the celebrities collection. The cast will have many celebrities (of model Celebrity):
    cast: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Celebrity"
        }
    ]
})

// Create model:
const Movie = mongoose.model("Movie", movieSchema)

// Export model:
module.exports = Movie;