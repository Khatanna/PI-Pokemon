import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./components/Home";
import Form from "./components/Form";
import Pokemon from "./components/Pokemon";
import NavBar from "./components/NavBar";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <NavBar />
        <Routes>
          <Route index element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Form />} />
          <Route path="/home/:id" element={<Pokemon />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
