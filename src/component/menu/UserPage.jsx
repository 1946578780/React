// import { Menu } from 'antd';
import React from 'react'
import UserPageChild from './UserPageChild'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as mapWeathere from '../../actions/mapWeathere.js'
class UserPage extends React.Component {
  render() {
    return (
      <div className="UserPageFather">
        <UserPageChild userData={this.props.userData} mapWeatherLists={this.props.mapWeatherLists}/>
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    mapWeatherLists: bindActionCreators(mapWeathere,dispatch)
  }
}

const mapStateToProps=(state)=>{
  return{
    userData:state.auth
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage)
