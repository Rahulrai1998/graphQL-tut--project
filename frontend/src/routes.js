import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import OthersProfile from "./components/OthersProfile";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:userId", element: <OthersProfile /> },
  { path: "*", element: <NotFound /> }
];
