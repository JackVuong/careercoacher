import React, {Component} from 'react';
import _ from 'lodash';
import { Layout, Menu, Icon, Row, Col, Button, Modal, Input } from 'antd';
import ProfilePage from './ProfilePage';
import Loading from './Loading';
import './App.css';
import logo from './logo.png';
import {getData} from './firebase';
import GroupManagement from './GroupManagement';

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ClonedMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      mode: 'inline',
      loading: true
    };
  }
  componentDidMount() {
    Promise.all([getData('baseline'), getData('BU_projects')]).then(([baseline, projectList]) =>
      this.setState({
        baseline,
        projectList,
        selectedProject: _.first(Object.keys(projectList)),
        loading: false
      })
    );
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  onSelectProject = (e) => {
    this.setState({
      selectedProject: e.key,
    });
  }
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <Layout style={{height: '100%'}}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row type='flex' justify='space-between' style={{height: '100%'}}>
            <Col span={4}>
              <img alt='logo' src={logo} style={{height: 64, padding: 10}}/>
            </Col>
            <Col style={{paddingRight: 20}}>
              <AddNewProfilePopup />
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark"
              mode={this.state.mode}
              onClick={this.onSelectProject}
              selectedKeys={[this.state.selectedProject]}
            >
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span className="nav-text">BU_projects</span></span>}
              >
                {
                  _.map(Object.keys(this.state.projectList), (project) => <Menu.Item key={project}>{project}</Menu.Item>)
                }
              </SubMenu>
              <Menu.Item key='Report'>
                <span>
                  <Icon type="area-chart" />
                  <span className="nav-text">Report</span>
                </span>
              </Menu.Item>
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
    );
  }
}

class AddNewProfilePopup extends Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    return (
      <div>
        <Button type="primary" size="large" onClick={this.showModal}>
          Add New Group
        </Button>
        <Modal
          visible={this.state.visible}
          title="Add New Group"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Group Name: </p>
          <Input placeholder="Group Name...." />
        </Modal>
      </div>
    );
  }
}

export default ClonedMainPage;
