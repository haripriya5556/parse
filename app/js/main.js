import React from 'react'
import Parse from 'parse'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

// const PARSE_APP_ID = 'appId'
// const PARSE_JS_KEY = 'ojavascriptm5qKALt6Yq2r4qmWoBQo5RnxTmHf2q'
Parse.initialize("Krisappid");
Parse.serverURL = 'http://localhost:1337/parse';

/ Routes components /
import App from './components/App'
import Login from './components/Login'
import Todos from './components/Todos/Todos'
import  Pay from './components/Pay'
// Style
require('./../assets/styles/main.less')

const loginRequired = (nextState, replace) => {
  if (!Parse.User.current()) {
    replace('/login')
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={App} path='/'>
      <Route path='login' component={Login}/>
      <IndexRoute onEnter={loginRequired} component={Todos}/>
      <Route path='/todo/:todoId' component={Todos}/>
      <Route path='Pay' component={Pay}/>
    </Route>
  </Router>
), document.getElementById('app'))
