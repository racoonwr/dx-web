import request from "./request";

/*获取验证码*/
//get请求
export const getCaptchaCode = (phone) => {
  return request(`/auth/sendSms/${phone}`);
};
