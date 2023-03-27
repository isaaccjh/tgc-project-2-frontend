import React from "react"
import Navbar from "./Components/Navbar";
import Cocktails from "./Pages/Cocktails";


class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Cocktails />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
