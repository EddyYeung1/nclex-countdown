import React, { createContext, useReducer, useEffect } from "react";
//useReducer helps us connect the reducer to the state
import axios from "axios";

const initialState = {
  loading: true,
  error: "",
  user: [{ points: 0, questionsCounter: 0 }]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { loading: false, user: action.payload, error: "" };
    case "FETCH_ERROR":
      return {
        loading: false,
        user: {},
        error: "OOPS"
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then(res => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        points: state.user[0].points,
        questionCounter: state.user[0].questionCounter
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
