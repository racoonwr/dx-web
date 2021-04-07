import React from "react";
import { Button, InputItem, List } from "antd-mobile";

import "./index.less";

const FIELDITEMS = [{
  name: "name",
  label: "用户名",
  placeholder: "请输入用户名"
}, {
  name: "pwd",
  label: "密码",
  placeholder: "请输入密码",
  type: "password"
}, {
  name: "name2",
  label: "经办人姓名",
  placeholder: "请输入经办人姓名"
}, {
  name: "phone",
  label: "经办人电话",
  placeholder: "请输入经办人电话",
  type: "phone"
}, {
  name: "captcha",
  label: "验证码",
  placeholder: "请输入验证码",
  type: "number"
}];

export default () => {
  return <div className={"page"}>
    <div className={"page-register"}>
      <div className={"register-logo"}>
        注册
      </div>
      <List>
        {
          FIELDITEMS.map(e => {
            return <InputItem>
              {e.label}
            </InputItem>;
          })
        }
      </List>
    </div>
  </div>;
}
