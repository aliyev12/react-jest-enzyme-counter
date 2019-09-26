import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  render() {
    return (
      <div data-testid="component-app" className='App'>
        <h1 data-testid="counter-display" className="display">
          The counter is currently ↕<span className="num">{this.state.counter}</span>
        </h1>
        <button
          data-testid="increment-button"
          onClick={() =>
            this.setState(state => ({ counter: state.counter + 1 }))
          }
        >
          Increment counter +
        </button>
        <button
          data-testid="decrement-button"
          onClick={() =>
            this.setState(state => ({ counter: state.counter - 1 }))
          }
        >
          Decrement counter -
        </button>
      </div>
    );
  }
}

export default App;
