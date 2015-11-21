import React from 'react';
import moment from 'moment';
import 'moment-duration-format';

class Box extends React.Component {
  formattedTime() {
    return moment.duration(this.props.duration).format('h:mm:ss', {trim: false});
  }
  handleActivation() {
    this.props.onActivate(this.props.id);
  }
  render() {
    let activeState = this.props.active ? 'Pause' : 'Start';
    return (
      <li className="table-view-cell" onClick={this.handleActivation.bind(this)}>
        <h2>{this.props.name}</h2>
        {this.formattedTime()}
        <button className="activate btn">{activeState}</button>
      </li>
    );
  }
}

Box.defaultProps = {
};

export default Box;
