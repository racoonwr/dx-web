import React from "react";
import { history } from "umi";
import { InputItem, List, Button, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import { FORMA, FORMB } from "./constant";
import { useRequest } from "ahooks";
import { creat } from "./service";

import "./index.less";

export default createForm()((props) => {
  React.useEffect(() => {
    document.title = "";
  }, []);

  const queryId = history.location.query.id;

  const {
    form: { getFieldProps }
  } = props;

  const { run, loading } = useRequest(
    creat,
    {
      manual: true,
      onSuccess: (res) => {
        //set fields value
      }
    }
  );

  React.useEffect(() => {
    if (queryId) {
      // getDetailRun();
    }
  }, [queryId]);

  const handleSubmit = React.useCallback(() => {
    console.log(props.form);
    run({
      ...props.form
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
                {...getFieldProps(e.name)}
                type={e.type}
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
                {...getFieldProps(e.name)}
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
