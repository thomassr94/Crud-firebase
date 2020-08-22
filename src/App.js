import React from 'react';
import Nav from './componentes/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import VerUsuarios from './componentes/VerUsuarios'
import Inicio from './componentes/Inicio';
import Agregar from './componentes/Agregar';
import Contacto from './componentes/Contacto';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Nav />
        <hr />
        <Switch>
          <Route path="/agregar">
            <Agregar />
          </Route>
          <Route path="/ver">
            <VerUsuarios />
          </Route>
          <Route path="/contacto">
            <Contacto />
          </Route>
          <Route exact path="/">
            <Inicio />
          </Route>
        </Switch>
      </div>
    </Router>
      
  );
}

export default App;
