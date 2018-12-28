import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chatbot from "./chatbot/Chatbot.js";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Chatbot />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
