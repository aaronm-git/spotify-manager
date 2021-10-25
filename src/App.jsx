import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Header from "./components/global/Header";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/Dashboard";
const App = () => {
  const loggedIn = false;
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/authenticate" />}
        </Route>
        <Route path="/dashboard">{loggedIn ? <Dashboard /> : <Redirect to="/authenticate" />}</Route>
        <Route path="/authenticate">{!loggedIn ? <Authenticate /> : <Redirect to="/" />}</Route>
      </Switch>
    </Router>
  );
};

export default App;
