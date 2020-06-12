import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../actions/login'
import { withRouter } from 'react-router-dom'
class NavigationBar extends React.Component {
    //退出登录状态
    logout(e){
        e.preventDefault();
        //清除token
        this.props.logout()
        this.props.history.push("/login")
    }
    render() {
        const { isAutenticated } = this.props.auth
        const userLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <span className="nav-link" onClick={this.logout.bind(this)}>退出</span>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">注册</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">登录</Link>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg bg-light mb-3">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        {isAutenticated ? userLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps,{logout})(NavigationBar))