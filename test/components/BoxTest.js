/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Box from 'components/Box';

describe('Box', () => {
  let pauseSpy;
  let box;
  beforeEach(() => {
    pauseSpy = sinon.spy();
    box = TestUtils.renderIntoDocument(<Box id={1} key={1} onPause={pauseSpy} />);
  });
  it('calls onPause callback on Pause', () => {
    let pauseLink = TestUtils.findRenderedDOMComponentWithClass(box, 'pause');
    TestUtils.Simulate.click(pauseLink);

    expect(pauseSpy).to.have.been.calledWith(1);
  });
});
