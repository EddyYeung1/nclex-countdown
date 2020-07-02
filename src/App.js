import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Countdown from "./components/Countdown";
import QuestionProg from "./components/QuestionProg";
import { GlobalContextProvider } from "./context/GlobalState";
import PrizeContainer from "./components/PrizeContainer"

function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <Nav />
        <Countdown />
        <QuestionProg />
        <PrizeContainer />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
