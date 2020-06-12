// import { Menu } from 'antd';
import React from 'react'

import fatheruser from '../showuser/fatheruser'
import Bar from '../echarts/Bar'
import Line from '../echarts/Line'
import Pie from '../echarts/Pie'
import DAnsicht from '../echarts/DAnsicht'
import PageFather from '../page/PageFather'
import moment from 'moment';
import { Link, Route } from 'react-router-dom'

import { PageHeader, Button, Descriptions,Space  } from 'antd';
import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


class UserPageChild extends React.Component {
  // submenu keys of first level
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  constructor(props) {
    super(props);
    this.state = {
      WeatherLists: {},
      dates: "",
      mapAddRess: "",
      Weather: {}
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        dates: moment().format("YYYY-MM-DD HH:mm:ss")
      }, () => { })
    }, 1000)
    // });
  }
  componentWillMount() {
    /*通过百度地图获取当前位置城市信息*/
    this.props.mapWeatherLists.Weathere().then((res) => {
      this.setState({
        mapAddRess: res.data.result.location,
        Weather: res.data.result.now
      })
    })
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }
  render() {
    const { username } = this.props.userData.user
    const { mapAddRess, Weather } = this.state
    return (
      <div>
        <div
          style={{
            backgroundColor: '#F5F5F5',
            padding: 24,
          }}
        >
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Title"
            subTitle="This is a subtitle"
            extra={[
              <Button key="3">Operation</Button>,
              <Button key="2">Operation</Button>,
              <Button key="1" type="primary">
                Primary
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="登录用户"><div>{username}</div></Descriptions.Item>
              {/* <Descriptions.Item label="Association">
                <a>嗷嗷嗷</a>
              </Descriptions.Item> */}
              <Descriptions.Item label="地址">
                <Space >
                  <span>{mapAddRess.province}</span> 
                  <span>{mapAddRess.name}</span> 
                  <span>{Weather.text}</span> 
                  <span>温度{Weather.temp}℃</span> 
                  <span>{Weather.wind_dir}</span> 
                  <span>{Weather.wind_class}</span> 
                </Space >
              </Descriptions.Item>
              <Descriptions.Item label="时间">{this.state.dates}</Descriptions.Item>
              <Descriptions.Item label="Remarks">
                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>

        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span><Link to="/userpage/pagefather">首页</Link></span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span><Link to="/userpage/userdata">用户数据</Link></span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>统计图</span>
                  </span>
                }
              >
                <Menu.Item key="3"><Link to="/userpage/bar">柱状图</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/userpage/line">折线图</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/userpage/pie">饼图</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/userpage/dansicht">3D可视化数据</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>商品管理</span>
                  </span>
                }
              >
                <Menu.Item key="6">商品添加</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route path="/userpage/userdata" component={fatheruser}></Route>
                <Route path="/userpage/pagefather" component={PageFather}></Route>
                <Route path="/userpage/bar" component={Bar}></Route>
                <Route path="/userpage/line" component={Line}></Route>
                <Route path="/userpage/pie" component={Pie}></Route>
                <Route path="/userpage/dansicht" component={DAnsicht}></Route>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default UserPageChild
