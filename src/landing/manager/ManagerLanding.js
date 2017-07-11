import React, {Component} from 'react'
import _ from 'lodash'
import { Layout, Menu, Icon, Row, Col, Avatar, Badge, Popover, Button, Dropdown } from 'antd'
import Loading from '../../Loading'
import AddNewProfilePopup from '../../AddNewProfilePopup'
import LandingHeader from '../../component/BasicLandingHeader'
import '../../App.css'
import logo from '../../logo.png'
import {getData} from '../../firebase'
import GroupManagement from '../../GroupManagement'
import {Link} from 'react-router-component'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu

class ManagerLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline',
      loading: true
    }
  }

  componentDidMount() {
    Promise.all([getData('baseline'), getData('BU_projects'), getData('profileList')]).then(([baseline, projectList, profileList]) =>
      this.setState({
        baseline: _.map(baseline, (base) =>({name: base.name, competencies: _.flatten([base.Kms_core.competencies, base.Kms_optional.competencies])})),
        profileList,
        projectList,
        test:baseline,
        selectedProject: _.first(Object.keys(projectList)),
        selectedProfile: _.first(Object.keys(profileList)),
        loading: false
      })
    )
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    })
  }

  onSelectProject = (e) => {
    this.setState({
      selectedProject: e.key,
    })
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <Layout style={{height: '100%'}}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <LandingHeader />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme='dark'
              mode={this.state.mode}
              onClick={this.onSelectProject}
              selectedKeys={[this.state.selectedProject]}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub1']}
            >
              <SubMenu
                key='sub1'
                title={<span><Icon type='database' /><span className='nav-text'>BU - Projects</span></span>}
              >
                {
                  _.map(this.state.projectList, (project, index) => <Menu.Item key={index}>{project.name}</Menu.Item>)
                }
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <GroupManagement
                project={this.state.selectedProject}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default ManagerLanding
