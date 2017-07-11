import React, {Component} from 'react'
import _ from 'lodash'
import { Row,Layout, Menu, Icon, Button} from 'antd'
import Loading from '../../Loading'
import CandidatesTable from '../../component/CandidatesTable'
import LandingHeader from '../../component/BasicLandingHeader'
import '../../App.css'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu

class HMLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline',
      loading: true,
      selectedEJD: 'SSE Front-End',
    }
  }

  componentDidMount() {
   this.setState({loading:false})
  }

  onSelectEJD = (e) => {
    this.setState({
      selectedEJD: e.key,
    })
  }
  
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
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
              onClick={this.onSelectEJD}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub1']}
            >
              <SubMenu
                key='active'
                title={<span><Icon type="file-text" /><span className='nav-text'>Active EJD</span></span>}
              >
                 <Menu.Item key={'SSE Front-End'}>SSE Front-End</Menu.Item>
                 <Menu.Item key={'SE Java'}>SE Java</Menu.Item>
                 <Menu.Item key={'SA .Net'}>SA .Net</Menu.Item>
                
              </SubMenu>
              <SubMenu
                key='closed'
                title={<span><Icon type="close-square" /><span className='nav-text'>Closed EJD</span></span>}
              >
                 <Menu.Item key={'SE Front-End'}>SE Front-End</Menu.Item>
                 <Menu.Item key={'SEE Java'}>SEE Java</Menu.Item>
                 <Menu.Item key={'SA Mobile'}>SA Mobile</Menu.Item>
                
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              {_.isEqual(this.props.role,'manager')?
              <Row type='flex' style={{ height: '100%' }}>
                <Button type="primary" ghost><Icon type="tool" />Define EJD</Button>
                <Button type="primary" ghost><Icon type="edit" />Edit this EJD</Button>
                <Button type="danger" ghost><Icon type="close-circle-o" />Close this EJD</Button>
              </Row>
              :
              null             
              }
              <CandidatesTable selectedEJD={this.state.selectedEJD}/>
                         
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default HMLanding
