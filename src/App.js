import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import _ from 'lodash';
import Router from 'react-router-component';
import enUS from 'antd/lib/locale-provider/en_US';
import MainPage from './MainPage';
import SelfAssessment from './SelfAssessment';
import CompareAssessment from './CompareAssessment';
import FinishPage from './FinishPage';
import ProfilePage from './ProfilePage';
import SetWeight from './SetWeight';
import './App.css';


const Locations = Router.Locations;
const Location = Router.Location;

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Locations hash style={{height: '100%'}}>
          <Location path='/' handler={MainPage} />
          <Location path='/finish' handler={FinishPage} />
          <Location path='/selfassessment/:name' handler={SelfAssessment} />
          <Location path='/compare/:name/final' handler={SelfAssessment} />
          <Location path='/:manager/assessment/:name' handler={SelfAssessment} />
          <Location path='/compare/:name' handler={CompareAssessment} />
          <Location path='/:name' handler={ProfilePage} />
          <Location path='/profiles/:profile' handler={ProfilePage} />
          <Location path='/competencies/:name' handler={SetWeight} />
        </Locations>
      </LocaleProvider>
    );
  }
}

export default App;
