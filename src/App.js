

import React, {Component} from 'react';
import Routers from './RouterFlux/Routers';
import { createStore , applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import Reducer from './Redux/Reducer/Index'
import ReduxThunk from 'redux-thunk'
import firebase from '@firebase/app'
import 'firebase/database'
import 'firebase/auth'



export default class App extends Component {
 
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyAJRm_WxsCCdnO3MHh4AHna2gqg1XAXyV8",
      authDomain: "space-8b768.firebaseapp.com",
      databaseURL: "https://space-8b768.firebaseio.com",
      projectId: "space-8b768",
      storageBucket: "space-8b768.appspot.com",
      messagingSenderId: "278771642305"};
    firebase.initializeApp(config);
  }
  
  render() {
   
    return (
      <Provider store={createStore(Reducer,{},applyMiddleware(ReduxThunk))}>
        <Routers />
      </Provider>
    );
  }
}
