import React from "react";
import { List, InputItem, Button } from "antd-mobile";
import { history, connect } from "umi";
import { JSEncrypt } from "jsencrypt";

import "./index.less";

const encrypt = new JSEncrypt();

const publicKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n" +
  "2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==";

encrypt.setPublicKey(publicKey);

const FIELDITEM = [
  {
    name: "phone",
    placeholder: "请输入用户名",
    clear: true,
  },
  {
    name: "password",
    placeholder: "请输入登录密码",
    clear: true,
    type: "password",
  },
];

export default connect()((props) => {
  const [fields, setFields] = React.useState({});
  const handleFieldChange = React.useCallback(
    (key) => (val) => {
      setFields((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  const disableLogin = React.useMemo(() => {
    return (
      Object.keys(fields)
        .map((e) => fields[e])
        .filter((e) => !!e).length < FIELDITEM.length
    );
  }, [fields]);

  const handleLogin = React.useCallback(() => {
    const { password, ...rest } = fields;
    props.dispatch({
      type: "user/login",
      payload: {
        ...rest,
        password: encrypt.encrypt(password),
      },
    });
  }, [fields]);

  const handleRegister = React.useCallback(() => {
    history.push("/register");
  }, []);

  return (
    <div className={"page"}>
      <div className={"page-user"}>
        <div className={"user-logo"}>
          <img src="" alt="" />
        </div>
        <List className={"list-with-input-item user-form"}>
          {FIELDITEM.map((e) => {
            const _key = e.name;
            return (
              <InputItem
                clear
                key={_key}
                type={e.type}
                value={fields[_key]}
                onChange={handleFieldChange(_key)}
                placeholder={e.placeholder}
              />
            );
          })}
        </List>
        <Button
          disabled={disableLogin}
          loading={loading}
          type={"primary"}
          onClick={handleLogin}
        >
          登录
        </Button>
        <div className={"user-register-btn"}>
          <span onClick={handleRegister}>注册账号</span>
        </div>
      </div>
    </div>
  );
});
