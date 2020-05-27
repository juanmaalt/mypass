import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import App from "./pages/app";

import "./assets/css/app.css";

let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

render(
  <Provider store={store}>
    <HashRouter>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
