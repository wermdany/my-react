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
      text: 'https://www.baidu.com/'
    };
  }
  handerClick() {
    message.info('错误！代码：402');
  }
  render() {
    const { text } = this.state;
    return (
      <div className="index">
        <Button
          onClick={this.handerClick}
          type="danger">{text}</Button>
      </div>
    );
  }
}