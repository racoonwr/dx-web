import React from "react";
import { withRouter } from "umi";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { parse } from "querystring";

const ANIMATION_ACTION = {
  PUSH: "forward",
  REPLACE: "back",
};

export default withRouter(({ history, location, children }) => {
  const [custom, setCustom] = React.useState();

  React.useEffect(() => {
    const listen = (e) => {
      console.log("切换router only触发一次!!!");
      if (history.action === "POP") {
        const newUrl = parse(e.newURL.split("?")[1]);
        const oldUrl = parse(e.oldURL.split("?")[1]);

        if (oldUrl.t) {
          if (newUrl.t && newUrl.t > oldUrl.t) {
            console.log("前进");
            setCustom("PUSH");
          } else {
            console.log("后退");
            setCustom("REPLACE");
          }
        } else {
          if (newUrl.t) {
            console.log("前进");
            setCustom("PUSH");
          }
        }
      } else {
        setCustom(history.action);
      }
    };
    window.addEventListener("hashchange", listen, false);
    return () => {
      window.removeEventListener("hashchange", listen, false);
    };
  }, []);

  // console.log("----", custom ? ANIMATION_ACTION[custom] : undefined);
  return (
    <TransitionGroup
      className={"page-wrapper"}
      childFactory={(child) =>
        React.cloneElement(child, {
          classNames: custom ? ANIMATION_ACTION[custom] : undefined,
        })
      }
    >
      <CSSTransition
        // in
        timeout={500}
        unmountOnExit
        key={location.pathname}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
});
