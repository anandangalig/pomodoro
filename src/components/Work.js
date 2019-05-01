import React from 'react';

class Work extends React.Component {
  state = {
    intervalID: null,
    timerGoing: false,
    timeLeftOnPause: null,
  };

  startTimer = seconds => {
    clearInterval(this.state.intervalID); //clear any ongoing timer
    const self = this; // to preserve this inside setInterval
    const countDownTo = Math.round(new Date().getTime() / 1000) + seconds;

    const timerID = setInterval(function() {
      const now = Math.round(new Date().getTime() / 1000);
      // Find the secondsLeft between now and the count down date
      const secondsLeft = countDownTo - now;
      self.setState({ timeLeftOnPause: secondsLeft });
      const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
      let seconds = Math.floor(secondsLeft % 60);
      seconds = (seconds < 10 ? '0' : '') + seconds;

      document.querySelector('#workTimer').innerHTML = '<h2>' + minutes + ':' + seconds + '</h2>';

      if (secondsLeft < 1) {
        document.querySelector('#workSound').play();
        clearInterval(timerID);
        self.setState({ intervalID: null, timerGoing: false });
        self.props.onWorkComplete();
      }
    }, 1000);

    this.setState({ intervalID: timerID, timerGoing: true });
  };

  pauseTimer = () => {
    clearInterval(this.state.intervalID);
    this.setState({ intervalID: null, timerGoing: false });
  };

  resetWorkTimer = () => {
    clearInterval(this.state.intervalID);
    this.setState({ intervalID: null, timerGoing: false, timeLeftOnPause: null });
    document.querySelector('#workTimer').innerHTML = '<h2>25:00</h2>';
  };

  printButton = () => {
    if (this.state.timerGoing) {
      return (
        <div onClick={this.pauseTimer} className="ui yellow animated button">
          <div className="visible content">Pause</div>
          <div className="hidden content">
            <i className="pause icon" />
          </div>
        </div>
      );
    } else if (this.state.timeLeftOnPause) {
      return (
        <div>
          <div
            onClick={() => {
              this.resetWorkTimer();
            }}
            className="ui orange animated button"
          >
            <div className="visible content">Reset</div>
            <div className="hidden content">
              <i className="history icon" />
            </div>
          </div>

          <div
            onClick={() => {
              this.startTimer(this.state.timeLeftOnPause);
            }}
            className="ui blue animated button"
          >
            <div className="visible content">Resume</div>
            <div className="hidden content">
              <i className="play icon" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            this.startTimer(1500);
          }}
          className="ui teal animated button"
        >
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
        <h2 id="workTimer">25:00</h2>
        {this.printButton()}
      </div>
    );
  };
}

export default Work;
