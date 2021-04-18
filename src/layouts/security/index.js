import React from "react";
import { Redirect, connect } from "umi";

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      //先不加
      // dispatch({
      //   type: "user/getUser",
      // });
    }
  }

  render() {
    console.log("-----securit", this.props);
    return this.props.children;

    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    const isLogin = currentUser && currentUser.userId;
    // const queryString = stringify({
    //   redirect: window.location.href,
    // });
    if ((!isLogin && loading) || !isReady) {
      return "<PageLoading />";
    }

    if (!isLogin && window.location.pathname !== "/login") {
      //  return <Redirect to={`/user/login?${queryString}`} />;
      return <Redirect to={`/login`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
