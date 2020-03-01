import React from 'react';
import './index.less';
export default class Test extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(process);
    return (
      <div className="test">测试</div>
    );
  }
}