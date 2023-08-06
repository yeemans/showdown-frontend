import Header from "./Components/Header"
import Builder from "./Components/Builder"
import Button from "./Components/Button"
import Home from "./Components/Home"

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Button text="works" />
    </div>
  );
}

export default App
