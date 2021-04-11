import request from "./request";

/**登录 */
export const login = {
  key: () => {
    return "";
  },
  run: () => {
    request.post("/auth/login", {
      method: "POST",
      data,
    });
  },
};

/*获取user信息*/
export const getUserInfo = (params) => {
  return request("/code", {
    params,
  });
};
