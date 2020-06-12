import React from 'react'
import classnames from 'classnames'
/**
 * 提示
 * 成功success
 * 失败danger
 */
class FlashMessage extends React.Component{
    onClick=()=>{
        this.props.deleteFlashMessage(this.props.message.id)
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.deleteFlashMessage(this.props.message.id)
        },1000)
    }
    render(){
        /**
         * 提示类型
         * type
         * 提示信息
         * text
         */
        const {type,text} = this.props.message
        return(
            <div className={classnames('alert',{
                'alert-success':type === 'success',
                'alert-danger':type === 'danger'
            })}>
            <button onClick={this.onClick} className="close">&times;</button>
                {text}
            </div>
        )
    }
}

export default FlashMessage