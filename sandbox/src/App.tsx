import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Main from './Main';

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path='/:page' component={Main}/>
					<Route path='/'>
						<Redirect to='/Gallery'/>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
