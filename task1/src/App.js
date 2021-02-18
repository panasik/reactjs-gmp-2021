import './App.css';
import React from 'react';
import SimpleComponent from './components/SimpleComponent.js';
import SimplePureComponent from './components/SimplePureComponent';
import SimpleFunctionalComponent from './components/SimpleFunctionalComponent.js';

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
