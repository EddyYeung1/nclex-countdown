import React, { useEffect, useState, useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Prize from "./Prize";
import axios from "axios";
import homelessAng from "../homelessAng.png";

export default function PrizeContainer() {
  const [prizes, setPrizes] = useState([
    { title: "null", description: "null", point_value: 0, counter: 0 }
  ]);

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

  useEffect(() => {
    axios
      .get("https://mysterious-refuge-34806.herokuapp.com/prizes")
      .then(res => {
        setPrizes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const prizeList = prizes.map((prize, index) => (
    <Col className="small-prize" key={index}>
      <Prize
        id={prize._id}
        title={prize.title}
        description={prize.description}
        pointVal={prize.point_value}
        counter={prize.counter}
      />
    </Col>
  ));

  return (
    <div className="center-h1">
      <h1>
        <img src={homelessAng}></img> 🏆 Prizes 🏆 <img src={homelessAng}></img>
      </h1>
      <Container className="prize-container ">
        {smallScreen ? (
          <div>}>{prizeList}</div>
        ) : (
          <div>
            <Row className="prize-row">{prizeList.slice(0, 3)}</Row>
            <Row className="prize-row">{prizeList.slice(3, 6)}</Row>
            <Row className="prize-row">{prizeList.slice(6, 9)}</Row>
            <Row className="prize-row">{prizeList.slice(9, 13)}</Row>
          </div>
        )}
      </Container>
    </div>
  );
}
