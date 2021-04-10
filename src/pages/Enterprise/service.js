import request from "@/services/request";

/*获取详情*/
export const getDetail = (params) => {
  return request("/code", {
    params,
  });
};
