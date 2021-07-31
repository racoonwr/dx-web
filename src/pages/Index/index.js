import React from "react";
import QueueAnim from "rc-queue-anim";
import { history } from "umi";

import "./index.less";

export default () => {
  const handleGo = React.useCallback(
    (href) => () => {
      history.push({
        pathname: href,
        query: {
          t: +new Date()
        }
      });
    },
    []
  );
  return (
    <div className={"page"}>
      <div className={"page-index"}>
        <div className={"index-main"}>
          <QueueAnim type="scale" component="ul">
            {/*<li key={0} onClick={handleGo("/deal")}>*/}
            {/*  我的*/}
            {/*  <br />*/}
            {/*  协议*/}
            {/*</li>*/}
            {/*<li key={1} onClick={handleGo("/enterprise")}>*/}
            {/*  我的*/}
            {/*  <br />*/}
            {/*  企业*/}
            {/*</li>*/}
            <li key={1} onClick={handleGo("/enterprise")}>
              <div className={"main-button"}>
                我的企业
              </div>
            </li>
          </QueueAnim>
        </div>
      </div>
    </div>
  );
};
