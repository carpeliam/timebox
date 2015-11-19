require('styles/App.scss');

import React from 'react';

import Config from './Config';
import Box from './Box';


class AppComponent extends React.Component {
  constructor() {
    super();
    let boxes = JSON.parse(localStorage.getItem('timebox.boxes') || '[]');
    this.state = {boxes, showConfig: false};
  }
  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  startTimer() {
    this.intervalID = setInterval(this.incrementDurations.bind(this), 100);
  }

  toggleConfig(e) {
    e && e.preventDefault();
    let showConfig = !this.state.showConfig;
    if (showConfig) {
      clearInterval(this.intervalID);
      this.setState({lastCheckTime: undefined});
    } else {
      this.startTimer();
    }
    this.setState({showConfig});
  }

  addBox(name) {
    let boxes = this.state.boxes;
    let lastBox = boxes[boxes.length - 1]
    let newId = lastBox ? lastBox.id + 1 : 1;
    boxes.push({id: newId, name, duration: 0});
    this.setState({boxes}, () => {
      localStorage.setItem('timebox.boxes', JSON.stringify(this.state.boxes));
    });
  }

  removeBox(id) {
    let boxes = this.state.boxes;
    for (let i = 0; i < boxes.length; i++) {
      if (id === boxes[i].id) {
        boxes.splice(i, 1);
        this.setState({boxes}, () => {
          localStorage.setItem('timebox.boxes', JSON.stringify(this.state.boxes));
        });
        return;
      }
    }
  }

  togglePause(boxId) {
    let boxes = this.state.boxes;
    let pausedBox = boxes.find((box) => box.id === boxId);
    pausedBox.paused = !pausedBox.paused;
    this.setState({boxes});
  }

  incrementDurations() {
    let now = new Date().getTime();
    let lastCheckTime = this.state.lastCheckTime || now;
    let elapsed = now - lastCheckTime;
    let boxes = this.state.boxes.map(({id, name, duration, paused}) => {
      duration = paused ? duration : duration + elapsed;
      return {id, name, duration, paused};
    });
    this.setState({lastCheckTime: now, boxes}, () => {
      localStorage.setItem('timebox.boxes', JSON.stringify(this.state.boxes));
    });
  }

  renderConfig() {
    return <Config boxes={this.state.boxes} onAdd={this.addBox.bind(this)} onRemove={this.removeBox.bind(this)} onExit={this.toggleConfig.bind(this)} />;
  }
  renderBoxes() {
    return <div>
      <header className="bar bar-nav">
        <a href="#" onClick={this.toggleConfig.bind(this)} className="icon icon-gear pull-right"></a>
        <h1>Timebox</h1>
      </header>
      <div className="content">
        <ul className="table-view">
          {this.state.boxes.map((box) => <Box key={box.id} {...box} onPause={this.togglePause.bind(this)} />)}
        </ul>
      </div>
    </div>;
  }

  render() {
    let view = (this.state.showConfig) ? this.renderConfig() : this.renderBoxes();
    return (
      <div className="index">
        {view}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
