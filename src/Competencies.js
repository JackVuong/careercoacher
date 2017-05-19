import React, { Component } from 'react';
import { Layout, Modal, Switch, Icon, Button, Input, Row, Col, Select, Table, Card } from 'antd';
import { getData, update, database,getLastIndex } from './firebase';
import _ from 'lodash';
import Loading from './Loading';
import { Router, Link } from 'react-router-component';
const { Header, Content } = Layout;
import logo from './logo.png';

const Option = Select.Option;


class Competencies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: 'Kms_core',
      competencyName: '',
      competenciesKMSCore: [],
      competenciesKmsOptional: [],
      showEditPopup: false,
      optionActivated: false,
      keyUpdate: '',
      showEditPopupKmsOptional: false,
      optionActivatedKmsOptional: false,
      loading : true,
      lastId : 0,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleChangeOptionActivated = this.handleChangeOptionActivated.bind(this);
    this.handleChangeOptionActivatedKmsOptional = this.handleChangeOptionActivatedKmsOptional.bind(this);
  }


  handleSaveActivatedKmsOptional = (e) =>{
     let dataUpdate = {
      "activated": this.state.optionActivatedKmsOptional,
      "name": this.state.competencyName
    }
    update(`competencies1/Kms_optional/${this.state.keyUpdate}`, dataUpdate);
    this.setState({
      showEditPopupKmsOptional: false
    })
  } 

  handleCancelActivatedKmsOptional = (e) =>{
      this.setState({
      showEditPopupKmsOptional: false
    });
  }

  handleChangeOptionActivatedKmsOptional(){
      this.setState({
      optionActivatedKmsOptional: !this.state.optionActivatedKmsOptional
    })
  }

  handleChangeOptionActivated() {
    this.setState({
      optionActivated: !this.state.optionActivated
    })
  }


  handleChangeOption(value) {
    this.setState({
      option: `${value}`
    })
  }


  handleSaveActivated = (e) => {
    let dataUpdate = {
      "activated": this.state.optionActivated,
      "name": this.state.competencyName
    }
    update(`competencies1/Kms_core/${this.state.keyUpdate}`, dataUpdate);
    this.setState({
       showEditPopup: false
    })
  }

  handleCancelActivated = (e) => {

    this.setState({
      showEditPopup: false
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }
  
  addNew(lastIndex, competencyName, option) {
    this.setState({ lastId: parseInt(lastIndex) + 1 })
    let newCompetency = {
      "activated": false,
      "name": competencyName
    }
    update(`competencies1/${option}/${this.state.lastId}`, newCompetency)
  }

  addNewCompetency(competencyName, option) {
    getLastIndex(`competencies1/${option}`).then((lastIndex) => this.addNew(lastIndex, competencyName, option))
  }

  handleChange(e) {
    this.setState({ competencyName: e.target.value });
  }

  handleSave = (e) => {
    this.setState({
      visible: false
    });
    this.addNewCompetency(this.state.competencyName, this.state.option);
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  columnsKMSCore = [{
    title: 'Competency',
    dataIndex: 'kmscore',
    key: 'kmscore',
  }, {
    title: 'Status',
    dataIndex: 'activatedKmscore',
    key: 'activatedKmscore',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => this.onSelectCompetency(record.kmscore)}>Edit</a>
      </span>
    ),
  }];

  onSelectCompetency(name) {
    getData(`competencies1/Kms_core`)
      .then((dataKmsCore) => _.map(dataKmsCore, (competency, key) => {
        if (competency.name === name) {
          getData(`competencies1/Kms_core/${key}`).then((selectedCompetency) => this.setState({
            optionActivated: selectedCompetency.activated,
            keyUpdate: key,
            competencyName: selectedCompetency.name,
            showEditPopup: true
          }))
        }
      }))

  }

  columnsKMSOptional = [{
    title: 'Competency',
    dataIndex: 'kmsoptional',
    key: 'kmsoptional',
  }, {
    title: 'Status',
    dataIndex: 'activatedKmsOptional',
    key: 'activatedKmsOptional',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => this.onSelectKmsOptionalCompetency(record.kmsoptional)}>Edit</a>
      </span>
    ),
  }];

  onSelectKmsOptionalCompetency(name){
     getData(`competencies1/Kms_optional`)
      .then((dataKmsOptional) => _.map(dataKmsOptional, (competency, key) => {
        if (competency.name === name) {
          getData(`competencies1/Kms_optional/${key}`).then((selectedCompetency) => this.setState({
            optionActivatedKmsOptional: selectedCompetency.activated,
            keyUpdate: key,
            competencyName: selectedCompetency.name,
            showEditPopupKmsOptional: true
          }))
        }
      }))
  }

  getCompetencyKMSCore() {
    getData(`competencies1/Kms_core`)
      .then((kmsCoreData) => this.setState({
        competenciesKMSCore: kmsCoreData
      }));
  }

  getCompetencyOptional() {
    getData(`competencies1/Kms_optional`)
      .then((kmsOptionalData) => this.setState({
        competenciesKmsOptional: kmsOptionalData,
        loading : false
      }));
  }

  componentWillMount() {
    this.getCompetencyKMSCore();
    this.getCompetencyOptional();
  }


  render() {
     if (this.state.loading) return <div style={{height: 600}}><Loading /> </div>;
     let dataSourceKMSCore = [];
      _.forEach(this.state.competenciesKMSCore, (item) => {
      let activate;
      if (item.activated === true) {
        activate = "On"
      } else {
        activate = "Off"
      }
      const kmsCoreDataPushTable = {
        kmscore: item.name,
        activatedKmscore: activate,
      }
      dataSourceKMSCore.push(kmsCoreDataPushTable);
     
    })

    let dataSourceKMSOptional = [];
    _.forEach(this.state.competenciesKmsOptional, (item) => {
       let activate;
      if (item.activated === true) {
        activate = "On"
      } else {
        activate = "Off"
      }
      const kmsOptionalDataPushTable = {
        kmsoptional: item.name,
        activatedKmsOptional: activate,
      }
      dataSourceKMSOptional.push(kmsOptionalDataPushTable);
    })

    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row type='flex' justify='space-between' style={{ height: '100%' }}>
            <Col span={4}>
              <img alt='logo' src={logo} style={{ height: 64, padding: 10 }} />
            </Col>
            <Col>
              <Button type="primary" onClick={this.showModal}>Add new compentency</Button>
              <Modal title="Create new compentency" visible={this.state.visible}
                onOk={this.handleSave} onCancel={this.handleCancel}>
                <Input type='text' value={this.state.competencyName} onChange={this.handleChange} />
                <h3>Please choose option: </h3>
                <Select defaultValue={this.state.option} style={{ width: 120 }} onChange={this.handleChangeOption}>
                  <Option value="Kms_core">KMS Core</Option>
                  <Option value="Kms_optional">KMS Optional</Option>
                </Select>
              </Modal>
            </Col>
          </Row>
          <Modal title="Edit activate KMS Core compentency" visible={this.state.showEditPopup}
            onOk={this.handleSaveActivated} onCancel={this.handleCancelActivated}>
            <h3>Activate compentency: </h3>
            <Switch defaultChecked={this.state.optionActivated} onChange={this.handleChangeOptionActivated} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
          </Modal>
          <Modal title="Edit activate KMS Optional compentency" visible={this.state.showEditPopupKmsOptional}
            onOk={this.handleSaveActivatedKmsOptional} onCancel={this.handleCancelActivatedKmsOptional}>
            <h3>Activate compentency: </h3>
            <Switch defaultChecked={this.state.optionActivatedKmsOptional} onChange={this.handleChangeOptionActivatedKmsOptional} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
          </Modal>
          <Row style={{margin :100}}>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Card title="KMS Core" bordered={false} style={{ width: 600 }}>
              <Table columns={this.columnsKMSCore} dataSource={dataSourceKMSCore} />
              </Card>
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={4}></Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Card title="KMS Optional" bordered={false} style={{ width: 600 }}>
              <Table columns={this.columnsKMSOptional} dataSource={dataSourceKMSOptional} />
              </Card>
            </Col>
          </Row>
        </Header>
      </Layout>
    );
  }
}


export default Competencies;
