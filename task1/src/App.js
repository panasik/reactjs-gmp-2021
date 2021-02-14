import logo from './logo.svg';
import './App.css';
import React from 'react';
import SimpleComponent from './components/SimpleComponent';
import SimplePureComponent from './components/SimplePureComponent';
import SimpleFunctionalComponent from './components/SimpleFunctionalComponent';

function App() {
  return (
    <div className="App">
      Hello world.
      {React.createElement(
        "div", [], "Hello world from React.createElement"
      )}
      <SimpleComponent/>
      <SimplePureComponent/>
      <SimpleFunctionalComponent/>
    </div>
  );
}

export default App;
