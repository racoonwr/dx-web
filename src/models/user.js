import { login, getUserInfo } from "@/services/user";
import { Toast } from "antd-mobile";

const UserModel = {
  namespace: "user",
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login.run, payload);
      if (response && response.code === "00000") {
        Toast.success("登录成功");
        window.localStorage.setItem("*t*o*k*e*n*", response.data);
      }
    },
    *getUser(_, { call, put }) {
      const response = yield call(getUserInfo);
      //解构
      yield put({
        type: "saveUser",
        payload:
          response.status === 403
            ? {
                data: {
                  forbidden: true,
                },
              }
            : response,
      });
    },
  },

  reducers: {
    saveUser(state, action) {
      return {
        ...(action.payload.data || {}),
      };
    },
  },
};

export default UserModel;
