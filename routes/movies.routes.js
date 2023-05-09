// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require our models:
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

// all your routes here
// GET "/movies/create" => Render a form to create new movie:
router.get("/create", (req, res, next) => {
    // Get all the celebrities so we can then render them as options on the "cast" field of the form:
    Celebrity.find()
    .then((allCelebrities) => {
        console.log(allCelebrities);
        res.render("movies/new-movie.hbs", {
            allCelebrities
        })
    })
    .catch((err) => {
        next(err);
    })

    
})

// POST "/movies/create" => Gets info from a movie and adds it to the DB:
router.post("/create", (req, res, next) => {
    // console.log(req.body);
    // Destructure req.body:
    const {title, genre, plot, cast} = req.body
    // Add new movie to the DB:
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then(() => {
        console.log("Movie created!");
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })
})

// GET "/movies" => Show all movies:
router.get("/", (req, res, next) => {
    // Get all the movies from the DB:
    Movie.find()
    .then((allMovies) => {
        // console.log(allMovies);
        res.render("movies/movies.hbs", {
            allMovies
        });
    })
    .catch((err) => {
        next(err)
    })
})

// GET "/movies/:id" => Show a specific movie by its ID:
router.get("/:id", (req, res, next) => {
    // console.log(req.params)
    // Search the DB for a movie with this id:
    Movie.findById(req.params.id)
    .populate("cast") // Populate the cast property(array of objects) with the celebreties (by their ID)
    .then((singleMovie) => {
        console.log(singleMovie);
        res.render("movies/movie-details.hbs", {
            singleMovie
        })
    })
    .catch((err) => {
        next(err)
    })
})

// POST "/movies/:id/delete" => Delete a specific movie by its id:
router.post("/:id/delete", (req, res, next) => {
    // Find movie by its id and delete it:
    Movie.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })
})

// GET "/movies/:id/edit" => Show a form to edit the movie by its ID:
router.get("/:id/edit", (req, res, next) => {
    // console.log(req.params);
    Movie.findById(req.params.id)
    .populate("cast")
    .then((singleMovie) => {
        // console.log(singleMovie);
        Celebrity.find()
        .then((allCelebrities) => {
            console.log(allCelebrities);
            // Let's only pass the celebrities that are on the cast:
            let castArray = []
            // console.log(singleMovie.cast);
            singleMovie.cast.forEach((eachCast) => {
                // console.log(eachCast);
                allCelebrities.forEach((eachCelebrity) => {
                    if (eachCast.name === eachCelebrity.name){
                        castArray.push(eachCelebrity)
                    }
                    // console.log(eachCelebrity);
                })
            })
            
            // console.log(castArray);
            res.render("movies/edit-movie.hbs",{
                singleMovie,
                castArray
            })
                
        })
    })
    .catch((err) => {
        next(err)
    })
})


// POST "/movies/:id/edit" => Send the updated movie info to the DB:
router.post("/:id/edit", (req, res, next) => {
    // console.log(req.body);
    // Destructure the object so then we update it on the DB:
    const {title, genre, plot, cast} = req.body;
    // Add it to the DB:
    Movie.findByIdAndUpdate(req.params.id, {
        title,
        genre,
        plot,
        cast
    }, {new: true})
    .then(() => {
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;