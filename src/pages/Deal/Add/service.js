import request from "@/services/request";

/*获取签约主体*/
export const getCompanyList = (params) => {
  return request("/api/enterprise/getMyEnterprise", {
    // params
  });
};

/*获取签约类型*/
export const getContractType = (params) => {
  return request("/api/contract/getContractType", {
    // params
  });
};
