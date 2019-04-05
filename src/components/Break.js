import React from 'react';

class Break extends React.Component {
  state = {
    intervalID: null,
    timerGoing: false,
    defaultTime: '5:00',
  };

  startTimer = () => {
    const self = this; // to preserve this inside setInterval
    const countDownTo = Math.round(new Date().getTime() / 1000) + 0.1 * 60;

    const timerID = setInterval(function() {
      const now = Math.round(new Date().getTime() / 1000);
      // Find the secondsLeft between now and the count down date
      const secondsLeft = countDownTo - now;
      const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
      const seconds = Math.floor(secondsLeft % 60);

      document.querySelector('#breakTimer').innerHTML = '<h2>' + minutes + ':' + seconds + '</h2>';

      if (secondsLeft < 1) {
        document.querySelector('#breakSound').play();
        clearInterval(timerID);
        self.setState({ intervalID: null, timerGoing: false });
        self.props.onBreakComplete();
      }
    }, 1000);

    this.setState({ intervalID: timerID, timerGoing: true });
  };

  resetTimer = () => {
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
      this.startTimer();
    }
  };

  printButton = () => {
    if (this.state.timerGoing) {
      return (
        <div onClick={this.resetTimer} className="ui  yellow animated button">
          <div className="visible content">Reset</div>
          <div className="hidden content">
            <i className="history icon" />
          </div>
        </div>
      );
    } else {
      return (
        <div onClick={this.startTimer} className="ui teal animated button">
          <div className="visible content">Start</div>
          <div className="hidden content">
            <i className="stopwatch icon" />
          </div>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div className="ui container">
        <h1>Take a break! You've earned it.</h1>
        <h2 id="breakTimer">{this.state.defaultTime}</h2>
        {this.printButton()}
        <div onClick={this.props.onBreakComplete} className="ui blue animated button">
          <div className="visible content">Skip break</div>
          <div className="hidden content">
            <i className="angle double right icon" />
          </div>
        </div>
      </div>
    );
  };
}

export default Break;
