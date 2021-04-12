import React from "react";
import { history } from "umi";
import {
  Button,
  InputItem,
  List,
  Toast,
  Modal,
  Picker,
  Icon,
} from "antd-mobile";
import { useRequest } from "ahooks";

import "./index.less";

const FIELDITEMS = [
  {
    name: "name",
    label: "签约主体",
    placeholder: "请输入用户名",
    maxLength: 16,
  },
  {
    name: "type",
    label: "签约类型",
    placeholder: "请选择签约类型",
  },
];

const PICKER_DATA = [
  {
    label: "年度托盘",
    value: "年度托盘",
  },
  {
    label: "居间服务",
    value: "居间服务",
  },
];

export default () => {
  //返回
  const handleBack = React.useCallback(() => {
    history.replace("/deal");
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
  const disableAdd = React.useMemo(() => {
    return (
      Object.keys(fields)
        .map((e) => fields[e])
        .filter((e) => !!e).length < FIELDITEMS.length
    );
  }, [fields]);

  //提交
  const { run, loading } = useRequest(() => {}, {
    manual: true,
    onSuccess: (res) => {
      Modal.alert("恭喜您，注册成功！", null, [
        {
          text: "确定",
          onPress: () => {
            history.replace("/index");
          },
        },
      ]);
    },
  });
  const handleAdd = React.useCallback(() => {
    console.log(fields);
    Modal.alert("提交申请成功！", null, [
      {
        text: "确定",
        onPress: () => {
          // history.replace("/deal");
        },
      },
    ]);
    // run(fields);
  }, [fields]);

  return (
    <div className={"page"}>
      <div className={"page-deal-add "}>
        <div className={"add-title"}>发起签约</div>
        <List className={"list-with-input-item add-form "}>
          {FIELDITEMS.map((e, i) => {
            const _key = e.name;
            return _key === "type" ? (
              <Picker
                key={_key}
                cols={1}
                data={PICKER_DATA}
                value={fields[_key]}
                onChange={handleFieldChange(_key)}
                extra={<span className="placeholder">{e.placeholder}</span>}
              >
                <List.Item arrow="horizontal">{e.label}</List.Item>
              </Picker>
            ) : (
              <InputItem
                key={_key}
                type={e.type}
                clear={true}
                placeholder={e.placeholder}
                maxLength={e.maxLength}
                value={fields[_key]}
                className="input-right"
                onChange={handleFieldChange(_key)}
                extra={<Icon className="hidden am-list-arrow" type="right" />}
              >
                {e.label}
              </InputItem>
            );
          })}
        </List>
        <div className={"add-operate"}>
          <Button onClick={handleBack}>返回</Button>
          <Button
            disabled={disableAdd}
            loading={loading}
            type={"primary"}
            onClick={handleAdd}
          >
            提交申请
          </Button>
        </div>
      </div>
    </div>
  );
};
