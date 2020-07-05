import React, { useState, useContext, useLayoutEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

export default function Nav() {
  const { points, questionCounter } = useContext(GlobalContext);
  const [showModal, setModal] = useState(false);
  const [questionsAdded, setQuestions] = useState(questionCounter);

  const onSubmit = e => {
    e.preventDefault();

    const update = {
      points: parseFloat((questionsAdded / 26).toFixed(2)) + points,
      questionCounter: parseInt(questionsAdded) + questionCounter
    };

    axios
      .post(
        "http://localhost:5000/users/update/5ef6ae16e68a8e7b13e84842",
        update
      )
      .then(res => console.log("Successfully updated user"))
      .catch(err => console.log(err));

    window.location = "/";
  };

  const [smallScreen, setSmallScreen] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 416) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [smallScreen]);

  return (
    <Navbar style={{ marginBottom: 40 }}>
      <Navbar.Brand className="pink">Et Rewards</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <div>
          <Navbar.Brand  className="pink">
            Et Points: <span className="green"> {points} </span>
          </Navbar.Brand>
        </div>
        {smallScreen ? (
          ""
        ) : (
          <Button className="add-button" onClick={() => setModal(true)}>Add Points</Button>
        )}

        <Modal size="sm" show={showModal} onHide={() => setModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Get Some Points!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Questions Completed Today</Form.Label>
                <Form.Control onChange={e => setQuestions(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Navbar.Collapse>
    </Navbar>
  );
}
