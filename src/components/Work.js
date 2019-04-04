import React from 'react';

class Work extends React.Component {
  state = {
    intervalID: null,
    timerGoing: false,
    defaultTime: '25:00',
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

      document.querySelector('#workTimer').innerHTML = '<h2>' + minutes + ':' + seconds + '</h2>';

      if (secondsLeft < 1) {
        clearInterval(timerID);
        self.setState({ intervalID: null, timerGoing: false });
        self.props.onWorkComplete();
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
        <h1>WORK!</h1>
        <h2 id="workTimer">{this.state.defaultTime}</h2>
        {this.printButton()}
      </div>
    );
  };
}

export default Work;
