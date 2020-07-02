const router = require("express").Router();
let Prize = require("../models/prizes.model");

router.route("/").get((req, res) => {
  Prize.find()
    .then(prizes => res.json(prizes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const point_value = req.body.point_value;
  const counter = req.body.counter;

  const newPrize = new Prize({
    title,
    description,
    point_value,
    counter
  })

  newPrize.save()
    .then(res.json("Prize added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Prize.findById(req.params.id)
    .then(prize => {
      prize.counter = req.body.counter;

      prize
        .save()
        .then(() => res.json("Prize updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("error: " + err));
});

module.exports = router;
