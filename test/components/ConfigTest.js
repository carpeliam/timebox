/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Config from 'components/Config';

describe('Config', () => {
  let addSpy;
  let removeSpy;
  let resetSpy;
  let resetAllSpy;
  let exitSpy;
  let config;
  let boxes = [
    {id: 1, name: 'One'},
    {id: 2, name: 'Two'},
    {id: 3, name: 'Three'}
  ];

  beforeEach(() => {
    addSpy = sinon.spy();
    removeSpy = sinon.spy();
    resetSpy = sinon.spy();
    resetAllSpy = sinon.spy();
    exitSpy = sinon.spy();
    config = TestUtils.renderIntoDocument(<Config boxes={boxes} onAdd={addSpy} onRemove={removeSpy} onReset={resetSpy} onResetAll={resetAllSpy} onExit={exitSpy} />);
  });
  it('calls onRemove callback on Remove', () => {
    let btns = TestUtils.scryRenderedDOMComponentsWithClass(config, 'remove');
    TestUtils.Simulate.click(btns[1]);

    expect(removeSpy).to.have.been.calledWith(2);
  });

  it('calls onAdd callback on Add', () => {
    let form = TestUtils.findRenderedDOMComponentWithTag(config, 'form');
    TestUtils.Simulate.submit(form, {target: {elements: {'box-name': {value: 'New Name'}}}});

    expect(addSpy).to.have.been.calledWith('New Name');
  });

  it('calls onReset callback on Reset', () => {
    let btns = TestUtils.scryRenderedDOMComponentsWithClass(config, 'reset');
    TestUtils.Simulate.click(btns[1]);

    expect(resetSpy).to.have.been.calledWith(2);
  });

  it('calls onResetAll callback on Reset All', () => {
    let btn = TestUtils.findRenderedDOMComponentWithClass(config, 'reset-all');
    TestUtils.Simulate.click(btn);

    expect(resetAllSpy).to.have.been.called;
  });

  it('calls onExit on exit', () => {
    let exitLink = TestUtils.findRenderedDOMComponentWithClass(config, 'close');
    TestUtils.Simulate.click(exitLink);

    expect(exitSpy).to.have.been.called;
  });
});
