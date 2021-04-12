import React from "react";

import Loading from "../../assert/loading.gif";

export default () => {
  return (
    <div className="page-loading">
      <img src={Loading} />
      <div>正在加载中....</div>
    </div>
  );
};
