import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import _ from 'lodash';
import Router from 'react-router-component';
import enUS from 'antd/lib/locale-provider/en_US';
import ManagerLanding from './landing/manager/ManagerLanding';
import SelfAssessment from './SelfAssessment';
import CompareAssessment from './CompareAssessment';
import FinishPage from './FinishPage';
import ProfilePage from './ProfilePage';
import GroupManagement from './GroupManagement';
import BaselineManagementPage from './BaselineManagementPage';
import './App.css';
import SetWeight from './SetWeight';
import QuestionCompetency from './QuestionCompetency'
import Login from './Login'
import GroupManagementForManager from './GroupManagementForManager'

import EmployeeLanding from './landing/employee/EmployeeLanding'
import AdminLanding from './landing/admin/AdminLanding'
import HMLanding from './landing/hm/HMLanding'


import './App.css';
import './ant-custom.css';

const Locations = Router.Locations;
const Location = Router.Location;

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Locations hash style={{height: '100%'}}>
          <Location path='/' handler={ManagerLanding} />
          <Location path='/personal/:id' handler={EmployeeLanding} />
          <Location path='/finish' handler={FinishPage} />
          <Location path='/selfassessment/:name' handler={SelfAssessment} />
          <Location path='/compare/:name/final' handler={SelfAssessment} />
          <Location path='/:manager/assessment/:name' handler={SelfAssessment} />
          <Location path='/compare/:name' handler={CompareAssessment} />
          <Location path='/profiles/:profile' handler={ProfilePage} />
          <Location path='/projects/:project' handler={GroupManagement} />
          <Location path='/roleProfile' handler={BaselineManagementPage} />
          <Location path='/competencies/:option/:index/:level' handler={SetWeight} />
          <Location path='/admin' handler={AdminLanding} />
          <Location path='/hm/:role' handler={HMLanding} />
          <Location path='/competencies/:option/:index' handler={QuestionCompetency} />
          <Location path='/login' handler={Login}/>
          <Location path='/project/:id' handler={GroupManagementForManager}/>
        </Locations>
      </LocaleProvider>
    );
  }
}

export default App;
