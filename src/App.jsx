import React, {Component, useEffect, useState} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component"
import Register from "./components/register.component";
import Profile from "./components/user-profile.component";
import Home from "./components/home.component";

// import AddItem from "./components/add-item.component";
// import Item from "./components/item.component";
// import ItemsList from "./components/items-list.component";

import EventBus from "./common/event-bus";


const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user){
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });


  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  }

  return (
    <div>
      <nav className="navbar navbar-expand">

        <Link to={"/"} className="navbar-brand">
          Lista de Itens
        </Link>

        <div className="navbar-nav mr-auto">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">

          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>

      </div>
    </div>
  )
}

export default App;


// class App extends Component {

//   render() {
//     return(
//         <div>

//           <nav className="navbar navbar-expand navbar-dark bg-dark">
            
//             <Link to={"/items"} className="navbar-brand">
//               Lista de Itens
//             </Link>
            
//             <div className="navbar-nav mr-auto">
//               <li className="nav-item">
//                 <Link to={"/items"} className="nav-link">
//                   Itens
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/add"} className="nav-link">
//                   Novo Item
//                 </Link>
//               </li>
//             </div>

//           </nav>

//           <div className="container mt-3">

//             <Routes>
//               <Route path="/" element={<ItemsList/>} />
//               <Route path="/items" element={<ItemsList />}/>
//               <Route path="/add" element={<AddItem />} />
//               <Route path="/items/:id" element={<Item />} />
//             </Routes>

//           </div>
//         </div>
//     );
//   }
// }

// export default App;