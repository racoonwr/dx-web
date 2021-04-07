import React from "react";
import Texty from "rc-texty";
import { Tabs, List, InputItem, Picker, Button } from "antd-mobile";
import { CSSTransition } from "react-transition-group";

import "./index.less";

const FORM_ICONS = {
  "mobile": require("../../assert/imgs/User/mobile.png"),
  "password": require("../../assert/imgs/User/password.png"),
  "repassword": require("../../assert/imgs/User/password.png"),
  "type": require("../../assert/imgs/User/type.png")
};

const FORM_FIELDS = [{
  name: "mobile",
  type: "phone",
  placeholder: "请输入您的手机号"
}, {
  name: "password",
  type: "password",
  placeholder: "请设置您的登录密码"
}, {
  name: "repassword",
  type: "password",
  placeholder: "请再次确认您的登录密码"
}];

const SlectType = (props) => {
  console.log(props);
  return <div
    onClick={props.onClick}
    className={"am-list-item am-input-item am-list-item-middle"}
  >
    <div className="am-list-line">
      <div className="am-input-label am-input-label-5">
        <div className={"list-icon"} style={{
          backgroundImage: `url(${FORM_ICONS["type"]})`
        }} />
      </div>
      <div className={`am-input-control custom-picker ${props.extra}`}>
        {props.extra}
      </div>
      <div className={"list-icon"} style={{
        backgroundImage: `url(${FORM_ICONS["type"]})`
      }} />
    </div>
  </div>;
};

export default () => {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = React.useCallback((index) => () => {
    setTab(index);
  }, []);

  const [type, setType] = React.useState("");
  const handlePickChange = React.useCallback((value) => {
    setType(value);
  }, []);

  const [vals, setVals] = React.useState({});
  const handleFormFieldChange = React.useCallback((item) => (value) => {
    console.log(item, value);
    setVals(prev => ({
      ...prev,
      [item.name]: value
    }));
  }, []);

  console.log(vals);

  return <div className={"page"}>
    <div className={"page-user"}>
      <div className={"user-header"}>
        <Texty duration={600} type={"left"}>欢迎登录农机滴滴平台</Texty>
      </div>
      <div className={"user-content"}>
        <div className={"tab-bar"}>
          {
            ["登录", "注册"].map((e, i) => {
              return <div
                key={i}
                onClick={handleTabChange(i)}
                className={`tab-bar-default ${tab === i ? "active" : ""}`}
              >
                <span>{e}</span>
                <div className={"tab-under-line"} />
              </div>;
            })
          }
        </div>
        <div className={"tab-user-form"}>
          {
            [0, 1].map(e => {
              return <CSSTransition
                in={tab === e}
                timeout={300}
                unmountOnExit
                classNames="page-fade"
              >
                <div className="page-fade">
                  {
                    e ? <div>
                      <List>
                        {
                          FORM_FIELDS.map(item => {
                            return <InputItem
                              key={item.name}
                              type={item.type}
                              // onChange={handleFormFieldChange(item)}
                              placeholder={item.placeholder}
                            >
                              <div className={"list-icon"} style={{
                                backgroundImage: `url(${FORM_ICONS[item.name]})`
                              }} />
                            </InputItem>;
                          })
                        }
                        {/*<InputItem*/}
                        {/*placeholder="title can be icon，image or text"*/}
                        {/*>*/}
                        {/*<div style={{*/}
                        {/*backgroundImage: "url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)",*/}
                        {/*backgroundSize: "cover",*/}
                        {/*height: "22px",*/}
                        {/*width: "22px"*/}
                        {/*}} />*/}
                        {/*</InputItem>*/}
                        <Picker
                          data={[{
                            label: "1",
                            value: "1"
                          }]}
                          cols={1}
                          value={type}
                          onChange={handlePickChange}
                        >
                          <SlectType />
                        </Picker>
                      </List>
                      <div className={"form-submit"}>
                        <Button type={"primary"}>{tab ? "立即登录" : "))))"}</Button>
                      </div>
                    </div> : <div>
                      111111111111111
                    </div>
                  }
                </div>
              </CSSTransition>;
            })
          }


        </div>
      </div>
    </div>
  </div>;
};
