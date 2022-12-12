import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Login />
      <Signup />
      <Profile />
      <CreateQuote />
    </div>
  );
}

export default App;
