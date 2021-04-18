import request from "@/services/request";

/*新建企业*/
export const creat = (params) => {
  return request.post("/api/enterprise/create", {
    params
  });
};
