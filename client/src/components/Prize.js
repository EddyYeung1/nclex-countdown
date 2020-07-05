import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

export default function Prize({ title, pointVal, description, counter, id }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { points, questionCounter } = useContext(GlobalContext);

  const newCount = counter - 1;
  const newPoints = points - pointVal;

  const redeemPrize = e => {
    e.preventDefault();

    const updatePrize = {
      counter: counter - 1
    };

    const updatePoints = {
      points: points - pointVal,
      questionCounter: questionCounter
    };

    axios
      .post(`https://mysterious-refuge-34806.herokuapp.com/prizes/update/${id}`, updatePrize)
      .then(res => console.log("Successfully updated prize"))
      .catch(err => console.log(err));

    axios
      .post(
        "https://mysterious-refuge-34806.herokuapp.com/users/update/5ef6ae16e68a8e7b13e84842",
        updatePoints
      )
      .then(res => console.log("Successfully updated user"))
      .catch(err => console.log(err));

    window.location = "/";
  };

  if (error) {
    return (
      <Alert variant="danger" onClose={() => setError(false)} dismissible>
        <Alert.Heading>Nice Try Slick</Alert.Heading>
        <p>
          You either don't have enough points or you can't redeem this prize
          anymore. 😑
        </p>
      </Alert>
    );
  }

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Are you sure?</Alert.Heading>
        <p>
          This action is reversible, but I don't want to have to change it
          manually on the back end so make up your damn mind now.
        </p>
        <Button onClick={redeemPrize}>Yes</Button>
      </Alert>
    );
  }

  return (
    <Card className="prize">
      <Card.Header style={{ borderBottomColor: "#66cf8c" }}>
        {" "}
        <strong>
          {pointVal} Pts <span style={{ float: "right" }}>{counter} left</span>
        </strong>
      </Card.Header>
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          className="prize-button"
          onClick={() => {
            if (newCount < 0 || newPoints < 0) {
              setError(true);
            } else {
              setShow(true);
            }
          }}
        >
          Redeem
        </Button>
      </Card.Body>
    </Card>
  );
}
