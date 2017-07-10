import React, {Component} from 'react'
import _ from 'lodash'
import { Layout, Menu, Row, Col, Avatar, Badge, Dropdown } from 'antd'
import AddNewProfilePopup from '../AddNewProfilePopup'
import '../App.css'
import logo from '../logo.png'

class LandingHeader extends Component {
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

  render() {
    return (
      <Row type='flex' justify='space-between' style={{height: '100%'}}>
        <Col xs={18} sm={18} md={18} lg={18} xl={18}>
          <img alt='logo' src={logo} style={{height: 64, padding: 10}}/>
        </Col>
        <Col style={{paddingRight: 20}} span={4}>
          <AddNewProfilePopup />
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