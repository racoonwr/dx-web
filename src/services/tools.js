import request from "./request";

/*获取验证码*/
export const getCaptchaCode = (params) => {
  return request("/code", {
    method: "POST",
    data: params,
  });
};
