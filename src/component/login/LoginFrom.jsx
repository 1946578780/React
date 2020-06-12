import React from 'react'
import classnames from 'classnames'
import { login } from '../../actions/login' //引入封装的网络请求
import { connect } from 'react-redux'       
import { withRouter } from 'react-router-dom'
import validataInput from '../../utils/validations/login.js'    //引入非空验证工具文件

class LoginFrom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {},
            isLoading: false
        }
    };
    //获取目标值
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };
    //非空验证
    isValid = (e) => {
        const { errors, isValid } = validataInput(this.state);
        if (!isValid) {
            this.setState({ errors })
        }
        return isValid
    }
    //判断后端查询成功还是失败
    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true })
            this.props.login(this.state).then(
                (res) => this.props.history.push("/userpage/userapp"),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            )
        }
    };
    render() {
        const { username, password, errors, isLoading } = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    {errors.from && <div className="alert alert-danger">{errors.from}</div>}
                    <div className="form-group">
                        <label className="control-label">username</label>
                        <input
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            name="username"
                            className={classnames('form-control', { 'is-invalid': errors.username })}
                        />
                        {errors.username && <span className="form-text text-muted">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label className="control-label">password</label>
                        <input
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            name="password"
                            className={classnames('form-control', { 'is-invalid': errors.password })}
                        />
                        {errors.password && <span className="form-text text-muted">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <button disabled={isLoading} className="btn btn-primary btn-lg">注册</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null, { login })(LoginFrom))