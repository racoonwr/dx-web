import React from "react";
import { history } from "umi";
import QueueAnim from "rc-queue-anim";
import { Button, InputItem, List, Toast, Modal } from "antd-mobile";
import { useRequest } from "ahooks";

import "./index.less";

export default () => {
  return (
    <div className={"page"}>
      <div className={"page-index"}>
        <div className={"index-main"}>
          <QueueAnim type="scale" component="ul">
            <li key={0}>我的<br/>协议</li>
            <li key={1}>我的<br/>企业</li>
          </QueueAnim>
        </div>
      </div>
    </div>
  );
};
