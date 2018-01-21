import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Button onClick={this.onButtonClick}>Default</Button>
      </div>
    );
  }

  onButtonClick() {
  }
}

export default App;
