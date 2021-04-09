import React from "react";
import { history } from "umi";
import { Button, InputItem, List, Toast } from "antd-mobile";
import { register } from "./service";
import { useRequest } from "ahooks";
import { regs } from "../../utils/tools";

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
    name: "mobile",
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
  //返回
  const handleBack = React.useCallback(() => {
    history.replace("/login");
  }, []);

  //数据
  const [fields, setFields] = React.useState({});
  const handleFieldChange = React.useCallback(
    (key) => (val) => {
      console.log(key, val);
      //错误炎症 error or toast
      setFields((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );
  const disableRegister = React.useMemo(() => {
    return (
      Object.keys(fields)
        .map((e) => fields[e])
        .filter((e) => !!e).length < FIELDITEMS.length
    );
  }, [fields]);

  //提交
  const { run, loading } = useRequest(register, {
    manual: true,
  });
  const handleRegister = React.useCallback(() => {
    const { mobile } = fields;
    console.log(fields);
    const _mobile = mobile.replace(/\s+/g, "");
    if (!regs.mobile.test(_mobile)) {
      Toast.fail("手机号验证错误,请重新输入.");
      return;
    }
    // run(fields);
  }, [fields]);

  return (
    <div className={"page"}>
      <div className={"page-register"}>
        <div className={"register-logo"}>注册经办人</div>
        <List className={"list-with-input-item register-form "}>
          {FIELDITEMS.map((e, i) => {
            const _key = e.name;
            return (
              <InputItem
                key={_key}
                type={e.type}
                clear={true}
                placeholder={e.placeholder}
                maxLength={e.maxLength}
                value={fields[_key]}
                onChange={handleFieldChange(_key)}
                extra={
                  e.name === "captcha" ? (
                    <Captcha
                      disabled={true}
                      className={"register-captcha"}
                      mobile={fields["mobile"]}
                    />
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
          <Button
            disabled={disableRegister}
            loading={loading}
            type={"primary"}
            onClick={handleRegister}
          >
            提交
          </Button>
        </div>
      </div>
    </div>
  );
};
