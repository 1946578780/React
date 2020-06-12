import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

import logger from 'redux-logger' //监听
import thunk from 'redux-thunk'   //处理异步
import {composeWithDevTools} from 'redux-devtools-extension'  //开发者数据改变视图工具

import { createStore,applyMiddleware } from 'redux';  //创建store，react与redux的关联
import {Provider} from 'react-redux'  //

import rootReducer from './reducers'  //rootReducer返回新的state

import routes from './routes' //引入路由文件
import { BrowserRouter as Router } from 'react-router-dom' //路由插件

import NavigationBar from './component/NavigationBar'//导航栏
import FlashMessageList from './component/flash/FlashMessageList'

import setToken from './utils/validations/setToken' //token状态信息
import {setCurrentUser} from './actions/login'  
import jwtDecode from 'jwt-decode'

//将rootReducer，视图工具，绑定的监听处理异步api创建赋值给store
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger,thunk)));

if(localStorage.jwtToken){
  setToken(localStorage.jwtToken) //将本地数据传入setToken
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}


ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes}>
      <NavigationBar/>
      <FlashMessageList/>
        { routes }
      </Router>
    </Provider>,
  document.getElementById('root')
);
