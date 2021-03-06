import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import User from './components/users/User'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import axios from 'axios'

import GithubState from './context/github/GithubState'


import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  const getUser = async (username) => {
   setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}?
    &client_id=${process.env.REACT_APP_GITFINDER_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITFINDER_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    &client_id=${process.env.REACT_APP_GITFINDER_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITFINDER_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () =>{
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) =>{
    setAlert({msg: msg, type: type })

    setTimeout(()=> setAlert(null), 5000)
  }

    return (
    <GithubState>
    <Router>
      <div className="App">
        <Navbar />
        <div className='container'>
          <Alert alert={alert}/>
          <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search 
              clearUsers={clearUsers} 
              clearButton={users.length > 0 ? true : false}
              showAlert={setAlert}
              />
              <Users/>
            </Fragment>
          )} />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User 
            {...props} 
            getUser={getUser} 
            getUserRepos={getUserRepos} 
            user={user} 
            repos={repos} 
            loading={loading}
            />
          )} />
          </Switch>
        </div>
      </div>
    </Router>
    </GithubState>
    );
  } 

export default App;
