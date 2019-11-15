import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Documents from './components/documents/documents';
import Footer from './components/footer/footer';
import Events from './components/events/events';
import Login from './components/admin/login';
import AdminPortal from './components/admin/adminPortal';
import Contact from './components/contact/contact';
import Assistance from './components/assistance/assistance';



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem('token')
    }
  }

  protectedViews = () => {
    if (this.state.token === localStorage.getItem('token') && this.state.token != null) {
      return (
        <div>
          <Switch>
            <Route path='/' exact><Home></Home></Route>
          </Switch>
          <div className='myContainer'>
            <Switch>
              <Route path='/documents' exact><Documents /></Route>
              <Route path='/eventsandmeetings' exact><Events></Events></Route>
              <Route path='/adminlogin' exact><Login></Login></Route>
              <Route path='/adminportal' exact><AdminPortal></AdminPortal></Route>
              <Route path='/contact' exact><Contact></Contact></Route>
              <Route path='/assistance' exact><Assistance/></Route>
            </Switch>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <Switch>
            <Route path='/' exact><Home></Home></Route>
            <Redirect from='/adminportal' to='/' />
          </Switch>
          <div className='myContainer'>
            <Switch>
              <Route path='/documents' exact><Documents /></Route>
              <Route path='/eventsandmeetings' exact><Events></Events></Route>
              <Route path='/contact' exact><Contact></Contact></Route>
              <Route path='/adminlogin' exact><Login></Login></Route>
              <Route path='/assistance' exact><Assistance/></Route>
            </Switch>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Router>
          {this.protectedViews()}
        </Router>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
