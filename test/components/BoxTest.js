/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Box from 'components/Box';

describe('Box', () => {
  let activateSpy;
  beforeEach(() => {
    activateSpy = sinon.spy();
  });

  function createBox(props={}) {
    return TestUtils.renderIntoDocument(
      <Box
        id={props.id || 1}
        key={props.key || 1}
        active={props.active || false}
        onActivate={props.onActivate || activateSpy}
      />
    );
  }

  it('calls onActivate callback upon activation', () => {
    let box = createBox();
    let activateLink = TestUtils.findRenderedDOMComponentWithClass(box, 'activate');
    TestUtils.Simulate.click(activateLink);

    expect(activateSpy).to.have.been.calledWith(1);
  });

  it('has an active class if its currently active', () => {
    let box = createBox({ active: true });
    let li = TestUtils.findRenderedDOMComponentWithTag(box, 'li');
    expect(li.attributes.class.nodeValue).to.contain('active');
  });
});
