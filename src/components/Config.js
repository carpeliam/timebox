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
      <h1>Config</h1>
      {this.props.boxes.map(({id, name}) => (
            <div key={id}>
              <strong>{name}</strong>
              <a href="#" className="btn" onClick={this.handleRemove.bind(this, id)}>Remove</a>
            </div>
          ))}
      <form onSubmit={this.handleAdd.bind(this)}>
        <input name="box-name" type="text" />
        <input type="submit" />
      </form>
      <a href="#" className="close" onClick={this.handleExit.bind(this)}>Exit</a>
    </div>;
  }
}
