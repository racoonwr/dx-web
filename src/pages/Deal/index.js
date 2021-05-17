import React from "react";
import { connect, history } from "umi";
import { ListView, Card, Icon, Button, Modal, List } from "antd-mobile";
import { closest } from "../../utils/tools";
import { useBoolean } from "ahooks";
import { getList } from "./service";

import "./index.less";

const pageSize = 10;

const DEAL_DETAIL_KEYS = [
  {
    label: "协议编号",
    name: "updateTime",
  },
  {
    label: "签约主体",
    name: "updateTime",
  },
  {
    label: "签约对象",
    name: "updateTime",
  },
  {
    label: "更新时间",
    name: "updateTime",
  },
  {
    label: "协议类型",
    name: "updateTime",
  },
  {
    label: "签约状态",
    name: "updateTime",
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

  React.useEffect(() => {
    document.title = "";
    return () => {
      dispatch({
        key: "myDeal",
        type: "common/clearAnyListView",
      });
    };
  }, []);

  /**add */
  const handleAdd = React.useCallback(() => {
    history.push({
      pathname: "/deal/add",
      query: {
        t: +new Date(),
      },
    });
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
    // 防止数据为空 弹窗未消失
    // setModalState({});
  }, []);
  const handleGo = React.useCallback(
    (row = {}) => () => {
      setTrue();
      setModalState({
        ...row,
        title: `${row.title || "xxxx协议标题"}详情`,
      });
    },
    []
  );

  /**row render */
  const row = (rowData) => {
    return (
      <Card key={rowData.id} className="deal-item" onClick={handleGo(rowData)}>
        <Card.Header
          title="协议标题"
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          extra={<span>{rowData.updateTime}</span>}
        />
        <Card.Body>{/*<div>内容</div>*/}</Card.Body>
        <Card.Footer
          className="align-vertical"
          content="查看详情"
          extra={<Icon type="right" size="sm" />}
        />
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
      func: getList,
      list: myDealList,
      payload: {
        pageSize,
        pageNumber,
      },
    });
  }, [pageNumber]);

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
          loading={fetchIng}
          className="deal-list"
          dataSource={dataSource.cloneWithRows(myDealList)}
          renderFooter={() => (
            <div className="list-no-data">
              {fetchIng
                ? "正在加载..."
                : myDealTotal === 0 && pageNumber === 1 && "暂无数据"}
              {pageNumber > 1 &&
                pageSize * pageNumber > myDealTotal &&
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
      <Modal
        transparent
        visible={visible}
        maskClosable={false}
        title={modalState.title}
        className="deal-detail-modal"
        wrapProps={{ onTouchStart: onWrapTouchStart }}
        footer={[
          {
            text: "取消",
            onPress: () => {
              handleCancel();
            },
          },
          {
            text: "下载",
            onPress: () => {
              console.log("下载");
              //promise 之后下载
              handleCancel();
            },
          },
        ]}
      >
        <List className="keys-list-wrapper">
          {DEAL_DETAIL_KEYS.map((e) => {
            return (
              <List.Item
                key={e.name}
                multipleLine
                platform="android"
                onClick={() => {}}
                extra={modalState[e.name] || "-"}
              >
                {e.label}：
              </List.Item>
            );
          })}
        </List>
      </Modal>
    </div>
  );
});
