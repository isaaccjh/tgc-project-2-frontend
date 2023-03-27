import React from "react"
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import Cocktails from "./Pages/Cocktails";


function App() {
  return (
    <React.Fragment>
      <Navbar />
      <SearchBar />
      <Cocktails />
    </React.Fragment>
  );
}

export default App;
