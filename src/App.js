import React from "react"
import Navbar from "./Components/Navbar";
import Cocktails from "./Pages/Cocktails";
import "./index.css"

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Navbar id="navbar" />
        <div id="styling" className="main-color">
          <Cocktails />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
