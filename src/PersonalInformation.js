import React, { Component } from 'react'
import _ from 'lodash'
import { Layout, Row, Col } from 'antd'
import Loading from './Loading'
import { getData } from './firebase'
import ProfilePersonalPage from './ProfilePersonalPage'
import Avatar from 'react-avatar'

const { Content } = Layout

export default class PersionalInformation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      projectInformation: []
    }
  }

  findManagerInformation = (allProjects, id) => {
    const projectInfo = _.find(allProjects, (project) => {
      return _.some(project.members, (value) => _.isEqual(value, _.toNumber(id)))
    })
    this.setState({
      projectInformation: projectInfo
    })

  }


  filterUndifinedObjects = (objects) =>
    _.filter(objects, (o) => { return _.isObject(o) })


  componentWillMount() {
    getData(`BU_projects`).then((data) => this.findManagerInformation(data, this.props.id))

    Promise.all([getData(`profiles/${this.props.id}/preCompetencies`), getData(`profiles/${this.props.id}/competencies`)])
      .then(([previousCompetenciesData, currentCompetenciesData]) => this.setState({
        previousCompetencies: this.filterUndifinedObjects(_.concat(previousCompetenciesData.required, previousCompetenciesData.custom)),
        currentCompetencies: this.filterUndifinedObjects(_.concat(currentCompetenciesData.required, currentCompetenciesData.custom)),
        loading: false
      }))
  }

  render() {
    if (this.state.loading) return <div style={{ height: 600 }}><Loading /> </div>
    return (
      <div>
        <Layout>
          <Row type='flex' justify='space-between' style={{ height: '100%' }}>
            <Content style={{ margin: '0 40px' }}>
              
              <Row>
                {
                  (_.isEmpty(this.state.previousCompetencies) && _.isEmpty(this.state.currentCompetencies)) ? 'you have not completed any self - assessment' : <ProfilePersonalPage
                    id={this.props.id}
                    previousCompetencies={this.state.previousCompetencies}
                    currentCompetencies={this.state.currentCompetencies}
                    projectInformation={this.state.projectInformation}
                  />
                }
              </Row>

            </Content>
          </Row>
        </Layout>
      </div>
    )
  }
}