import React from "react";
import { history } from "umi";
import { InputItem, List, Button, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import { FORMA, FORMB } from "./constant";
import { useRequest } from "ahooks";
import { creat } from "./service";
import { replaceSpace } from "../../../utils/tools";

import "./index.less";

export default createForm()((props) => {
  React.useEffect(() => {
    document.title = "";
  }, []);

  const queryId = history.location.query.id;

  const {
    form: { getFieldProps, validateFields }
  } = props;

  const { run, loading } = useRequest(
    creat,
    {
      manual: true,
      onSuccess: (res) => {
        //set fields value
        console.log(res);
        Toast.info("创建成功！");
      }
    }
  );

  React.useEffect(() => {
    if (queryId) {
      // 获取详情
      // getDetailRun();
    }
  }, [queryId]);

  //验证情况
  const [errorKey, setErrorKey] = React.useState();
  const handleSubmit = React.useCallback(() => {
    validateFields((error) => {
      if (error) {
        const _error = Object.keys(error);
        if (_error.length) {
          const _errorKey = _error[0];
          setErrorKey(_errorKey);
          Toast.info(error[_errorKey]["errors"][0]["message"]);
          return;
        }
      }
    }).then(({ accountNumber, contactsPhone, phone, ...rest }) => {
      console.log({
        accountNumber,
        contactsPhone,
        phone, ...rest
      });
      setErrorKey();
      run({
        ...rest,
        accountNumber: replaceSpace(accountNumber),
        contactsPhone: replaceSpace(contactsPhone),
        phone: replaceSpace(phone)
      });
    });
  }, []);

  return (
    <div className={"page"}>
      <div className={"page-enterprise-operate"}>
        <List
          className={"enterprise-operate-form"}
          renderHeader={() => "企业信息"}
        >
          {FORMA.map((e) => {
            return (
              <InputItem
                key={e.name}
                {...getFieldProps(e.name, {
                  rules: e.rules
                })}
                type={e.type}
                error={e.name === errorKey}
                placeholder={e.placeholder}
              >
                {e.label}
              </InputItem>
            );
          })}
        </List>
        <List
          className={"enterprise-operate-form space"}
          renderHeader={() => "个人信息"}
        >
          {FORMB.map((e) => {
            return (
              <InputItem
                key={e.name}
                {...getFieldProps(e.name, {
                  rules: e.rules
                })}
                type={e.type}
                placeholder={e.placeholder}
              >
                {e.label}
              </InputItem>
            );
          })}
        </List>
        <div className={"enterprise-operate-btns"}>
          <Button>返回</Button>
          <Button
            loading={loading}
            type={"primary"}
            onClick={handleSubmit}
          >
            提交
          </Button>
        </div>
      </div>
    </div>
  );
});
