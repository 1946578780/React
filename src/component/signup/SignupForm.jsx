import React from 'react'
import classnames from 'classnames'
//导出时需使用withRouter(组件名称)
import {withRouter} from 'react-router-dom'
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            passwordConfirmation: "",
            errors: {},
            isLoading: false,
            invalid:false
        }
    }
    //获取输入的文本获取目标value添加给目标name
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //提交时发送请求
    onSubmit = (e) => {
        //阻止默认行为 
        e.preventDefault()
        this.setState({errors:{},isLoading:true})
        //调用父组件的传来的signupActions
        this.props.signupActions.userSignupRequest(this.state).then(
            () => { 
                //加入rudex
                this.props.flashMessage.addFlashMeeage({
                    type:"success",
                    text:"注册成功！"
                })
                //若不使用withRouter则要在挂载路由组件中传递history={this.props.history}
                this.props.history.push("/")
            },
            ({ response }) => { this.setState({
                errors:response.data,
                isLoading:false
            })}
        )
    }
    //用户名存在
    checkUserExists=(e)=>{
        const field = e.target.name;
        const val = e.target.value;
        let invalid;
        if(val !== ""){
            this.props.signupActions.isUserExists(val).then(res=>{
                let errors = this.state.errors;
                if(res.data[0]){
                    errors[field] = "用户名存在:" + val;
                    invalid = true  //成功时按钮为true
                }else{
                    errors[field] = "";
                    invalid = false
                }
                this.setState({errors,invalid})
            })
        }
    }
    render() {
        const {errors,isLoading,invalid} = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Join our community</h1>
                    
                    <div className="form-group">
                        <label className="control-label">username</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                            onBlur={this.checkUserExists}
                            className={classnames('form-control',{'is-invalid':errors.username})}
                        />
                        { errors.username && <span className="form-text text-muted">{errors.username}</span> }
                    </div>

                    <div className="form-group">
                        <label className="control-label">email</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            className={classnames('form-control',{'is-invalid':errors.email})}
                        />
                        { errors.email && <span className="form-text text-muted">{errors.email}</span> }
                    </div>

                    
                    <div className="form-group">
                        <label className="control-label">password</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            className={classnames('form-control',{'is-invalid':errors.password})}
                        />
                        { errors.password && <span className="form-text text-muted">{errors.password}</span> }
                    </div>

                    <div className="form-group">
                        <label className="control-label">passwordConfirmation</label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            value={this.state.passwordConfirmation}
                            onChange={this.onChange}
                            className={classnames('form-control',{'is-invalid':errors.passwordConfirmation})}
                        />
                        { errors.passwordConfirmation && <span className="form-text text-muted">{errors.passwordConfirmation}</span> }
                    </div>

                    <div className="form-group">
                        <button disabled={isLoading || invalid} className="btn btn-primary btn-lg">注册</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(SignupForm)