import React from "react";
import { history } from "umi";
import { InputItem, List, Button, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import { FORMA, FORMB } from "./constant";
import { useRequest } from "ahooks";
import { creat } from "./service";
import { replaceSpace, detailTag } from "../../../utils/tools";

import "./index.less";

export default createForm()((props) => {
  React.useEffect(() => {
    document.title = "";
  }, []);

  const handleBack = React.useCallback(() => {
    history.goBack();
  }, []);

  const queryId = history.location.pathname === "/enterprise/detail";

  const {
    form: { getFieldProps, validateFields, setFieldsValue },
  } = props;

  const { run, loading } = useRequest(creat, {
    manual: true,
    onSuccess: (res) => {
      if (res && res.success) {
        Toast.info("新增企业成功！");
        handleBack();
      }
    },
  });

  React.useEffect(() => {
    if (queryId) {
      // 获取详情
      const detail = JSON.parse(window.localStorage.getItem(detailTag) || "{}");
      const fiels = FORMA.concat(FORMB)
        .map(
          (e) => ({
            value: detail[e.name],
            name: e.name,
            type: e.type,
          }),
          {}
        )
        .reduce((pre, cur) => ({
          ...pre,
          [cur.name]:
            cur.type === "phone"
              ? (cur.value || "").replace(/^(.{3})(.*)(.{4})$/, "$1 $2 $3")
              : cur.value,
        }));
      setFieldsValue(fiels);
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
      setErrorKey();
      run({
        ...rest,
        accountNumber: replaceSpace(accountNumber),
        contactsPhone: replaceSpace(contactsPhone),
        phone: replaceSpace(phone),
      });
    });
  }, []);

  //focus 取消error
  const handleFouces = React.useCallback(() => {
    setErrorKey();
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
                  rules: e.rules,
                })}
                type={e.type}
                error={e.name === errorKey}
                placeholder={e.placeholder}
                onFocus={handleFouces}
                disabled={queryId}
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
                  rules: e.rules,
                })}
                type={e.type}
                error={e.name === errorKey}
                placeholder={e.placeholder}
                onFocus={handleFouces}
                disabled={queryId}
              >
                {e.label}
              </InputItem>
            );
          })}
        </List>
        <div className={"enterprise-operate-btns"}>
          <Button onClick={handleBack}>返回</Button>
          {queryId ? null : (
            <Button loading={loading} type={"primary"} onClick={handleSubmit}>
              提交
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});
