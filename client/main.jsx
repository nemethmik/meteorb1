/* @flow */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import {getFirebase, reactReduxFirebase} from "react-redux-firebase" //Function to open a firebase connection
import {getFirestore, reduxFirestore} from "redux-firestore"
import {Provider} from "react-redux"
import {rootReducer} from "/imports/ui/marioreducers"
import fbconfig from "/imports/api/fbconfig" //This import is without the curly braces
import {App} from '/imports/ui/App'
import {USERSCOLLECTION} from "../imports/ui/marioactions"
const fireBaseExtra/*:FireBaseExtra*/ = {getFirebase,getFirestore}
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument(fireBaseExtra)),
    reduxFirestore(fbconfig),
    reactReduxFirebase(fbconfig, {useFirestoreForProfile: true, userProfile: USERSCOLLECTION, attachAuthIsReady: true})
  )
)
Meteor.startup(async () => {
  const reactTarget = document.getElementById('react-target')
  if(reactTarget) {
    await store.firebaseAuthIsReady
    render(<Provider store={store}><App/></Provider>, reactTarget)
  } else throw new Error("No react-target found")
});
