import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ToggleColorMode from "./components/Darkmode/DarkMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <Provider store={store}>
      <BrowserRouter>
    
        <App />
      </BrowserRouter>
    </Provider>
 
);

reportWebVitals();
