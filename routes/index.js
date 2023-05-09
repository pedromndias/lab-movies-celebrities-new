const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Import router from our movies routes file:
const movieRouter = require("./movies.routes");
// And use it:
router.use("/movies", movieRouter);

// Import router from our celebrities routes file:
const celebrityRouter = require("./celebrities.routes");
// And use it:
router.use("/celebrities", celebrityRouter);

module.exports = router;
