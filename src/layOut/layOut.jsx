/**
 *
 */
import React from 'react';
import './layOut.less';
import { Button, message, Modal, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
export default class LayOut extends React.Component {

  constructor() {
    super();
    this.state = {
      i: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      j: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }
  handelClick(n, v) {
    message.info(<b>{n * v}</b>);
    Modal.confirm({
      content: <b>{n * v}</b>
    });
  }
  render() {
    const { i, j } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <div className="items">
          {i.map(v => (
            <div className="item"
              key={v}>
              {j.map(n => (
                v >= n && <Button key={v + '-' + n}
                  onClick={this.handelClick.bind(null, n, v)}>{n}×{v}=?</Button>
              ))}
            </div>
          ))}
        </div>
      </ConfigProvider>
    );
  }
}