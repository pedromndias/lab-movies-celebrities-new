// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require the Celebrity model:
const Celebrity = require("../models/Celebrity.model");

// all your routes here
// GET "/celebrities/create" => Render a form to create new celebrity:
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
})

// POST "/celebrities/create" => Gets info from a celebrity and adds it to the DB:
router.post("/create", (req, res, next) => {
    // console.log(req.body);
    const {name, ocupation, catchPhrase} = req.body; // Destructure req.body
    Celebrity.create({
        name,
        ocupation,
        catchPhrase
    })
    .then(() => {
        console.log("Celebrity created!");
        res.redirect("/celebrities");
    })
    .catch((err) => {
        next(err);
    })

})

// GET "/celebrities" => Show all celebrities:
router.get("/", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        // console.log(allCelebrities);
        res.render("celebrities/celebrities.hbs", {
            allCelebrities
        })
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;