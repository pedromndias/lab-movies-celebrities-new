//  Add your code here
// require mongoose:
const mongoose = require("mongoose")

// Create Schema:
const celebritySchema = new mongoose.Schema({
    name: String,
    ocupation: String,
    catchPhrase: String
})

// Create model:
const Celebrity = mongoose.model("Celebrity", celebritySchema);

// Export model:
module.exports = Celebrity;