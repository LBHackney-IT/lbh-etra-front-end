import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Meeting from "./Components/Meeting";
import LandingPage from "./Components/LandingPage";

export default function AppRouter() {
    return (
      <Router>
          <Route path="/" exact component={LandingPage} />
          <Route path="/meeting/" component={Meeting} />
      </Router>
    );
  }