import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Productos from "../src/pages/productos/Productos"
import Categoria from "../src/pages/categoria/Categorias"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Productos} />
          <Route path="/api/agregar" component={Categoria}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
