#!/usr/bin/env bash

ls -l
ls -l timebox-installed
ls -l timebox-src


pushd timebox-installed

npm test

popd
