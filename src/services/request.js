import { extend } from "umi-request";
import { Toast } from "antd-mobile";
import { history } from "umi";
import { Base64 } from "js-base64";

const errorHandler = (error) => {
  console.log("errorororor---> fetcg", error);
  const { response } = error;
  if (response && response.status) {
    if (response.status === 401) {
      if (history.location.pathname !== "/login") {
        const redirect = `${history.location.pathname}${history.location.search}`;
        history.replace({
          pathname: "/login",
          query: {
            redirect: Base64.encodeURI(redirect)
          }
        });
      }
    }
    if (response.status === 403) {
      return response;
    }
    const { status, url } = response;
    console.info({
      message: `请求错误 ${status}: ${url}`,
      description: response.statusText
    });
  } else if (!response) {
    console.info({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常"
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler,
  prefix: `${process.env.apiUrl}/`,
  credentials: "include" // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  const params = {
    ...options
  };

  const token = window.localStorage.getItem("token");
  if (token && token !== "null" && token !== "undefined") {
    params.headers.token = token;
  }
  return {
    url,
    options: params
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async (response, options) => {
  const data = await response.clone().json();
  if (data.code === "00000") {
    return data;
  }
  if (!options.noMessage) {
    Toast.info(data?.message || data?.error);
  }
  return response;
});

export default request;
