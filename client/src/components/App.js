import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Footer from "./pages/Footer";
import Chatbot from "./chatbot/Chatbot.js";

const App = () => {
  return (
    <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Landing} />
            <Chatbot />
          </div>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default App;
