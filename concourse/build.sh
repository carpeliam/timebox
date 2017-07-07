#!/usr/bin/env bash

pushd timebox-src

npm install
npm test

# HEAP_TRACKING_ID=asdflkjasdf npm run build
# cf login
# cf push

popd
