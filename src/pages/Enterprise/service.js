import request from "@/services/request";

/*获取详情*/
export const getList = (params) => {
  return request("/api/enterprise/getMyEnterprise", {
    params
  });
};
