import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/chats" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
