import React from "react";
import { history } from "umi";
import { Button, InputItem, List } from "antd-mobile";
import Captcha from "../../components/captcha";

import "./index.less";

const FIELDITEMS = [
  {
    name: "name",
    label: "用户名",
    placeholder: "请输入用户名",
    maxLength: 16,
  },
  {
    name: "pwd",
    label: "密码",
    placeholder: "请输入密码",
    type: "password",
    maxLength: 16,
  },
  {
    name: "name2",
    label: "经办人姓名",
    placeholder: "请输入经办人姓名",
    maxLength: 16,
  },
  {
    name: "phone",
    label: "经办人电话",
    placeholder: "请输入经办人电话",
    type: "phone",
  },
  {
    name: "captcha",
    label: "验证码",
    placeholder: "请输入验证码",
    type: "number",
    maxLength: 16,
  },
];

export default () => {
  const handleBack = React.useCallback(() => {
    history.replace("/login");
  }, []);
  return (
    <div className={"page"}>
      <div className={"page-register"}>
        <div className={"register-logo"}>注册经办人</div>
        <List className={"list-with-input-item register-form "}>
          {FIELDITEMS.map((e, i) => {
            return (
              <InputItem
                key={e.name}
                type={e.type}
                clear={true}
                placeholder={e.placeholder}
                maxLength={e.maxLength}
                extra={
                  e.name === "captcha" ? (
                    <Captcha className={"register-captcha"} />
                  ) : null
                }
              >
                {e.label}
              </InputItem>
            );
          })}
        </List>
        <div className={"register-operate"}>
          <Button onClick={handleBack}>返回</Button>
          <Button type={"primary"} onClick={null}>
            提交
          </Button>
        </div>
      </div>
    </div>
  );
};
