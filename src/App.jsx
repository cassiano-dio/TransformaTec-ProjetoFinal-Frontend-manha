import React, {Component} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AddItem from "./components/add-item.component";
import Item from "./components/item.component";
import ItemsList from "./components/items-list.component";

class App extends Component {

  render() {
    return(
        <div>

          <nav className="navbar navbar-expand navbar-dark bg-dark">
            
            <Link to={"/items"} className="navbar-brand">
              Lista de Itens
            </Link>
            
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/items"} className="nav-link">
                  Itens
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Novo Item
                </Link>
              </li>
            </div>

          </nav>

          <div className="container mt-3">

            <Routes>
              <Route path="/" element={<ItemsList/>} />
              <Route path="/items" element={<ItemsList />}/>
              <Route path="/add" element={<AddItem />} />
              <Route path="/items/:id" element={<Item />} />
            </Routes>

          </div>
        </div>
    );
  }
}

export default App;