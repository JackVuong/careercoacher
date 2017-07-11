import React, { Component } from 'react'
import _ from 'lodash'
import { Layout} from 'antd'
import Loading from '../../Loading'
import '../../App.css'
import { getData } from '../../firebase'
import PersonalInformation from '../../PersonalInformation'
import LandingHeader from '../../component/BasicLandingHeader'

const { Header, Content} = Layout


class EmployeeLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline',
      loading: true
    }
  }

  componentDidMount() {
    Promise.all([getData('baseline'), getData('BU_projects')]).then(([baseline, projectList]) =>
      this.setState({
        baseline,
        projectList,
        selectedProject: _.first(Object.keys(projectList)),
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
      <Layout style={{ height: '100%' }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <LandingHeader />
        </Header>
        <Layout>      
          <Layout>
            <Content style={{ margin: '0 16px' }}>
            <PersonalInformation id={this.props.id}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default EmployeeLanding
