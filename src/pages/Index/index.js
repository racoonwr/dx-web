import React from "react";
import { history } from "umi";
import { Button, TabBar } from "antd-mobile";
import Texty from "rc-texty";
import QueueAnim from 'rc-queue-anim';
import "./index.less";

const Img = ({ url }) => {
  return <div style={{
    width: "26px",
    height: "26px",
    background: `url(${url}) center center /  25px 25px no-repeat`
  }} />;
};

const TAB_ITEMS = [{
  title: "首页",
  key: "index",
  icon: <Img url={require("../../assert/imgs/tab_item_index.png")} />,
  selectedIcon: <Img url={require("../../assert/imgs/tab_item_index_active.png")} />
}, {
  title: "我的",
  key: "mine",
  icon: <Img url={require("../../assert/imgs/tab_item_mine.png")} />,
  selectedIcon: <Img url={require("../../assert/imgs/tab_item_mine_active.png")} />
}];

export default () => {
  const [tab, setTab] = React.useState("index");
  const [list, setList] = React.useState([{
    id: 1,
    type: "",
    text: ""
  }]);

  return <div className={"page"}>
    <TabBar
      animated={true}
      hidden={false}
      barTintColor="#fff"
      tintColor="#1678FF"
      unselectedTintColor="#C9CAD3"
    >
      {
        TAB_ITEMS.map(item => {
          return <TabBar.Item
            {...item}
            selected={tab === item.key}
            onPress={() => {
              setTab(item.key);
            }}
          >
            <div className={"page-index"}>
              <div className={"page-index-content"}>
                <div className={"index-title"}>
                  <div className={"title-main"}>
                    <Texty duration={600} type={"left"}>只需注册免费入驻</Texty>
                  </div>
                  <div className={"title-second"}>
                    <Texty duration={600} type={"right"}>农机滴滴线上平台</Texty>
                  </div>
                </div>
                <div className={"index-bg"}>
                  <img src={require("../../assert/imgs/index_background.png")} alt="" />
                </div>
                <div className={"index-main"}>
                  <div className={"index-main-title"}>用户入驻榜单</div>
                  <div className={"index-main-list"}>
                    <QueueAnim delay={600} className="queue-simple">
                      <div key={"1"} className={"index-main-list-item"} onClick={() => {
                        history.push("/login")
                      }}>
                        <span>1000位</span> &nbsp; 弄机杼已经入住
                      </div>
                      <div key={"2"} className={"index-main-list-item"}>
                        <span>1000位</span>&nbsp;弄机杼已经入住
                      </div>
                      <div key={"3"} className={"index-main-list-item"}>
                        <span>1000位</span>&nbsp;弄机杼已经入住
                      </div>
                    </QueueAnim>
                  </div>
                </div>
              </div>
            </div>
          </TabBar.Item>;
        })
      }
    </TabBar>
  </div>;
}
