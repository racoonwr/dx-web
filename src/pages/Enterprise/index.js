import React from "react";
import { connect, history } from "umi";
import { ListView, Card, Icon, Button, Modal, List } from "antd-mobile";

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
  React.useEffect(() => {
    document.title = "";
  }, []);

  const {
    dispatch,
    myEnterpriseList = [],
    myEnterpriseTotal = 0,
    loading,
  } = props;

  /**add */
  const handleAdd = React.useCallback(() => {
    history.push("/enterprise/add");
  }, []);

  const handleGo = React.useCallback(
    (path, id) => () => {
      history.push({
        pathname: path,
        query: {
          id,
        },
      });
    },
    []
  );

  /**row render */
  const row = (rowData) => {
    console.log(rowData);
    return (
      <div key={rowData.id}>
        <Card>
          <Card.Header title="企业名称" extra={<span>企业名称</span>} />
          <Card.Body>
            <div>内容</div>
            <div className="operate">
              <Button inline type="primary" onClick={handleGo("/deal/add")}>
                发起签约
              </Button>
              <Button
                inline
                type="primary"
                onClick={handleGo("/enterprise/detail")}
              >
                查看详情
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
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
      func: () => {},
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
          className="deal-list"
          // dataSource={dataSource.cloneWithRows(myDealList)}
          dataSource={dataSource.cloneWithRows([{ id: 1 }])}
          renderFooter={() => (
            <div
              style={{
                padding: 10,
                fontSize: "0.35rem",
                textAlign: "center",
                color: "rgba(17, 31, 44, 0.5)",
              }}
            >
              {pageNumber > 1 &&
                pageSize * pageNumber > myEnterpriseTotal &&
                "到底了～"}
              {!fetchIng &&
                myEnterpriseTotal === 0 &&
                pageNumber === 1 &&
                "暂无数据"}
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
