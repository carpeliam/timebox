import React from 'react';

import 'styles/Config.scss';

export default class Config extends React.Component {
  handleAdd(event) {
    event.preventDefault();
    this.props.onAdd(event.target.elements['box-name'].value);
    event.target.elements['box-name'].value = '';
  }
  handleRemove(id, event) {
    event.preventDefault();
    this.props.onRemove(id);
  }
  handleReset(id, event) {
    event.preventDefault();
    this.props.onReset(id);
  }
  handleResetAll(event) {
    event.preventDefault();
    this.props.onResetAll();
  }
  handleExit(event) {
    event.preventDefault();
    this.props.onExit();
  }
  render() {
    return <div>
      <header className="bar bar-nav">
        <a href="#" onClick={this.handleExit.bind(this)} className="icon icon-left-nav pull-left close"></a>
        <h1>Config</h1>
      </header>
      <div className="content">
        <ul className="table-view">
          {this.props.boxes.map(({id, name}) => (
            <li key={id} className="table-view-cell">
              <strong>{name}</strong>
              <span className="btn-group">
                <button className="reset btn btn-negative btn-outlined" onClick={this.handleReset.bind(this, id)}>Reset</button>
                <button className="remove btn btn-negative" onClick={this.handleRemove.bind(this, id)}>Remove</button>
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleAdd.bind(this)}>
          <input name="box-name" type="text" placeholder="New box name" />
          <input type="submit" className="btn btn-positive btn-block" value="Add box" />
        </form>
        <button className="reset-all btn btn-negative btn-outlined btn-block" onClick={this.handleResetAll.bind(this)}>Reset All</button>
      </div>
    </div>;
  }
}
