import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./components/App";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";

const App = lazy(() => import("./components/App"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));

import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase"

import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser, clearUser, cacheUserData } from "./actions";
import rootReducer from "./reducers";
import Spinner from "./Spinner";

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
  componentDidMount() {
    document.title = 'Secret Society';

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });

    const userList = []

    firebase.database().ref('users')
      .on('child_added', snap => {
        const data = {
          userId: snap.key,
          userData: snap.val()
        }

        userList.push(data);
        this.props.cacheUserData(userList);
      });

    firebase.database().ref('users')
      .on('child_changed', snap => {
        const data = {
          userId: snap.key,
          userData: snap.val()
        }

        const updatedData = userList.reduce((acc, user) => {
          if (user.userId === data.userId) {
            acc.push(data);
          } else {
            acc.push(user);
          }

          return acc;
        }, []);
        this.props.cacheUserData(updatedData);
      });
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

const mapStatesToProps = (state) => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStatesToProps, { setUser, clearUser, cacheUserData })(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>
  , document.getElementById("root"));
registerServiceWorker();
