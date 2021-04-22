import React from "react";
import { connect, history } from "umi";
import { ListView, Card, Button } from "antd-mobile";
import { getList } from "./service";
import { detailTag } from "../../utils/tools";

import "./index.less";

const pageSize = 10;

export default connect(
  ({ common: { myEnterpriseList, myEnterpriseTotal }, loading }) => {
    return {
      myEnterpriseList,
      myEnterpriseTotal,
      loading,
    };
  }
)((props) => {
  const {
    dispatch,
    myEnterpriseList = [],
    myEnterpriseTotal = 0,
    loading,
  } = props;

  React.useEffect(() => {
    document.title = "";
    return () => {
      dispatch({
        key: "myEnterprise",
        type: "common/clearAnyListView",
      });
    };
  }, []);

  /**add */
  const handleAdd = React.useCallback(() => {
    history.push("/enterprise/add");
  }, []);

  const handleGo = React.useCallback(
    (path, rowData) => () => {
      history.push({
        pathname: path,
      });
      if (rowData) {
        window.localStorage.setItem(detailTag, JSON.stringify(rowData));
      }
    },
    []
  );

  /**row render */
  const row = (rowData) => {
    return (
      <Card className="enterprise-item" key={rowData.id}>
        <Card.Header
          title={rowData.name}
          extra={<span>{rowData.createTime}</span>}
        />
        <Card.Body>
          {/*<div>内容</div>*/}
          <div className="operate">
            <Button inline type="primary" onClick={handleGo("/deal/add")}>
              发起签约
            </Button>
            <Button
              inline
              type="primary"
              onClick={handleGo(`/enterprise/detail`, rowData)}
            >
              查看详情
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  /**fetch more */
  const fetchIng = loading.effects["common/getAnyListView"];
  const [pageNumber, setPageNumber] = React.useState(1);
  const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });

  const onEndReached = () => {
    if (pageSize * pageNumber > myEnterpriseTotal || fetchIng) {
      return false;
    }
    const num = pageNumber + 1;
    setPageNumber(num);
  };

  React.useEffect(() => {
    dispatch({
      key: "myEnterprise",
      type: "common/getAnyListView",
      func: getList,
      list: myEnterpriseList,
      payload: {
        pageSize,
        pageNumber,
      },
    });
  }, [pageNumber]);

  return (
    <div className={"page"}>
      <div className={"page-enterprise"}>
        <div className="enterprise-title">
          我的企业
          <Button type="ghost" inline className="add" onClick={handleAdd}>
            新增
          </Button>
        </div>
        <ListView
          loading={fetchIng}
          className="enterprise-list"
          dataSource={dataSource.cloneWithRows(myEnterpriseList)}
          renderFooter={() => (
            <div className="list-no-data">
              {fetchIng
                ? "正在加载..."
                : myEnterpriseTotal === 0 && pageNumber === 1 && "暂无数据"}
              {pageNumber > 1 &&
                pageSize * pageNumber > myEnterpriseTotal &&
                "到底了～"}
            </div>
          )}
          renderRow={row}
          pageSize={pageSize}
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    </div>
  );
});
