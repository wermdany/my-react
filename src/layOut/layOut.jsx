/**
 *
 */
import React from 'react';
import './layOut.less';
import { Button, message } from 'antd';
export default class LayOut extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '按钮'
    };
  }
  handerClick() {
    message.info('错误！代码：403');
  }
  render() {
    const { text } = this.state;
    return (
      <div className="index">
        <Button
          onClick={this.handerClick}
          type="primary">{text}</Button>
      </div>
    );
  }
}