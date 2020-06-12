import React from 'react'
import LoginFrom from './LoginFrom'

class LoginPage extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <LoginFrom/>
                </div>
                <div className="col-sm-3"></div>
            </div>
        )
    }
}

export default LoginPage