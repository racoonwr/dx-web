import React from "react";
import { List, InputItem, Button } from "antd-mobile";
import { history } from "umi";
import { useRequest } from "ahooks";
import { login } from "./service";

import "./index.less";

const FIELDITEM = [
  {
    name: "name",
    placeholder: "请输入用户名",
    clear: true,
  },
  {
    name: "pwd",
    placeholder: "请输入登录密码",
    clear: true,
    type: "password",
  },
];

export default () => {
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

  const { run, loading } = useRequest(login, {
    manual: true,
  });

  const handleLogin = React.useCallback(() => {
    run(fields);
  }, []);

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
};
