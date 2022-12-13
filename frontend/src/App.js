import "./App.css";

import Navbar from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <Navbar />
      {element}

      {/* <Home />
      <Login />
      <Signup />
      <Profile />
      <CreateQuote /> */}
    </div>
  );
}

export default App;
