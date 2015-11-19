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
      <li className="table-view-cell" onClick={this.handlePause.bind(this)}>
        <h2>{this.props.name}</h2>
        {this.formattedTime()}
        <button className="pause btn">{pauseState}</button>
      </li>
    );
  }
}

Box.defaultProps = {
};

export default Box;
