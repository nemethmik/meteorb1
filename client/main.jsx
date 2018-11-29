/* @flow */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {App} from '/imports/ui/App'
const reactTarget = document.getElementById('react-target')
Meteor.startup(() => {
  if(reactTarget) render(<App />, reactTarget);
  else throw new Error("No react-target found")
});
