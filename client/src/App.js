import React, { Component } from "react";

import NavBar from "./Components/layout/NavBar";
import Footer from "./Components/layout/Footer";
import Landing from "./Components/layout/Landing";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
