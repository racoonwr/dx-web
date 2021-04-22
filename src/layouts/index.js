import React from "react";
import { withRouter } from "umi";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ANIMATION_ACTION = {
  PUSH: "forward",
  REPLACE: "back",
  POP: "back"
};

export default withRouter(({ history, location, match, children }) => {
  // console.log(history);
  return (
    <TransitionGroup className={"page-wrapper"} childFactory={child => React.cloneElement(
      child,
      { classNames: ANIMATION_ACTION[history.action] }
    )}>
      <CSSTransition
        // in
        timeout={500}
        unmountOnExit
        key={location.pathname}
        // classNames={ANIMATION_ACTION[history.action]}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
});
