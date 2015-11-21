/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Box from 'components/Box';

describe('Box', () => {
  let activateSpy;
  let box;
  beforeEach(() => {
    activateSpy = sinon.spy();
    box = TestUtils.renderIntoDocument(<Box id={1} key={1} onActivate={activateSpy} />);
  });
  it('calls onActivate callback upon activation', () => {
    let activateLink = TestUtils.findRenderedDOMComponentWithClass(box, 'activate');
    TestUtils.Simulate.click(activateLink);

    expect(activateSpy).to.have.been.calledWith(1);
  });
});
