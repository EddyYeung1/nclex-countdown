const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //helps up connect to mongodb
const path = require("path");

require("dotenv").config();

const app = express();

const uri = process.env.ATLAS_URI;

//pass in mongoDB connection string, dont worry about flags they just there for some deprecated jawns
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

app.use(cors());
app.use(express.json()); //allows us to parse json

const prizeRouter = require("./routes/prizes");
const usersRouter = require("./routes/users");

app.use("/prizes", prizeRouter);
app.use("/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });
}
const port = process.env.Port || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); //starts server
