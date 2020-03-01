/**
 *
 */
import React from 'react';
import './layOut.less';
import { Button, Modal } from 'antd';
import Test from '@/components/test/test';
export default class LayOut extends React.Component {

  constructor() {
    super();
    this.state = {
      i: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      j: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }
  handelClick(n, v) {
    Modal.confirm({
      title: <b>乘法口诀</b>,
      content: n + '×' + v + '=' + n * v
    });
  }
  render() {
    const { i, j } = this.state;
    return (
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
        <Test />
      </div>
    );
  }
}