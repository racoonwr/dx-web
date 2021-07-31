import request from "@/services/request";

/*新建企业*/
export const creat = (params) => {
  return request.post("/api/enterprise/create", {
    data: params
  });
};

export const update = (params) => {
  return request.post("/api/enterprise/update", {
    data: params
  });
};

