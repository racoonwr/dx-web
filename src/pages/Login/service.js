import request from "../../services/request";

/*获取验证码*/
export const login = (data) => {
  return request.post("/code", {
    method: "POST",
    data
  });
};
