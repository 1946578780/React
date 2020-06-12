import React from 'react'
import { Route } from 'react-router-dom'
// import App from './component/App'
import SignupPage from './component/signup/SignupPage'
import LoginPage from './component/login/LoginPage'
import ShopPage from './component/shop/ShopPage'
// import FatherUser from './component/showuser/fatheruser.jsx'
import UserPage from './component/menu/UserPage'
import requireAuth from './utils/validations/requireAuth'
import Results from './component/result/Results'
export default (
    <div className="">
        <Route path="/userpage" component={requireAuth(UserPage)}></Route>
        <Route path="/signup" component={SignupPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/shop" component={requireAuth(ShopPage)}></Route>
        <Route path="/result" component={Results}></Route>
    </div>
)