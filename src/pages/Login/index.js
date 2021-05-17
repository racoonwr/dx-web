import React from "react";
import { List, InputItem, Button } from "antd-mobile";
import { history, connect } from "umi";

import SercretButton from "../../components/sercretButton";

import "./index.less";

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

export default connect(({ loading }) => {
  return {
    loading: loading.effects["user/login"],
  };
})((props) => {
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

  const handleLogin = React.useCallback(
    (encrypt) => {
      const { password, ...rest } = fields;
      console.log(fields);
      props.dispatch({
        type: "user/login",
        payload: {
          ...rest,
          password: encrypt.encrypt(password),
        },
      });
    },
    [fields]
  );

  const handleRegister = React.useCallback(() => {
    history.push({
      pathname: "/register",
      query: {
        t: +new Date(),
      },
    });
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
        <SercretButton
          disabled={disableLogin}
          loading={props.loading}
          type={"primary"}
          onClick={handleLogin}
          children={"登录"}
        />
        <div className={"user-register-btn"}>
          <span onClick={handleRegister}>注册账号</span>
        </div>
      </div>
    </div>
  );
});
