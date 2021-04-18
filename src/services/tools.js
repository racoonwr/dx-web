import request from "./request";

/*获取验证码*/
export const getCaptchaCode = (params) => {
  return request("/auth/sendSms/{phone}", {
    method: "GET",
    data: params,
  });
};
