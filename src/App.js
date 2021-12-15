import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LogIn, Home, Header, Profile, SignUp, Appointments, AppointmentsEdit, Managers } from './components';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/appointments" exact component={Appointments} />
            <Route path="/" exact component={LogIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path='/appointments/:id' component={AppointmentsEdit}/>
            <Route path="/appointmentsList" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/managers" exact component={Managers} />

          </Switch>
      </BrowserRouter>
    </div>
  );
}