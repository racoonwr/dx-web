import React from "react";
import pathRegexp from "path-to-regexp";
import { connect } from "umi";
import { Modal, Button, Radio } from "antd";
import { useRequest } from "ahooks";

// import NotMatch from "../../components/notmatch/index";

import styles from "./index.less";

const checkRoute = (router, pathname) => {
  console.log(111, router, pathname);
  const authority = router.find(
    ({ routes, path = "/", target = "_self" }) =>
      (path && target !== "_blank" && pathRegexp(path).exec(pathname)) ||
      (routes && checkRoute(routes, pathname))
  );
  if (authority) return authority;
  return undefined;
};

const BaseLayout = (props) => {
  const check = checkRoute(props.route.routes, props.location.pathname || "/");

  const handleAgree = React.useCallback(
    (value) => () => {
      setVisible(value);
    },
    []
  );

  console.log("....base");

  return (
    <>
      {1 ? (
        props.children
      ) : (
        <div className={styles.base}>{/*<NotMatch />*/}</div>
      )}
    </>
  );
};

export default connect(({ user }) => ({ user }))(BaseLayout);
