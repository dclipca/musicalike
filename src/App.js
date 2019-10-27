import React from "react";
import MainScreen from "./screens/MainScreen";
import ResultScreen from "./screens/ResultScreen";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";

const initialState = {
  formValue: "",
  suggestedArtistName: "",
  confirmationRequired: false,
  getSimilarResponse: [],
  resultsReady: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_RESULTS_READY":
      return { ...state, resultsReady: action.payload };
    case "CHANGE_FORM_VALUE":
      return { ...state, formValue: action.payload };
    case "CHANGE_CONFIRMATION_REQUIRED":
      return { ...state, confirmationRequired: action.payload };
    case "CHANGE_SUGGESTED_ARTIST_NAME":
      return { ...state, suggestedArtistName: action.payload };
    case "SEND_GET_SIMILAR_RESPONSE_TO_STATE":
      return {
        ...state,
        getSimilarResponse: action.payload,
        resultsReady: action.payload
      };
    case "REVERSE_IS_SHOW_FOR_PARTICULAR_ARTIST_LIST_ITEM":
      return { ...state, getSimilarResponse: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer);

let AppNavigator = createStackNavigator(
  {
    MainScreen,
    ResultScreen
  },
  { headerMode: "none" }
);

let Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
