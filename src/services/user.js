import request from "./request";

/*获取user信息*/
export const getUserInfo = (params) => {
  return request("/code", {
    params,
  });
};
