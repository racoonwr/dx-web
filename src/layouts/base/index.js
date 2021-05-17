import React from "react";
import pathRegexp from "path-to-regexp";

import nofound from "../../assert/404.png";

import "./index.less";

const checkRoute = (router, pathname) => {
  const authority = router.find(
    ({ routes, path = "/", target = "_self" }) =>
      (path && target !== "_blank" && pathRegexp(path).exec(pathname)) ||
      (routes && checkRoute(routes, pathname))
  );
  if (authority) {
    return authority;
  }
  return undefined;
};

const BaseLayout = (props) => {
  const check = checkRoute(props.route.routes, props.location.pathname || "/");

  return (
    <>
      {check ? (
        props.children
      ) : (
        <div className={"check-layout-page"}>
          <img src={nofound} alt="" />
          <div className={"nofound"}>抱歉，您访问得内容不存在</div>
        </div>
      )}
    </>
  );
};

export default BaseLayout;
