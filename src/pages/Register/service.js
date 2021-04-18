import request from "../../services/request";

/*注册*/
export const register = (data) => {
  return request.post("/api/user/create", {
    method: "POST",
    data,
  });
};
