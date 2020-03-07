import React from 'react';
import ReactDOM from 'react-dom';
import LayOut from '@/layout/layout';
ReactDOM.render(
  <LayOut />,
  document.getElementById('app'));
// 热更新
if (module.hot) {
  module.hot.accept(err => {
    if (err) {
      console.error('module.hot，', err);
    }
  });
}