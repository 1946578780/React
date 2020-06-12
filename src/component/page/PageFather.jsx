import React from 'react'
import App from './App'
import WeaTher from './WeaTher'
import WeaTherAnsicht from './WeaTherAnsicht'
import { Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux'
import * as mapWeathere from '../../actions/mapWeathere.js'
// mapWeather={this.props.mapWeather}
class PageFather extends React.Component{
    render(){
        return(
            <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={20}>
                        <WeaTher mapWeather={this.props.mapWeather}/>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <App />
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <WeaTherAnsicht/>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        mapWeather: bindActionCreators(mapWeathere,dispatch)
    }
}

export default connect(null,mapDispatchToProps)(PageFather)

