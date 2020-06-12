import React from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as signupActions from '../../actions/signupActions.js'//导入请求的api
import * as flashMessage from '../../actions/flashmessage'
class SignupPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SignupForm signupActions={this.props.signupActions} flashMessage={this.props.flashMessage}/>
                </div>
                <div className="col-md-3"></div>
            </div>
        )
    }
}
//接收dispatch作为参数，函数会用到 dispatch 来触发特定的 action。
const mapDispatchToPros = (dispatch) => {
    //bindActionCreators将一个或多个dispatch和action组合成mapDispatchToPros需要的内容
    return {
        signupActions: bindActionCreators(signupActions,dispatch),
        flashMessage: bindActionCreators(flashMessage,dispatch)
    }
}

export default connect(null, mapDispatchToPros)(SignupPage)