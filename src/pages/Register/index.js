import React from "react";
import { history } from "umi";
import { Button, InputItem, List, Toast, Modal } from "antd-mobile";
import { register } from "./service";
import { useRequest } from "ahooks";
import { regs, replaceSpace } from "../../utils/tools";

import Captcha from "../../components/captcha";
import SercretButton from "../../components/sercretButton";

import "./index.less";

const FIELDITEMS = [
  {
    name: "name",
    label: "用户名",
    placeholder: "请输入用户名",
    maxLength: 16
  },
  {
    name: "password",
    label: "密码",
    placeholder: "请输入密码",
    type: "password",
    maxLength: 16
  },
  {
    name: "userName",
    label: "经办人姓名",
    placeholder: "请输入经办人姓名",
    maxLength: 16
  },
  {
    name: "phone",
    label: "经办人电话",
    placeholder: "请输入经办人电话",
    type: "phone"
  },
  {
    name: "code",
    label: "验证码",
    placeholder: "请输入验证码",
    type: "number",
    maxLength: 16
  }
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
        [key]: val
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
    onSuccess: (res) => {
      console.log("onsuccess", res);
      if (res && res.success) {
        Modal.alert("恭喜您，注册成功！", null, [
          {
            text: "确定",
            onPress: () => {
              history.replace("/login");
            }
          }
        ]);
      }
    }
  });
  //
  const testMobile = React.useCallback((val = "") => {
    const _phone = replaceSpace(val);
    return regs.mobile.test(_phone) ? _phone : false;
  }, []);

  const handleRegister = React.useCallback(
    (encrypt) => {
      const { phone, password, ...rest } = fields;
      const _phone = testMobile(phone);
      if (!_phone) {
        Toast.fail("手机号验证错误,请重新输入.");
        return;
      }
      run({
        ...rest,
        phone: _phone,
        password: encrypt.encrypt(password)
      });
    },
    [fields]
  );

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
                  e.name === "code" ? (
                    <Captcha
                      disabled={!testMobile(fields.phone)}
                      className={"register-captcha"}
                      mobile={testMobile(fields.phone)}
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
          <SercretButton
            disabled={disableRegister}
            loading={loading}
            type={"primary"}
            onClick={handleRegister}
            children="提交"
          />
        </div>
      </div>
    </div>
  );
};
