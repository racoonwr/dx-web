import React from "react";
import { connect, history } from "umi";
import { ListView, Card, Icon, Button, Modal, List } from "antd-mobile";
import { closest } from "../../utils/tools";
import { useBoolean } from "ahooks";

import "./index.less";

const pageSize = 10;

const DEAL_DETAIL_KEYS = [
  {
    label: "协议编号",
  },
  {
    label: "签约主体",
  },
  {
    label: "签约对象",
  },
  {
    label: "更新时间",
  },
  {
    label: "协议类型",
  },
  {
    label: "签约状态",
  },
];

export default connect(({ common: { myDealList, myDealTotal }, loading }) => {
  return {
    myDealList,
    myDealTotal,
    loading,
  };
})((props) => {
  const { dispatch, myDealList = [], myDealTotal = 0, loading } = props;

  /**add */
  const handleAdd = React.useCallback(() => {
    history.push("/deal/add");
  }, []);

  /**detail modal */
  const onWrapTouchStart = React.useCallback((e) => {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, ".am-modal-content");
    if (!pNode) {
      e.preventDefault();
    }
  }, []);

  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const [modalState, setModalState] = React.useState({});
  const handleCancel = React.useCallback(() => {
    setFalse();
    // setModalState({});
  }, []);
  const handleGo = React.useCallback(
    (id) => () => {
      setTrue();
      setModalState({
        id: id,
        title: "1的详情",
      });
    },
    []
  );

  /**row render */
  const row = (rowData) => {
    console.log(rowData);
    return (
      <div key={rowData.id} onClick={handleGo(rowData.id)}>
        <Card>
          <Card.Header
            title="协议标题"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>协议时间</span>}
          />
          <Card.Body>
            <div>内容</div>
          </Card.Body>
          <Card.Footer
            className="align-vertical"
            content="查看详情"
            extra={<Icon type="right" size="sm" />}
          />
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
    if (pageSize * pageNumber > myDealTotal || fetchIng) {
      return false;
    }
    const num = pageNumber + 1;
    setPageNumber(num);
  };

  React.useEffect(() => {
    dispatch({
      key: "myDeal",
      type: "common/getAnyListView",
      func: () => {},
      list: myDealList,
      payload: {
        pageSize,
        pageNumber,
      },
    });
  }, [pageNumber]);

  React.useEffect(() => {
    document.title = "";
  }, []);

  return (
    <div className={"page"}>
      <div className={"page-deal"}>
        <div className="deal-title">
          我的协议
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
                pageSize * pageNumber > myDealTotal &&
                "到底了～"}
              {!fetchIng && myDealTotal === 0 && pageNumber === 1 && "暂无数据"}
            </div>
          )}
          renderRow={row}
          pageSize={pageSize}
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
      <Modal
        className="deal-detail-modal"
        visible={visible}
        transparent
        maskClosable={false}
        title={modalState.title || " "}
        footer={[
          {
            text: "取消",
            onPress: () => {
              console.log("ok");
              handleCancel();
            },
          },
          {
            text: "下载",
            onPress: () => {
              console.log("下载");
              handleCancel();
            },
          },
        ]}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
      >
        <List className="keys-list-wrapper">
          {DEAL_DETAIL_KEYS.map((e) => {
            return (
              <List.Item
                multipleLine
                platform="android"
                extra="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              >
                {e.label}:
              </List.Item>
            );
          })}
        </List>
      </Modal>
    </div>
  );
});
