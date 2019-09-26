import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      showError: false,
      errorText: `Error: Counter can't go below zero!`
    };
  }

  render() {
    return (
      <div data-testid="component-app" className="App">
        <h1 data-testid="counter-display" className="display">
          The counter is currently ↕
          <span className="num">{this.state.counter}</span>
        </h1>
        <div
          data-testid="error-alert"
          className={`error-alert ${
            this.state.showError ? 'show-error' : 'hide-error'
          }`}
        >
          {this.state.errorText}
        </div>

        <button
          data-testid="increment-button"
          onClick={() =>
            this.setState(state => ({ counter: state.counter + 1, showError: false }))
          }
        >
          Increment counter +
        </button>
        <button
          data-testid="decrement-button"
          onClick={() => {
            if (this.state.counter > 0) {
              this.setState(state => ({ counter: state.counter - 1 }));
            } else {
              this.setState({ showError: true });
              setTimeout(() => {
                this.setState({ showError: false });
              }, 3000);
            }
          }}
        >
          Decrement counter -
        </button>
      </div>
    );
  }
}

export default App;
