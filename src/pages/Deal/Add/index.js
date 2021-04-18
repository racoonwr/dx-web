import React from "react";
import { history } from "umi";
import {
  Button,
  InputItem,
  List,
  Toast,
  Modal,
  Picker,
  Icon
} from "antd-mobile";
import { useRequest } from "ahooks";
import { getCompanyList, getContractType } from "./service";

import "./index.less";
import { getList } from "../../Enterprise/service";

const FIELDITEMS = [
  {
    name: "company",
    label: "签约主体",
    placeholder: "请选择签约主体",
    maxLength: 16
  },
  {
    name: "type",
    label: "签约类型",
    placeholder: "请选择签约类型"
  }
];

let COMPANY_DATA = [];

export default () => {
  //返回
  const handleBack = React.useCallback(() => {
    history.replace("/deal");
  }, []);

  //数据
  const [fields, setFields, tpyePickData] = React.useState({});
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
  const disableAdd = React.useMemo(() => {
    return (
      Object.keys(fields)
      .map((e) => fields[e])
      .filter((e) => !!e).length < FIELDITEMS.length
    );
  }, [fields]);

  const { run: runCompany, loading: roadingCompany } = useRequest(getCompanyList, {
    manual: true,
    onSuccess: (res) => {
      console.log("getCompanyList", res);
    }
  });

  const { run: runContractType, loading: roadingContractType, data: contractTypeData } = useRequest(getContractType, {
    manual: true,
    initialData: [],
    formatResult: (res) => {
      if( res && res.success) {
        const _data = res.data || {};
        return Object.keys(_data).map(e => ({
          value: e,
          label : _data[e]
        }))
      }else {
        return []
      }
    }
  });

  //提交
  const { run, loading } = useRequest(() => {
  }, {
    manual: true,
    onSuccess: (res) => {
      Modal.alert("恭喜您，注册成功！", null, [
        {
          text: "确定",
          onPress: () => {
            history.replace("/index");
          }
        }
      ]);
    }
  });



  const handleAdd = React.useCallback(() => {
    console.log(fields);
    Modal.alert("提交申请成功！", null, [
      {
        text: "确定",
        onPress: () => {
          // history.replace("/deal");
        }
      }
    ]);
    // run(fields);
  }, [fields]);

  React.useEffect(() => {
    runCompany({});
    runContractType({});
  }, []);

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
                data={contractTypeData}
                value={fields[_key]}
                onChange={handleFieldChange(_key)}
                extra={<span className="placeholder">{e.placeholder}</span>}
              >
                <List.Item arrow="horizontal">{e.label}</List.Item>
              </Picker>
            ) : (
              <Picker
                key={_key}
                cols={1}
                data={COMPANY_DATA}
                value={fields[_key]}
                onChange={handleFieldChange(_key)}
                extra={<span className="placeholder">{e.placeholder}</span>}
              >
                <List.Item arrow="horizontal">{e.label}</List.Item>
              </Picker>
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
