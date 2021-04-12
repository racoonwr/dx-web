import React from "react";
import { withRouter } from "umi";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ANIMATION_ACTION = {
  PUSH: "forward",
  POP: "back",
};

export default withRouter(({ history, location, match, children }) => {
  console.log(history.action);
  return (
    <TransitionGroup className={"page-wrapper"}>
      <CSSTransition
        in
        timeout={400}
        unmountOnExit
        key={location.pathname}
        classNames={ANIMATION_ACTION[history.action]}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
});
