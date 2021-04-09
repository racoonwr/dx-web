import React from "react";
import pathRegexp from "path-to-regexp";
import { connect } from "umi";
import { Modal, Button, Radio } from "antd";
import { useRequest } from "ahooks";

// import Agree from "../../utils/argee.js";
// import NotMatch from "../../components/notmatch/index";
// import forbid from "../../assets/forbid.png";

import styles from "./index.less";
import "./cover.less";

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

  return (
    <>
      {check ? (
        props.children
      ) : (
        <div className={styles.base}>{/*<NotMatch />*/}</div>
      )}
      {/*// <Modal*/}
      {/*//   centered*/}
      {/*//   width={380}*/}
      {/*//   footer={null}*/}
      {/*//   closable={false}*/}
      {/*//   visible={props.user && props.user.forbidden === true}*/}
      {/*//   className="forbid_modal"*/}
      {/*//   bodyStyle={{ padding: 0 }}*/}
      {/*// >*/}
      {/*//   <div className={styles.forbid}>*/}
      {/*//     <img src={forbid} alt="" />*/}
      {/*//     <div className={styles.forbid_operate}>*/}
      {/*//       <Button className={styles.forbid_open} loading={loading} onClick={handleOpenForbid}>*/}
      {/*//         立即体验*/}
      {/*//       </Button>*/}
      {/*//       <div className={styles.forbid_aggree}>*/}
      {/*//         <Radio className="forbid_modal_check" checked>*/}
      {/*//           同意接受*/}
      {/*//           <span*/}
      {/*//             className="aggree"*/}
      {/*//             onClick={e => {*/}
      {/*//               e.preventDefault();*/}
      {/*//               handleAgree(true)();*/}
      {/*//             }}*/}
      {/*//           >*/}
      {/*//             《用户使用协议》*/}
      {/*//           </span>*/}
      {/*//           并开始体验*/}
      {/*//         </Radio>*/}
      {/*//       </div>*/}
      {/*//     </div>*/}
      {/*//   </div>*/}
      {/*// </Modal>*/}
      {/*// <Modal visible={visible} centered footer={null} title={null} onCancel={handleAgree(false)}>*/}
      {/*//   <div dangerouslySetInnerHTML={{ __html: Agree }} />*/}
      {/*// </Modal>*/}
    </>
  );
};

export default connect(({ user }) => ({ user }))(BaseLayout);
