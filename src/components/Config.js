import React from 'react';

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
              <button className="btn btn-negative" onClick={this.handleRemove.bind(this, id)}>Remove</button>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleAdd.bind(this)}>
          <input name="box-name" type="text" placeholder="Add a box" />
          <input type="submit" className="btn btn-positive btn-block" value="Save" />
        </form>
      </div>
    </div>;
  }
}
