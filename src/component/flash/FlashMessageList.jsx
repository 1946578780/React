import React from 'react'
import FlashMessage from './FlashMessage'
import { connect } from 'react-redux'//将redux与react绑定
import {deleteFlashMessage} from '../../actions/flashmessage'//将action导入
class FlashMessageList extends React.Component{
    
    render(){
        const messages = this.props.messages.map(message=>
            <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage}/>
        )
        return(
            <div className="container">
                {messages}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        messages:state.flashMessage
    }
}

//通过connect将state中的数据与ation当中的状态绑定到组件
export default connect(mapStateToProps,{deleteFlashMessage})(FlashMessageList)