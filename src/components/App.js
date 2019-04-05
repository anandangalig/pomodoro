import React from 'react';
import CountCompleted from './CountCompleted';
import Work from './Work';
import Break from './Break';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pomodorosCount: 0, takingBreak: false };
    this.onWorkComplete = this.onWorkComplete.bind(this);
    this.onBreakComplete = this.onBreakComplete.bind(this);
  }

  onWorkComplete = () => {
    this.setState({
      pomodorosCount: this.state.pomodorosCount + 1,
      takingBreak: true,
    });
  };

  onBreakComplete = () => {
    this.setState({
      takingBreak: false,
    });
  };

  _renderComponent = () => {
    if (this.state.takingBreak) {
      return <Break onBreakComplete={this.onBreakComplete} />;
    } else {
      return <Work onWorkComplete={this.onWorkComplete} />;
    }
  };
  render = () => {
    return (
      <div className="ui center aligned container">
        <div className="ui centered card">
          <div className="content">
            <CountCompleted pomodorosCount={this.state.pomodorosCount} />
            {this._renderComponent()}
            <audio id="breakSound" preload="auto">
              <source src="./assets/notification_sound.mp3" type="audio/mpeg" />
            </audio>
            <audio id="workSound" preload="auto">
              <source src="./assets/smb_powerup.wav" type="audio/wav" />
            </audio>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
