import React, {Component} from 'react'
import _ from 'lodash'
import { Layout, Menu, Row, Col, Avatar, Badge, Dropdown,Icon } from 'antd'
import '../App.css'
import logo from '../logo.png'

class LandingHeader extends Component {
  state = {
    current: 'home',
  }
  notificationPopover = (
  <Menu>
    <Menu.Item key="0">
      <p>Luan Vuong has just finished assessment, please do something</p>
    </Menu.Item>
    <Menu.Item key="1">
      <p>Luan Vuong has just finished assessment, please do something</p>
    </Menu.Item>
    <Menu.Item key="2">
      <p>Luan Vuong has just finished assessment, please do something</p>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Close</Menu.Item>
  </Menu>
  );

  userAvatarPopover = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Settings</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">About</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
  );

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Row type='flex' justify='space-between' style={{height: 60}}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          <img alt='logo' src={logo} style={{height: 64, padding: 10}}/>
        </Col>
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Icon type="home" />Home
        </Menu.Item>
        <Menu.Item key="assessment">
          <Icon type="mail" />Assessment
        </Menu.Item>
        <Menu.Item key="baseline">
          <Icon type="tool" />Baseline
        </Menu.Item>
        <Menu.Item key="sync">
          <Icon type="sync" />Sync Profiles
        </Menu.Item>
        <Menu.Item key="report">
          <Icon type="area-chart" />View Report
        </Menu.Item>
      </Menu>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <Dropdown overlay={this.notificationPopover} trigger={['click']}>
            <Badge count={5}>
              <Avatar src="http://www.adsmurai.com/wp-content/uploads/2015/01/notification-outline.png" />
            </Badge>
          </Dropdown>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <Dropdown overlay={this.userAvatarPopover}>
            <Badge>
              <Avatar src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" />
            </Badge>
          </Dropdown>  
        </Col>
      </Row>
    )
  }
}

export default LandingHeader