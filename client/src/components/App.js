import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from "./Header";
import Shop from "./shop/Shop";
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
