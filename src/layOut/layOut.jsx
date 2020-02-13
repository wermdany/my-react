/**
 *
 */
import React from 'react';
import './layOut.less';
export default class LayOut extends React.Component {
  constructor() {
    super();
    this.state = {
      href: 'https://www.baidu.com/'
    };
  }
  render() {
    const { href } = this.state;
    return (
      <a
        className="aa"
        href={href}
      >百度</a>
    );
  }
}