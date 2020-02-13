/**
 *
 */
import React from 'react';
export default class LayOut extends React.Component {
  constructor() {
    super();
    this.state = {
      href: 'https://www.baidu.com/'
    };
  }
  render() {
    const { href } = this.state;
    return (<a href={href}>百度</a>);
  }
}