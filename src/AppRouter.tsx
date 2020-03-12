import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Meeting from "./Components/Meeting";
import LandingPage from "./Components/LandingPage";
import TokenLoader from "./TokenLoader";
import SaveMeetingETRA from "./Components/SaveMeetingETRA";

export default function AppRouter() {
  return (
    <Router>
      <Route component={TokenLoader} />
      <Route path="/" exact component={LandingPage} />
      <Route path="/meeting/" component={Meeting} />
      <Route path="/savemeeting/" component={SaveMeetingETRA} />
    </Router>
  );
}
