import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Meeting from "./Components/Meeting";
import LandingPage from "./Components/LandingPage";
import TokenLoader from "./TokenLoader";
import ETRAMeeting from "./Components/ETRA/ETRAMeeting";
import ETRALandingPage from "./Components/ETRA/ETRALandingPage";

export default function AppRouter() {
  return (
    <Router>
      <Route component={TokenLoader} />
      <Route path="/" exact component={LandingPage} />
      <Route path="/etra/" exact component={ETRALandingPage} />
      <Route path="/etra/savemeeting/" component={ETRAMeeting} />
      <Route path="/meeting/" component={Meeting} />
    </Router>
  );
}
