/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// import sinon from 'sinon';

// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Main from 'components/Main';

describe('MainComponent', () => {
  let getItemStub;
  let setItemStub;
  let clock;

  beforeEach(() => {
    getItemStub = sinon.stub(Storage.prototype, 'getItem');
    setItemStub = sinon.stub(Storage.prototype, 'setItem');
    clock = sinon.useFakeTimers(new Date().getTime());
  });

  afterEach(() => {
    Storage.prototype.getItem.restore();
    Storage.prototype.setItem.restore();
    clock.restore();
  });

  function createMain(initialStorage=[]) {
    getItemStub.withArgs('timebox.boxes').returns(JSON.stringify(initialStorage));
    return TestUtils.renderIntoDocument(<Main />);
  }

  it('initializes boxes from local storage', () => {
    let main = createMain([{id: 1, name: 'Default', duration: 42}]);

    expect(getItemStub).to.have.been.called;
    expect(main.state.boxes).to.deep.equal([{id: 1, name: 'Default', duration: 42}]);
  });

  it('starts a timer immediately after mounting', () => {
    let main = createMain();
    let setIntervalStub = sinon.stub(window, 'setInterval').returns(1);

    main.componentDidMount();
    expect(setIntervalStub).to.have.been.called;
    expect(main.intervalID).to.equal(1);
  });

  it('clears the timer when unmounting', () => {
    let main = createMain();
    let clearIntervalSpy = sinon.spy(window, 'clearInterval');
    main.intervalID = 1;

    main.componentWillUnmount();
    expect(clearIntervalSpy).to.have.been.calledWith(1);
  });

  describe('toggleConfig', () => {
    let main;
    beforeEach(() => { main = createMain(); });
    describe('when toggling from false to true', () => {
      beforeEach(() => {
        main.state.showConfig = false;
        main.intervalID = 14;
        main.state.lastCheckTime = 1;
      });
      it('stops the timer and unsets the last checked time', () => {
        let clearIntervalSpy = sinon.spy(window, 'clearInterval');

        main.toggleConfig();
        expect(clearIntervalSpy).to.have.been.calledWith(14);
        expect(main.state.lastCheckTime).to.be.undefined;
        clearIntervalSpy.restore();
      });
    });
    describe('when toggling from true to false', () => {
      beforeEach(() => { main.state.showConfig = true; });
      it('starts the timer', () => {
        let startTimerSpy = sinon.spy(main, 'startTimer');

        main.toggleConfig();
        expect(startTimerSpy).to.have.been.called;
        startTimerSpy.restore();
      });
    });
  });

  describe('addBox', () => {
    it('adds boxes to local storage', () => {
      let main = createMain();

      main.addBox('New Box');
      expect(setItemStub).to.have.been.calledWith('timebox.boxes', JSON.stringify([{id: 1, name: 'New Box', duration: 0, active: false}]));
    });

    it('increments box IDs', () => {
      let main = createMain([
        {id: 1, name: 'First', duration: 42, active: false},
        // let's assume a Second box was deleted at some point, just to make things interesting?
        {id: 3, name: 'Third', duration: 42, active: false}
      ]);

      main.addBox('New Box');
      expect(setItemStub).to.have.been.calledWith('timebox.boxes', JSON.stringify([
        {id: 1, name: 'First', duration: 42, active: false},
        {id: 3, name: 'Third', duration: 42, active: false},
        {id: 4, name: 'New Box', duration: 0, active: false}
      ]));
    });
  });

  describe('removeBox', () => {
    it('removes boxes by ID and resets localStorage', () => {
      let main = createMain([
        {id: 1, name: 'First', duration: 42, active: false},
        {id: 2, name: 'Second', duration: 42, active: false},
        {id: 3, name: 'Third', duration: 42, active: false}
      ]);

      main.removeBox(2);
      expect(main.state.boxes).to.deep.equal([
        {id: 1, name: 'First', duration: 42, active: false},
        {id: 3, name: 'Third', duration: 42, active: false}
      ]);
      expect(setItemStub).to.have.been.calledWith('timebox.boxes', JSON.stringify([
        {id: 1, name: 'First', duration: 42, active: false},
        {id: 3, name: 'Third', duration: 42, active: false}
      ]));
    });
  });

  describe('toggleActive', () => {
    let main;
    beforeEach(() => {
      main = createMain([
        {id: 1, name: 'First', duration: 42, active: false},
        {id: 2, name: 'Second', duration: 42, active: true},
        {id: 3, name: 'Second', duration: 42, active: false},
      ]);
    });
    it('sets the given box as the only active box if currently inactive', () => {
      main.toggleActive(1);
      expect(main.state.boxes[0].active).to.be.true;
      expect(main.state.boxes[1].active).to.be.false;
      expect(main.state.boxes[2].active).to.be.false;
    });
    it('sets all boxes inactive if current box is active', () => {
      main.toggleActive(2);
      expect(main.state.boxes[0].active).to.be.false;
      expect(main.state.boxes[1].active).to.be.false;
      expect(main.state.boxes[2].active).to.be.false;
    })
  });

  describe('incrementDurations', () => {
    it('should add time to active boxes', () => {
      let main = createMain([
        {id: 1, name: 'One', duration: 1, active: true},
        {id: 2, name: 'Two', duration: 1, active: false}
      ]);

      main.incrementDurations();
      expect(setItemStub).to.have.been.calledWith('timebox.boxes', JSON.stringify([
        {id: 1, name: 'One', duration: 1, active: true},
        {id: 2, name: 'Two', duration: 1, active: false}
      ]));

      clock.tick(1000);
      main.incrementDurations();
      expect(setItemStub).to.have.been.calledWith('timebox.boxes', JSON.stringify([
        {id: 1, name: 'One', duration: 1001, active: true},
        {id: 2, name: 'Two', duration: 1, active: false}
      ]));
    });
  });
});
