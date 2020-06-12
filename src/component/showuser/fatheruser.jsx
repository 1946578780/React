import React from 'react'
import Childuser from './childuser'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import UserPage from '../menu/UserPage'
import * as flashMessage from '../../actions/flashmessage'
import * as userdata from '../../actions/userdata.js'
class Fatheruser extends React.Component {
    render() {
        return (
            <div>
                <Childuser 
                    userdata={this.props.userdata} 
                    flashMessage={this.props.flashMessage}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        flashMessage: bindActionCreators(flashMessage,dispatch),
        userdata: bindActionCreators(userdata, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(Fatheruser)