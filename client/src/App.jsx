import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Form from "./components/Form";
import PokemonDetails from "./components/PokemonDetails";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/search/:name" element={<PokemonSearch />} />
      </Routes>
    </Fragment>
  );
}

export default App;
