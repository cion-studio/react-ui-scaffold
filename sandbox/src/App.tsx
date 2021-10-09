import React from 'react';
import './App.css';
import {QuickTable, QuickTableHeaders} from '../../dist'
import FAKE_DATA from './fakeTabledata';

function App() {
  
  const headers:QuickTableHeaders = {
    id: {title: 'ID'},
    name: {title: 'Name', width: 240},
    name2: { title: 'Name', width: 500},
    name3: {title: 'Name', width: 500},
    name4: { title: 'Name', width: 500},
    name5: {title: 'Name'},
    name6: {title: 'Name'},
    name7: {title: 'Name'},
    name8: {title: 'Name'},
    name9: {title: 'Name'},
    name10: {title: 'Name'},
  }
  
  return (
    <div className="App">
      <QuickTable
        headers={headers}
        data={FAKE_DATA}
        primaryKey={'id'}
        hover
      />
    </div>
  );
}

export default App;
