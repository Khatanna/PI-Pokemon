import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./components/Home";
import Form from "./components/Form";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route index element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Form />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
