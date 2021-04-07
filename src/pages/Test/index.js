import React from "react";
import { history} from "umi";
import { Button } from "antd-mobile";

export default () => {
  return <div className={"page"} style={{background:'red'}}>
    2222222222222222222222<Button onClick={() => {
    history.goBack();
  }
  }>2222222222</Button>
  </div>;
}
