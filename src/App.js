import React from "react"
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import Cocktails from "./Pages/Cocktails";


class App extends React.Component {
  state = {

  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <SearchBar />
        <div className="container">
          <Cocktails />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
