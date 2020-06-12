import React from 'react'
import { connect } from 'react-redux'
import { addFlashMeeage } from '../../actions/flashmessage'
import { withRouter } from 'react-router-dom'

//高阶组价
export default function(ComposedComponent){
    class Authenticate extends React.Component{
        UNSAFE_componentWillMount(){
            if(!this.props.isAutenticated){
                this.props.addFlashMeeage({
                    type:"danger",
                    text:"请先登录"
                })
                this.props.history.push("/login")
            }
        }
        UNSAFE_componentWillUpdate(nextProps){
            if(!nextProps.isAutenticated){
                this.props.history.push("/login")
            }
        }
        render(){
            return(
                <ComposedComponent {...this.props}></ComposedComponent>
            )
        }
    }

    const mapStateToProps = (state)=>{
        return{
            isAutenticated:state.auth.isAutenticated
        }
    }

    return withRouter(connect(mapStateToProps,{addFlashMeeage})(Authenticate))
}