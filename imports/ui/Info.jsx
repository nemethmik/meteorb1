/* @flow */
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';
/*:: type LinkType = {_id:string,url:string,title:string};*/
class Info extends Component/*::<{links:[LinkType]}>*/ {
  render() {
    const links = this.props.links.map(
      link => this.makeLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
      </div>
    );
  }

  makeLink(link/*:LinkType*/) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}

const InfoContainer = withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
export default InfoContainer;