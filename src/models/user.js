import { Effect, Reducer } from "umi";
// import { getUserInfo } from "@/services/user";

const UserModel = {
  namespace: "user",

  state: {},

  effects: {
    * fetchUser(_, { call, put }) {
      const response = yield call(null);
      yield put({
        type: "saveUser",
        payload:
          response.status === 403
            ? {
              data: {
                forbidden: true
              }
            }
            : response
      });
    }
  },

  reducers: {
    saveUser(state, action) {
      return {
        ...(action.payload.data || {})
      };
    }
  }
};

export default UserModel;
