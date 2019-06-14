import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Meeting from "./Components/Meeting";

function LandingPage(){
    return <h1>Landing Page</h1>
}

export default function AppRouter() {
    return (
      <Router>
          <Route path="/" exact component={LandingPage} />
          <Route path="/meeting/" component={Meeting} />
      </Router>
    );
  }