const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.points = req.body.points
        user.questionCounter = req.body.questionCounter

        user.save()
        .then(() => res.json("user updated"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("error: " + err))
});

module.exports = router;