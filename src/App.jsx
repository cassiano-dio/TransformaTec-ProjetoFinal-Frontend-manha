import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddItem from './components/add-item.component';
import Item from './components/item.component';
import ItemsList from './components/items-list.component';

class App extends Component {
  render() {

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          <Link to={"/items"} className="navbar-brand">
            Items list
          </Link>

          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/items"} className="nav-link">
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">

          <Routes>
            <Route path="/" element={<ItemsList />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/items/:id" element={<Item />} />
          </Routes>

        </div>
      </div>
    )

  }
}

export default App;
