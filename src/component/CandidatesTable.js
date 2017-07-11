import React, { Component } from 'react'
import _ from 'lodash'
import {Row, Col, Select, Table, Button} from 'antd'

class CandidatesTable extends Component {
    dataSource = [{
        no: '1',
        name: 'Mike',
        status:'ready-to-interview',
        interviewer: 'none'
    }, {
        no: '2',
        name: 'Luke',
        status:'ready-to-review',
        interviewer: 'cong'
    }];

    columns = [{
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: option => 
        <Select defaultValue={option} style={{ width: 150 }}>
            <Option value="ready-to-interview">Ready to interview</Option>
            <Option value="ready-to-review">Ready to review</Option>
            <Option value="pass">Pass</Option>
            <Option value="fail">Fail</Option>
            <Option value="keep">Keep</Option>
        </Select>
    },{
        title: 'Interviewer',
        dataIndex: 'interviewer',
        key: 'interviewer',
        render: option => 
        <Select defaultValue={option} style={{ width: 120 }}>
            <Option value="none"></Option>
            <Option value="cong">Cong Le</Option>
            <Option value="hiep">Hiep Nguyen</Option>
            <Option value="hieptran">Hiep Tran</Option>
            <Option value="son">Son Tang</Option>
        </Select>
    },{
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
        render:text=> <a href="#">view</a>,
    }];
    render() {
        return (
            <div>
            <Row type='flex' justify='space-between' style={{ height: '100%' }} >
            <Col>
            <label style={{fontSize:30}}>{this.props.selectedEJD}</label>
            </Col>
            <Col>
            <Button type="primary" shape="circle" icon="plus" size='large' />   
            </Col>
            </Row>
            <Table columns={this.columns} dataSource={this.dataSource} />
            </div>
        )
    }
}
export default CandidatesTable