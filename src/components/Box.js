import React from 'react';
import moment from 'moment';
import 'moment-duration-format';

class Box extends React.Component {
  formattedTime() {
    return moment.duration(this.props.duration).format('h:mm:ss', {trim: false});
  }
  handlePause() {
    this.props.onPause(this.props.id);
  }
  render() {
    let pauseState = this.props.paused ? 'Unpause' : 'Pause';
    return (
      <div>
        <h1>{this.props.name}</h1>
        {this.formattedTime()}
        <a href="#" onClick={this.handlePause.bind(this)} className="pause">{pauseState}</a>
      </div>
    );
  }
}

Box.defaultProps = {
};

export default Box;
