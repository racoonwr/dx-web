import request from "./request";

/*获取验证码*/
//get请求
export const getCaptchaCode = (params) => {
  return request("/auth/sendSms/{phone}", {
    params: params,
  });
};
